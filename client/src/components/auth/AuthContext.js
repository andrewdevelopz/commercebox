/**
 * @overview: This componenet defines the authentication context of the application. It determines if a user is logged in or not.
 */

import React, { Component } from 'react';

// Import custom components
import { fetchAuth } from '../shared/services/httpService';
import { loadToken, storeUserLocalStorage, clearUserLocalStorage } from '../auth/services/authService';

const AuthContext = React.createContext();

export default class AuthProvider extends Component {
    state = {
        isAuth: false
    }
    token;

    constructor() {
        super();
        this.token = loadToken();
        this.token && (this.state.isAuth = true);
        this.token = null;
    }

    // Method to login a user
    login = async (user) => {
        try {
            // Make a post request to api/auth/login
            const res = await fetchAuth('login', 'post', {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, user);

            if (res.success) {
                storeUserLocalStorage(res.token);
                this.setState({ isAuth: true });
            }

            // Return the http response for the login form
            return res;
        } catch (e) {
            return e;
        }
    }

    // Method to logout a user
    logout = () => {
        this.token = loadToken();

        // Make delete request to /logout
        fetchAuth('logout', 'post', {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': this.token
        });

        this.token = null;
        clearUserLocalStorage();
        this.setState({ isAuth: false });
    }

    render() {
        const { isAuth } = this.state;

        return (
            <AuthContext.Provider
                value={{
                    isAuth: isAuth,
                    login: this.login,
                    logout: this.logout
                }}
            >
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer }
