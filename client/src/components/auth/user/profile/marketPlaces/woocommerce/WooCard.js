/**
 * @overview: This Component is for the woocommerce section of the profile area. Any configurations/settings
 * related to woocommerce will be placed here.
 */

import React, { Component } from 'react';
import CardFrame from '../../../../../shared/cards/CardFrame';
import { loadToken } from '../../../../../shared/services/authService';
import { fetchAuth } from '../../../../../shared/services/httpService';
import { Button, Form } from 'semantic-ui-react';

export default class WooCard extends Component {
    state = {
        editItems: false,
        table: {
            headers: [
                ['', null],
                ['Consumer Key', 8],
                ['Secret Key', 8]
            ],
            keys: [
                {
                    icon: 'lock',
                    position: 'left',
                    name: 'consumer',
                    type: 'text',
                    label: 'Consumer Key'
                },
                {
                    icon: 'lock',
                    position: 'left',
                    name: 'secret',
                    type: 'text',
                    label: 'Secret Key'
                },
            ]
        },
        consumer: '',
        secret: ''
    }
    token;

    async componentDidMount() {
        try {
            this.token = loadToken();
            // make http call to get user woocommerce keys
            const res = await fetchAuth('getWooKeys', 'get', {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.token
            });

            if (res.status === 200) {
                const payload = await res.json();

                // if there is a successful payload update the state with the keys
                if (payload.success) {
                    // set the state of consumer/secret with the received payload
                    this.setState(prevState => {
                        prevState.consumer = payload.tokens.woocommerce.consumer;
                        prevState.secret = payload.tokens.woocommerce.secret;
                        return {
                            consumer: prevState.consumer,
                            secret: prevState.secret
                        }
                    });
                } else {
                    throw new Error('There was an issue updating the woocommerce key\'s');
                }
            } else {
                throw new Error('There was an issue connecting with the server');
            }
        } catch (e) {
            console.error(e);
        } finally {
            this.token = null;
        }
    }

    /**
     *  Handle the change when user inputs
     */
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState(prevState => {
            prevState[name] = value;
            return {
                name: prevState[name]
            }
        });
    }

    /**
     *  The actions when user hit's "Update" button
     */
    onSubmit = async () => {
        try {
            // assemble the data object and load the token
            const data = {
                consumer: this.state.consumer,
                secret: this.state.secret
            }
            this.token = loadToken();

            // make http call to back-end to update keys
            const res = await fetchAuth('updateWooKeys', 'put', {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.token
            }, data);

            // if we get back a status of 200
            if (res.status === 200) {
                const payload = await res.json();
                console.log(payload);
            }
        } catch (e) {
            console.error(e);
        } finally {
            this.token = null;
        }
    }

    render() {
        const wooKeys = this.state.table.keys.map((item, index) => {
            return (
                <Form.Input
                    key={index}
                    fluid icon={item.icon}
                    iconPosition={item.position}
                    placeholder={item.label}
                    label={item.label}
                    type={item.type}
                    name={item.name}
                    value={this.state[item.name]}
                    onChange={this.handleChange}
                />
            )
        });

        return (
            <CardFrame header='WooCommerce' >
                <Form className='formLabel' datatype='info'>
                    {/* Input information card content */}
                    {wooKeys}
                    <Button primary size='medium' onClick={this.onSubmit}>
                        Update
                    </Button>
                </Form>
            </CardFrame>
        )
    }
}
