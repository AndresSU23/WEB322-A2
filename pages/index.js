/*********************************************************************************
* WEB422 – Assignment 2
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: David Andres Sanchez Umbarila   Student ID: 140273228   Date: 02/07/2024
*
*
********************************************************************************/

import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { UnitContext } from '@/context/UnitContext';
import { ResultsContext } from '@/context/ResultsContext';
import MainPage from '@/components/MainPage';

export default function Home() {
  const router = useRouter();
  const [error, setError] = useState('');
  const { results, setResults } = useContext(ResultsContext);
  const { unit } = useContext(UnitContext); // 'metric' for Celsius, 'imperial' for Fahrenheit

  useEffect(() => {
    const fetchWeatherData = async () => {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
              lat: latitude,
              lon: longitude,
              appid: 'b09f4c0f49b545ec979ea59c47035d1e',
              units: unit,
            },
          });
          if (results.length === 0) {
            setResults([response.data]);
          }
        } catch (error) {
          setError('Failed to fetch weather data.');
        }
      });
    };

    const handleRouteChange = (url) => {
      console.log('App is changing to: ', url);
      setResults([]);
      fetchWeatherData();
    };

    fetchWeatherData();

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [results.length, router.events, setError, setResults, unit]);

  return (
    <MainPage>
    </MainPage>
  );
}
