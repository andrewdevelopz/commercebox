import React, { Component } from 'react'
import Header from './core/header/Header'
import Home from './public/home/Home'
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Home />
      </div>
    )
  }
}
