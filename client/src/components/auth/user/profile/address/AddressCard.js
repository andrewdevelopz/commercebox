/**
 *  @overview - This component is for the address card in the profile section.
 */

import React, { Component } from 'react';
import CardFrame from '../../../../shared/cards/CardFrame';
import TableFrame from '../../../../shared/tables/main/TableFrame';
import { fetchAuth } from '../../../../shared/services/httpService';
import { loadToken } from '../../../../shared/services/authService';

import { Button, Divider, Checkbox } from 'semantic-ui-react';

export default class AddressCard extends Component {
    state = {
        editItems: false,
        table: {
            headers: [
                ['', null],
                ['Company', null],
                ['Name', null],
                ['Address', null],
                ['Country', null],
                ['Primary', null],
            ],
            items: [
                {
                    company: 'company',
                    name: 'john doe',
                    address: '123 sesame street, covina CA 91789',
                    country: 'US',
                    primary: false,
                    changed: false
                }
            ]
        }
    }
    token;

    async componentDidMount() {
        /** @todo make api calls to grab the address stored for the user */
    }

    /**
     *  method to set the table to edit mode.
     */
    onEditItems = () => {
        this.setState(prevState => {
            prevState.editItems = !prevState.editItems;
            this.addRemoveHeaderCol(prevState);

            return {
                editItems: prevState.editItems,
                table: prevState.table
            }
        });
    }

    /**
     *  When the user submits the address form to add or update addresses
     */
    onSubmitAddresses = async () => {
        // load the token and make sure to set to null whenever returned or done
        this.token = loadToken();
        const addresses = this.state.table.items;

        console.log(addresses);

        const addAddress = await fetchAuth('addUserAddress', 'post', {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': this.token
        }, { addresses: addresses });

        console.log(addAddress);

        this.token = null;
    }

    /**
     *  Add and remove checkbox column when editItem changes
     *      - we pass a copy of the prevState reference to munge the state object
     *  
     *  @param prevState: state - the previous state passed in when setting `this.setState`
     */
    addRemoveHeaderCol = (prevState) => {
        // if in edit mode, add select column to the front
        if (prevState.editItems) {
            prevState.table.headers.unshift([<Checkbox id='checkAll' onClick={this.selectAll} />, null]);
        } else {
            prevState.table.headers.shift();
        }
    }

    /**
     *  Add a row to add an address for the user.
     */
    onAddAddressRow = () => {
        this.setState(prevState => {
            prevState.table.items.push(this.generateRow());

            return {
                table: prevState.table
            }
        });
    }

    /**
     *  Generate a row for adding an address
     */
    generateRow = () => ({
        company: '',
        name: '',
        address: '',
        country: '',
        primary: false,
        changed: true
    });

    render() {
        return (
            <CardFrame header='Addresses'>
                {
                    this.state.editItems
                        ? (
                            <React.Fragment>
                                <Button onClick={this.onEditItems} color='red'>Cancel</Button>
                                <Button onClick={this.onAddAddressRow} color='green'>Add</Button>
                            </React.Fragment>
                        )
                        : (
                            <Button onClick={this.onEditItems} color='green'>Edit</Button>
                        )
                }
                <Divider />
                <TableFrame
                    id='addresses'
                    table={this.state.table}
                    editItems={this.state.editItems}
                    submitButtonName='Submit'
                    handleSubmit={this.onSubmitAddresses}
                />
            </CardFrame>
        )
    }
}
