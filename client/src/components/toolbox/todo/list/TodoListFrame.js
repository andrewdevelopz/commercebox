/**
 * @overview: This componenet is for the list template of the todo section in the app.
 */

import React, { Component } from 'react'

// Import custom components
import CardFrame from '../card/CardFrame'

// Semantic UI
import { 
	Card, 
	Dropdown,
	Segment, 
	Header, 
	Divider, 
	List,
	Grid
} from 'semantic-ui-react'

export default class TodoListFrame extends Component {
	state = {}

	onClickSetting = () => {
		console.log('working')
	}

	render() {
		return (
			<Grid.Column className='listGridColumn' style={{ margin: '0.5rem' }} width='3'>
				<Card className='todoList' style={{ position: 'absolute' }}>
					<Segment inverted>
						<div className='todoListlistHeader' style={{ cursor: 'move' }}>
							<List horizontal inverted>
								<List.Item>
									<Header as='h5'>{this.props.title}</Header>
								</List.Item>
								<List.Item as='a'>
									<Dropdown icon='cog' className='iconColor' floating>
										<Dropdown.Menu>
											<Dropdown.Header content='Actions' style={{ color: '#000' }} />
											<Dropdown.Divider />
											<Dropdown.Item style={{ fontSize: '0.9rem' }} onClick={this.onClickSetting}>Edit Title</Dropdown.Item>
										</Dropdown.Menu>
									</Dropdown>
								</List.Item>
							</List>
						</div>
						<Divider inverted />
						<CardFrame cards={this.props.cards} />
					</Segment>
				</Card>
			</Grid.Column>
		)
	}
}
