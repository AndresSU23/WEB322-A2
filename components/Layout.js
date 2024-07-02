import { Navbar, Nav, NavDropdown, FormGroup, FormControl, Container, Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import { useState, useContext } from 'react';
import Link from 'next/link';
import { RecentlyViewedContext } from '@/context/RecentlyViewedContext';
import { UnitContext } from '@/context/UnitContext';
import { IdSearchErrorContext } from '@/context/IdSearchErrorContext';
import styles from '@/styles/Layout.module.css'

export default function Layout({ children }) {
  const [searchId, setSearchId] = useState('');
  const { recentlyViewed } = useContext(RecentlyViewedContext);
  const { unit, setUnit } = useContext(UnitContext);
  const { idError, setIdError } = useContext(IdSearchErrorContext)

  const updateSearchId = (e) => setSearchId(e.target.value);

  const handleUnitChange = (newUnit) => {
    setUnit(newUnit);
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand as={Link} href="/">Weather App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <FormGroup className="d-flex ml-auto">
            {idError && <div className={styles.divFadeInRight}>{idError}</div>}
            <FormControl
              type="text"
              placeholder="City ID"
              value={searchId}
              onChange={updateSearchId}
            />
            <Link href={`/city/${searchId}`} passHref>
              <Button variant="outline-light" className="ml-2">Search</Button>
            </Link>
          </FormGroup>
          <Nav className="mr-auto">
            <NavDropdown title="Previously Viewed" id="basic-nav-dropdown">
              {recentlyViewed.length > 0 ? (
                recentlyViewed.map((savedCity, index) => (
                  <NavDropdown.Item as={Link} href={`/city/${savedCity.id}`} key={index}>
                    City: {savedCity.id}
                  </NavDropdown.Item>
                ))
              ) : (
                <NavDropdown.Item>...</NavDropdown.Item>
              )}
            </NavDropdown>
          </Nav>
          <Dropdown as={ButtonGroup}>
            <Button variant="secondary">{unit === 'metric' ? 'Metric' : 'Imperial'}</Button>
            <Dropdown.Toggle split variant="secondary" id="dropdown-split-basic" />
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleUnitChange('metric')}>Celsius</Dropdown.Item>
              <Dropdown.Item onClick={() => handleUnitChange('imperial')}>Fahrenheit</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Navbar>
      <div className="content mt-4 pt-2">{children}</div>
    </div>
  );
}
