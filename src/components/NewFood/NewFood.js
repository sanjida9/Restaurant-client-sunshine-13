import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const NewFood = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    axios
      .post("https://lit-depths-02063.herokuapp.com/newFood", data)
      .then((res) => {
        alert("New food has been added!");
        reset();
      });
  };

  return (
    <div className="container mx-auto p-4 bg-gray-200 p-4 my-4">
      <h2 className="text-center text-3xl font-bold mb-6">
        Add A New <span className="text-blue">DISHES</span>
      </h2>

      <form
        id="newfood"
        className="my-5 p-4 text-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          className="form-control"
          {...register("name", { required: true })}
          placeholder="Name"
        />
        {errors.name && <span>This field is required</span>}
        <br />
        <br />
        <input
          className="form-control"
          {...register("price", { required: true })}
          placeholder="Price"
        />
        {errors.price && <span>This field is required</span>}
        <br />
        <br />
        <input
          className="form-control"
          {...register("rating", { required: true })}
          placeholder="Rating"
        />
        {errors.rating && <span>This field is required</span>}
        <br />
        <br />
        <input
          className="form-control"
          {...register("img", { required: true })}
          placeholder="Image URL"
        />
        {errors.img && <span>This field is required</span>}
        <br />
        <br />
        <textarea
          className="form-control"
          {...register("description", { required: true })}
          placeholder="Description"
        />
        {errors.description && <span>This field is required</span>}
        <br />
        <br />
        <select
          {...register("level", { required: true })}
          className="form-select"
          id="inputGroupSelect01"
        >
          <option name="filter" id="hot" value="HOT">
            HOT
          </option>
          <option name="filter" id="sale" value="SALE">
            SALE
          </option>
          <option name="filter" id="new" value="NEW">
            NEW
          </option>
        </select>
        <br />
        <br />
        <input
          className="w-full btn-primary bg-blue px-5 py-2 rounded border-0"
          type="submit"
          value="Add New Dish"
        />
      </form>
    </div>
  );
};

export default NewFood;
