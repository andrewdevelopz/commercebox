/**
 * @overview: This componenet is for the cards of the application. It is a template for general cards in the application
 */

import React, { Component } from 'react'

import { 
  Header,
  Segment,
  Divider
} from 'semantic-ui-react'

export default class CardFrame extends Component {
  state = {}

  render() {
    return (
      <Segment inverted>
        <Header as='h3'>{this.props.header}</Header>
        <Divider />
        {this.props.children}
      </Segment>
    )
  }
}
