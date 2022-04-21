import React from "react";
import { Col, Form, FormControl, InputGroup, Row } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faUser,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import reg from "./../../assets/images/login-register.png";
import NavigationBar from "../NavigationBar/NavigationBar";
import Footer from "../Footer/Footer";

const Register = () => {
  const { allContext } = useAuth();
  const { getPhoto, getName, signUp, getEmail, getPassword, error } =
    allContext;

  return (
    <>
      <NavigationBar></NavigationBar>
      <div className="text-center my-4 container">
        <div className=" mx-auto">
          <div className="row">
            <div className="col-md-6">
              <div>
                <img
                  width="400px"
                  className="img-fluid pt-5"
                  src={reg}
                  alt=""
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="shadow-lg p-5">
                <h2 className="text-blue">Register</h2>
                <h6 className=" mt-2 text-blue">
                  Register with Email & Password
                </h6>
                <p className="text-danger text-center">{error}</p>
                <Form onSubmit={signUp}>
                  <Row>
                    <Col className="text-start">
                      <Form.Label htmlFor="name" visuallyHidden>
                        Your Name
                      </Form.Label>
                      <InputGroup className="mb-2">
                        <InputGroup.Text>
                          <FontAwesomeIcon
                            className="text-blue"
                            icon={faUser}
                          ></FontAwesomeIcon>
                        </InputGroup.Text>
                        <FormControl
                          required
                          onBlur={getName}
                          type="text"
                          autoComplete="current-name"
                          id="name"
                          placeholder="Enter your name"
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="text-start">
                      <Form.Label htmlFor="email" visuallyHidden>
                        Your Email Address
                      </Form.Label>
                      <InputGroup className="mb-2">
                        <InputGroup.Text>
                          <FontAwesomeIcon
                            className="text-blue"
                            icon={faEnvelope}
                          ></FontAwesomeIcon>
                        </InputGroup.Text>
                        <FormControl
                          required
                          onBlur={getEmail}
                          type="email"
                          autoComplete="current-email"
                          id="email"
                          placeholder="Enter your email address"
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row className="mt-2">
                    <Col className="text-start">
                      <Form.Label htmlFor="password" visuallyHidden>
                        Your Password
                      </Form.Label>
                      <InputGroup className="mb-2">
                        <InputGroup.Text>
                          <FontAwesomeIcon
                            className="text-blue"
                            icon={faLock}
                          ></FontAwesomeIcon>
                        </InputGroup.Text>
                        <FormControl
                          required
                          onBlur={getPassword}
                          type="password"
                          autoComplete="current-password"
                          id="password"
                          placeholder="Enter your password"
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="text-start">
                      <Form.Label htmlFor="name" visuallyHidden>
                        Your Profile photo URL
                      </Form.Label>
                      <InputGroup className="mb-2">
                        <InputGroup.Text>
                          <FontAwesomeIcon
                            className="text-blue"
                            icon={faLink}
                          ></FontAwesomeIcon>
                        </InputGroup.Text>
                        <FormControl
                          required
                          onBlur={getPhoto}
                          type="text"
                          autoComplete="current-text"
                          id="photo"
                          placeholder="Enter valid photo url"
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                  <button
                    type="submit"
                    className="btn btn-primary bg-blue mt-2 w-100"
                  >
                    Register
                  </button>
                </Form>
                <h6 className="mt-2">
                  <NavLink
                    className="text-decoration-none text-blue"
                    to="/login"
                  >
                    Already have an account? Please login!
                  </NavLink>
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Register;
