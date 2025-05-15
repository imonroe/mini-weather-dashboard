/**
 * Get a gradient background based on weather condition
 * @param {string} condition - The weather condition (e.g., "Clear", "Rain", etc.)
 * @returns {string} - CSS gradient background
 */
export const getWeatherBackground = (condition) => {
  switch (condition) {
    case 'Clear':
      return 'linear-gradient(to bottom, #4a90e2, #87CEEB)';
    case 'Clouds':
      return 'linear-gradient(to bottom, #738290, #A9B2BD)';
    case 'Rain':
    case 'Drizzle':
      return 'linear-gradient(to bottom, #515761, #6B7480)';
    case 'Thunderstorm':
      return 'linear-gradient(to bottom, #34373D, #4A4E57)';
    case 'Snow':
      return 'linear-gradient(to bottom, #DFE2E5, #F7F9FC)';
    case 'Mist':
    case 'Fog':
    case 'Haze':
      return 'linear-gradient(to bottom, #99A4AE, #BDC6D1)';
    default:
      return 'linear-gradient(to bottom, #5D4EA2, #8A7FB9)'; // Default purple gradient
  }
};

/**
 * Get animation class based on weather condition
 * @param {string} condition - The weather condition
 * @returns {string} - CSS class name for animation
 */
export const getWeatherAnimation = (condition) => {
  switch (condition) {
    case 'Rain':
    case 'Drizzle':
      return 'rain-animation';
    case 'Snow':
      return 'snow-animation';
    case 'Clear':
      return 'sun-animation';
    case 'Clouds':
      return 'cloud-animation';
    case 'Thunderstorm':
      return 'thunder-animation';
    default:
      return '';
  }
};

/**
 * Format temperature
 * @param {number} temp - Temperature in Fahrenheit
 * @returns {string} - Formatted temperature string
 */
export const formatTemperature = (temp) => {
  return `${Math.round(temp)}°F`;
};

/**
 * Format date string
 * @param {string} dateStr - Date string in YYYY-MM-DD format
 * @returns {string} - Formatted date (e.g., "Mon, June 1")
 */
export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};

/**
 * Get icon URL from OpenWeatherMap
 * @param {string} iconCode - The icon code from API
 * @returns {string} - URL to the icon
 */
export const getWeatherIconUrl = (iconCode) => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};