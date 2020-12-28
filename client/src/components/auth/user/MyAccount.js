/**
 * @overview: This componenet is for the login section of the application.
 */

import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

// Import custom components
import SidebarFrame from '../../shared/sidebars/SidebarFrame';
import Profile from './profile/Profile';

import {
    Sidebar,
    Segment
} from 'semantic-ui-react';

export default class MyAccount extends Component {
    state = {
        path: '',
        sidebarItems: [
            {
                name: 'profile',
                icon: 'address card',
                path: '/myaccount/profile'
            }
        ]
    }

    /**
     *  Match the path to have the sidebar highlighted properly
     */
    constructor({ match }) {
        super();
        this.state.path = match.path;
    }

    render() {
        // Match the path to have the sidebar highlighted properly, we check it first before returning the actual path to prevent errors
        const active = this.props.location.pathname.match(/myaccount\/(.*)/) && this.props.location.pathname.match(/myaccount\/(.*)/)[1];

        return (
            <Sidebar.Pushable basic as={Segment} style={{ minHeight: '100vh' }}>
                <SidebarFrame name='account' sidebarItems={this.state.sidebarItems} active={active} />
                <Sidebar.Pusher style={{ background: '#252525', minHeight: '100vh', transform: 'none', marginLeft: '7rem' }}>
                    <Switch>
                        <Route path='/myaccount/profile' component={Profile} />
                    </Switch>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        )
    }
}
