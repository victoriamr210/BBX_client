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


class App extends Component{

  render() {
    return(
      <CookiesProvider>

        <Router>
          <Switch>
            <Route path='/' exact={true} component={ItemList}/>
            <Route path='/login' exact={true} component={Home}/>
            {/* <AuthenticatedRoute path="/item" exact component={ItemList} /> */}
            <AuthenticatedRoute path="/logout" exact component={Home} />
            <AuthenticatedRoute path='/item' exact={true} component={ItemList}/>
            <AuthenticatedRoute path='/item/update/:id' exact={true} component={ItemUpdate}/>
            <Route path='/item/new/' exact={true} component={ItemNew}/>
            <Route path='/item/details/:id' exact={true} component={ItemDetails}/>
          </Switch>
        </Router>
      </CookiesProvider>
    );
  }

}


export default App;
