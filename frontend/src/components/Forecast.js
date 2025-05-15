import React from 'react';
import styled from 'styled-components';
import { formatTemperature, formatDate, getWeatherIconUrl, getWeatherAnimation } from '../utils/backgroundHelper';

const ForecastContainer = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h3`
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #333;
  font-weight: 500;
`;

const ForecastGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
  
  @media (min-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (min-width: 992px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

const ForecastDay = styled.div`
  background: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const DayLabel = styled.div`
  font-weight: 500;
  margin-bottom: 10px;
  font-size: 1rem;
`;

const IconContainer = styled.div`
  margin: 10px auto;
  width: 50px;
  height: 50px;
  
  img {
    width: 100%;
    height: 100%;
  }
  
  &.${props => props.animationClass} {
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
`;

const TempRange = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const MaxTemp = styled.span`
  font-weight: 500;
  font-size: 1.1rem;
`;

const MinTemp = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

const WeatherDesc = styled.div`
  font-size: 0.9rem;
  color: #555;
  text-transform: capitalize;
`;

const Forecast = ({ data }) => {
  if (!data || !data.daily_forecast || data.daily_forecast.length === 0) {
    return null;
  }
  
  return (
    <ForecastContainer>
      <Title>5-Day Forecast</Title>
      <ForecastGrid>
        {data.daily_forecast.map((day, index) => {
          const animationClass = getWeatherAnimation(day.weather_condition.main);
          
          return (
            <ForecastDay key={index}>
              <DayLabel>{formatDate(day.date)}</DayLabel>
              <IconContainer animationClass={animationClass}>
                <img 
                  src={getWeatherIconUrl(day.weather_condition.icon)} 
                  alt={day.weather_condition.description} 
                />
              </IconContainer>
              <TempRange>
                <MaxTemp>{formatTemperature(day.temperature_max)}</MaxTemp>
                <MinTemp>{formatTemperature(day.temperature_min)}</MinTemp>
              </TempRange>
              <WeatherDesc>{day.weather_condition.description}</WeatherDesc>
            </ForecastDay>
          );
        })}
      </ForecastGrid>
    </ForecastContainer>
  );
};

export default Forecast;