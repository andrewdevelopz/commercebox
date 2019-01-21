/**
 * @overview: This componenet is for the profile section of the myaccount area.
 */

import React, { Component } from 'react'

// Import custom components
import CardFrame from '../../../shared/card/CardFrame'
import { fetchAuth } from '../../../shared/services/httpService'
import { loadToken } from '../../services/authService'

import {
    Button,
    Header,
    Segment,
    Divider,
    Form,
    Grid,
    Table
} from 'semantic-ui-react'

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
        ]
    }

  async componentDidMount() {

    const res = await fetchAuth('retreiveUserData', 'post', {}, {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': loadToken()
    })
    
    this.setState((prevState) => {
      for (let card of prevState.infoCard) {
        card.label = res[card.name]
      }
      return {
        infoCard: prevState.infoCard
      }
    })
  }

  handleChange = (e) => {
    const { name, value } = e.target
    const dataType = e.target.parentNode.parentNode.parentNode.getAttribute('datatype')
    this.setState(prevState => {
      if(dataType === 'info') {
        prevState.userInfo[name] = value
        return {
          userInfo: prevState.userInfo
        }
      } else {
        prevState.userPassword[name] = value
        return {
          userPassword: prevState.userPassword
        }
      }
    })
  }

    onSubmit = (event) => {
        try {
            const dataType = event.target.parentNode.getAttribute('datatype')
            if (dataType === 'info') {
                console.log(this.state.userInfo)
            } else {
                console.log(this.state.userPassword)
            }
        } catch (e) {
            console.error(e)
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
        })

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
                    datatype='password'
                    value={this.state.userPassword[item.name]}
                    onChange={this.handleChange}
                />
            )
        })

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
                                <Form className='formLabel'>
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
                            <CardFrame header='Addresses'>
                                <Form className='formLabel'>
                                    <Table inverted>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell>Company</Table.HeaderCell>
                                                <Table.HeaderCell>Name</Table.HeaderCell>
                                                <Table.HeaderCell>Address</Table.HeaderCell>
                                                <Table.HeaderCell>Country</Table.HeaderCell>
                                                <Table.HeaderCell>Primary</Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>

                                        <Table.Body>
                                            <Table.Row>
                                                <Table.Cell>Company1</Table.Cell>
                                                <Table.Cell>John Doe</Table.Cell>
                                                <Table.Cell>348 Paseo Sonrisa, Walnut CA 91789</Table.Cell>
                                                <Table.Cell>US</Table.Cell>
                                                <Table.Cell>true</Table.Cell>
                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell>Company2</Table.Cell>
                                                <Table.Cell>Jane Doe</Table.Cell>
                                                <Table.Cell>322 Paseo Sonrisa, Walnut CA 91789</Table.Cell>
                                                <Table.Cell>US</Table.Cell>
                                                <Table.Cell>true</Table.Cell>
                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell>Company3</Table.Cell>
                                                <Table.Cell>Roger Doe</Table.Cell>
                                                <Table.Cell>256 Paseo Sonrisa, Walnut CA 91789</Table.Cell>
                                                <Table.Cell>US</Table.Cell>
                                                <Table.Cell>true</Table.Cell>
                                            </Table.Row>
                                        </Table.Body>
                                    </Table>
                                    <Button primary size='medium' onClick={this.onSubmit}>
                                        Update
                                    </Button>
                                </Form>
                            </CardFrame>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        )
    }
}
