# Mini Weather Dashboard

A lightweight, visually engaging web application that allows users to check the current and daily forecast weather for any location by entering a city name or zip code.

## Features

- Search by city name or US zip code
- Current weather display with animated icons
- 5-day forecast
- Dynamic backgrounds based on weather conditions
- Responsive design for all devices
- Docker containerization for easy deployment

## Technology Stack

- **Backend**: Python FastAPI
- **Frontend**: React with Styled Components
- **Containerization**: Docker
- **API**: OpenWeatherMap

![image](https://github.com/user-attachments/assets/a81ccc76-1d3a-4485-a650-f1bae9acf619)


## Getting Started

### Prerequisites

- Docker
- OpenWeatherMap API key (get one for free at [OpenWeatherMap](https://openweathermap.org/api))

### Running with Docker

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/mini-weather-dashboard.git
   cd mini-weather-dashboard
   ```

2. Create a `.env` file in the backend directory with your OpenWeatherMap API key:
   ```
   OPENWEATHER_API_KEY=your_api_key_here
   PORT=8000
   ```

3. Build and run the Docker container:
   ```
   docker build -t mini-weather-dashboard .
   docker run -p 8000:8000 --env-file ./backend/.env mini-weather-dashboard
   ```

4. Access the application at http://localhost:8000

### Development Setup

#### Backend

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create a virtual environment and activate it:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Create a `.env` file with your OpenWeatherMap API key:
   ```
   OPENWEATHER_API_KEY=your_api_key_here
   PORT=8000
   ```

5. Run the backend:
   ```
   python server.py
   ```

#### Frontend

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

## API Endpoints

- `GET /api/health` - Health check endpoint
- `GET /api/weather/current?location=XYZ` - Get current weather for a location
- `GET /api/weather/forecast?location=XYZ` - Get 5-day forecast for a location

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Powered by [OpenWeatherMap](https://openweathermap.org/)
