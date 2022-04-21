import React from 'react';
import { Redirect, Route } from 'react-router';
import useAuth from '../../hooks/useAuth';

const UserRoute = ({ children, ...rest }) => {
    
  const { allContext } = useAuth();
    const { user, isLoading, isAdmin, adminChecking } = allContext

    if(isLoading){
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
        )
    }
    
    return (
        <Route
            {...rest}
            render={({ location }) =>
            user.email && !isAdmin ?
            children :
            <Redirect
                to={{
                    pathname: '/',
                    state: { from: location }
                }}
            ></Redirect>
            }
        >


        </Route>
    );

    
    
};

export default UserRoute;