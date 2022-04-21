import React from "react";
import { Container } from "react-bootstrap";
import a from "../../assets/images/del.png";
import b from "../../assets/images/del2.jpg";

import Footer from "../Footer/Footer";
import NavigationBar from "../NavigationBar/NavigationBar";

const About = () => {
  return (
    <div>
      <NavigationBar></NavigationBar>
      <Container>
        <h1 className="fw-bold fs-1 text-center text-blue mt-3 p-2">
          <span className="text-blue">
            A Moments of <br /> Delivered
          </span>{" "}
          <span className="text-red">
            On Right <br /> Time & Place
          </span>
        </h1>
        <div className="text-center my-3 p-3">
          <img className="p-3" src={a} alt="" />
        </div>
        <h6 className="text-center">
          Food Khan is a restaurant, bar and coffee roastery located on a busy
          corner site in Farringdon's Exmouth Market. With glazed frontage on
          two sides of the building, overlooking the market and a bustling
          London inteon.Food Khan is a restaurant, bar and coffee roastery
          located on a busy corner site in Farringdon's Exmouth Market. With
          glazed frontage on two sides of the building, overlooking the market
          and a bustling London inteon.{" "}
        </h6>
        <div className="text-center my-3 p-3">
          <img className="p-3" src={b} alt="" />
        </div>
      </Container>
      <Footer></Footer>
    </div>
  );
};

export default About;
