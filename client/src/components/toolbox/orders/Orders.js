/**
 * @overview: This component is for the orders section of the toolbox. It is the main component for the orders section and all child components
 * for the orders ends here.
 */

import React, { Component } from 'react';
import TableFrame from './table/TableFrame';
// import SearchBar from '../../shared/search/Search';
import { loadToken } from '../../shared/services/authService';
import { fetchAll } from '../../shared/services/httpService';

// Semantic UI
import { Button, Divider, Segment, Grid, Search } from 'semantic-ui-react';

export default class Orders extends Component {
    state = {
        table: {
            headers: [
                ['', 1],
                ['Image', 10],
                ['SKU', 10],
                ['Title', 10]
            ],
            orders: [
                {
                    image: '',
                    sku: 'sku',
                    title: 'title'
                }
            ]
        }
    }
    token;

    async componentDidMount() {
        try {
            // make api call to the database
            this.token = loadToken();
            const res = await fetchAll('orders', 'getAllOrders', 'get', {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.token
            });
            console.log(await res.json());

        } catch (e) {
            console.error(e);
        } finally {
            this.token = null;
        }
    }

    render() {
        const { table } = this.state;
        // generate buttons based on `editItems` state
        const genBtns = () => {
            return (
                <React.Fragment>
                    <Button color='red' floated='right'>Placeholder</Button>
                    <Button color='orange' floated='right'>Placeholder</Button>
                    <Button color='grey' floated='right'>Placeholder</Button>
                </React.Fragment>
            )
        }

        return (
            <Segment inverted style={{ background: '#252525', minHeight: '100vh' }}>
                {/* orders header bar */}
                <Grid>
                    <Grid.Row columns='equal'>
                        <Grid.Column>
                            {/* Fix search bar to be dynamic app wide */}
                            {/* <SearchBar inventory={} /> */}
                            <Search />
                        </Grid.Column>
                        <Grid.Column>
                            {/* buttons */}
                            {genBtns()}
                        </Grid.Column>
                    </Grid.Row>
                    <Divider />
                </Grid>
                {/* table frame */}
                <TableFrame id='orders' table={table} submitBtnName='Update' handleSubmit={this.onUpdateItems} />
            </Segment>
        )
    }
}
