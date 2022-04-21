import React from "react";

import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import logo from "../../assets/images/imagesss.png";

const NavigationBar = () => {
  const { allContext } = useAuth();
  const { user, logOut } = allContext;
  const { displayName } = user;
  console.log(user);

  const activeStyle = {
    fontWeight: "bold",
    color: "orange",
  };

  return (
    <div className="sticky-top bg-white">
      <Navbar className=" p-2" expand="lg">
        <Container>
          <Navbar.Brand
            sticky="top"
            as={NavLink}
            className="text-white"
            to="/home"
          >
            <h2>
              <img className="img-fluid" src={logo} alt="" />
              <span className="text-red fw-bold">Food</span>
              <span className="text-blue fw-bold">Planet</span>
            </h2>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto d-md-flex align-items-center ">
              <NavLink
                className="mx-1 d-block text-red"
                to="/home"
                activeStyle={activeStyle}
              >
                Home
              </NavLink>

              <NavLink
                className="mx-1 d-block text-red"
                to="/foods"
                activeStyle={activeStyle}
              >
                Dishes
              </NavLink>
              <NavLink
                className="mx-1 d-block text-red"
                to="/about"
                activeStyle={activeStyle}
              >
                About Us
              </NavLink>

              {!displayName ? (
                <div>
                  <NavLink
                    className="mx-3 text-red"
                    to="/register"
                    activeStyle={activeStyle}
                  >
                    Register
                  </NavLink>
                  <NavLink
                    className="mx-3 text-red"
                    to="/login"
                    activeStyle={activeStyle}
                  >
                    Login
                  </NavLink>
                </div>
              ) : (
                <div className="d-md-flex align-items-center">
                  <NavLink
                    className="mx-3 d-block text-red"
                    to="/dashboard"
                    activeStyle={activeStyle}
                  >
                    Dashboard
                  </NavLink>
                  <h6 className="fw-bold me-2 mt-2 text-red">{displayName}</h6>

                  <button onClick={logOut} className="btn btn-danger">
                    <i class="fa-solid fa-right-from-bracket"></i> Sign Out
                  </button>

                  {/* <NavDropdown
                    title={
                      <img
                        style={{ width: "45px", borderRadius: "50%" }}
                        src={photoURL || ""}
                        alt=""
                      />
                    }
                    id="basic-nav-dropdown"
                  >
                    <div className="text-center" id="profileDrop">
                      <h6>{displayName}</h6>
                      <p className="">{email}</p>
                      <button onClick={logOut} className="btn btn-success">
                        Sign Out
                      </button>
                    </div>
                  </NavDropdown> */}
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
