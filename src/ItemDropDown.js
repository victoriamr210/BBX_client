import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import { Link } from 'react-router-dom';

class ItemDropDown extends Component{

  constructor(props){
    super(props);
    this.state = {
      isOpen: false,
      item: props.item
    }
  }

  toggle = () => {
    this.setState({isOpen: !this.state.isOpen})
  }

  render () {
    const {item} = this.state;
    return(

    <Dropdown isOpen={this.state.isOpen} toggle={this.toggle}>
          <DropdownToggle caret>Options</DropdownToggle>
          <DropdownMenu>
            <DropdownItem tag={Link} to={'/item/details/' + item.idItem}>Info</DropdownItem>
            <DropdownItem tag={Link} to={"/item/update/" + item.idItem}>Edit</DropdownItem>
       
          </DropdownMenu>
        </Dropdown>
          // <Modal show={show} onHide={this.handleClose}>
          //   <Modal.Header closeButton>
          // <Modal.Title>Deactivate Item {item.itemCode}?</Modal.Title>
          //   </Modal.Header>
          //   <Modal.Body>
          //     <Form>
          //       <FormGroup>
          //         <Label>Reason</Label>
          //         <Input type="text" name="reason" id="reason" 
          //           onChange={(e) =>{
          //             this.handleValidation(e);
          //             this.handleChange(e);
          //           }}></Input>
          //           <FormFeedback>{error}</FormFeedback>
          //       </FormGroup>
          //     </Form>
          //   </Modal.Body>
          //   <Modal.Footer>
          //     <Button variant="secondary" onClick={this.handleClose}>
          //       Cancel
          //     </Button>
          //     <Button variant="primary" onClick={() => this.handleSubmit(item.idItem)}>
          //       Save Changes
          //     </Button>
          //   </Modal.Footer>
          // </Modal>
    );
  }

}

export default ItemDropDown;