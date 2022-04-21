import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import NavigationBar from "../NavigationBar/NavigationBar";
import Footer from "../Footer/Footer";

const Filter = () => {
  const [filterResults, setFilterResults] = useState([]);

  const handleUpdateStatus = (e) => {
    const selected = e.target.value;
    axios
      .get(
        `https://calm-brushlands-19304.herokuapp.com/earrings?filter=${selected}`
      )
      .then((res) => {
        setFilterResults(res.data);
      });
  };

  useEffect(() => {
    axios
      .get("https://calm-brushlands-19304.herokuapp.com/earrings")
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
              <option selected name="filter" id="all" value="All">
                All
              </option>
              <option name="filter" id="less500" value="less500">
                Less than 500
              </option>
              <option name="filter" id="more500" value="more500">
                More than 500
              </option>
            </select>
          </div>
          <br />
        </form>
        {/* end */}
        <h1 className="fw-bold text-center text-blue mt-3 p-3">Watches</h1>
        {filterResults.length > 0 ? (
          <div className="row">
            {filterResults.map((watch) => (
              <>
                <div className="col-md-4 my-3">
                  <Card className="border-0 shadow hover-card">
                    <Card.Img
                      className="img-fluid p-2 "
                      variant="top"
                      src={watch.img}
                    />
                    <Card.Body>
                      <Card.Title className="fw-bold text-blue text-center">
                        {watch.name}
                      </Card.Title>
                      <Card.Text className="text-blue text-center">
                        {watch.description.slice(0, 140)}...
                      </Card.Text>
                      <Card.Title className="fw-bold text-blue text-center">
                        ${watch.price}
                      </Card.Title>
                      <div className="text-center">
                        <Link to={`/watch/${watch._id}`}>
                          <Button className="btn-success bg-blue px-5 btnHover">
                            Buy Now
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

export default Filter;
