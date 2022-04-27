import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

const CheckoutForm = ({ price, _id, totalCost }) => {
  //   const { price } = price;
  const stripe = useStripe();
  const elements = useElements();
  const [process, setProcess] = useState(false);
  const { allContext } = useAuth();
  const { user } = allContext;

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const name = user.fullName;
  const email = user.email;

  useEffect(() => {
    fetch("https://lit-depths-02063.herokuapp.com/create-payment-intent", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [price]);

  //   useEffect(() => {
  //     axios
  //       .post("http://localhost:5000/create-payment-intent")
  //       .then((res) => console.log(res.data));
  //   }, [price]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    setProcess(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setError(error.message);
      setSuccess("");
    } else {
      setError("");
      console.log(paymentMethod);
    }

    //payment intent

    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: name,
            email: email,
          },
        },
      });
    if (intentError) {
      setError(intentError.message);
      setSuccess("");
    } else {
      setError("");
      setSuccess("Your Payment Processed Successfully.");
      console.log(paymentIntent);
      setProcess(false);
      //save to database
      const payment = {
        amount: paymentIntent.amount,
        created: paymentIntent.created,
        last4: paymentMethod.card.last4,
        transaction: paymentIntent.client_secret.slice("_secret")[0],
      };
      const url = `https://lit-depths-02063.herokuapp.com/manageAllOrders/${_id}`;
      fetch(url, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        {process ? (
          <div class="spinner-border text-primary " role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div className="py-4">
            <button
              className="btn btn-danger bg-red w-full"
              type="submit "
              disabled={!stripe || success}
            >
              Pay ${totalCost}
            </button>
          </div>
        )}
      </form>
      {error && <p className="text-red">{error}</p>}
      {success && <p className="text-success">{success}</p>}
    </div>
  );
};

export default CheckoutForm;
