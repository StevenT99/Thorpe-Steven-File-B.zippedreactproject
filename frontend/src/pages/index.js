import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import BOMImage from './images/BOM.jpg';
import hunterImage from '../pages/images/hunter2.jpeg';
import '../index.css';

const Home = () => {
  return (
    <div className="bg-image">
      <Container className="h-100 d-flex flex-column justify-content-center text-center">
        <Row>
          <Col>
            <div className="text-background">
              <h1>Welcome to the Book of Mormon Literacy Tool!</h1>
              <p>
                To start memorizing, click the Memorization tab. To see past
                progress, click the journal tab.
              </p>

              <img
                src={hunterImage}
                alt="Hunter"
                className="my-3 image-large"
              />

              <div className="quote-background">
                <p className="quote-text">
                  “When we follow the counsel of our leaders to read and study
                  the scriptures, benefits and blessings of many kinds come to
                  us. This is the most profitable of all study in which we could
                  engage - Howard W Hunter”
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
