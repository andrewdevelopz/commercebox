/**
 * @overview: This componenet is for the sidebar of the toolbox. It is a navigation menu that contains routes
 * to the different sections of the toolbox.
 * 
 */

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { 
  Icon, 
  Menu, 
  Sidebar,
  Header
} from 'semantic-ui-react'

export default class ToolboxSidebar extends Component {
  state = {
    activeItem: 'dashboard',
    animation: 'push',
    direction: 'left',
    visible: true,
    toolboxMenuItems: [
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

  constructor() {
    super()
    this.setIdForItems('toolboxMenuItems')
  }

  // Handle when a menu item has been clicked
  handleItemClick = (e, { name }) => {
    // Set the active item when a nav menu is clicked
    this.setState({ activeItem: name })
  }

  // Set the id for each state property that requires an id
  setIdForItems(prop) {
    // Loop through the array from the property passed in
    for(const item of this.state[prop]) {
      // Get the index of the item that is inside the array
      const index = this.state[prop].indexOf(item)
      item.id = index
    }
  }
  
  render() {
    // To determine which menu is active
    const { activeItem, animation, direction, visible } = this.state

    // Map toolbox menu items to sidebar
    const sidebar = this.state.toolboxMenuItems.map(item => {
      return (
        <Menu.Item
          key={item.id}
          as={Link}
          to={item.path}
          name={item.name}
          active={activeItem === item.name}
          onClick={this.handleItemClick}
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
      >
        <Menu.Item style={{ background: '#000' }}>
          <Header as="h5" inverted>toolbox</Header>
        </Menu.Item>

        {/* Input the sidebar menu */}
        {sidebar}
      </Sidebar>
    )
  }
}
