import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthenticationService from './AuthenticationService';

class AuthenticatedRoute extends Component {
    render() {
        if (AuthenticationService.isUserLoggedIn()) {
            console.log("Logged in");
            return <Route {...this.props} />
        } else {
            console.log("NOT Logged in");
            return <Redirect to="/login" />
        }

    }
}

export default AuthenticatedRoute;