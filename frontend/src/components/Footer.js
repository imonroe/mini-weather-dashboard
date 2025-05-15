import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 15px;
  text-align: center;
  font-size: 0.9rem;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Attribution = styled.div`
  margin-bottom: 10px;
  
  @media (min-width: 768px) {
    margin-bottom: 0;
  }
  
  a {
    color: #4a90e2;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <Attribution>
          <a href="https://openweathermap.org/" target="_blank" rel="noopener noreferrer">
            Powered by OpenWeatherMap
          </a>
        </Attribution>
        <div>
          Mini Weather Dashboard &copy; {new Date().getFullYear()}
        </div>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;