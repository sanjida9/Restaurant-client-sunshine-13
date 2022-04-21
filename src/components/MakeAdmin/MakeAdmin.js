import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";

const MakeAdmin = () => {
  const {
    register,
    handleSubmit,
    food,
    reset,
    formState: { errors },
  } = useForm();
  const { allContext } = useAuth();
  const { user, isLoading, isAdmin } = allContext;

  const onSubmit = (data) => {
    axios
      .post("https://lit-depths-02063.herokuapp.com/makeAdmin", data)
      .then((res) => {
        alert("admin has been added successfully");
        reset();
      });
  };

  if (isLoading) {
    return (
      <div class="flex justify-center items-center my-40">
        <div
          class="
                animate-spin
                rounded-full
                h-32
                w-32
                border-t-2 border-b-2 border-purple-500
              "
        ></div>
      </div>
    );
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" flex-col justify-center items-center h-full"
      >
        <input
          className="mt-4 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4 w-1/2"
          {...register("email", { required: true })}
          placeholder="Email"
        />
        <br />
        <input
          className=" bg-danger hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-full focus:outline-none focus:shadow-outline cursor-pointer "
          type="submit"
          value="Add as Admin"
        />
      </form>
    </div>
  );
};

export default MakeAdmin;
