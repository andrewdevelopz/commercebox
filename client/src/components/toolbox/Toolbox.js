/**
 * @overview: This componenet is for the toolbox section of the application. It is the parent of all tools contained
 * within the toolbox. For example the orders, todos, inventory, etc. components are all childrens of toolbox.
 * 
 */

import React, { Component } from 'react'
import { Container, Segment, Grid } from 'semantic-ui-react'

// Import Components
import Sidebar from './sidebar/Sidebar'

export default class Toolbox extends Component {
  state = {}
  
  render() {
    return (
      <Container fluid style={{ padding: '0.5em', background: '#111' }}>
        <Grid>
          <Grid.Row>

            {/* Sidebar */}
            <Grid.Column width={1}>
              <Sidebar />
            </Grid.Column>

            {/* Content */}
            <Grid.Column width={15}>
              <Segment inverted>
                A bunch of random stuff
              </Segment>
            </Grid.Column>

          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}
