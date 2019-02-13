/**
 * @overview: This component is to create a product for the inventory.
 */

import React, { Component } from 'react'

// Import custom components
import TableFrame from '../../table/TableFrame'

// Semantic UI
import { Segment, Button } from 'semantic-ui-react'

export default class CreateProducts extends Component {
    state = {
        table: {
            headers: [ // [<name>, <width>]
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
            prevState.table.inventory.push(this.generateRow())
            return {
                table: prevState.table
            }
        })
    }

    // Generate product row by returning product object
    generateRow = () => ({
        image: '', sku: '', title: '', quantity: { quantity: '', available: '', alert: '', pendingOrders: '', needed: '' }, description: '',
        price: { sell: '', purchase: '', stockValue: '' }, category: '', variationGroup: '', upc: '', condition: '',
        location: { fullAddress: '', company: '', name: '', address1: '', address2: '', city: '', state: '', zip: '', country: '', email: '', phone: '' },
        detail: { weight: '', height: '', width: '', depth: '' }, bin: '', monitor: ''
    })

    // Create the products, persisting it to the database
    createProducts = () => {
        console.log('products created, redirecting to inventory...')
        // this.props.history.push('/toolbox/inventory')
    }

    render() {
        const { table } = this.state
        // console.log('createProducts rendered')

        return (
            <Segment inverted style={{ background: '#252525', minHeight: '100vh' }}>
                <Button type='button' color='orange' onClick={this.addRow} style={{ marginBottom: '1rem' }}>Add</Button>
                <TableFrame table={table} editItems={true} handleSubmit={this.createProducts} />
            </Segment>
        )
    }
}