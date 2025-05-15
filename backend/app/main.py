from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os
from dotenv import load_dotenv
import logging
from .services.weather_service import WeatherService
from .models.responses import CurrentWeatherResponse, ForecastResponse, ErrorResponse

# Load environment variables
load_dotenv()

app = FastAPI(title="Mini Weather Dashboard API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger("weather-app")

# Initialize weather service
weather_service = WeatherService()

@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "ok"}

@app.get("/api/weather/current")
async def get_current_weather(location: str):
    """Get current weather for a location (city or zip code)"""
    try:
        result = weather_service.get_current_weather(location)
        return result
    except Exception as e:
        logger.error(f"Error getting current weather: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/weather/forecast")
async def get_weather_forecast(location: str):
    """Get 5-day weather forecast for a location (city or zip code)"""
    try:
        result = weather_service.get_forecast(location)
        return result
    except Exception as e:
        logger.error(f"Error getting forecast: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# Mount static files for frontend
app.mount("/", StaticFiles(directory="/app/frontend/build", html=True), name="static")

# Catch-all route to return index.html
@app.get("/{full_path:path}")
async def serve_frontend(full_path: str):
    return FileResponse("/app/frontend/build/index.html")