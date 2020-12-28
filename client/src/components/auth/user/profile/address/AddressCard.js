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
                ['First Name', null],
                ['Last Name', null],
                ['Address 1', null],
                ['Address 2', null],
                ['City', null],
                ['State', null],
                ['Zip', null],
                ['Country', null],
                ['Primary', null]
            ],
            items: []
        }
    }
    token;

    async componentDidMount() {
        try {
            // get the user addresses from the database
            this.token = loadToken();
            const fetched = await fetchAuth('getUserAddress', 'get', {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.token
            });
            const addresses = await fetched.json();

            // // add changed property to the address object
            // for (const address of addresses.data.addresses) {
            //     address.changed = false;
            // }

            this.setState(prevState => {
                prevState.table.items = prevState.table.items.concat(addresses.data.addresses);

                return {
                    table: prevState.table
                }
            });
        } catch (e) {
            console.error(e);
        } finally {
            this.token = null;
        }
    }

    /**
     *  method to set the table to edit mode.
     */
    onEditItems = () => {
        this.setState(prevState => {
            this.addRemoveHeaderCol(prevState);

            return {
                editItems: !prevState.editItems,
                table: prevState.table
            }
        });
    }

    /**
     *  When the user submits the address form to add or update addresses
     */
    onSubmitAddresses = async () => {
        try {
            /** @note currently we do not send `changed` property to the back-end */
            // only send addresses that have been changed
            // let addresses = [];
            // await this.setState(prevState => {
            //     for (const item of prevState.table.items) {
            //         if (item.changed) {
            //             addresses.push(item);
            //         } else continue;
            //     }
            //     return;
            // });

            const addresses = this.state.table.items;
            // load the token and make sure to set to null whenever returned or done
            this.token = loadToken();

            const fetched = await fetchAuth('addUpdateUserAddress', 'post', {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.token
            }, { addresses });
            const updated = await fetched.json();

            if (fetched.status === 201) {
                this.setState(prevState => {
                    this.addRemoveHeaderCol(prevState);

                    return {
                        editItems: !prevState.editItems,
                        table: prevState.table
                    }
                });

                console.log(updated);
            } else {
                console.error(updated);
            }

        } catch (e) {
            console.error(e);
        } finally {
            this.token = null;
        }
    }

    /**
     *  Add and remove checkbox column when editItem changes
     *      - we pass a copy of the prevState reference to munge the state object
     *  
     *  @param prevState: state - the previous state passed in when setting `this.setState`
     */
    addRemoveHeaderCol = (prevState) => {
        // if edit mode is false, add select column to the front
        if (!prevState.editItems) {
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
        firstName: '',
        lastName: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        primary: false
    });

    render() {
        // wait for componentDidMount before rendering
        // if (this.state.table.items.length === 0) {
        //     return null;
        // }

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
