import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Pagination, Button, Container, Form, Row } from 'react-bootstrap';
import Layout from './Layout';
import CityList from './CityList';
import CityDetail from './CityDetail';
import { UnitContext } from '@/context/UnitContext';
import { ResultsContext } from '@/context/ResultsContext';
import { ResultErrorContext } from '@/context/ResultErrorContext';
import styles from '@/styles/MainPage.module.css'

export default function MainPage() {
  const [city, setCity] = useState('');
  const {error, setError} = useContext(ResultErrorContext);
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
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const currentResults = results.slice((currentPage - 1) * 3, currentPage * 3);

  return (
    <Layout>
      <Container fluid className="d-flex align-items-center justify-content-center" style={{ height: '15vh', marginTop: '50px' }}>
        <Form onSubmit={handleSearch} className="p-2 py-3 border rounded d-flex justify-content-center" style={{ width: '50%' }}>
          <Form.Group controlId="citySearch" className="d-flex flex-column align-items-center justify-content-center"
 style={{ width: '80%' }}>
            <Row style={{ width: '100%' }}>
            <Form.Control
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name or city, country code"
              style={{ marginRight: '10px' }}
            />
            </Row>
            {setError(results.length <= 0 ? `City not found for ${city}` : '')}
            {error && <Row style={{marginTop: '10px'}}><div className={styles.divAsH6}>{error}</div></Row>}
          </Form.Group>
          <Button variant="primary" type="submit" style={{ marginLeft: '10px' }}>
            Search
          </Button>
          
        </Form>
        
      </Container>


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
