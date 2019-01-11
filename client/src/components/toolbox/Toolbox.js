/**
 * @overview: This componenet is for the toolbox section of the application. It is the parent of all tools contained
 * within the toolbox. For example the orders, todos, inventory, etc. components are all childrens of toolbox.
 * 
 * @todo: Make it so the sidebar can be hidden and revealed when a button is pressed
 */

import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

// Import custom components
import SidebarFrame from '../shared/sidebar/SidebarFrame'

import { Sidebar, Segment } from 'semantic-ui-react'

export default class Toolbox extends Component {
  state = {
    sidebarItems: [
      {
        name: 'dashboard',
        icon: 'dashboard',
        path: '/toolbox/dashboard'
      },
      {
        name: 'inventory',
        icon: 'sitemap',
        path: '/toolbox/inventory'
      },
      {
        name: 'orders',
        icon: 'shipping',
        path: '/toolbox/orders'
      },
      {
        name: 'todos',
        icon: 'ordered list',
        path: '/toolbox/todos'
      },
      {
        name: 'analytics',
        icon: 'line graph',
        path: '/toolbox/analytics'
      }
    ]
  }
  
  render() {
    return (
      <Sidebar.Pushable basic as={Segment} style={{ minHeight: '100vh' }}>
        <SidebarFrame name='toolbox' sidebarItems={this.state.sidebarItems} />
        <Sidebar.Pusher style={{ background: '#252525', minHeight: '100vh', transform: 'none', marginLeft: '7rem' }}>
          <Segment inverted style={{ background: '#252525', minHeight: '100vh' }}>
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
    )
  }
}
