/**
 * @overview: This component is to create a product for the inventory.
 */

import React, { Component } from 'react';

// Import custom components
import TableFrame from '../../table/TableFrame';
import { fetchInventory } from '../../../../shared/services/httpService';
import { loadToken } from '../../../../auth/services/authService';

// Semantic UI
import { Segment, Button } from 'semantic-ui-react';

export default class CreateProducts extends Component {
    state = {
        table: {
            headers: [ // [<name>, <width>]
                ['', null],
                ['', null],
                ['Image', null],
                ['SKU', null],
                ['Title', null],
                ['Quantity', null],
                ['Available', null],
                ['Alert', null],
                ['Orders', null],
                ['Needed', null],
                ['Description', null],
                ['Sell Price', null],
                ['Purchase', null],
                ['Stock Value', null],
                ['Category', null],
                ['Variation Group', null],
                ['UPC', null],
                ['Condition', null],
                ['Full Address', null],
                ['Company', null],
                ['Name', null],
                ['Address 1', null],
                ['Address 2', null],
                ['City', null],
                ['State', null],
                ['Zip', null],
                ['Country', null],
                ['Email', null],
                ['Phone', null],
                ['Weight', null],
                ['Height', null],
                ['Width', null],
                ['Depth', null],
                ['Bin', null],
                ['Monitor', null]
            ],
            inventory: [
                {
                    image: '',
                    sku: '',
                    title: '',
                    quantity: {
                        quantity: '',
                        available: '',
                        alert: '',
                        pendingOrders: '',
                        needed: ''
                    },
                    description: '',
                    price: {
                        sell: '',
                        purchase: '',
                        stockValue: ''
                    },
                    category: '',
                    variationGroup: '',
                    upc: '',
                    condition: '',
                    location: {
                        fullAddress: '',
                        company: '',
                        name: '',
                        address1: '',
                        address2: '',
                        city: '',
                        state: '',
                        zip: '',
                        country: '',
                        email: '',
                        phone: ''
                    },
                    detail: {
                        weight: '',
                        height: '',
                        width: '',
                        depth: ''
                    },
                    bin: '',
                    monitor: ''
                }
            ]
        }
    }

    // Add product row to state
    addRow = () => {
        this.setState(prevState => {
            prevState.table.inventory.push(this.generateRow());
            return {
                table: prevState.table
            }
        });
    }

    // Generate product row by returning product object
    generateRow = () => ({
        image: '', sku: '', title: '', quantity: { quantity: '', available: '', alert: '', pendingOrders: '', needed: '' }, description: '',
        price: { sell: '', purchase: '', stockValue: '' }, category: '', variationGroup: '', upc: '', condition: '',
        location: { fullAddress: '', company: '', name: '', address1: '', address2: '', city: '', state: '', zip: '', country: '', email: '', phone: '' },
        detail: { weight: '', height: '', width: '', depth: '' }, bin: '', monitor: ''
    });

    // Create the products, persisting it to the database
    createInventory = async () => {
        this.token = loadToken();

        // make http call to /createInventory in chunks
        const products = this.state.table.inventory;

        const batch = 100;
        for (let i = 0, n = products.length; i < n; i += batch) {
            const chunk = products.slice(i, i + batch);

            const res = await fetchInventory('createInventory', 'post', {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.token
            }, { products: chunk });
            const resJSON = await res.json();

            // if res.success is false handle error
            if (res.status === 201) {
                // console response message
                console.log(resJSON);
            } else {
                console.error(resJSON);
                this.token = null;
                return;
            }
        }
        // redirect to /inventory when chunk loops is finished
        this.props.history.push('/toolbox/inventory');

        // set token to null when done
        this.token = null;
        return;
    }

    // Delete the row(s)
    deleteRow = () => {
        // grab select inputs
        const checkboxes = document.querySelector('#createInventory').querySelectorAll('.tableCheckboxCell');

        const rmvFromTbl = [];
        for (const checkbox of checkboxes) {
            if (checkbox.querySelector('input').checked) {
                const row = checkbox.parentNode;
                // push the index received from index column of table
                rmvFromTbl.push(parseFloat(row.querySelector('.index').innerText) - 1);
            }
        }

        // remove the object representing the row in `state.table`
        this.setState(prevState => {
            // splice objects in state by popping `rmvFromTbl[]`
            while (rmvFromTbl.length) prevState.table.inventory.splice(rmvFromTbl.pop(), 1);
            return { table: prevState.table }
        });
    }

    render() {
        const { table } = this.state;

        return (
            <Segment inverted style={{ background: '#252525', minHeight: '100vh' }}>
                <Button type='button' color='orange' onClick={this.addRow} style={{ marginBottom: '1rem' }}>Add</Button>
                <Button floated='right' type='button' color='red' onClick={this.deleteRow}>Delete</Button>
                <TableFrame id='createInventory' table={table} editItems={true} submitBtnName='Submit' handleSubmit={this.createInventory} />
            </Segment>
        )
    }
}
