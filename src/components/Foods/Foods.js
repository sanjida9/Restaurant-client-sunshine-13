import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import NavigationBar from "../NavigationBar/NavigationBar";
import Footer from "../Footer/Footer";
import Rating from "react-rating";

const Foods = () => {
  const [filterResults, setFilterResults] = useState([]);

  const handleUpdateStatus = (e) => {
    const selected = e.target.value;
    axios
      .get(`https://lit-depths-02063.herokuapp.com/foods?filter=${selected}`)
      .then((res) => {
        setFilterResults(res.data);
      });
  };

  useEffect(() => {
    axios
      .get("https://lit-depths-02063.herokuapp.com/foods")
      .then((res) => setFilterResults(res.data));
  }, []);
  return (
    <>
      <NavigationBar></NavigationBar>
      <div className="container">
        {/* < select onChange={e => handleUpdateStatus(e)} id={filterResults?._id}

                    className={`border-2  form-select block w-full p-2 font-semibold `} >
                    <option className="text-warning fw-bold" value="Pending">Pending</option>
                    <option value="Approved" className="text-success fw-bold">Approved</option>
                </select > */}

        <form onChange={(e) => handleUpdateStatus(e)}>
          {/* <input type="radio" name="filter" id="all" value="All"></input>
          <label for="all"> All</label>
          <br />
          <input
            type="radio"
            name="filter"
            id="less500"
            value="less500"
          ></input>
          <label for="less500"> Less than 500</label>
          <br />
          <input
            type="radio"
            name="filter"
            id="more500"
            value="more500"
          ></input>
          <label for="more500"> More than 500</label> */}
          <div className="input-group w-75 mx-auto mt-5">
            <select className="form-select" id="inputGroupSelect01">
              <option selected name="filter" id="ce" value="ce">
                Choose Expense
              </option>
              <option name="filter" id="all" value="All">
                All
              </option>
              <option name="filter" id="low" value="low">
                Low
              </option>
              <option name="filter" id="high" value="high">
                High
              </option>
              <option name="filter" id="veryhigh" value="veryhigh">
                Very High
              </option>
            </select>
          </div>
          <br />
        </form>
        {/* end */}
        <h1 className="fw-bold fs-1 text-center text-blue mt-3">Dishes</h1>
        {filterResults.length > 0 ? (
          <div className="row">
            {filterResults.map((food) => (
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
              <div class="spinner-border text-primary " role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer></Footer>
    </>
  );
};
export default Foods;
