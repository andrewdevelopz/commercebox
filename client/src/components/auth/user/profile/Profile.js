/**
 * @overview: This componenet is for the profile section of the myaccount area.
 */

import React, { Component } from 'react'

import { 
  Button, 
  Header, 
  Segment, 
  Divider, 
  Form 
} from 'semantic-ui-react'

export default class Profile extends Component {
  state = {
    user: {
      firstName: '',
      lastName: '',
      username: '',
      email: ''
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState(prevState => {
      prevState.user[name] = value
      return {
        user: prevState.user
      }
    })
  }

  onSubmit = () => {
    console.log(this.state)
  }

  render() {
    return (
      <Segment inverted style={{ background: '#252525', minHeight: '100vh' }}>
        <Segment inverted style={{ background: '#111' }}>
          <Header as='h2' textAlign='center'>Profile</Header>
        </Segment>
        <Segment inverted>
          <Header as='h3'>Information</Header>
          <Divider />
          <Form className='formLabel'>
            <Form.Group widths='equal'>
              <Form.Input 
                fluid icon='angle right'
                iconPosition='left'
                placeholder='First Name'
                label='First Name'
                type='text'
                name='firstName'
                value={this.state.user.firstName}
                onChange={this.handleChange}
              />
              <Form.Input
                fluid icon='angle right'
                iconPosition='left'
                placeholder='Last Name'
                label='Last Name'
                type='text'
                name='lastName'
                value={this.state.user.lastName}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Input
                fluid icon='user'
                iconPosition='left'
                placeholder='Username'
                label='Username'
                type='text'
                name='username'
                value={this.state.user.username}
                onChange={this.handleChange}
              />
              <Form.Input
                fluid icon='mail'
                iconPosition='left'
                placeholder='Email'
                label='Email'
                type='text'
                name='email'
                value={this.state.user.email}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button primary size='medium' onClick={this.onSubmit}>
              Update
            </Button>
          </Form>
        </Segment>
      </Segment>
    )
  }
}
