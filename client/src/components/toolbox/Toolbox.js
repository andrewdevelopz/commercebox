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
import CreateProducts from './inventory/products/create/CreateProducts'

import { Sidebar, Segment } from 'semantic-ui-react'

export default class Toolbox extends Component {
    state = {
        path: '',
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

    constructor({ match }) {
        super()
        this.state.path = match.path
    }

    render() {
        const { path } = this.state
        // Match the path to have the sidebar highlighted properly, we check it first before returning the actual path to prevent errors
        const active = this.props.location.pathname.match(/toolbox\/(.*)/) && this.props.location.pathname.match(/toolbox\/(.*)/)[1]

        return (
            <Sidebar.Pushable basic as={Segment} style={{ minHeight: '100vh' }}>
                <SidebarFrame name='toolbox' sidebarItems={this.state.sidebarItems} active={active} />
                <Sidebar.Pusher style={{ background: '#252525', minHeight: '100vh', transform: 'none', marginLeft: '7rem' }}>
                    <Switch>
                        <Route path={`${path}/dashboard`} component={Dashboard} />
                        <Route exact path={`${path}/inventory`} component={Inventory} />
                        <Route path={`${path}/inventory/createProducts`} component={CreateProducts} />
                        <Route path={`${path}/orders`} component={Orders} />
                        <Route path={`${path}/todos`} component={Todo} />
                        <Route path={`${path}/analytics`} component={Analytics} />
                    </Switch>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        )
    }
}