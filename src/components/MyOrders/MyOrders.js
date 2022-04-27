import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const [deleteCount, setDeleteCount] = useState(0);
  const [singleUserOrder, setSingleUserOrder] = useState([]);

  const { allContext } = useAuth();
  const { user } = allContext;

  const handleDeleteOrder = (id) => {
    const isDelete = window.confirm("Are you sure?");
    if (isDelete) {
      axios
        .post("https://lit-depths-02063.herokuapp.com/deleteOrder", {
          UserId: id,
        })
        .then((res) => {
          setDeleteCount(deleteCount + 1);
          console.log("Order Deleted");
        });
    }
  };

  useEffect(() => {
    axios
      .post("https://lit-depths-02063.herokuapp.com/singleUserOrders", {
        userEmail: user.email,
      })
      .then((res) => {
        console.log(res.data);
        setSingleUserOrder(res.data);
      });
  }, [user, deleteCount]);

  return (
    <div className="container">
      <div className="table-responsive">
        <table class="table">
          <thead className="text-center">
            <tr>
              <th scope="col"> IMAGE</th>
              <th scope="col">PRODUCT NAME</th>
              <th scope="col">TOTAL COSTS</th>
              <th scope="col">QUANTITY</th>
              <th scope="col">PAYMENT</th>
              <th scope="col">STATUS</th>
              <th scope="col">DELETE</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {singleUserOrder.map((order) => (
              <tr>
                <th>
                  <img
                    height={200}
                    width={210}
                    className=" rounded-circle"
                    src={order.ordered?.img}
                    alt=""
                  />
                </th>
                <th>{order.ordered?.name}</th>
                <th>{order.totalCost}</th>
                <th>{order.shippingInfo.quantity}</th>
                <th>
                  {order?.payment ? (
                    <span className="text-success">Paid</span>
                  ) : (
                    <Link to={`/dashboard/pay/${order?._id}`}>
                      <button className="btn btn-secondary">Pay</button>
                    </Link>
                  )}
                </th>
                <td>{order?.status}</td>
                <td>
                  <button
                    onClick={() => handleDeleteOrder(order?._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
