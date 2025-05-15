from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class WeatherCondition(BaseModel):
    id: int
    main: str
    description: str
    icon: str

class CurrentWeatherResponse(BaseModel):
    location: str
    temperature: float
    feels_like: float
    humidity: int
    wind_speed: float
    weather_condition: WeatherCondition
    timestamp: int
    country: str
    
class ForecastDay(BaseModel):
    date: str
    temperature_min: float
    temperature_max: float
    humidity: int
    weather_condition: WeatherCondition
    
class ForecastResponse(BaseModel):
    location: str
    country: str
    daily_forecast: List[ForecastDay]
    
class ErrorResponse(BaseModel):
    error: str
    message: str