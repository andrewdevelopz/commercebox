/**
 * @overview: This component is for the inventory section of the toolbox. It is the main component for the inventory section and all child components
 * for the inventory ends here.
 */

import React, { Component } from 'react'

// Semantic UI
import { Segment } from 'semantic-ui-react'

export default class Inventory extends Component {
    state = {}

    render() {
        return (
            <Segment inverted style={{ background: '#252525', minHeight: '100vh', width: '106rem' }}>
                Welcome to the inventory
            </Segment>
        )
    }
}
