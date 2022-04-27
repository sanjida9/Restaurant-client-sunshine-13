import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51KFLItIW52HJ64cIXuPzn0lMYyver1uVYg7a3wPnShzb5cLZKMplgrt6j2wHfaxvT7k70JE2U1ganljhBtPZECm900vVUJ6V6S"
);

const Pay = () => {
  const { orderId } = useParams();
  const [orders, setOrders] = useState({});

  useEffect(() => {
    axios
      .get(`https://lit-depths-02063.herokuapp.com/manageAllOrders/${orderId}`)
      .then((res) => setOrders(res.data));
  }, [orderId]);

  return (
    <div>
      <h1 className=" fw-bold fs-1 text-blue py-5 text-center">Payment</h1>
      {/* <h1>Payment for {orderId}</h1> */}

      <h1 className="text-center">
        {" "}
        <span className="fw-bold text-red fs-3 text-center">
          Name : {orders?.shippingInfo?.fullName}{" "}
        </span>{" "}
        <br />
        <span className="fw-bold text-blue fs-4">
          Food : {orders?.ordered?.name}
          <br />
          Quantity : {orders?.shippingInfo?.quantity}
        </span>
      </h1>
      <h1 className="py-3 fw-bold fs-3 text-red text-center">
        Pay $ {orders?.totalCost}
      </h1>
      {orders?.ordered?.price && (
        <Elements stripe={stripePromise}>
          <CheckoutForm
            price={orders?.ordered?.price}
            _id={orders?._id}
            totalCost={orders?.totalCost}
          />
        </Elements>
      )}
    </div>
  );
};

export default Pay;
