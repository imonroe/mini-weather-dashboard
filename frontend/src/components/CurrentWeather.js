import React from 'react';
import styled from 'styled-components';
import { formatTemperature, getWeatherIconUrl, getWeatherAnimation } from '../utils/backgroundHelper';

const CurrentWeatherCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const WeatherMain = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  @media (min-width: 768px) {
    padding-right: 20px;
  }
`;

const WeatherDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 20px;
  
  @media (min-width: 768px) {
    margin-top: 0;
    border-left: 1px solid #e8e8e8;
    padding-left: 20px;
  }
`;

const LocationName = styled.h2`
  margin: 0 0 5px 0;
  font-size: 1.8rem;
  font-weight: 500;
`;

const WeatherCondition = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const ConditionText = styled.span`
  font-size: 1.2rem;
  color: #555;
  text-transform: capitalize;
`;

const IconContainer = styled.div`
  margin-right: 10px;
  position: relative;
  
  img {
    width: 50px;
    height: 50px;
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

const Temperature = styled.div`
  font-size: 3rem;
  font-weight: 300;
  margin-bottom: 10px;
`;

const FeelsLike = styled.div`
  font-size: 1rem;
  color: #666;
  margin-bottom: 20px;
`;

const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const DetailLabel = styled.span`
  color: #555;
`;

const DetailValue = styled.span`
  font-weight: 500;
`;

const CurrentWeather = ({ data }) => {
  if (!data) return null;
  
  const { 
    location, 
    temperature, 
    feels_like, 
    humidity, 
    wind_speed, 
    weather_condition, 
    country 
  } = data;
  
  const animationClass = getWeatherAnimation(weather_condition.main);
  
  return (
    <CurrentWeatherCard>
      <WeatherMain>
        <LocationName>{location}, {country}</LocationName>
        <WeatherCondition>
          <IconContainer animationClass={animationClass}>
            <img 
              src={getWeatherIconUrl(weather_condition.icon)} 
              alt={weather_condition.description} 
            />
          </IconContainer>
          <ConditionText>{weather_condition.description}</ConditionText>
        </WeatherCondition>
        <Temperature>{formatTemperature(temperature)}</Temperature>
        <FeelsLike>Feels like {formatTemperature(feels_like)}</FeelsLike>
      </WeatherMain>
      
      <WeatherDetails>
        <DetailItem>
          <DetailLabel>Humidity</DetailLabel>
          <DetailValue>{humidity}%</DetailValue>
        </DetailItem>
        <DetailItem>
          <DetailLabel>Wind Speed</DetailLabel>
          <DetailValue>{wind_speed} mph</DetailValue>
        </DetailItem>
      </WeatherDetails>
    </CurrentWeatherCard>
  );
};

export default CurrentWeather;