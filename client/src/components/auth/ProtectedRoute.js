/**
 * @overview: This componenet controls any protected routes in the front-end of the application. It checks the state isAuth to determine whether
 * to show/access a route or not.
 */

import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthConsumer } from './AuthContext'

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <AuthConsumer>
    {({ isAuth }) => (
      <Route
        render={props => isAuth ? <Component {...props} /> : <Redirect to="/login" /> }
        {...rest}
      />
    )}
  </AuthConsumer>
)

export default ProtectedRoute
