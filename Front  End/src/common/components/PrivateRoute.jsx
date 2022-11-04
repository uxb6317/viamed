import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

/* 
  Any component wrapped in this will not be rendering if the user is not logged in.
*/

const PrivateRoute = ({ component: Component, ...rest }) => {
  // get user
  const user = useSelector((state) => state.auth.user);

  // if the user is logged in, render the passed in prop else send back to home
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/',
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
