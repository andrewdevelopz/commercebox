/**
 * @overview: This componenet controls the header of the application. It contains items such as but not limited to navigation menu, logo 
 * and authentication buttons.
 */

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Input, Menu } from 'semantic-ui-react'
import logo from '../../../logo.svg'

// Import custom components
import { AuthConsumer } from '../../auth/AuthContext'

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
        name: 'register',
        path: '/register'
      },
      {
        name: 'myaccount',
        path: '/myaccount'
      },
      {
        name: 'logout',
        path: '/logout'
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
  setIdForItems = (prop) => {
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
    const navMenu = (isAuth) => {
      return this.state.navMenuItems.map(item => {
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
    }

    // Filter and map the authentication menu items
    const authMenu = (isAuth) => {
      return this.state.authMenuItems.filter(item => {
        // If the user is authenticated we need to remove login && register
        if(isAuth) {
          return item.name !== 'login' && item.name !== 'register'
        } else {
          return item.name !== 'logout' && item.name !== 'myaccount'
        }
      }).map(item => {
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
    } 

    return (
      <header>
        <AuthConsumer>
          {({ isAuth }) => (
            <Menu stackable inverted size='large' style={{ background: '#111' }}>
              <Menu.Item>
                <img src={logo} alt='logo' />
              </Menu.Item>

              {/* Input the nav menu */}
              {navMenu(isAuth)}

              <Menu.Menu position='right'>
                <Menu.Item>
                  <Input icon='search' placeholder='Search...' />
                </Menu.Item>
                {/* Input the auth menu */}
                {authMenu(isAuth)}
              </Menu.Menu>
            </Menu>
          )}
        </AuthConsumer>
      </header>
    )
  }
}
