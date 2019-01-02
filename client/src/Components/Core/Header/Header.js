/**
 * @overview: This componenet controls the header of the application. It contains items such as but not limited to navigation menu, logo 
 * and authentication buttons.
 * 
 * @todo: We need to capatilize the first letter of each menu item. Not sure if we should make a sepearte library for misc functions or if
 * there is a better more elegant solution to this issue.
 * 
 */

import React, { Component } from 'react'
import { Input, Menu, Button } from 'semantic-ui-react'
import logo from '../../../logo.svg'

export default class Header extends Component {
  state = {
    activeItem: '',
    isAuthenticated: false,
    navMenuItems: [
      {
        id: 0,
        name: 'home',
        path: '/'
      },
      {
        id: 1,
        name: 'orders',
        path: '/orders'
      }
    ],
    authMenuItems: [
      {
        id: 0,
        name: 'login',
        path: '/login'
      },
      {
        id: 1,
        name: 'logout',
        path: '/logout'
      },
      {
        id: 2,
        name: 'signup',
        path: '/signup'
      }
    ]
  }

  // Handle when a menu item has been clicked
  handleItemClick = (e, { name }) => {
    // Set the active item when a nav menu is clicked
    this.setState({ activeItem: name })
  }

  render() {
    // To determine which menu is active
    const { activeItem } = this.state

    // Map the nav menu items
    const navMenu = this.state.navMenuItems.map(item => {
      return (
        <Menu.Item
          key={item.id}
          name={item.name}
          href={item.path}
          active={activeItem === item.name}
          onClick={this.handleItemClick}
        >
          {item.name}
        </Menu.Item>
      )
    })

    // Filter and map the authentication menu items
    const authMenu = this.state.authMenuItems.filter(item => {
      // If the user is authenticated we need to remove login/signup
      if(this.state.isAuthenticated) {
        return item.name !== 'login' && item.name !== 'signup'
      } else {
        return item.name !== 'logout'
      }
    }).map(item => {
      return (
        <Menu.Item key={item.id}>
          <Button>{item.name}</Button>
        </Menu.Item>
      )
    })

    return (
      <header>
        <Menu stackable inverted size="large">
          <Menu.Item>
            <img src={logo} alt="logo" />
          </Menu.Item>

          {/* Input the nav menu */}
          {navMenu}

          <Menu.Menu position="right">
            <Menu.Item>
              <Input icon='search' placeholder='Search...' />
            </Menu.Item>
            {/* Input the auth menu */}
            {authMenu}
          </Menu.Menu>
        </Menu>
      </header>
    )
  }
}
