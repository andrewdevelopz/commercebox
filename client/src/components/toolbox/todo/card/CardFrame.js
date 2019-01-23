/**
 * @overview: This componenet is for each todo card template of the todo section in the app.
 */

import React, { Component } from 'react'

// Import custom components

// Semantic UI
import { 
    Card,
    Segment
} from 'semantic-ui-react'

export default class CardFrame extends Component {
	state = {}

	render() {
		// map each card from this.props.cards
		const cards = this.props.cards.map((card, index) => {
			return (
                <Card className='todoCard' key={index}>
                    <Segment inverted>
                        {card.description}
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
