import React from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  background-color: rgba(255, 85, 85, 0.9);
  color: white;
  padding: 15px 20px;
  border-radius: 10px;
  margin: 20px 0;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const ErrorIcon = styled.div`
  margin-right: 15px;
  font-size: 24px;
`;

const ErrorMessage = styled.div`
  flex: 1;
  
  h3 {
    margin: 0 0 5px 0;
    font-size: 1.2rem;
  }
  
  p {
    margin: 0;
    font-size: 0.9rem;
    opacity: 0.9;
  }
`;

const ErrorDisplay = ({ message }) => {
  return (
    <ErrorContainer>
      <ErrorIcon>⚠️</ErrorIcon>
      <ErrorMessage>
        <h3>Error</h3>
        <p>{message || 'An unknown error occurred. Please try again.'}</p>
      </ErrorMessage>
    </ErrorContainer>
  );
};

export default ErrorDisplay;