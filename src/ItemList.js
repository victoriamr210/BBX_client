import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import filterValues from './utils';
import Select from 'react-select';
import ItemService from './services/ItemService';

class ItemList extends Component {

  constructor(props) {
    super(props);
    this.state = {items: [], isLoading: true, filterValue: 'NONE'};
    this.remove = this.remove.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    ItemService.listItems()
      .then(response => this.setState({items: response.data, isLoading: false}));
    console.log(this.state.items);
    // fetch('/api/item/list')
    //   .then(response => response.json())
    //   .then(data => this.setState({items: data, isLoading: false}));
    
  }

  handleFilter(event){
    this.setState({filterValue: event.value});
  }

  async remove(id) {
    await fetch(`/api/item/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedItems = [...this.state.items].filter(i => i.idItem !== id);
      this.setState({items: updatedItems});
    });
  }

  render() {
    const {isLoading, filterValue} = this.state;
    let {items} = this.state;

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
        <td>
          <ButtonGroup>
            <Button size ="sm" color="success" tag={Link} to={'/item/details/' + item.idItem}>Info</Button>
            <Button size="sm" color="primary" tag={Link} to={"/item/update/" + item.idItem}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(item.idItem)}>Delete</Button> 
          </ButtonGroup>
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
          <p>Filter Items</p>
          <h3>Item List</h3>
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
              <th width="10%">Description</th>
              <th width="10%">Price</th>
              <th width="10%">State</th>
              <th width="10%">Creation Date</th>
              <th></th>
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