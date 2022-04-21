import React from "react";
import { Col, Form, FormControl, InputGroup, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import google from "./../../assets/images/google.png";
import github from "./../../assets/images/github.png";
import useAuth from "../../hooks/useAuth";
import login from "./../../assets/images/login-register.png";
import NavigationBar from "../NavigationBar/NavigationBar";
import Footer from "../Footer/Footer";

const Login = () => {
  const { allContext } = useAuth();
  const history = useHistory();

  const location = useLocation();
  const redirect = location?.state?.from || "/home";

  const {
    getEmail,
    getPassword,
    signInWithEmail,
    error,
    setUser,
    handleSignInWithGoogle,
    handleSignInWithGithub,
    setLoading,
  } = allContext;

  return (
    <>
      <NavigationBar></NavigationBar>
      <div className="text-center my-4 container">
        <div className=" mx-auto">
          <div className="row">
            <div className="col-md-6">
              <img
                width="400px"
                className="img-fluid pt-5"
                src={login}
                alt=""
              />
            </div>
            <div className="col-md-6">
              <div className="shadow-lg p-5">
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    signInWithEmail()
                      .then((result) => {
                        setUser(result.user);
                        history.push(redirect);
                      })
                      .finally(() => setLoading(false));
                  }}
                >
                  <h2 className="text-blue">Please Login</h2>
                  <h6 className=" mt-2 text-blue">
                    Login with Email & Password
                  </h6>
                  <p className="text-danger text-center">{error}</p>
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
                          onBlur={getPassword}
                          type="password"
                          autoComplete="current-password"
                          id="password"
                          placeholder="Enter your password"
                        />
                      </InputGroup>
                    </Col>
                  </Row>

                  <button
                    type="submit"
                    className="btn btn-primary bg-blue mt-2 w-100"
                  >
                    Login
                  </button>
                </Form>
                <p className="mt-2">
                  <NavLink
                    className="text-decoration-none text-blue"
                    to="/register"
                  >
                    Need an Account? Please Sign up!
                  </NavLink>
                </p>
                <h6 className="mt-3 text-blue">Or</h6>
                <h5 className="text-blue">Login with</h5>
                <div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleSignInWithGoogle()
                        .then((result) => {
                          setUser(result.user);
                          history.push(redirect);
                        })
                        .finally(() => setLoading(false));
                    }}
                    className="btn "
                  >
                    <img src={google} width="46px" alt="google-icon" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleSignInWithGithub()
                        .then((result) => {
                          setUser(result.user);
                          history.push(redirect);
                        })
                        .finally(() => setLoading(false));
                    }}
                    className="btn"
                  >
                    <img width="55px" src={github} alt="github-icon" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Login;
