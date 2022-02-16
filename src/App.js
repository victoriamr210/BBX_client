import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ItemList from './ItemList';
import ItemUpdate from './ItemUpdate';
import ItemNew from './ItemNew';
import ItemDetails from './ItemDetails';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import AuthenticatedRoute from './AuthenticatedRoute';
import UserList from './UserList';


class App extends Component{

  render() {
    return(
      <CookiesProvider>

        <Router>
          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/login' exact={true} component={Home}/>
            <AuthenticatedRoute path="/logout" exact component={Home} />
            <AuthenticatedRoute path='/item' exact={true} component={ItemList}/>
            <AuthenticatedRoute path='/item/update/:id' exact={true} component={ItemUpdate}/>
            <AuthenticatedRoute path='/item/new/' exact={true} component={ItemNew}/>
            <AuthenticatedRoute path='/item/details/:id' exact={true} component={ItemDetails}/>
            <AuthenticatedRoute path='/user' exact={true} component={UserList}/>
          </Switch>
        </Router>
      </CookiesProvider>
    );
  }

}


export default App;
