/**
 * @overview: This componenet is for the profile section of the myaccount area.
 */

import React, { Component } from 'react';

// Import custom components
import CardFrame from '../../../shared/cards/CardFrame';
import AddressCard from './address/AddressCard';
import { fetchAuth } from '../../../shared/services/httpService';
import { loadToken } from '../../../shared/services/authService';

import {
    Button,
    Header,
    Segment,
    Divider,
    Form,
    Grid
} from 'semantic-ui-react';

export default class Profile extends Component {
    state = {
        userInfo: {
            firstName: '',
            lastName: '',
            username: '',
            email: ''
        },
        userPassword: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        },
        infoCard: [
            {
                icon: 'angle right',
                position: 'left',
                label: 'First Name', // label && placeholder
                type: 'text',
                name: 'firstName' // name && value
            },
            {
                icon: 'angle right',
                position: 'left',
                label: 'Last Name',
                type: 'text',
                name: 'lastName'
            },
            {
                icon: 'user',
                position: 'left',
                label: 'Username',
                type: 'text',
                name: 'username'
            },
            {
                icon: 'mail',
                position: 'left',
                label: 'Email',
                type: 'text',
                name: 'email'
            }
        ],
        passwordCard: [
            {
                icon: 'lock',
                position: 'left',
                label: 'Current Password',
                type: 'password',
                name: 'currentPassword'
            },
            {
                icon: 'lock',
                position: 'left',
                label: 'New Password',
                type: 'password',
                name: 'newPassword'
            },
            {
                icon: 'lock',
                position: 'left',
                label: 'Confirm Password',
                type: 'password',
                name: 'confirmPassword'
            }
        ],
        editItems: false
    }
    token;

    async componentDidMount() {
        this.token = loadToken();
        const res = await fetchAuth('retreiveUserData', 'get', {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': this.token
        });
        const resJSON = await res.json();

        this.setState(prevState => {
            prevState.userInfo.firstName = resJSON.firstName
            prevState.userInfo.lastName = resJSON.lastName
            prevState.userInfo.username = resJSON.username
            prevState.userInfo.email = resJSON.email

            return {
                userInfo: prevState.userInfo
            }
        });

        this.token = null;
    }

    // Select all the checkboxes inside table
    selectAll = () => {
        const checkboxes = document.querySelector('#addresses').querySelectorAll('.tableCheckboxCell');
        const checkAll = document.querySelector('#checkAll');

        // loop through each checkbox cell and grab it's input
        for (const checkbox of checkboxes) {
            if (checkAll.checked) {
                checkbox.querySelector('input').checked = true;
            } else {
                checkbox.querySelector('input').checked = false;
            }
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        const dataType = e.target.parentNode.parentNode.parentNode.getAttribute('datatype');
        this.setState(prevState => {
            if (dataType === 'info') {
                prevState.userInfo[name] = value;
                return {
                    userInfo: prevState.userInfo
                }
            } else {
                prevState.userPassword[name] = value;
                return {
                    userPassword: prevState.userPassword
                }
            }
        });
    }

    // When a form has been submitted
    onSubmit = async (event) => {
        try {
            this.token = loadToken();
            const dataType = event.target.parentNode.getAttribute('datatype');

            // Handle each type of form being submitted
            if (dataType === 'info') {
                const res = await fetchAuth('updateUserData', 'put', {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': this.token
                }, { user: this.state.userInfo });

                console.log(await res.json());
            } else if (dataType === 'password') {
                if (this.state.userPassword.newPassword === this.state.userPassword.confirmPassword) {
                    const res = await fetchAuth('updateUserPassword', 'put', {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': this.token
                    }, { password: this.state.userPassword });

                    console.log(await res.json());
                } else {
                    console.log('Confirm password does not match the new password');
                }
            }

            return;
        } catch (e) {
            console.error(e);
        } finally {
            // Set token to null
            this.token = null;
        }
    }

    render() {
        const infoCard = this.state.infoCard.map((item, index) => {
            return (
                <Form.Input
                    key={index}
                    fluid icon={item.icon}
                    iconPosition={item.position}
                    placeholder={item.label}
                    label={item.label}
                    type={item.type}
                    name={item.name}
                    value={this.state.userInfo[item.name]}
                    onChange={this.handleChange}
                />
            )
        });

        const passwordCard = this.state.passwordCard.map((item, index) => {
            return (
                <Form.Input
                    key={index}
                    fluid icon={item.icon}
                    iconPosition={item.position}
                    placeholder={item.label}
                    label={item.label}
                    type={item.type}
                    name={item.name}
                    // datatype='password' // Remove this if no bugs occur
                    value={this.state.userPassword[item.name]}
                    onChange={this.handleChange}
                />
            )
        });

        return (
            <Segment inverted style={{ background: '#252525', minHeight: '100vh' }}>
                <Segment inverted style={{ background: '#111' }}>
                    <Header as='h2' textAlign='center'>Profile</Header>
                </Segment>
                <Grid columns={2}>
                    <Grid.Row stretched>
                        <Grid.Column>
                            <CardFrame header='Information'>
                                <Form className='formLabel' datatype='info'>
                                    {/* Input information card content */}
                                    {infoCard}
                                    <Button primary size='medium' onClick={this.onSubmit}>
                                        Update
                                    </Button>
                                </Form>
                            </CardFrame>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment inverted>
                                <Header as='h3'>Change Password</Header>
                                <Divider />
                                <Form className='formLabel' datatype='password'>
                                    {/* Input password card content */}
                                    {passwordCard}
                                    <Button primary size='medium' onClick={this.onSubmit}>
                                        Update
                                    </Button>
                                </Form>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <AddressCard />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        )
    }
}
