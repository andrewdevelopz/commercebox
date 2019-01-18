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

	componentDidMount() {
		const list = document.querySelectorAll('.todoList')
		// const gridColumns = document.querySelectorAll('.gridColumn')

		this.moveTodoList(list)
	}

	// Move the list around the screen
	moveTodoList = (elements) => {
		for(const element of elements) {
			let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0

			const header = element.querySelector(`.${element.className.match('todoList')[0]}listHeader`)

			// console.log(element.getBoundingClientRect())

			if(header) {
				// if present, the header is where you move the element from
				header.addEventListener('mousedown', moveOnMouseDown)
			} else {
				// else, move the element from anywhere inside the div
				element.addEventListener('mousedown', moveOnMouseDown)
			}

			function moveOnMouseDown(e) {
				e = e || window.event
				e.preventDefault()
				// get the mouse cursor position at startup
				pos3 = e.clientX
				pos4 = e.clientY
				document.onmouseup = closeMoveElement
				// call a function whenever the cursor moves
				document.onmousemove = elementMove
			}

			function elementMove(e) {
				e = e || window.event
				e.preventDefault()
				// calculate the new cursor position
				pos1 = pos3 - e.clientX
				pos2 = pos4 - e.clientY
				pos3 = e.clientX
				pos4 = e.clientY
				// set the element's new position
				element.style.top = (element.offsetTop - pos2) + 'px'
				element.style.left = (element.offsetLeft - pos1) + 'px'
			}

			function closeMoveElement() {
				// stop moving when mouse button is released
				document.onmouseup = null
				document.onmousemove = null
			}
		}
	}

	render() {
		// Genereate the list based on the amount property
		const generateLists = () => {
			const listArray = []
			// loop based on the amount passed from props, push each list item to array, then return the array
			for(let i = 0; i < this.props.amount; i++) {
				listArray.push(
					<Grid.Column key={i} className='gridColumn' style={{ margin: '0.5rem' }} width='3'>
						<Card className='todoList' style={{ position: 'absolute' }}>
							<Segment inverted>
								<div className='todoListlistHeader' style={{ cursor: 'move' }}>
									{this.props.test}
									<List horizontal inverted>
										<List.Item>
											<Header as='h5'>Title Of List</Header>
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
			return listArray
		}

		return (
			<React.Fragment>
				{ generateLists().map(list => list) }
			</React.Fragment>
		)
	}
}
