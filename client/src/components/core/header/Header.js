/**
 * @overview: This componenet controls the header of the application. It contains items such as but not limited to navigation menu, logo 
 * and authentication buttons.
 * 
 */

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Input, Menu } from 'semantic-ui-react'
import logo from '../../../logo.svg'

export default class Header extends Component {
  state = {
    activeItem: '',
    isAuthenticated: false,
    navMenuItems: [
      {
        name: 'home',
        path: '/'
      },
      {
        name: 'toolbox',
        path: '/toolbox'
      },
      {
        name: 'about',
        path: '/about'
      },
      {
        name: 'contact',
        path: '/contact'
      }
    ],
    authMenuItems: [
      {
        name: 'login',
        path: '/login'
      },
      {
        name: 'signup',
        path: '/signup'
      },
      {
        name: 'logout',
        path: '/logout'
      },
      {
        name: 'myaccount',
        path: '/myaccount'
      }
    ]
  }

  constructor() {
    super()
    // Call for each state that require an id before the component mounts. The id will be used as a key for rendering the component
    this.setIdForItems('navMenuItems')
    this.setIdForItems('authMenuItems')
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

    // Map the nav menu items
    const navMenu = this.state.navMenuItems.map(item => {
      return (
        <Menu.Item
          key={item.id}
          as={Link}
          to={item.path}
          name={item.name}
          active={activeItem === item.name}
          onClick={this.handleItemClick}
        >
          <span className='capitalize'>
            {item.name}  
          </span>
        </Menu.Item>
      )
    })

    // Filter and map the authentication menu items
    const authMenu = this.state.authMenuItems.filter(item => {
      // If the user is authenticated we need to remove login/signup
      if(this.state.isAuthenticated) {
        return item.name !== 'login' && item.name !== 'signup'
      } else {
        return item.name !== 'logout' && item.name !== 'myaccount'
      }
    }).map(item => {
      return (
        <Menu.Item 
          key={item.id}
          as={Link}
          to={item.path}
        >
          <Button><span className='capitalize'>{item.name}</span></Button>
        </Menu.Item>
      )
    })

    return (
      <header>
        <Menu stackable inverted size='large'>
          <Menu.Item>
            <img src={logo} alt='logo' />
          </Menu.Item>

          {/* Input the nav menu */}
          {navMenu}

          <Menu.Menu position='right'>
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
