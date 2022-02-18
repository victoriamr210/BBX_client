import React, { Component } from 'react';
import {Button, Container,  Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import UserService from '../services/UserService';
import AppNavbar from '../AppNavbar';
import { Table } from 'react-bootstrap';
import UserDropDown from './UserDropDown';


class UserList extends Component {

  constructor(props){
    super(props)
    this.state = {
      users: [],
      redirectLogin: false,
      isLoading: true,
    };

    this.loadUsers = this.loadUsers.bind(this);
    this.remove = this.remove.bind(this);
    this.isDroppedDown = this.isDroppedDown.bind(this);
  }


  isDroppedDown(user){
    const {dropdownOpen, users} = this.state;
    return dropdownOpen[users.indexOf(user)];
  }

  loadUsers(){
    UserService.listUsers()
      .then(response => {
        this.setState({users: response.data, isLoading: false});
      })
      .catch(error => {
        if(error.response.status === 401)
          this.setState({redirectLogin: true})
      });
  }

  remove() {

  }
  componentDidUpdate(){
    this.loadUsers();
  }

  componentDidMount() {
    this.loadUsers();
  }

  render() {
    const {isLoading, users, redirectLogin} = this.state;
    
    if(redirectLogin){
      return <Redirect to="/login" /> 
    }

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const userList = users.map(user => {
      // let index = users.indexOf(user);
      return <tr key={user.idUser}>
        <td>{user.name}</td>
        <td>{user.username}</td>
        <UserDropDown user={user.idUser}></UserDropDown>
        {/* <Dropdown isOpen={() => this.isDroppedDown(user)} toggle={() => this.toggleDropDown(user)}>
          <DropdownToggle caret>Options</DropdownToggle>
          <DropdownMenu>
            <DropdownItem tag={Link} to={'/user/update/' + user.idUser}>Edit</DropdownItem>
            <DropdownItem onClick={() => this.remove(user.idUser)}>Delete</DropdownItem>
          </DropdownMenu>
        </Dropdown> */}
      </tr>
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/user/new">Add User</Button>
          </div>
          <h3>User List</h3>
          <Table className="mt-2">
            <thead>
              <tr>
                <th width="20%">Name</th>
                <th width="20%">Username</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {userList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default UserList;