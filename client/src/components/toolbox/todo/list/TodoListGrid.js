/**
 * @overview: This componenet is for the list template of the todo section in the app.
 */

import React, { Component } from 'react'

// Import custom components

// Semantic UI
import { Grid } from 'semantic-ui-react'

export default class TodoListFrame extends Component {
	state = {}

	render() {
		return (
			<Grid>
                {this.props.children}
            </Grid>
		)
	}
}
