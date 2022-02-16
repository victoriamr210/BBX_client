import React, { Component } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import AuthenticationService from './AuthenticationService';
import { Button } from 'react-bootstrap';


export default class AppNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {isOpen: false};
    this.logout = this.logout.bind(this);
  }

  logout(){
    AuthenticationService.logout();
    this.props.push("/login");
  }



  render() {
    return <Navbar color="dark" dark expand="md">
      <NavbarBrand tag={Link} to="/item">Home</NavbarBrand>
      <NavbarBrand tag={Link} to="/user">Manage Users</NavbarBrand>
      <Button color="primary" onClick={this.logout}>Logout</Button>
      {/* <NavbarBrand>Logout</NavbarBrand> */}
      {/* <NavbarToggler onClick={this.toggle}/> */}
      {/* <Collapse isOpen={this.state.isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="https://github.com/oktadeveloper/okta-spring-boot-react-crud-example">GitHub</NavLink>
          </NavItem>
        </Nav>
      </Collapse> */}
    </Navbar>;
  }
}