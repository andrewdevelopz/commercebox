/**
 * @overview: This component is for the toolbox section of the application. It is the parent of all tools contained
 * within the toolbox. For example the orders, todos, inventory, etc. components are all childrens of toolbox.
 * 
 * @todo: Make it so the sidebar can be hidden and revealed when a button is pressed
 */

import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

// Import custom components
import SidebarFrame from '../shared/sidebars/SidebarFrame'
import Dashboard from './dashboard/Dashboard'
import Inventory from './inventory/Inventory'
import Orders from './orders/Orders'
import Todo from './todo/Todo'
import Analytics from './analytics/Analytics'

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
                    <Switch>
                        <Route path='/toolbox/dashboard' component={Dashboard} />
                        <Route path='/toolbox/inventory' component={Inventory} />
                        <Route path='/toolbox/orders' component={Orders} />
                        <Route path='/toolbox/todos' component={Todo} />
                        <Route path='/toolbox/analytics' component={Analytics} />
                    </Switch>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        )
    }
}
