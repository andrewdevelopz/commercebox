/**
 * @overview: This componenet is for the todo section of the toolbox. It is the main component for the todo section and all child components
 * for the todo ends here.
 */

import React, { Component } from 'react'

// Import custom components
import TodoListGrid from './list/TodoListGrid'
import TodoListFrame from './list/TodoListFrame'

// Semantic UI
import { Segment } from 'semantic-ui-react'

export default class Toolbox extends Component {
	state = {
		lists: [
			{
				order: 0,
				title: 'Ideas'
			},
			{
				order: 1,
				title: 'To Do'
			},
			{
				order: 2,
				title: 'Working'
			},
			{
				order: 3,
				title: 'Completed'
			},
			{
				order: 4,
				title: 'Other'
			}
		]
	}

	componentDidMount() {
		const lists = document.querySelectorAll('.todoList')

		this.moveTodoList(lists)
    }

	// Move the list around the screen
	moveTodoList = (lists) => {
        // array of offset and positions for each list
		const offsetList = []
		const positions = []

		let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0

        for(const list of lists) {
			// get index for the current loop of list
			const i = [].indexOf.call(lists, list)

            // push and save the original list offset into offsetList[]
			offsetList.push({left: list.offsetLeft, top: list.offsetTop})
			positions.push({pos: list.getBoundingClientRect(), index: i})
            
            const header = list.querySelector(`.${list.className.match('todoList')[0]}listHeader`)
			if(header) {
				// if present, the header is where you move the element from
				header.onmousedown = e => moveOnMouseDown(e, list)
			} else {
				// else, move the element from anywhere inside the div
				list.onmousedown = e => moveOnMouseDown(e, list)
			}
		}

		const moveOnMouseDown = (e, list) => {
			e = e || window.event
			e.preventDefault()
			list.style.zIndex = 99
			// get the mouse cursor position at startup
			pos3 = e.clientX
			pos4 = e.clientY
			document.onmouseup = () => closeMoveList(list)
			// call a function whenever the cursor moves
			document.onmousemove = e => listMove(e, list)
		}

		const listMove = (e, list) => {
			e = e || window.event
			e.preventDefault()
			// calculate the new cursor position
			pos1 = pos3 - e.clientX
			pos2 = pos4 - e.clientY
			pos3 = e.clientX
			pos4 = e.clientY
			// allow movement of element with mouse
			list.style.top = (list.offsetTop - pos2) + 'px'
			list.style.left = (list.offsetLeft - pos1) + 'px'

			// highlight list when switchable
			const currIndex = [].indexOf.call(lists, list)
			const currPos = list.getBoundingClientRect()

			// track each loop of positions for the index
			let track = 0
			for(const position of positions) {
				// if, list is dragged properly switch its positions
				if(currIndex !== position.index && currPos.left > position.pos.left && currPos.left < position.pos.left + position.pos.width) {
					// lower opacity of back list when hovering for switch
					lists[track].style.opacity = 0.5
				} else {
					lists[track].style.opacity = 1
				}
				track++
			}
		}

		const closeMoveList = (list) => {
			// stop moving when mouse button is released
			document.onmouseup = null
			document.onmousemove = null
			// set css styles on mouseup
			list.style.zIndex = 98
			highlightElement(list)

			/** @todo - looks ugly now but make it look fancier (maybe not use borders?) */
			// highlist the element that has been switched
			function highlightElement(el) {
				el.style.border = '1px #ff0000 solid'
				el.style.transition = 'border-color 1s ease-in-out'
				setTimeout(() => {
					el.style.border = 'none'
				}, 1000)
			}

			// get index for the current loop of list
			const currIndex = [].indexOf.call(lists, list)
			// get dragged position of the selected list
			const currPos = list.getBoundingClientRect()

			// track each loop of positions for the index
			let track = 0
			const setStateInfo = { currIndex: 0, track: 0 }
			for(const position of positions) {
				// if, list is dragged properly switch its positions
				if(currIndex !== position.index && currPos.left > position.pos.left && currPos.left < position.pos.left + position.pos.width) {
					// set setStateInfo to setState outside of loop
					setStateInfo.currIndex = currIndex
					setStateInfo.track = track
				}
				lists[track].style.opacity = 1
				track++
			}

			// set state based on setStateInfo{}
			this.setState(prevState => {
				// swap the list
				prevState.lists[setStateInfo.currIndex].order = setStateInfo.track
				prevState.lists[setStateInfo.track].order = setStateInfo.currIndex
				return {
					lists: prevState.lists
				}
			})

			// set the lists position if not in allowed position
			if(list.style.top !== offsetList[currIndex].top && list.style.left !== offsetList[currIndex].left) {
				list.style.top = offsetList[currIndex].top + 'px'
				list.style.left = offsetList[currIndex].left + 'px'
			}
		}
	}

	render() {
		// Genereate each list based on state
		const generateLists = () => {
			const { lists } = this.state

			// sort based on order
			lists.sort((a, b) => {
				return a.order - b.order
			})

			return lists.map((list, index) => {
				return (
					<TodoListFrame key={index} title={list.title} />
				)
			})
		}

		return (
			<Segment inverted style={{ background: '#252525', minHeight: '100vh' }}>
				<TodoListGrid>
					{ generateLists() }
				</TodoListGrid>
			</Segment>
		)
	}
}
