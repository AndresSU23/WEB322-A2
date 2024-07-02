import { Row, Col } from "react-bootstrap";
import CityCard from "./CityCard";

const CityList = ({ currentResults, handleCityClick }) => {
  return (
    <Row className="justify-content-center">
      <Col xs={12} className="d-flex justify-content-center">
        <div className="d-flex flex-wrap justify-content-center">
          {currentResults.map((result) => (
            <div key={result.id} className="mb-3 mx-2">
              <CityCard result={result} handleCityClick={handleCityClick} />
            </div>
          ))}
        </div>
      </Col>
    </Row>
  );
};

export default CityList;
