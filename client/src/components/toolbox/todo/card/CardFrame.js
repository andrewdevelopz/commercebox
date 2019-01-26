/**
 * @overview: This componenet is for each todo card template of the todo section in the app.
 */

import React, { Component } from 'react'

// Import custom components

// Semantic UI
import { 
    Card,
    Segment,
    Icon,
    Grid
} from 'semantic-ui-react'

export default class CardFrame extends Component {
    state = {}

	render() {
		// map each card from this.props.cards
		const cards = this.props.cards.map((card, index) => {
			return (
                <Card key={index} className='todoCard'>
                    <Segment inverted>
                        <Grid columns='2'>
                            <Grid.Column>
                                <p>{card.description}</p>
                            </Grid.Column>
                            <Grid.Column textAlign='right'>
                                <Icon name='ellipsis horizontal' style={{ cursor: 'pointer' }}/>
                            </Grid.Column>
                        </Grid>
                    </Segment>
                </Card>
			)
        })
        
		return (
            <React.Fragment>
                {cards}
            </React.Fragment>
		)
	}
}
