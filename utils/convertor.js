// utils/temperature.js

export const formatTemperature = (temp, unit) => {
    if (unit === 'metric') {
      return `${temp} °C`;
    } else if (unit === 'imperial') {
      const fahrenheit = (temp * 9 / 5 + 32).toFixed(2);
      return `${fahrenheit} °F`;
    } else {
      return `${temp} K`; // Default to Kelvin if no unit is specified
    }
  };

export const formatSpeed = (speed, unit) => {
    if (unit === 'metric') {
      return `${speed} m/s`;
    } else if (unit === 'imperial') {
      const mph = (speed * 2.237).toFixed(2);
      return `${mph} mph`;
    } else {
      return `${speed} m/s`; // Default to m/s if no unit is specified
    }
  };