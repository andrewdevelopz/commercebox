import React, { Component } from 'react'
import { Input, Menu } from 'semantic-ui-react'
import logo from '../../../logo.svg'

export default class Header extends Component {
  constructor() {
    super()
    this.state = {}
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    return (
      <header>
        <Menu stackable inverted size="huge">
          <Menu.Item>
            <img src={logo} alt="logo" />
          </Menu.Item>

          <Menu.Item
            name='home'
            href="/"
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          >
            Home
          </Menu.Item>

          <Menu.Item
            name='orders'
            href="/orders"
            active={activeItem === 'orders'}
            onClick={this.handleItemClick}
          >
            Orders
          </Menu.Item>

          <Menu.Item 
            name='login'
            href="/login"
            active={activeItem === 'login'} 
            onClick={this.handleItemClick}
          >
            Login
          </Menu.Item>

          <Menu.Item>
            <Input icon='search' placeholder='Search...' />
          </Menu.Item>
        </Menu>
      </header>
    )
  }
}
