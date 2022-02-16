import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import { Link } from 'react-router-dom';


class UserDropDown extends Component{
  constructor(props){
    super(props);
    this.state = {
      isOpen: false,
      idUser: props.idUser
    }
  }

  toggle = () => {
    this.setState({isOpen: !this.state.isOpen})
  }

  render(){
    const {idUser} = this.state;
    return (
      <Dropdown isOpen={this.state.isOpen} toggle={this.toggle}>
          <DropdownToggle caret>Options</DropdownToggle>
          <DropdownMenu>
            <DropdownItem tag={Link} to={'/user/update/' + idUser}>Edit</DropdownItem>
            <DropdownItem onClick={() => this.remove(idUser)}>Delete</DropdownItem>
          </DropdownMenu>
        </Dropdown>
    );
  }
}

export default UserDropDown;