import React from "react";
import "./style.css";
import { Col, Container, Row } from "react-bootstrap";
import footerImage from "../../Images/logo-pfa.png"; 

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col>
            {/* Image at the top of the footer */}
            <img src={footerImage} alt="Footer" className="footer-image" style={{ width: '100px', height: '10' }} />
          </Col>
        </Row>
        <Row className="footer-row">
          <Col md={3} sm={5} className="box">
            <div className="logo">
              <ion-icon name="bag"></ion-icon>
              <h1>Bi3Smart</h1>
            </div>
            <p>
              « Bi3Smart » est une application e-commerce qui intègre un
              chatbot basé sur l'intelligence artificielle (IA) pour fournir
              des recommandations personnalisées aux utilisateurs
            </p>
          </Col>
          <Col md={3} sm={5} className="box">
            <h2>About Us</h2>
            <ul>
              <li>Careers</li>
              <li>Our Stores</li>
              <li>Our Cares</li>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
            </ul>
          </Col>
          <Col md={3} sm={5} className="box">
            <h2>Customer Care</h2>
            <ul>
              <li>Help Center </li>
              <li>How to Buy </li>
              <li>Track Your Order </li>
              <li>Corporate & Bulk Purchasing </li>
              <li>Returns & Refunds </li>
            </ul>
          </Col>
          <Col md={3} sm={5} className="box">
            <h2>Contact Us</h2>
            <ul>
              <li>Ouarzazate, N10012, MAROC </li>
              <li>Email: BI3SMART.EMSI@gmail.com</li>
              <li>Phone: +212 67 23 45 6 780</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
