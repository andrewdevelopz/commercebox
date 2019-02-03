/**
 * @overview: This component is for the inventory section of the toolbox. It is the main component for the inventory section and all child components
 * for the inventory ends here.
 */

import React, { Component } from 'react'

// Import custom components
import SearchBar from '../../shared/search/Search'

// Semantic UI
import { Segment, Grid, Button, Divider } from 'semantic-ui-react'

export default class Inventory extends Component {
    state = {
        inventory: [
            {
                "title": "Schaden - Turcotte",
                "description": "Operative hybrid matrix",
                "image": "https://s3.amazonaws.com/uifaces/faces/twitter/marcomano_/128.jpg",
                "price": "$47.12"
            },
            {
                "title": "Larkin - Koelpin",
                "description": "Expanded bandwidth-monitored moratorium",
                "image": "https://s3.amazonaws.com/uifaces/faces/twitter/oktayelipek/128.jpg",
                "price": "$64.20"
            }
        ]
    }

    componentDidMount() {
        // make an api call to the database
        // get the inveotry and set `this.state.inventory` to the items
    }

    render() {
        const { inventory } = this.state

        return (
            <Segment inverted style={{ background: '#252525', minHeight: '100vh' }}>
                <Grid>
                    <Grid.Row columns='equal'>
                        <Grid.Column>
                            <SearchBar inventory={inventory} />
                        </Grid.Column>
                        <Grid.Column>
                            <Button color='green' floated='right'>Sync</Button>
                            <Button color='standard' floated='right'>Link</Button>
                            <Button color='orange' floated='right'>Create</Button>
                            <Button color='blue' floated='right'>Edit</Button>
                        </Grid.Column>
                    </Grid.Row>
                    <Divider />
                </Grid>
            </Segment>
        )
    }
}
