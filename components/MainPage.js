import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Pagination, Button, Container, Form } from 'react-bootstrap';
import Layout from './Layout';
import CityList from './CityList';
import CityDetail from './CityDetail';
import { UnitContext } from '@/context/UnitContext';
import { ResultsContext } from '@/context/ResultsContext';

export default function MainPage() {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const { results, setResults } = useContext(ResultsContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCityId, setSelectedCityId] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const { unit } = useContext(UnitContext); // 'metric' for Celsius, 'imperial' for Fahrenheit

  const handleCityClick = (id) => {
    setSelectedCityId(id);
    setShowDetail(true);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/find`, {
        params: {
          q: city.toLowerCase().trim(),
          appid: 'b09f4c0f49b545ec979ea59c47035d1e',
          units: unit,
        },
      });
      setResults(response.data.list);
      setCurrentPage(1);
      setTotalPages(Math.ceil(response.data.list.length / 3));
      setError('');
    } catch (error) {
      setError('City not found.');
    }
  };

  const currentResults = results.slice((currentPage - 1) * 3, currentPage * 3);

  return (
    <Layout>
      <Container fluid className="d-flex align-items-center justify-content-center" style={{ height: '25vh' }}>
        <Form onSubmit={handleSearch} className="p-4 border rounded" style={{ width: '50%' }}>
          <Form.Group controlId="citySearch" style={{ width: '80%' }}>
            <Form.Control
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name or city, country code"
              style={{ marginRight: '10px' }}
            />
          </Form.Group>
          <Button variant="primary" type="submit" style={{ marginLeft: '10px' }}>
            Search
          </Button>
        </Form>
      </Container>

      {error && <p>{error}</p>}
      {results.length > 0 && (
        <div>
          <CityList
            currentResults={currentResults}
            handleCityClick={handleCityClick}
          />
          <Pagination>
            <Pagination.Prev disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} />
            {[...Array(totalPages).keys()].map(page => (
              <Pagination.Item key={page + 1} active={page + 1 === currentPage} onClick={() => setCurrentPage(page + 1)}>
                {page + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} />
          </Pagination>
        </div>
      )}
      <CityDetail show={showDetail} handleClose={() => setShowDetail(false)} cityId={selectedCityId} />
    </Layout>
  );
}
