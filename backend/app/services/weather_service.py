import os
import re
import requests
import logging
from datetime import datetime, timedelta
from typing import Dict, Any, List, Optional
import time
from ..models.responses import CurrentWeatherResponse, ForecastResponse, ForecastDay, WeatherCondition

logger = logging.getLogger("weather-service")

class Cache:
    """Simple in-memory cache with TTL"""
    def __init__(self, ttl_seconds=300):
        self.cache = {}
        self.ttl = ttl_seconds
    
    def get(self, key):
        if key in self.cache:
            data, timestamp = self.cache[key]
            if time.time() - timestamp < self.ttl:
                return data
            else:
                # Expired
                del self.cache[key]
        return None
    
    def set(self, key, value):
        self.cache[key] = (value, time.time())
        
    def clear(self):
        self.cache.clear()

class WeatherService:
    """Service to interact with OpenWeatherMap API"""
    
    BASE_URL = "https://api.openweathermap.org/data/2.5"
    
    def __init__(self):
        self.api_key = os.getenv("OPENWEATHER_API_KEY")
        if not self.api_key:
            logger.warning("OpenWeatherMap API key not found in environment variables")
        
        # Cache for API responses (5 minute TTL)
        self.cache = Cache(ttl_seconds=300)
    
    def _is_zip_code(self, location: str) -> bool:
        """Check if the location is a US zip code (5 digits)"""
        return bool(re.match(r'^\d{5}$', location))
    
    def _build_location_query(self, location: str) -> str:
        """Build the location query parameter based on whether it's a zip code or city name"""
        if self._is_zip_code(location):
            return f"zip={location},us"
        else:
            return f"q={location}"
    
    def _fetch_data(self, endpoint: str, params: Dict[str, Any]) -> Dict[str, Any]:
        """Fetch data from the OpenWeatherMap API with caching"""
        # Create cache key from endpoint and params
        cache_key = f"{endpoint}:{str(sorted(params.items()))}"
        
        # Check cache first
        cached_data = self.cache.get(cache_key)
        if cached_data:
            logger.info(f"Cache hit for {cache_key}")
            return cached_data
        
        # Add API key to params
        params["appid"] = self.api_key
        
        # Make the request
        url = f"{self.BASE_URL}/{endpoint}"
        response = requests.get(url, params=params)
        
        if response.status_code != 200:
            logger.error(f"API error: {response.status_code} - {response.text}")
            error_data = response.json() if response.content else {"message": "Unknown error"}
            if response.status_code == 429:
                raise Exception("API rate limit exceeded. Please try again later.")
            else:
                raise Exception(f"OpenWeatherMap API Error: {error_data.get('message', 'Unknown error')}")
        
        data = response.json()
        
        # Cache the response
        self.cache.set(cache_key, data)
        
        return data
    
    def get_current_weather(self, location: str) -> CurrentWeatherResponse:
        """Get current weather for a location (city or zip code)"""
        location_query = self._build_location_query(location)
        params = {
            "units": "imperial",  # Use Fahrenheit
        }
        
        # Add location parameter
        for key, value in [param.split("=") for param in location_query.split("&")]:
            params[key] = value
        
        data = self._fetch_data("weather", params)
        
        # Transform the response to our model
        return CurrentWeatherResponse(
            location=data["name"],
            temperature=data["main"]["temp"],
            feels_like=data["main"]["feels_like"],
            humidity=data["main"]["humidity"],
            wind_speed=data["wind"]["speed"],
            weather_condition=WeatherCondition(
                id=data["weather"][0]["id"],
                main=data["weather"][0]["main"],
                description=data["weather"][0]["description"],
                icon=data["weather"][0]["icon"]
            ),
            timestamp=data["dt"],
            country=data["sys"]["country"]
        )
    
    def get_forecast(self, location: str) -> ForecastResponse:
        """Get 5-day weather forecast for a location (city or zip code)"""
        location_query = self._build_location_query(location)
        params = {
            "units": "imperial",  # Use Fahrenheit
        }
        
        # Add location parameter
        for key, value in [param.split("=") for param in location_query.split("&")]:
            params[key] = value
        
        data = self._fetch_data("forecast", params)
        
        # The forecast API returns data in 3-hour increments
        # We need to aggregate this into daily forecasts
        daily_forecasts = {}
        
        for item in data["list"]:
            # Convert timestamp to date string
            date = datetime.fromtimestamp(item["dt"]).strftime("%Y-%m-%d")
            
            # Initialize day data if not exists
            if date not in daily_forecasts:
                daily_forecasts[date] = {
                    "temp_min": float("inf"),
                    "temp_max": float("-inf"),
                    "humidity": [],
                    "weather": []
                }
            
            # Update min/max temperature
            daily_forecasts[date]["temp_min"] = min(daily_forecasts[date]["temp_min"], item["main"]["temp_min"])
            daily_forecasts[date]["temp_max"] = max(daily_forecasts[date]["temp_max"], item["main"]["temp_max"])
            
            # Append humidity
            daily_forecasts[date]["humidity"].append(item["main"]["humidity"])
            
            # Append weather condition
            daily_forecasts[date]["weather"].append(item["weather"][0])
        
        # Convert to list of ForecastDay objects (next 5 days)
        forecast_days = []
        for date, forecast in sorted(daily_forecasts.items())[:5]:
            # Find the most common weather condition for the day
            weather_counts = {}
            for weather in forecast["weather"]:
                weather_id = weather["id"]
                if weather_id not in weather_counts:
                    weather_counts[weather_id] = {
                        "count": 0,
                        "weather": weather
                    }
                weather_counts[weather_id]["count"] += 1
            
            most_common_weather = max(weather_counts.values(), key=lambda x: x["count"])["weather"]
            
            forecast_days.append(ForecastDay(
                date=date,
                temperature_min=forecast["temp_min"],
                temperature_max=forecast["temp_max"],
                humidity=int(sum(forecast["humidity"]) / len(forecast["humidity"])),  # Average humidity
                weather_condition=WeatherCondition(
                    id=most_common_weather["id"],
                    main=most_common_weather["main"],
                    description=most_common_weather["description"],
                    icon=most_common_weather["icon"]
                )
            ))
        
        return ForecastResponse(
            location=data["city"]["name"],
            country=data["city"]["country"],
            daily_forecast=forecast_days
        )