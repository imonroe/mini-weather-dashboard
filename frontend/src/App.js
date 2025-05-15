import React, { useState } from 'react';
import styled from 'styled-components';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import { getWeatherBackground } from './utils/backgroundHelper';
import Footer from './components/Footer';
import ErrorDisplay from './components/ErrorDisplay';
import LoadingSpinner from './components/LoadingSpinner';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  transition: background-color 1s ease;
  background: ${({ weatherCondition }) => getWeatherBackground(weatherCondition)};
`;

const Content = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  text-align: center;
  color: white;
  margin-bottom: 20px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleSearch = async (location) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/weather/current?location=${encodeURIComponent(location)}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to fetch weather data');
      }
      const data = await response.json();
      setCurrentWeather(data);
      
      // Fetch forecast
      const forecastResponse = await fetch(`/api/weather/forecast?location=${encodeURIComponent(location)}`);
      if (!forecastResponse.ok) {
        const errorData = await forecastResponse.json();
        throw new Error(errorData.detail || 'Failed to fetch forecast data');
      }
      const forecastData = await forecastResponse.json();
      setForecast(forecastData);
    } catch (err) {
      setError(err.message);
      setCurrentWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };
  
  // Determine if we need to show the welcome screen
  const showWelcome = !currentWeather && !loading && !error;
  
  // Get the weather condition for background
  const weatherCondition = currentWeather?.weather_condition?.main || 'Clear';
  
  return (
    <AppContainer weatherCondition={weatherCondition}>
      <Content>
        <Header>
          <Title>Mini Weather Dashboard</Title>
        </Header>
        
        <SearchBar onSearch={handleSearch} disabled={loading} />
        
        {loading && <LoadingSpinner />}
        {error && <ErrorDisplay message={error} />}
        
        {showWelcome && (
          <div style={{ textAlign: 'center', color: 'white', marginTop: '50px' }}>
            <h2>Welcome to Mini Weather Dashboard</h2>
            <p>Enter a city name or US zip code to get the weather forecast</p>
          </div>
        )}
        
        {currentWeather && (
          <>
            <CurrentWeather data={currentWeather} />
            {forecast && <Forecast data={forecast} />}
          </>
        )}
      </Content>
      
      <Footer />
    </AppContainer>
  );
}

export default App;