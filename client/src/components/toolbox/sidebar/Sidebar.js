/**
 * @overview: This componenet is for the sidebar of the toolbox. It is a navigation menu that contains routes
 * to the different sections of the toolbox.
 * 
 */

import React, { Component } from 'react'
import { Icon, Menu } from 'semantic-ui-react'

export default class Sidebar extends Component {
  state = {
    activeItem: 'dashboard',
    toolboxMenuItems: [
      {
        name: 'dashboard',
        icon: 'dashboard'
      },
      {
        name: 'inventory',
        icon: 'sitemap'
      },
      {
        name: 'orders',
        icon: 'shipping'
      },
      {
        name: 'todos',
        icon: 'ordered list'
      },
      {
        name: 'analytics',
        icon: 'line graph'
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
    const { activeItem } = this.state

    // Map toolbox menu items to sidebar
    const sidebar = this.state.toolboxMenuItems.map(item => {
      return (
        <Menu.Item
          key={item.id}
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
      <Menu icon='labeled' inverted vertical>
        <Menu.Item style={{ background: '#333' }}>
          sidebar
        </Menu.Item>
        {/* Input the sidebar menu */}
        {sidebar}
      </Menu>
    )
  }
}
