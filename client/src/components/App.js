import React, { Component } from 'react'
import './App.css'

// Import custom components
import Header from './core/header/Header'
import Main from './core/main/Main'
import Footer from './core/footer/Footer'
import { AuthProvider } from './auth/AuthContext'

export default class App extends Component {
    render() {
        return (
            <div>
                <AuthProvider>
                    <Header />
                    <Main />
                </AuthProvider>
                <Footer />
            </div>
        )
    }
}
