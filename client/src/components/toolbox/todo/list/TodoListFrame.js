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
	Grid
} from 'semantic-ui-react'

export default class TodoListFrame extends Component {
	state = {
		titles: []
	}

	onClickSetting = (e) => {
		console.log(e.target)
	}

	render() {
		const { lists } = this.props

		return (
			<Grid.Column className='listGridColumn' style={{ margin: '0.5rem' }} width='3'>
				<Card className='todoList' style={{ position: 'absolute' }}>
					<Segment inverted>
						<div className='todoListlistHeader' style={{ cursor: 'move' }}>
							<Grid columns='2'>
								<Grid.Column>
									<Header as='h5' inverted>{this.props.title}</Header>
								</Grid.Column>
								<Grid.Column textAlign='right'>
									<Dropdown icon='cog'>
										<Dropdown.Menu>
											<Dropdown.Header content='Actions' style={{ color: '#000' }} />
											<Dropdown.Divider />
											<Dropdown.Item style={{ fontSize: '0.9rem' }} onClick={this.onClickSetting}>Edit Title</Dropdown.Item>
										</Dropdown.Menu>
									</Dropdown>
								</Grid.Column>
							</Grid>
						</div>
						<Divider inverted />
						<CardFrame lists={lists} cards={this.props.cards} />
					</Segment>
				</Card>
			</Grid.Column>
		)
	}
}