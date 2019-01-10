/**
 * @overview: This componenet is for the hero banner/slider for the public homepage of the application.
 */

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Divider } from 'semantic-ui-react'

export default class Hero extends Component {
  state = {}
  
  render() {
    return (
      <main>
        <Container textAlign="center" text style={{ padding: '7em 0 7em 0', color: 'white' }}>
          <h1>Commerce Utility Box</h1>
          <p>A toolbox which help sellers maintain inventory and complete day to day tasks.</p>
          <Divider />
          <Button as={Link} to='/register' primary>Register</Button>
          <Button as={Link} to='/login'>Login</Button>
        </Container>
      </main>
    )
  }
}
