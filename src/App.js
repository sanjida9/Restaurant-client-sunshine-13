import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";

import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import NotFound from "./components/NotFound/NotFound";

import AuthProvider from "./context/AuthProvider";
import Register from "./components/Register/Register";
import PlaceOrder from "./components/PlaceOrder/PlaceOrder";
import NewFood from "./components/NewFood/NewFood";
import MyOrders from "./components/MyOrders/MyOrders";
import ManageAllOrders from "./components/ManageAllOrders/ManageAllOrders";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

import Pay from "./components/Pay/Pay";
import Review from "./components/Review/Review";
import Dashboard from "./Dashboard/Dashboard";
import Filter from "./components/Filter/Filter";
import Foods from "./components/Foods/Foods";
import About from "./components/About/About";

function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route path="/home">
              <Home></Home>
            </Route>
            <Route path="/foods">
              <Foods></Foods>
            </Route>
            <Route path="/about">
              <About></About>
            </Route>
            <Route path="/filter">
              <Filter></Filter>
            </Route>

            <Route path="/login">
              <Login></Login>
            </Route>
            <Route path="/register">
              <Register></Register>
            </Route>
            <PrivateRoute path="/food/:id">
              <PlaceOrder></PlaceOrder>
            </PrivateRoute>
            <PrivateRoute path="/pay">
              <Pay></Pay>
            </PrivateRoute>
            <PrivateRoute path="/review">
              <Review></Review>
            </PrivateRoute>
            <PrivateRoute path="/newFood">
              <NewFood></NewFood>
            </PrivateRoute>
            <PrivateRoute path="/myOrders">
              <MyOrders></MyOrders>
            </PrivateRoute>
            <PrivateRoute path="/dashboard">
              <Dashboard></Dashboard>
            </PrivateRoute>
            <PrivateRoute path="/manageAllOrders">
              <ManageAllOrders></ManageAllOrders>
            </PrivateRoute>

            <Route path="*">
              <NotFound></NotFound>
            </Route>
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
