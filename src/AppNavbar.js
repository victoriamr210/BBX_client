import React, { Component } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import AuthenticationService from './AuthenticationService';
import { Button } from 'react-bootstrap';

class AppNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {isOpen: false};
    this.logout = this.logout.bind(this);
    this.userInfo = this.userInfo.bind(this);
  }

  logout(){
    AuthenticationService.logout()
    .then(response =>  {
      this.props.history.push('/login');
    });
  }

  userInfo(){
    let username = AuthenticationService.getLoggedInUserName();
    this.props.history.push('/user/get/' + username)
  }



  render() {
    return <Navbar color="dark" dark expand="md">
      <NavbarBrand tag={Link} to="/item">Home</NavbarBrand>
      <NavbarBrand tag={Link} to="/user">Manage Users</NavbarBrand>
      <NavbarBrand className="float-right">
        <Button  color="primary" onClick={this.logout}>Logout</Button>
      </NavbarBrand>
      <NavbarBrand>
        <Button color= "success" onClick={this.userInfo}>My Profile</Button>
      </NavbarBrand>
    </Navbar>;
  }
}

export default withRouter(AppNavbar);