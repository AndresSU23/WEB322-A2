import React, { useContext, useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import Image from 'next/image';
import { UnitContext } from '@/context/UnitContext';
import { formatTemperature } from '../utils/convertor';
import styles from '../styles/CityCard.module.css'; // Adjust the path as per your file structure
import "../node_modules/flag-icons/css/flag-icons.min.css";

const CityCard = ({ result, handleCityClick }) => {
    const { unit } = useContext(UnitContext); // 'metric' for Celsius, 'imperial' for Fahrenheit
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <Card className={`${styles['fade-in-right']} ${isVisible ? styles['fade-in-right-active'] : ''}`} style={{ width: '18rem', margin: '10px' }} onClick={() => handleCityClick(result.id)}>
            <Card.Body>
                <Card.Title>
                    {result.name}
                    <Image
                        src={`/icons/${result.weather[0].icon}.webp`}
                        alt={result.weather[0].description}
                        width={50}
                        height={50}
                    />
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    {result.sys.country}
                    <span className={`fi fi-${result.sys.country.toLowerCase()}`} style={{ marginLeft: '10px' }}></span>
                </Card.Subtitle>
                <Card.Text>
                    Weather: {result.weather[0].description}
                </Card.Text>
                <Card.Text>
                    Temperature: {formatTemperature(result.main.temp, unit)}
                </Card.Text>
                <Button variant="primary">Details</Button>
            </Card.Body>
        </Card>
    );
};

export default CityCard;
