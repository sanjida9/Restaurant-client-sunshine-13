import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./Footer.css";
import logo from "./../../assets/images/imagesss.png";
import { NavLink } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="text-white">
      <div className="py-2 bg-blue">
        <Container>
          <Row>
            <Col md={4}></Col>
            <Col md={3}>
              <div className="my-2">
                <h2>
                  <img height="70px" width="80px" src={logo} alt="" />
                  FoodPlanet
                </h2>
              </div>
              {/* <ul className="list-unstyled">
                <li>
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                  <span className="ms-2 fs-5">Green View,Chittagong.</span>
                </li>
                <li>
                  <FontAwesomeIcon icon={faEnvelope} />
                  <span className="ms-2 fs-5">pearls@gmail.com</span>
                </li>
                <li>
                  <FontAwesomeIcon icon={faPhone} />
                  <span className="ms-2 fs-5">Helpline: +889 225 778</span>
                </li>
              </ul> */}
            </Col>

            {/* <Col md={4}>
              <div>
                <img className="img-fluid" src={payment} alt="" />
              </div>
            </Col> */}
          </Row>
        </Container>
      </div>
      <hr className="m-0 p-0" />
      <h6 className="text-center m-0 py-3 copyright bg-blue">
        Copyright © All Reserved by FoodPlanet - Food Service Community in 2022
      </h6>
    </div>
  );
};

export default Footer;
