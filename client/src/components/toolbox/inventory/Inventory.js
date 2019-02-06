/**
 * @overview: This component is for the inventory section of the toolbox. It is the main component for the inventory section and all child components
 * for the inventory ends here.
 */

import React, { Component } from 'react'

// Import custom components
import SearchBar from '../../shared/search/Search'
import SingleLineTable from '../../shared/tables/SingleLineTable'

// Semantic UI
import { Segment, Grid, Button, Divider } from 'semantic-ui-react'

export default class Inventory extends Component {
    state = {
        table: {
            headers: [ // [<name>, <width>]
                ['Image', 1],
                ['SKU', 1],
                ['Title', 5],
                ['Quantity', 1],
                ['Available', 1],
                ['Alert', 1],
                ['Orders', 1],
                ['Description', 4],
                ['Price', 1]
            ],
            inventory: [
                {
                    title: 'Schaden - Turcotte',
                    description: 'Operative hybrid matrix',
                    image: 'https://s3.amazonaws.com/uifaces/faces/twitter/marcomano_/128.jpg',
                    price: '$47.12',
                    sku: 'sku1',
                    quantity: 3,
                    available: 3,
                    alert: 2,
                    orders: 1
                },
                {
                    title: 'Larkin - Koelpin',
                    description: 'Expanded bandwidth-monitored moratorium',
                    image: 'https://s3.amazonaws.com/uifaces/faces/twitter/oktayelipek/128.jpg',
                    price: '$64.20',
                    sku: 'sku2',
                    quantity: 3,
                    available: 3,
                    alert: 2,
                    orders: 1
                }
            ]
        }
    }

    componentDidMount() {
        // make an api call to the database
        // get the inveotry and set `this.state.inventory` to the items
    }

    render() {
        const { table } = this.state

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
                            <Button color='orange' floated='right'>Create</Button>
                            <Button color='blue' floated='right'>Edit</Button>
                        </Grid.Column>
                    </Grid.Row>
                    <Divider />
                </Grid>
                {/* Start table */}
                <SingleLineTable table={table} />
            </Segment>
        )
    }
}