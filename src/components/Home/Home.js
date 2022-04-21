import React, { useEffect, useState } from "react";
import Banner from "../Banner/Banner";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import Rating from "react-rating";
import NavigationBar from "../NavigationBar/NavigationBar";
import Footer from "../Footer/Footer";

const Home = () => {
  const [foods, setFoods] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get("https://lit-depths-02063.herokuapp.com/foods")
      .then((res) => setFoods(res.data));

    axios
      .get("https://lit-depths-02063.herokuapp.com/getReviews")
      .then((res) => {
        setReviews(res.data);
      });
  }, []);
  return (
    <div>
      <NavigationBar></NavigationBar>
      <Banner></Banner>

      <div className="container">
        <h1 className="fw-bold fs-1 text-center text-blue mt-3 p-5">
          Our Dishes
        </h1>
        {foods.length > 0 ? (
          <div className="row">
            {foods.slice(0, 6).map((food) => (
              <>
                <div className="col-md-4 my-3">
                  <Card className="border-0 shadow  hover-card">
                    <Card.Img
                      className="mx-auto img-fluid p-2 w-50"
                      variant="top"
                      src={food.img}
                    />
                    <Card.Body>
                      <small className="bg-warning rounded-pill px-2 text-white ">
                        {food.level}
                      </small>
                      <Card.Title className="fw-bold text-blue text-center">
                        {food.name}
                      </Card.Title>
                      <Card.Title className="fw-bold text-red text-center">
                        $ {food.price}
                      </Card.Title>
                      <Card.Text className="text-blue text-center">
                        {food.description.slice(0, 150)}
                      </Card.Text>
                      <div className="text-center">
                        <Rating
                          emptySymbol="fa fa-star-o fa-x"
                          fullSymbol="fa fa-star fa-x"
                          initialRating={food.rating}
                          readonly
                          className="text-warning text-center"
                        />
                      </div>

                      <div className="text-center">
                        <Link to={`/food/${food._id}`}>
                          <Button className=" btn-danger bg-red px-3 btnHover">
                            <i className="fas fa-shopping-cart"></i> Order Now
                          </Button>
                        </Link>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              </>
            ))}
          </div>
        ) : (
          <div className="row my-5">
            <div className="col d-flex align-items-center justify-content-center">
              <div className="spinner-border text-primary " role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div id="award" className=" p-3">
        <div className="">
          <div className="py-3 ">
            <h2 className="text-blue mt-4  fw-bold text-center">
              Award Winning and Top Rated Seller
            </h2>
            <p className="text-blue  text-center mb-4">
              Call our agents for buy.
            </p>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-3 text-center ">
              <div className="iconCardHover py-5 text-white bg-blue  p-2">
                <h1>
                  <i className="fas fa-user-nurse"></i>
                </h1>
                <h1>8000+ Our Local Guides</h1>
              </div>
            </div>
            <div className="col-md-3 text-center">
              <div className="iconCardHover py-5 text-white bg-blue  p-2">
                <h1>
                  <i className="fas fa-user-shield"></i>
                </h1>
                <h1>100% Trusted Seller</h1>
              </div>
            </div>
            <div className="col-md-3   text-center ">
              <div className="iconCardHover py-5 text-white bg-blue  p-2">
                <h1>
                  <i className="fas fa-user-clock"></i>
                </h1>
                <h1>28+ Years Experience</h1>
              </div>
            </div>
            <div className="col-md-3  text-center ">
              <div className="iconCardHover py-5 text-white bg-blue  p-2">
                <h1>
                  <i className="far fa-laugh-beam"></i>
                </h1>
                <h1> Happy Customers</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="review-block">
          <h1 className="fw-bold fs-1 text-center text-blue mt-3">
            <span>Clients</span> <span className="text-red">Feedback</span>
          </h1>
          {reviews.map((review) => (
            <div className="row">
              <div className="col-sm-2">
                <img
                  width={100}
                  src={review.img}
                  className="rounded-circle p-1"
                  alt=""
                />
              </div>
              <div className="col-sm-9 p-4">
                <Rating
                  className="text-warning"
                  readonly
                  initialRating={review.rating}
                  emptySymbol={<i className="far fa-star text-yellow-500"></i>}
                  fullSymbol={<i className="fa fa-star text-yellow-500"></i>}
                />
                <div className="fw-bold text-danger">{review.fullName}</div>
                <div className="review-block-description text-success">
                  {review.review}
                </div>
              </div>
              <hr />
            </div>
          ))}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Home;
