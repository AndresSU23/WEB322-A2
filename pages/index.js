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
import { ResultErrorContext } from '@/context/ResultErrorContext';
import { IdSearchErrorContext } from '@/context/IdSearchErrorContext';
import MainPage from '@/components/MainPage';

export default function Home() {
  const router = useRouter();
  const {error, setError} = useContext(ResultErrorContext);
  const {idError, setIdError } = useContext(IdSearchErrorContext)
  const { results, setResults } = useContext(ResultsContext);
  const [ firstLoad, setFirstLoad ] = useState(true)
  const { unit } = useContext(UnitContext); // 'metric' for Celsius, 'imperial' for Fahrenheit

  useEffect(() => {
    const fetchWeatherData = async () => {
      navigator.geolocation.getCurrentPosition(async (position) => {
        if (firstLoad && !idError)
        {const { latitude, longitude } = position.coords;
        try {
          const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
              lat: latitude,
              lon: longitude,
              appid: 'b09f4c0f49b545ec979ea59c47035d1e',
              units: unit,
            },
          });
          setError('')
          setResults([response.data]);
          setFirstLoad(false)
          
        } catch (error) {
          setError('Failed to fetch weather data.' + error.response.data.message);
        }}
      });
    };

    const handleRouteChange = (url) => {

      setFirstLoad(true)
      setIdError('')
      fetchWeatherData();
    };

    fetchWeatherData();
    setIdError('')

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [error, firstLoad, idError, results.length, router.events, setError, setIdError, setResults, unit]);

  return (
    <MainPage>
    </MainPage>
  );
}
