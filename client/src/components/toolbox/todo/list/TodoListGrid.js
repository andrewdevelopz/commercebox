/**
 * @overview: This componenet is for the list template of the todo section in the app.
 */

import React, { Component } from 'react'

// Import custom components

// Semantic UI
import { Grid } from 'semantic-ui-react'

export default class TodoListFrame extends Component {
	state = {}

	componentDidMount() {
		const list = document.querySelectorAll('.todoList')

		this.moveTodoList(list)
    }

	// Move the list around the screen
	moveTodoList = (elements) => {
        // Array of positions for each list
        const positions = []

        for(const element of elements) {
            let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0
            // push and save the original list column into positions[]
            positions.push({left: element.offsetLeft, top: element.offsetTop})
            
            const header = element.querySelector(`.${element.className.match('todoList')[0]}listHeader`)
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
                // allow movement of element with mouse
				element.style.top = (element.offsetTop - pos2) + 'px'
                element.style.left = (element.offsetLeft - pos1) + 'px'
			}

			function closeMoveElement() {
				// stop moving when mouse button is released
				document.onmouseup = null
                document.onmousemove = null
                // get index of current loop element of elements
                const i = [].indexOf.call(elements, element)
                // set variables for element style and original positions
                const styleTop = element.style.top, styleLeft = element.style.left,
                      positionTop = positions[i].top, positionLeft = positions[i].left
                
                // If styleTop === to positions[0] || positions[1] || positions[2] || positions[3] || positions[4]
                // then swap the positions of the elements
                
                // set the elements position if not in allowed position
                if(styleTop !== positionTop && styleLeft !== positionLeft) {
                    element.style.top = positionTop + 'px'
                    element.style.left = positionLeft + 'px'
                }
            }
		}
	}

	render() {
		return (
			<Grid>
                {this.props.children}
            </Grid>
		)
	}
}
