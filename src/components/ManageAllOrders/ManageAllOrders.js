import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

const ManageAllOrders = () => {
  const [deleteCount, setDeleteCount] = useState(0);
  const [allOrders, setAllOrders] = useState([]);
  const [statusCount, setStatusCount] = useState(0);

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

  const handleUpdateStatus = (e) => {
    e.preventDefault();
    const status = e.target.value;
    const id = e.target.id;

    axios
      .post("https://lit-depths-02063.herokuapp.com/updateStatus", {
        status: status,
        id: id,
      })
      .then(function (response) {
        setStatusCount(statusCount + 1);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get("https://lit-depths-02063.herokuapp.com/manageAllOrders")
      .then((res) => setAllOrders(res.data));
  }, [deleteCount, statusCount, user]);

  return (
    <div className="container">
      <div className="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">USER EMAIL</th>
              <th scope="col">PRODUCT NAME</th>
              <th scope="col">TOTAL COST</th>
              <th scope="col">CURRENT STATUS</th>
              <th scope="col">UPDATE STATUS</th>
              <th scope="col">DELETE</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.map((order) => (
              <tr>
                <th>{order.userEmail}</th>
                <th>{order.ordered?.name}</th>
                <td>{order.totalCost}</td>
                <td>{order.status}</td>

                <td>
                  <select
                    onChange={(e) => handleUpdateStatus(e)}
                    defaultValue={order?.status}
                    id={order?._id}
                    className={`border-2  form-select block w-full p-2 font-semibold ${
                      order?.status == "Pending"
                        ? "text-warning border-warning"
                        : "text-success border-success"
                    }`}
                  >
                    <option className="text-warning fw-bold" value="Pending">
                      Pending
                    </option>
                    <option value="Approved" className="text-success fw-bold">
                      Approved
                    </option>
                  </select>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteOrder(order._id)}
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

export default ManageAllOrders;
