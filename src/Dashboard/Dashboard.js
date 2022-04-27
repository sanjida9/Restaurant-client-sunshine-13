import React from "react";
import { Nav } from "react-bootstrap";
import { Route, Switch, useRouteMatch } from "react-router";
import { NavLink } from "react-router-dom";
import AdminRoute from "../components/AdminRoute/AdminRoute";
import MakeAdmin from "../components/MakeAdmin/MakeAdmin";
import ManageAllOrders from "../components/ManageAllOrders/ManageAllOrders";
import ManageProducts from "../components/ManageProducts/ManageProducts";
import MyOrders from "../components/MyOrders/MyOrders";
import NewFood from "../components/NewFood/NewFood";
import Pay from "../components/Pay/Pay";
import Review from "../components/Review/Review";
import Home from "../components/Home/Home";
import UserRoute from "../components/UserRoute/UserRoute";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  let { path, url } = useRouteMatch();
  const { allContext } = useAuth();
  const { isAdmin, logOut, setIsAdmin, user, isLoading } = allContext;

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
      <div class="min-h-screen flex">
        <div class="py-12 px-10  bg-primary">
          <div class="flex space-2 items-center pb-4">
            <div class="ml-3">
              <NavLink aria-current="page" class="active" to="/">
                {isAdmin && "Admin access"}
                <h1 class="text-3xl font-bold text-white">FoodPlanet</h1>
              </NavLink>
            </div>
          </div>
          <hr />
          <div>
            <ul className="">
              <li>
                <NavLink
                  to={`${url}`}
                  className="my-1 flex items-center text-sm font-semibold hover:bg-gray-100 hover:text-white hover:bg-secondary-dark transition duration-200 p-3 rounded-md"
                  activeClassName="bg-secondary-dark text-white"
                >
                  Dashboard
                </NavLink>
              </li>
              {!isAdmin && (
                <div>
                  <li>
                    <NavLink
                      to={`/home`}
                      className="my-1 flex items-center text-sm font-semibold text-white hover:bg-gray-100 hover:text-white hover:bg-secondary-dark transition duration-200 p-3 rounded-md"
                      activeClassName="bg-secondary-dark text-white"
                    >
                      Home
                    </NavLink>
                  </li>
                  {/* <li>
                    <NavLink
                      to={`${url}/pay`}
                      className="my-1 flex items-center text-sm font-semibold text-white hover:bg-gray-100 hover:text-white hover:bg-secondary-dark transition duration-200 p-3 rounded-md"
                      activeClassName="bg-secondary-dark text-white"
                    >
                      Pay
                    </NavLink>
                  </li> */}
                  <li>
                    <NavLink
                      to={`${url}/myOrders`}
                      className="my-1 flex items-center text-sm font-semibold text-white hover:bg-gray-100 hover:text-white hover:bg-secondary-dark transition duration-200 p-3 rounded-md"
                      activeClassName="bg-secondary-dark text-white"
                    >
                      My Orders
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={`${url}/review`}
                      className="my-1 flex items-center text-sm font-semibold text-white hover:bg-gray-100 hover:text-white hover:bg-secondary-dark transition duration-200 p-3 rounded-md"
                      activeClassName="bg-secondary-dark text-white"
                    >
                      Review
                    </NavLink>
                  </li>
                </div>
              )}

              <br />
              <br />
              {isAdmin && (
                <div>
                  <li>
                    <NavLink
                      to={`/home`}
                      className="my-1 flex items-center text-sm font-semibold text-white hover:bg-gray-100 hover:text-white hover:bg-secondary-dark transition duration-200 p-3 rounded-md"
                      activeClassName="bg-secondary-dark text-white"
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={`${url}/makeAdmin`}
                      className="my-1 flex items-center text-sm font-semibold text-white hover:bg-gray-100 hover:text-white hover:bg-secondary-dark transition duration-200 p-3 rounded-md"
                      activeClassName="bg-secondary-dark text-white"
                    >
                      Make Admin
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={`${url}/manageAllOrders`}
                      className="my-1 flex items-center text-sm font-semibold text-white hover:bg-gray-100 hover:text-white hover:bg-secondary-dark transition duration-200 p-3 rounded-md"
                      activeClassName="bg-secondary-dark text-white"
                    >
                      Manage All Orders
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={`${url}/manageProducts`}
                      className="my-1 flex items-center text-sm font-semibold text-white hover:bg-gray-100 hover:text-white hover:bg-secondary-dark transition duration-200 p-3 rounded-md"
                      activeClassName="bg-secondary-dark text-white"
                    >
                      Manage Foods
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={`${url}/newFood`}
                      className="my-1 flex items-center text-sm font-semibold text-white hover:bg-gray-100 hover:text-white hover:bg-secondary-dark transition duration-200 p-3 rounded-md"
                      activeClassName="bg-secondary-dark text-white"
                    >
                      Add a Dishes
                    </NavLink>
                  </li>
                </div>
              )}
            </ul>
          </div>
          <div class="mt-20 ">
            <button
              onClick={logOut}
              class="w-full bg-red-600 my-1 flex items-center text-sm font-semibold text-white hover:bg-red-700 hover:text-white hover:bg-secondary-dark transition duration-200 p-3 rounded-md"
            >
              {" "}
              Logout
            </button>
          </div>
        </div>
        <div class="bg-indigo-50 flex-grow py-12 px-10">
          <Switch>
            <Route exact path={path}>
              <h1 className="display-5 text-center pt-5 mt-2 ">
                Welcome to <br />{" "}
                <b className="text-red fw-bold">{user.displayName}</b>
                <br />
                Dashboard
              </h1>
              <br />
              <div className="text-center">
                <img className="rounded-circle" src={user.photoURL} alt="" />
              </div>
            </Route>
            <UserRoute path={`${path}/home`}>
              <Home></Home>
            </UserRoute>
            <UserRoute path={`${path}/pay/:orderId`}>
              <Pay></Pay>
            </UserRoute>
            <UserRoute path={`${path}/review`}>
              <Review></Review>
            </UserRoute>
            <UserRoute path={`${path}/myOrders`}>
              <MyOrders></MyOrders>
            </UserRoute>

            <AdminRoute path={`${path}/manageAllOrders`}>
              <ManageAllOrders></ManageAllOrders>
            </AdminRoute>
            <AdminRoute path={`${path}/newFood`}>
              <NewFood></NewFood>
            </AdminRoute>
            <AdminRoute path={`${path}/makeAdmin`}>
              <MakeAdmin></MakeAdmin>
            </AdminRoute>
            <AdminRoute path={`${path}/manageProducts`}>
              <ManageProducts></ManageProducts>
            </AdminRoute>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
