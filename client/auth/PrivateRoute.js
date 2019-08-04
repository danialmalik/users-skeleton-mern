/* eslint react/prop-types: 0 */

import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import auth from './auth-helper';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            auth.isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: '/signin',
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

// PrivateRoute.propTypes = {
//     component: PropTypes.object,
//     location: PropTypes.string
// };

export default PrivateRoute;
