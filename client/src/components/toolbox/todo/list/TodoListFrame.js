/**
 * @overview: This componenet is for the list template of the todo section in the app.
 */

import React, { Component } from 'react'

// Import custom components

// Semantic UI
import { 
	Card, 
	Segment, 
	Header, 
	Divider, 
	Icon,
	List,
	Grid
} from 'semantic-ui-react'

export default class TodoListFrame extends Component {
	state = {}

	render() {
		return (
			<Grid.Column style={{ margin: '0.5rem' }} width='3'>
				<Card className='todoList' style={{ position: 'absolute' }}>
					<Segment inverted>
						<div className='todoListlistHeader' style={{ cursor: 'move' }}>
							<List horizontal inverted>
								<List.Item>
									<Header as='h5'>{this.props.title}</Header>
								</List.Item>
								<List.Item as='a'>
									<Icon name='cog' />
								</List.Item>
							</List>
						</div>
						<Divider inverted />
					</Segment>
				</Card>
			</Grid.Column>
		)
	}
}
