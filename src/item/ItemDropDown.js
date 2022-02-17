import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, 
  Form, FormGroup, FormFeedback, Label, Input, Button} from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import ItemService from './services/ItemService';

class ItemDropDown extends Component{

  constructor(props){
    super(props);
    this.state = {
      isOpen: false,
      item: props.item,
      show: false,
      error: false,
      reasonDeactivate: ''
    }
  }

  handleShow(state) {
    if(state === 'ACTIVE'){
      this.setState({ show: true });
    } else{
      alert("This item is already discontinued");
    }
  }

  handleValidation(event){
    if(!event.target.value){
      this.setState({error: true})
    }
  }

  handleClose = () => {
    this.setState({ show: false });
  };

  handleSubmit(idItem){
    this.handleClose();
    ItemService.deactivateItem(idItem, this.state.reasonDeactivate)
      .then(response => {
        this.props.history.push('/item')
      });
    
  }

  handleChange(event){
    let reasonDeactivate = event.target.value;
    this.setState({reasonDeactivate});
  }

  toggle = () => {
    this.setState({isOpen: !this.state.isOpen})
  }

  render () {
    const {item, show, error} = this.state;
    return(
     <td>
    <Dropdown isOpen={this.state.isOpen} toggle={this.toggle}>
          <DropdownToggle caret>Options</DropdownToggle>
          <DropdownMenu>
            <DropdownItem tag={Link} to={'/item/details/' + item.idItem}>Info</DropdownItem>
            <DropdownItem tag={Link} to={"/item/update/" + item.idItem}>Edit</DropdownItem>
            <DropdownItem disabled={item.state !== 'ACTIVE'} onClick={() => this.handleShow(item.state)}>Deactivate</DropdownItem>
          </DropdownMenu>
        </Dropdown>
          <Modal show={show} onHide={this.handleClose}>
            <Modal.Header closeButton>
          <Modal.Title>Deactivate Item {item.itemCode}?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <FormGroup>
                  <Label>Reason</Label>
                  <Input type="text" name="reason" id="reason" 
                    onChange={(e) =>{
                      this.handleValidation(e);
                      this.handleChange(e);
                    }}></Input>
                    <FormFeedback>{error}</FormFeedback>
                </FormGroup>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => this.handleSubmit(item.idItem)}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
          </td>
    );
  }

}

export default withRouter(ItemDropDown);