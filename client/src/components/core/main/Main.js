/**
 * @overview: This componenet is the main component that houses all components that belong in the <main/> element.
 * 
 */

import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

// Import custom components
import Home from '../../public/home/Home'
import Toolbox from '../../toolbox/Toolbox'

export default class Main extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/toolbox' component={Toolbox} />
        </Switch>
      </main>
    )
  }
}
