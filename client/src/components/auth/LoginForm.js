/**
 * @overview: This componenet is for the login section of the application.
 * 
 */

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { fetchAuth } from '../shared/services/httpService'

import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

export default class LoginForm extends Component {
  state = {
    username: '',
    password: ''
  }

  // Update the state on form changes
  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  // On form submit
  onSubmit = async () => {
    try {
      const user = this.state
      // Login the user with the form data
      const res = await fetchAuth('login', 'post', user, {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
      console.log(res)
    } catch(e) {
      console.log(e)
    }
  }
  
  render() {
    const { username, password } = this.state

    return (
      <Segment inverted>
        <Grid textAlign='center' style={{ minHeight: '100vh', padding: '2rem' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 500, border: '1px solid #fff', borderRadius: '2rem' }}>
            <Header inverted as='h2' textAlign='center'>
              Log-in to your account
            </Header>
            <Form size='large'>
              <Segment stacked>
                <Form.Input 
                  fluid icon='user' 
                  iconPosition='left' 
                  placeholder='Username'
                  type='text'
                  name='username' 
                  value={username} 
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  name='password'
                  value={password}
                  onChange={this.handleChange}
                />

                <Button primary fluid size='large' onClick={this.onSubmit}>
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              New to us? <Link to='/register'>Register</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </Segment>
    )
  }
}
