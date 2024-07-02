import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import Image from 'next/image';
import { formatTemperature, formatSpeed } from '../utils/convertor';
import { UnitContext } from '@/context/UnitContext';
import { RecentlyViewedContext } from '@/context/RecentlyViewedContext';
import "../node_modules/flag-icons/css/flag-icons.min.css";

const CityDetail = ({ show, handleClose, cityId }) => {
  const { recentlyViewed, setRecentlyViewed } = useContext(RecentlyViewedContext); // Access context function to set recentlyViewed
  const [cityDetails, setCityDetails] = useState(null);
  const [error, setError] = useState('');
  const { unit } = useContext(UnitContext); // 'metric' for Celsius, 'imperial' for Fahrenheit

  useEffect(() => {
    const fetchCityDetails = async () => {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
          params: {
            id: cityId,
            appid: 'b09f4c0f49b545ec979ea59c47035d1e',
            units: unit,
          },
        });
        setCityDetails(response.data);
        setRecentlyViewed(!recentlyViewed.map(obj => obj.id).includes(cityId) ? [...recentlyViewed, response.data] : recentlyViewed); // Update recentlyViewed in context

      } catch (error) {
        setError('Failed to fetch city details.');
      }
    };
    if (cityId) {
      fetchCityDetails();
    }
  }, [cityId, recentlyViewed, setRecentlyViewed, unit]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>City Weather Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <p>{error}</p>}
        {cityDetails ? (
          <div>
            <h2>
              {cityDetails.name}
              <span className={`fi fi-${cityDetails.sys.country.toLowerCase()}`} style={{ marginLeft: '10px' }}></span>
            </h2>
            <p>Id: {cityDetails.id}</p>
            <p>Temperature: {formatTemperature(cityDetails.main.temp, unit)}</p>
            <p>Weather: {cityDetails.weather[0].description}
              <Image
                src={`/icons/${cityDetails.weather[0].icon}.webp`}
                alt={cityDetails.weather[0].description}
                width={50}
                height={50}
              />
            </p>
            <p>Max Temperature: {formatTemperature(cityDetails.main.temp_max, unit)}</p>
            <p>Min Temperature: {formatTemperature(cityDetails.main.temp_min, unit)}</p>
            <p>Wind Speed: {formatSpeed(cityDetails.wind.speed, unit)}</p>
            <p>Humidity: {cityDetails.main.humidity}%</p>
            <p>Pressure: {cityDetails.main.pressure} hPa</p>
            <p>Sunrise: {new Date(cityDetails.sys.sunrise * 1000).toLocaleTimeString()}</p>
            <p>Sunset: {new Date(cityDetails.sys.sunset * 1000).toLocaleTimeString()}</p>
            <p>Last Updated: {new Date(cityDetails.dt * 1000).toLocaleString()}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CityDetail;
