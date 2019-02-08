/**
 * @overview: This component is to create a product for the inventory.
 */

import React, { Component } from 'react'

// Import custom components
import TableFrame from '../../../../shared/tables/TableFrame'

// Semantic UI
import { Segment } from 'semantic-ui-react'

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
                ['Description', null],
                ['Price', null],
                ['Value', null],
                ['Category', null],
                ['Group', null],
                ['UPC', null],
                ['Condition', null],
                ['Location', null],
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
                    quantity: '',
                    available: '',
                    alert: '',
                    orders: '',
                    description: '',
                    price: '',
                    value: '',
                    category: '',
                    group: '',
                    upc: '',
                    condition: '',
                    location: '',
                    weight: '',
                    height: '',
                    width: '',
                    depth: '',
                    bin: '',
                    monitor: ''
                },
            ]
        },
    }

    render() {
        const { table } = this.state

        return (
            <Segment inverted style={{ background: '#252525', minHeight: '100vh' }}>
                <TableFrame table={table} editItems={true} />
            </Segment>
        )
    }
}