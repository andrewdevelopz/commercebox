/**
 * @overview: This component is for the inventory section of the toolbox. It is the main component for the inventory section and all child components
 * for the inventory ends here.
 * 
 * @todo - Make it so you can add headers (columns like `title`)
 */

import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// Import custom components
import SearchBar from '../../shared/search/Search'
import TableFrame from '../../shared/tables/TableFrame'

// Semantic UI
import { Segment, Grid, Button, Divider } from 'semantic-ui-react'

export default class Inventory extends Component {
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
                    image: 'https://s3.amazonaws.com/uifaces/faces/twitter/marcomano_/128.jpg',
                    sku: 'sku1',
                    title: 'Schaden - Turcotte',
                    quantity: 3,
                    available: 3,
                    alert: 2,
                    orders: 1,
                    description: 'Operative hybrid matrix',
                    price: '$47.12',
                    value: '$13.12',
                    category: 'Cases',
                    group: 'Schaden',
                    upc: 125125125,
                    condition: 'new',
                    location: '348 Paseo Sonrisa, Walnut CA 91789',
                    weight: '12oz',
                    height: '9in',
                    width: '6in',
                    depth: '1in',
                    bin: 'R1-56',
                    monitor: 'true'
                },
                {
                    image: 'https://s3.amazonaws.com/uifaces/faces/twitter/oktayelipek/128.jpg',
                    sku: 'sku2',
                    title: 'Larkin - Koelpin',
                    quantity: 3,
                    available: 3,
                    alert: 2,
                    orders: 1,
                    description: 'Expanded bandwidth-monitored moratorium Expanded bandwidth-monitored moratorium Expanded bandwidth-monitored moratorium Expanded bandwidth-monitored moratorium Expanded bandwidth-monitored moratoriumExpanded bandwidth-monitored moratorium Expanded bandwidth-monitored moratoriumExpanded bandwidth-monitored moratorium',
                    price: '$64.20',
                    value: '$17.12',
                    category: 'Chargers',
                    group: 'Schaden',
                    upc: 63262336,
                    condition: 'new',
                    location: '348 Paseo Sonrisa, Walnut CA 91789',
                    weight: '6oz',
                    height: '9in',
                    width: '6in',
                    depth: '1in',
                    bin: 'R2-12',
                    monitor: 'true'
                }
            ]
        },
        editItems: false,
        path: ''
    }

    constructor({ match }) {
        super()
        this.state.path = match.path
    }

    componentDidMount = () => {
        // make an api call to the database
        // get the inventory and set `this.state.inventory` to the items
    }

    // When edit item button is pressed
    onEditItems = () => {
        // update state of editItems to pass to SingleLineTable component
        this.setState({
            editItems: !this.state.editItems
        })
    }

    render() {
        const { table, editItems, path } = this.state

        return (
            <Segment inverted style={{ background: '#252525', minHeight: '100vh' }}>
                {/* Inventory header bar */}
                <Grid>
                    <Grid.Row columns='equal'>
                        <Grid.Column>
                            <SearchBar inventory={table.inventory} />
                        </Grid.Column>
                        <Grid.Column>
                            <Button color='green' floated='right'>Sync</Button>
                            <Button floated='right'>Link</Button>
                            <Button as={Link} to={`${path}/createProducts`} color='orange' floated='right'>Create</Button>
                            {
                                editItems
                                    ? <Button onClick={this.onEditItems} color='red' floated='right'>Cancel</Button>
                                    : <Button onClick={this.onEditItems} color='blue' floated='right'>Edit</Button>
                            }
                        </Grid.Column>
                    </Grid.Row>
                    <Divider />
                </Grid>
                {/* Table frame */}
                <TableFrame table={table} editItems={editItems} handleSubmit={this.onEditItems} />
            </Segment>
        )
    }
}