import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ItemList from './item/ItemList';
import ItemUpdate from './item/ItemUpdate';
import ItemNew from './item/ItemNew';
import ItemDetails from './item/ItemDetails';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import AuthenticatedRoute from './AuthenticatedRoute';
import UserList from './user/UserList';
import UserInfo from './user/UserInfo';


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
            <AuthenticatedRoute path='/user/get/:id' exact={true} component={UserInfo}/>
          </Switch>
        </Router>
      </CookiesProvider>
    );
  }

}


export default App;
