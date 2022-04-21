import React from "react";
import { useRouteMatch } from "react-router";
import useAuth from "../../hooks/useAuth";
import Footer from "../Footer/Footer";
import NavigationBar from "../NavigationBar/NavigationBar";
import notfound from "./../../assets/images/404.jpg";

const NotFound = () => {
  return (
    <>
    <NavigationBar></NavigationBar>
    <div className="container">
      <div className="text-center">
        <img className="img-fluid p-5 w-75 " src={notfound} alt="" />
      </div>
    </div>
    <Footer></Footer>
    </>
  );
};

export default NotFound;
