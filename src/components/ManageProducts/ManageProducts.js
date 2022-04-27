import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const ManageProducts = () => {
  const { allContext } = useAuth();
  const { user } = allContext;
  const [products, setProducts] = useState([]);
  const [deleteCount, setDeleteCount] = useState(0);

  const handleDeleteBooking = (id) => {
    const isDelete = window.confirm("are you sure?");

    if (isDelete) {
      axios
        .post("https://lit-depths-02063.herokuapp.com/deleteProducts", {
          deleteReqId: id,
        })
        .then(function (response) {
          // setDeleteCount(response.data.deletedCount)
          setDeleteCount(deleteCount + response.data.deletedCount);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    axios
      .get("https://lit-depths-02063.herokuapp.com/getProducts")
      .then(function (response) {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [user, deleteCount]);
  return (
    <div>
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-6">
          Manage <span className="text-primary">Products</span>
        </h2>
        <div className="">
          <div className="">
            <div className="py-2 sm:px-6 lg:px-8">
              <div className="shadow  sm:rounded-lg">
                <table className="table" style={{ width: "100%" }}>
                  <thead className="">
                    <tr>
                      <th scope="col">Product</th>
                      <th scope="col">Name</th>
                      <th scope="col">Price</th>
                      <th scope="col">Rating</th>
                      <th scope="col">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.length > 0 ? (
                      products.map((product) => (
                        <tr key={product._id}>
                          <td>
                            <div className="flex items-center">
                              <div className="text-sm font-medium text-gray-900">
                                <img
                                  height={170}
                                  width={170}
                                  src={product.img}
                                  alt=""
                                />
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="flex items-center">
                              <div className="text-sm font-medium text-gray-900">
                                {product.name}
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="text-sm text-gray-900">
                              ${product.price}
                            </div>
                          </td>
                          <td>
                            <div className="text-sm text-gray-900">
                              {product.rating}
                            </div>
                          </td>
                          <td>
                            <button
                              onClick={() => {
                                handleDeleteBooking(product._id);
                              }}
                              className="text-white bg-danger p-2 rounded"
                            >
                              <i className="fas fa-trash-alt"></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr className="flex justify-center items-center p-6">
                        <td colSpan="3" className="bg-red-200">
                          No Orders Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProducts;
