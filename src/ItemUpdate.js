import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label, DropdownToggle, DropdownItem  } from 'reactstrap';
import AppNavbar from './AppNavbar';
import Select from 'react-select';

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

class ItemUpdate extends Component {
    emptyItem = {
        itemCode: '',
        description: '',
        price: '',
        state: '',
        creationDate: '',
        supplierDTOList: [],
        priceReductionDTOS: []
      };


      constructor(props) {
        super(props);
        this.state = {
          item: this.emptyItem,
          suppliers: [],
          priceReductions: [],
          isLoading: true
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getSuppliersItem = this.getSuppliersItem.bind(this);
        this.getSupplierDTOs = this.getSupplierDTOs.bind(this);
        this.getPriceListItem = this.getPriceReductionItem.bind(this);
        this.handleSuppliersChange = this.handleSuppliersChange.bind(this);
        this.handlePricesChange = this.handlePricesChange.bind(this);
      }

      componentDidMount() {
          fetch(`/api/item/get/${this.props.match.params.id}`)
          .then(response => response.json())
          .then(data => this.setState({item: data}));
          
          fetch('/api/supplier/list')
            .then(response => response.json())
            .then(data => this.setState({suppliers: data}));

          fetch('/api/priceReduction/list')
            .then(response => response.json())
            .then(data => this.setState({priceReductions: data, isLoading: false}));
            
      }

      handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        this.setState({item});
      }

      handleSuppliersChange(event){
        const {item} = this.state;
        item.supplierDTOList = this.getSupplierDTOs(event);
        this.setState({item: item});
      }
      handlePricesChange(event){
        const {item} = this.state;
        item.priceReductionDTOS = this.getPriceReductionDto(event);
        this.setState({item: item});
      }

      getSuppliersItem(){
        const {item} = this.state;
        let suppliersItem = item.supplierDTOList;
        console.log(suppliersItem);
        return suppliersItem.map(supplier => ({
          
          value: supplier.idSupplier,
          label: supplier.name }));
      }

      getSupplierDTOs(suppliersItem){
        const {suppliers} = this.state;
        let listSuppliers = [];
        suppliersItem.map(supplier => {
          listSuppliers.push(suppliers.find(sup => supplier.value === sup.idSupplier))
        });
        return listSuppliers;
      }

      getPriceReductionDto(pricesItem){
        const {priceReductions} = this.state;
        let listPrices = [];
        pricesItem.map(price => {
          listPrices.push(priceReductions.find(pr => price.value === pr.idPriceReduction))
        });
        return listPrices;
      }

      getPriceReductionItem(){
        const {item} = this.state;
        let priceReductions = item.priceReductionDTOS;
        return priceReductions.map(pr => ({
          value: pr.idPriceReduction,
          label: pr.reducedPrice
        }));
      }

      async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;
        console.log(item);
        
    
        await fetch('/api/item/update/' + item.idItem, {
          method: 'PUT' ,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(item),
        });
        this.props.history.push('/item');
      }

      render() {

       
        const {item, isLoading} = this.state;

        if(isLoading){
          return <p>Loading...</p>;
        }
        const title = <h2>Edit Item</h2>;

        const {suppliers, priceReductions} = this.state;
        console.log(priceReductions);

        let suppliersItemSelector = this.getSuppliersItem();

        let suppliersSelect = suppliers.map(supplier => ({
          value: supplier.idSupplier,
          label: supplier.name, }));

        let pricesSelect = priceReductions.map(pr => ({
            value: pr.idPriceReduction,
            label: pr.reducedPrice
        }));
        
        let priceReductionSelector = this.getPriceReductionItem();
        
        // console.log(suppliersSelect);
        return (
          <div>
            <AppNavbar/>
            <Container>
              {title}
              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Label for="itemCode">Item Code</Label>
                  <Input type="text" name="itemCode" editable={false} id="itemCode" defaultValue={item.itemCode}></Input>
                </FormGroup>
                <FormGroup>
                  <Label for="description">Description</Label>
                  <Input type="text" name="description" id="description" value={item.description}
                   onChange={this.handleChange} autoComplete="description"></Input>
                </FormGroup>
                <FormGroup>
                  <Label for="price">Price</Label>
                  <Input type="number" name="price" id="price" value={item.price}
                  onChange={this.handleChange} autoComplete="00.00"></Input>
                </FormGroup>
                <FormGroup>
                  <Label for="state">State</Label>
                  <Input name="state" id="state" type="select"  value={item.state} onChange={this.handleChange} autoComplete="ACTIVE">
                    <option value="ACTIVE">Active</option>
                    <option value="DISCONTINUED">Discontinued</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="suppliers">Suppliers</Label>
                  <Select
                    defaultValue={suppliersItemSelector.map(ele => ele)} 
                    name="itemSuppliers" 
                    options={suppliersSelect} 
                    isMulti 
                    className="basic-multi-select" 
                    classNamePrefix="select"
                    onChange={this.handleSuppliersChange}/>
                </FormGroup>
                <FormGroup>
                  <Label>Price Reductions</Label>
                  <Select
                    name="itemPrinceReduction" 
                    defaultValue={priceReductionSelector.map(ele => ele)}
                    options={pricesSelect} 
                    isMulti 
                    className="basic-multi-select" 
                    classNamePrefix="select"
                    onChange={this.handlePricesChange}/>
                </FormGroup>
                <FormGroup>
                  <Button color="primary" type="submit">Save</Button>{' '}
                  <Button color="secondary" tag={Link} to="/item">Cancel</Button>
                </FormGroup>
              </Form>
            </Container>
          </div>
        );
      }
}
export default withRouter(ItemUpdate);