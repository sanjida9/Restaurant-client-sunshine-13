import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";

import DatePicker from "react-datepicker";
import useAuth from "../../hooks/useAuth";

import "react-datepicker/dist/react-datepicker.css";
import NavigationBar from "../NavigationBar/NavigationBar";
import Footer from "../Footer/Footer";
import Rating from "react-rating";
import { Container } from "react-bootstrap";

const PlaceOrder = () => {
  const { allContext } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();
  const [singleFood, setSingleFood] = useState({});
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  const { user } = allContext;

  useEffect(() => {
    axios
      .get(`https://lit-depths-02063.herokuapp.com/food/${id}`)
      .then((res) => setSingleFood(res.data));
  }, []);

  const onSubmit = (data) => {
    const order = {};

    order.shippingInfo = data;
    const cost = singleFood.price * quantity;
    order.totalCost = cost;
    order.ordered = singleFood;
    order.status = "Pending";
    order.userEmail = user.email;
    console.log(order);

    const isOrder = window.confirm("Are you sure want to place order?");
    if (isOrder) {
      axios
        .post(`https://lit-depths-02063.herokuapp.com/placeOrder`, order)
        .then((res) => {
          alert("Order has been placed successfully");
          reset();

          // <div className="alert alert-primary">Order has been placed</div>;
        });
    }
  };

  const handleQuantity = (e) => {
    setQuantity(e.target.value);
  };

  return (
    <>
      <NavigationBar></NavigationBar>
      <Container>
        <div className="row my-5">
          <div className="card col-md-6">
            <Rating
              emptySymbol="fa fa-star-o fa-2x"
              fullSymbol="fa fa-star fa-2x"
              initialRating={singleFood.review}
              readonly
              className="text-warning fs-5"
            />
            <img src={singleFood.img} className="card-img-top p-3" alt="..." />
            <div className="card-body">
              <h5 className="card-title fw-bold text-blue">
                {singleFood.name}
              </h5>
              <h5 className="card-title fw-bold text-blue">
                Price : ${singleFood.price}
              </h5>
              <h6 className="card-text text-blue">{singleFood.description}</h6>
            </div>
          </div>

          <form
            className="col-md-6 mx-auto mt-5 pt-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              className="form-control"
              {...register("fullName", { required: true })}
              placeholder="Full Name"
              defaultValue={user.displayName}
            />
            {errors.fullName && <span>This field is required</span>}
            <br />
            <br />
            <input
              className="form-control"
              {...register("email", { required: true })}
              placeholder="Email"
              defaultValue={user.email}
            />
            {errors.email && <span>This field is required</span>}
            <br />
            <br />
            <input
              className="form-control"
              {...register("address", { required: true })}
              placeholder="Address"
            />
            {errors.address && <span>This field is required</span>}
            <br />
            <br />
            <input
              defaultValue="1"
              min="1"
              onChangeCapture={handleQuantity}
              type="number"
              className="form-control"
              {...register("quantity", { required: true })}
              placeholder="Quantity"
            />
            {errors.quantity && <span>This field is required</span>}
            <br />
            <br />

            <Controller
              control={control}
              name="startDate"
              rules={{ required: true }}
              render={({ field }) => (
                <DatePicker
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholderText="Select date (MM/DD/YYYY)"
                  onChange={(date) => field.onChange(date)}
                  selected={field.value}
                />
              )}
            />

            <br />
            <br />
            <input
              type="submit"
              value="Place Your Order"
              className="btn btn-primary bg-blue border-0 py-2 w-full"
            />
          </form>
        </div>
      </Container>
      <Footer></Footer>
    </>
  );
};

export default PlaceOrder;
