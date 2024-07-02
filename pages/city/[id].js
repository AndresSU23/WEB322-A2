import { useRouter } from 'next/router';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UnitContext } from '@/context/UnitContext';
import { ResultsContext } from '@/context/ResultsContext';
import { RecentlyViewedContext } from '@/context/RecentlyViewedContext';
import MainPage from '@/components/MainPage';

export default function City() {
  const { recentlyViewed } = useContext(RecentlyViewedContext);
  const { results, setResults } = useContext(ResultsContext);
  const { unit } = useContext(UnitContext);
  const router = useRouter();
  const { id } = router.query;
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        if (id && recentlyViewed.map(obj => obj.id).includes(id)) {
          setResults(recentlyViewed.filter(obj => obj.id === id));
        } else if (id) {
          const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
              id: id,
              appid: 'b09f4c0f49b545ec979ea59c47035d1e',
              units: unit,
            },
          });
          setResults([response.data]);
        }
      } catch (error) {
        setError('City not found.');
      }
    };

    fetchWeather();
  }, [id, recentlyViewed, setResults, unit]);

  return (
    <MainPage>
    </MainPage>
  );
}
