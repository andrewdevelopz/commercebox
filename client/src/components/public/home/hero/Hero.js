/**
 * @overview: This componenet is for the hero banner/slider for the public homepage of the application.
 */

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Divider } from 'semantic-ui-react'

// Import custom components
import { AuthConsumer } from '../../../auth/AuthContext'

export default class Hero extends Component {
  state = {}
  
  render() {
    return (
      <main>
        <Container textAlign="center" text style={{ padding: '7rem 0 7rem 0', color: 'white' }}>
          <h1>Commerce Utility Box</h1>
          <p>A toolbox which help sellers maintain inventory and complete day to day tasks.</p>
          <Divider />
          <AuthConsumer>
            {({ isAuth }) => (
              isAuth ? (
                <Button as={Link} to='/myaccount'>My Account</Button>
              ) : (
                <div>
                  <Button as={Link} to='/register' primary>Register</Button>
                  <Button as={Link} to='/login'>Login</Button>
                </div>
              )
            )}
          </AuthConsumer>
        </Container>
      </main>
    )
  }
}
