import React, { Component } from 'react'
import './App.css'

// Import Components
import Header from './core/header/Header'
import Home from './public/home/Home'
import Footer from './core/footer/Footer'
import Toolbox from './toolbox/Toolbox'

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        {/* Until the router is implemented comment out the components when working on a certain section */}
        {/* <Home /> */}
        <Toolbox />
        <Footer />
      </div>
    )
  }
}
