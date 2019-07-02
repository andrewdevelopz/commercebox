/**
 * @overview: This Component is for the woocommerce section of the profile area. Any configurations/settings
 * related to woocommerce will be placed here.
 */

import React, { Component } from 'react';
import CardFrame from '../../../../../shared/cards/CardFrame';
// import { loadToken } from '../../../../../shared/services/authService';
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
        }
    }

    async componentDidMount() { }

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
                    value={item.name}
                    // onChange={this.handleChange}
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
