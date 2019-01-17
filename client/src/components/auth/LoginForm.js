/**
 * @overview: This componenet is for the login section of the application.
 */

import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// Import custom components
import { AuthConsumer } from '../auth/AuthContext'

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
    onSubmit = (res) => {
        if (res.success) {
            this.props.history.push('/toolbox/dashboard')
        } else {
            console.error(res)
        }
    }

    render() {
        const { username, password } = this.state
        const user = this.state

        return (
            <Segment inverted>
                <Grid textAlign='center' style={{ minHeight: '100vh', padding: '2rem' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 500 }}>
                        <Header inverted as='h2' textAlign='center'>
                            Log-in to Your Account
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
                                <AuthConsumer>
                                    {({ login }) => (
                                        <Button primary fluid size='large' onClick={async () => {
                                            // Await the login response
                                            const res = await login(user)
                                            this.onSubmit(res)
                                        }}>
                                            Login
                                        </Button>
                                    )}
                                </AuthConsumer>
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
