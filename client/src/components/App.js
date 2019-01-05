import React, { Component } from 'react'
import './App.css'

// Import Components
import Header from './core/header/Header'
import Main from './core/main/Main'
import Footer from './core/footer/Footer'

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Main />
        <Footer />
      </div>
    )
  }
}
