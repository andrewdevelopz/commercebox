/**
 * @overview: This componenet is for the list template of the todo section in the app.
 */

import React, { Component } from 'react'

// Import custom components

// Semantic UI
import { Card, Segment } from 'semantic-ui-react'

export default class TodoListFrame extends Component {
	render() {
		return (
			<Card>
				<Segment inverted>
					Hello from card
				</Segment>
			</Card>
		)
	}
}
