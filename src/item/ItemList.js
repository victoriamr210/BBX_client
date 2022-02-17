import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Form, FormGroup, FormFeedback, Table, Dropdown, DropdownToggle,
   DropdownMenu, DropdownItem, Label, Input  } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link, Redirect } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {filterValues} from './utils';
import Select from 'react-select';
import ItemService from './services/ItemService';
import Modal from 'react-bootstrap/Modal';
import { IoTrashOutline, IoBan } from "react-icons/io5";
import ItemDropDown from './ItemDropDown';


class ItemList extends Component {

  constructor(props) {
    super(props);
    this.state = {items: [], isLoading: true,
       filterValue: 'NONE', 
       redirectLogin: false, 
       dropdownOpen: false,
       show: false,
       reasonDeactivate: '',
       error: false};
    this.remove = this.remove.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    this.loadItems = this.loadItems.bind(this);
  }

  handleShow(state) {
    if(state === 'ACTIVE'){
      this.setState({ show: true });
    } else{
      alert("This item is already discontinued");
    }
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  toggleDropDown(){
    this.setState({dropdownOpen: !this.state.dropdownOpen})
  }

  handleValidation(event){
    if(!event.target.value){
      this.setState({error: true})
    }
  }

  handleChange(event){
    let reasonDeactivate = event.target.value;
    this.setState({reasonDeactivate});
  }

  handleSubmit(idItem){
    this.handleClose();
    ItemService.deactivateItem(idItem, this.state.reasonDeactivate)
      .then(this.loadItems());
    
  }

  loadItems(){
    ItemService.listItems()
      .then(response => {
        console.log(response);
        this.setState({items: response.data, isLoading: false})})
      .catch(error => {
        this.setState({redirectLogin: true});
        return Promise.reject(error);
      });
  }

  componentDidMount() {
    this.setState({isLoading: true});

    this.loadItems();
    
  }

  handleFilter(event){
    this.setState({filterValue: event.value});
  }

  async remove(id) {
    (await ItemService.deleteItem(id)
      .then( () => {
        let updatedItems = [...this.state.items].filter(i => i.idItem !== id);
       this.setState({items: updatedItems});
      })
      .catch(error => {
        if(error.response.status === 403){
          alert("This user does not have permission to do this action");
        }
      }));
  }

  render() {
    const {isLoading, filterValue, redirectLogin} = this.state;
    let {items} = this.state;
    if(redirectLogin){
      return <Redirect to="/login" /> 
    }

    if (isLoading) {
      return <p>Loading...</p>;
    }
    // onClick={() => this.props.history.push('/item/details/' + item.idItem)}
    if(filterValue !== 'NONE'){
      items = items.filter(item => item.state === filterValue);
    }
  
    const itemList = items.map(item => {
      return <tr key={item.idItem} >
        <td style={{whiteSpace: 'nowrap'}}>{item.itemCode}</td>
        <td>{item.description}</td>
        <td>{item.price}</td>
        <td>{item.state}</td>
        <td>{new Intl.DateTimeFormat('en-GB').format(new Date(item.creationDate))}</td>
        <td>{item.creator.name}</td>

          <ItemDropDown item={item}/>
        <td>
         <IoTrashOutline className="pointer" onClick={() => this.remove(item.idItem)}/>
        </td>
      </tr>
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/item/new">Add Item</Button>
          </div>
          <h3>Item List</h3>
          <p><b>Filter Items by State</b></p>
          <Select
            className="small" 
            defaultValue={filterValues[0]}
            styles="width: 20%" 
            options={filterValues} 
            onChange={this.handleFilter}/>
         
          <Table className="mt-5">
            <thead>
            <tr>
              <th width="10%">Code</th>
              <th width="30%">Description</th>
              <th width="10%">Price</th>
              <th width="10%">State</th>
              <th width="10%">Creation Date</th>
              <th width="15%">Creator</th>
              <th width="5%"></th>
              <th width="5%"></th>
              <th width="10%"></th>
            </tr>
            </thead>
            <tbody>
            {itemList}
            </tbody>
          </Table>
        
        </Container>
      </div>
    );
  }
}

export default ItemList;