import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Rating from "react-rating";
import useAuth from "../../hooks/useAuth";

const Review = () => {
  const [rating, setRating] = useState(0);
  const { allContext } = useAuth();
  const { user } = allContext;

  const {
    register,
    handleSubmit,
    food,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const handleRating = (e) => {
    setRating(e.target.value);
    console.log(e.target.value);
    e.preventDefault();
  };

  const onSubmit = (data) => {
    data.rating = parseFloat(rating);
    data.fullName = user.displayName;
    data.img = user.photoURL || "https://i.ibb.co/SNMK8mX/index.png";
    data.email = user.email;

    axios
      .post("https://lit-depths-02063.herokuapp.com/submitReview", data)
      .then((res) => alert("Review submitted successfully"));
    reset();
  };
  return (
    <div>
      <div className="px-12 py-5">
        <h2 className="text-red fw-bold fs-1">
          Your opinion <span className="text-blue">matters to us!</span>{" "}
        </h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <span className="">How was quality of our service?</span>
        <div id="rating-contain">
          <span className="">
            <label htmlFor="rating">
              <Rating
                readonly
                initialRating={rating}
                emptySymbol={<i className="far fa-star text-yellow-500"></i>}
                fullSymbol={<i className="fa fa-star text-yellow-500"></i>}
              />
            </label>
            <input
              id="rating"
              defaultValue="0"
              onChange={handleRating}
              type="range"
              step=".1"
              max="5"
            />
          </span>
        </div>
        <div>
          <textarea
            {...register("review", { required: true })}
            placeholder="Feel free to share your feedback"
            rows="3"
            className="form-control"
          ></textarea>
          <div className="py-4">
            <button type="submit" className="btn btn-danger bg-red w-full">
              Submit Review
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Review;
