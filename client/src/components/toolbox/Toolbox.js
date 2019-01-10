/**
 * @overview: This componenet is for the toolbox section of the application. It is the parent of all tools contained
 * within the toolbox. For example the orders, todos, inventory, etc. components are all childrens of toolbox.
 * 
 * @todo: Make it so the sidebar can be hidden and revealed when a button is pressed
 */

import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Container, Sidebar, Segment } from 'semantic-ui-react'

// Import custom components
import ToolboxSidebar from './sidebar/ToolboxSidebar'

export default class Toolbox extends Component {
  state = {}
  
  render() {
    return (
      <Container fluid>
        <Sidebar.Pushable basic as={Segment} style={{ minHeight: '100vh' }}>
          <ToolboxSidebar />
          <Sidebar.Pusher style={{ transform: 'translate3d(7rem,0,0)' }}>
            <Segment basic inverted style={{ minHeight: '100vh' }}>
              <Switch>
                <Route path='/toolbox/dashboard' render={() => 'Hello from dashboard route'} />
                <Route path='/toolbox/inventory' render={() => 'Hello from inventory route'} />
                <Route path='/toolbox/orders' render={() => 'Hello from orders route'} />
                <Route path='/toolbox/todos' render={() => 'Hello from todos route'} />
                <Route path='/toolbox/analytics' render={() => 'Hello from analytics route'} />
              </Switch>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Container>
    )
  }
}
