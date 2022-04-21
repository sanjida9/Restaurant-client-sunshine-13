import React from "react";
import { Spinner } from "react-bootstrap";
import { Redirect, Route } from "react-router";
import useAuth from "../../hooks/useAuth";

const PrivateRoute = ({ children, ...rest }) => {
  const { allContext } = useAuth();
  const { user, loading } = allContext;
  if (loading) {
    return (
      <div className="py-5 my-5 text-center">
        <Spinner animation="border" variant="danger">
          <span className="visually-hidden">Loading....</span>
        </Spinner>
        ;
      </div>
    );
  }
  return (
    <div>
      <Route
        {...rest}
        render={({ location }) =>
          user.displayName ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location },
              }}
            />
          )
        }
      />
    </div>
  );
};

export default PrivateRoute;
