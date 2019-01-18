/**
 * @overview: This componenet is for the todo section of the toolbox. It is the main component for the todo section and all child components
 * for the todo ends here.
 */

import React, { Component } from 'react'

// Import custom components
import TodoListFrame from './list/TodoListFrame'

// Semantic UI
import { Segment, Grid } from 'semantic-ui-react'

export default class Toolbox extends Component {
	state = {}

	render() {
		return (
			<Segment inverted style={{ background: '#252525', minHeight: '100vh' }}>
				<Grid>
					<TodoListFrame amount='5' />
				</Grid>
			</Segment>
		)
	}
}
