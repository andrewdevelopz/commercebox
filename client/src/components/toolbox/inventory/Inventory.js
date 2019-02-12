/**
 * @overview: This component is for the inventory section of the toolbox. It is the main component for the inventory section and all child components
 * for the inventory ends here.
 * 
 * @todo - Make it so you can add headers (columns like `title`)
 * @todo - When edit is cancelled the data still saves updated state, make it so when cancel is hit it reverts to inital state
 */

import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// Import custom components
import SearchBar from '../../shared/search/Search'
import TableFrame from './table/TableFrame'
// import { loadToken } from '../../auth/services/authService'
// import { fetchInventory } from '../../shared/services/httpService'

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
                }
            ]
        },
        editItems: false,
        path: ''
    }
    token

    constructor({ match }) {
        super()
        this.state.path = match.path
    }

    // componentDidMount = async () => {
    //     /**
    //      * @todo - the error is coming from the Products being saved in the back-end do not match up with front-end mapping
    //      */
    //     // make an api call to the database
    //     this.token = loadToken()
    //     const res = await fetchInventory('getInventory', 'get', {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json',
    //         'Authorization': this.token
    //     })

    //     // set table state to res from http call
    //     this.setState(prevState => {
    //         prevState.table.inventory = res
    //         return {
    //             table: prevState.table
    //         }
    //     })

    //     this.token = null
    // }

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