/**
 * @overview: This componenet is for each todo card template of the todo section in the app.
 */

import React, { Component } from 'react'

// Import custom components

// Semantic UI
import {
    Card,
    Segment,
    Dropdown,
    Grid
} from 'semantic-ui-react'

export default class CardFrame extends Component {
    state = {}

    render() {
        const { lists, cards } = this.props
        const generateMoveListActions = lists.map((list, i) => <Dropdown.Item key={i} style={{ fontSize: '0.9rem' }}>{list.title}</Dropdown.Item>)

        // map each card from this.props.cards
        const todoCard = cards.map((card, index) => {
            return (
                <Card key={index} className='todoCard'>
                    <Segment inverted>
                        <Grid columns='2'>
                            <Grid.Column>
                                <p>{card.description}</p>
                            </Grid.Column>
                            <Grid.Column textAlign='right'>
                                <Dropdown icon='ellipsis horizontal'>
                                    <Dropdown.Menu style={{ zIndex: 149 }}>
                                        {/* Move */}
                                        <Dropdown.Header content='Move' style={{ color: '#000' }} />
                                        <Dropdown.Divider />
                                        {generateMoveListActions}
                                        {/* Actions */}
                                        <Dropdown.Header content='Actions' style={{ color: '#000' }} />
                                        <Dropdown.Divider />
                                        <Dropdown.Item style={{ fontSize: '0.9rem', color: 'red' }}>Delete</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Grid.Column>
                        </Grid>
                    </Segment>
                </Card>
            )
        })

        return (
            <React.Fragment>
                {todoCard}
            </React.Fragment>
        )
    }
}
