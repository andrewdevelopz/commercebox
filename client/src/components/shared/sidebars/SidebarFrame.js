/**
 * @overview: This componenet is for the sidebar of the application. It is a template for general sidebars in the application
 */

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
    Icon,
    Menu,
    Sidebar,
    Header
} from 'semantic-ui-react'

export default class SidebarFrame extends Component {
    state = {
        activeItem: 'dashboard',
        animation: 'push',
        direction: 'left',
        visible: true
    }

    // Handle when a menu item has been clicked
    handleItemClick = (name) => {
        // Set the active item when a nav menu is clicked
        this.setState({ activeItem: name })
    }

    render() {
        // Destructure the state
        const { activeItem, animation, direction, visible } = this.state

        // Map sidebar menu items to sidebar
        const sidebar = this.props.sidebarItems.map((item, index) => {
            return (
                <Menu.Item
                    key={index}
                    as={Link}
                    to={item.path}
                    name={item.name}
                    active={activeItem === item.name}
                    onClick={() => this.handleItemClick(item.name)}
                >
                    <Icon name={item.icon} />
                    {item.name}
                </Menu.Item>
            )
        })

        return (
            <Sidebar
                as={Menu}
                animation={animation}
                direction={direction}
                icon='labeled'
                inverted
                vertical
                visible={visible}
                style={{ minWidth: '7rem', maxWidth: '7rem' }}
            >
                <Menu.Item style={{ background: '#000' }}>
                    <Header as="h5" inverted>{this.props.name}</Header>
                </Menu.Item>

                {/* Input the sidebar menu */}
                {sidebar}
            </Sidebar>
        )
    }
}
