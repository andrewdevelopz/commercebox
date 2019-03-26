/**
 * @overview: This component is for the inventory section of the toolbox. It is the main component for the inventory section and all child components
 * for the inventory ends here.
 * 
 * @todo - Make it so you can add headers (columns like `title`)
 * @todo - When edit is cancelled the data still saves updated state, make it so when cancel is hit it reverts to inital state
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Import custom components
import SearchBar from '../../shared/search/Search';
import TableFrame from './table/TableFrame';
import { loadToken } from '../../auth/services/authService';
import { fetchInventory } from '../../shared/services/httpService';

// Semantic UI
import { Segment, Grid, Button, Divider } from 'semantic-ui-react';

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
            inventory: []
        },
        editItems: false,
        path: ''
    }
    token;

    constructor({ match }) {
        super();
        this.state.path = match.path;
    }

    async componentDidMount() {
        // make an api call to the database
        this.token = loadToken();

        const res = await fetchInventory('getInventory', 'get', {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': this.token
        });

        const organized = this.organizeJSONResponse(res);

        // set table state to res from http call
        this.setState(prevState => {
            prevState.table.inventory = organized;
            return {
                table: prevState.table
            }
        });

        this.token = null;
    }

    // Organize the http JSON response to match table headers
    organizeJSONResponse = (arr) => {
        const mapping = arr.map(x => {
            return {
                image: x.image,
                sku: x.sku,
                title: x.title,
                quantity: {
                    quantity: x.quantity.quantity,
                    available: x.quantity.available,
                    alert: x.quantity.alert,
                    pendingOrders: x.quantity.pendingOrders,
                    needed: x.quantity.needed
                },
                description: x.description,
                price: {
                    sell: x.price.sell,
                    purchase: x.price.purchase,
                    stockValue: x.price.stockValue
                },
                category: x.category,
                variationGroup: x.variationGroup,
                upc: x.upc,
                condition: x.condition,
                location: {
                    fullAddress: x.location.fullAddress,
                    company: x.location.company,
                    name: x.location.name,
                    address1: x.location.address1,
                    address2: x.location.address2,
                    city: x.location.city,
                    state: x.location.state,
                    zip: x.location.zip,
                    country: x.location.country,
                    email: x.location.email,
                    phone: x.location.phone

                },
                detail: {
                    weight: x.detail.weight,
                    height: x.detail.height,
                    width: x.detail.width,
                    depth: x.detail.depth
                },
                bin: x.bin,
                monitor: x.monitor,
                id: x._id
            }
        });
        return mapping;
    }

    // When edit item button is pressed
    onEditItems = () => {
        // update state of `editItems` and add or remove columns respectively
        this.setState(prevState => {
            prevState.editItems = !prevState.editItems;

            // if in edit mode add select column to the front
            if (prevState.editItems) {
                prevState.table.headers.unshift(['', null]);
            } else {
                prevState.table.headers.shift();
            }

            return {
                editItems: prevState.editItems,
                table: prevState.table
            }
        });
    }

    // When the delete button is pressed, work with the table form
    onDeleteItems = () => {
        // grab the checkbox cell of each checkbox
        /** @todo - add a dynamic id to the <form> element so we can grab checkboxes more specfically */
        const checkboxes = document.querySelectorAll('.tableCheckboxCell');
        const checked = Array.from(checkboxes).filter(chk => chk.querySelector('input').checked);

        for (const x of checked) {
            console.log(x.parentNode);
        }

        console.log(checked);
    }

    // Render the component
    render() {
        // wait for componentDidMount before rendering
        if (this.state.table.inventory.length === 0) {
            return null;
        }
        const { table, editItems, path } = this.state;

        // generate buttons based on `editItems` state
        const genBtns = () => {
            if (!editItems) {
                return (
                    <React.Fragment>
                        <Button color='green' floated='right'>Sync</Button>
                        <Button floated='right'>Link</Button>
                        <Button as={Link} to={`${path}/createProducts`} color='orange' floated='right'>Create</Button>
                        <Button onClick={this.onEditItems} color='blue' floated='right'>Edit</Button>
                    </React.Fragment>
                );
            } else {
                return (
                    <React.Fragment>
                        <Button onClick={this.onDeleteItems} color='red' floated='right'>Delete</Button>
                        <Button onClick={this.onEditItems} color='grey' floated='right'>Cancel</Button>
                    </React.Fragment>
                );
            }
        }

        return (
            <Segment inverted style={{ background: '#252525', minHeight: '100vh' }}>
                {/* inventory header bar */}
                <Grid>
                    <Grid.Row columns='equal'>
                        <Grid.Column>
                            <SearchBar inventory={table.inventory} />
                        </Grid.Column>
                        <Grid.Column>
                            {/* buttons */}
                            {genBtns()}
                        </Grid.Column>
                    </Grid.Row>
                    <Divider />
                </Grid>
                {/* table frame */}
                <TableFrame table={table} editItems={editItems} handleSubmit={this.onEditItems} />
            </Segment>
        )
    }
}
