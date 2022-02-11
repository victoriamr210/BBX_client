import React, { Component } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label, FormFeedback, Table   } from 'reactstrap';
import AppNavbar from './AppNavbar';
import Select from 'react-select';
import { useRowSelect } from '@table-library/react-table-library/select';
import SupplierService from './services/SupplierService';
import ItemService from './services/ItemService';
import PriceReductionService from './services/PriceReductionService'; 

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

class ItemNew extends Component {
    emptyItem = {
        itemCode: '',
        description: '',
        price: '',
        state: 'ACTIVE',
        creationDate: '',
        supplierDTOList: [],
        priceReductionDTOS: [],
        creator: ''
      };


      constructor(props) {
        super(props);
        this.state = {
          item: this.emptyItem,
          suppliers: [],
          priceReductions: [],
          validate : {
              itemCode: true,
              description: true
          },
          isLoading: true,
          redirectLogin: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
        this.getSupplierDTO = this.getSupplierDTO.bind(this);
        this.handleSuppliers = this.handleSuppliers.bind(this);
        this.handlePrices = this.handlePrices.bind(this);
        this.getPriceReductionDTO = this.getPriceReductionDTO.bind(this);
      }

    componentDidMount() {
      // fetch('/api/supplier/list')
      //   .then(response => response.json())
      //   .then(data => this.setState({suppliers: data, isLoading: true}));
      
      //   fetch('/api/priceReduction/list')
      //     .then(response => response.json())
      //     .then(data =>  this.setState({priceReductions: data, isLoading: false}));

      SupplierService.listSuppliers()
            .then(response => this.setState({suppliers: response.data}));
        
        PriceReductionService.listPrices()
            .then(response => this.setState({priceReductions: response.data, isLoading: false}));
    }

      handleChange(event) {
        const target = event.target;
        const name = target.name;
        let item = {...this.state.item};
       
        const value = target.value;
        item[name] = value;
        this.setState({item});
      }

      handleSuppliers(event){
        const {item} = this.state;
        item.supplierDTOList = this.getSupplierDTO(event);
        this.setState({item: item});
        // console.log(this.state.item);
      }

      handlePrices(event){
        const {item} = this.state;
        item.priceReductionDTOS = this.getPriceReductionDTO(event);
        this.setState({item: item});
        // console.log(this.state.item);
      }

      getSupplierDTO(suppliersItem){
        const {suppliers} = this.state;
        let listSuppliers = [];
        suppliersItem.map(supplier => {
          listSuppliers.push(suppliers.find(sup => supplier.value === sup.idSupplier))
        });
        return listSuppliers;
      }

      getPriceReductionDTO(pricesItem){
        const {priceReductions} = this.state;
        let listPrices = [];
        pricesItem.map(price => {
          listPrices.push(priceReductions.find(pr => price.value === pr.idPriceReduction))
        });
        return listPrices;
      }

      handleValidation(event){
          let item = this.state.item;
          let formIsValid = true;
          let {validate} = this.state;

          if(!event.target.value){
              formIsValid = false;
              if(event.target.name === "itemCode")
                validate.itemCode = false;
              if(event.target.name === "description")  
                validate.description = false;
          }

          this.setState({validate});
      }

      async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;

        ItemService.newItem(item)
        .then(this.props.history.push('/item'))
          .catch(error => {
            this.setState({redirectLogin: true})
          });
    }
        
      render() {
        const {validate, suppliers, priceReductions, isLoading, redirectLogin} = this.state;

        if(redirectLogin){
          return <Redirect to="/login" /> 
        }

        if(isLoading){
          return <p>Loading...</p>;
        }

        const title = <h2>Add Item</h2>;
        
        // const {validate} = this.state;
        // const {suppliers} = this.state;

        let suppliersSelect = suppliers.map(supplier => ({
            value: supplier.idSupplier,
            label: supplier.name, }));
        
        let priceReductionSelect = priceReductions.map(pr => (
          {
            value: pr.idPriceReduction,
            label: pr.reducedPrice + "€ / start: " + pr.startDate + " / end: " + pr.endDate
        }));

        
        return (
          <div>
            <AppNavbar/>
            <Container>
              {title}
              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Label for="itemCode">Item Code</Label>
                  <Input type="text" name="itemCode" id="itemCode" 
                    invalid={validate.itemCode}
                    onChange={this.handleChange}/>
                    <FormFeedback>This field cannot be null</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="description">Description</Label>
                  <Input type="text" name="description" id="description"  
                  invalid={validate.itemCode} 
                  onChange={(e) =>{
                        // this.handleValidation(e);
                        this.handleChange(e);}}/>
                    <FormFeedback invalid>This field cannot be null</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="price">Price</Label>
                  <Input type="number" name="price" id="price"
                  onChange={this.handleChange} autoComplete="00.00"></Input>
                </FormGroup>
                <FormGroup>
                  <Label for="state">State</Label>
                  <Input name="state" type="select"  onChange={this.handleChange}>
                    <option value="ACTIVE">Active</option>
                    <option value="DISCONTINUED">Discontinued</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="suppliers">Suppliers</Label>
                  <Select
                    defaultValue={this.getSuppliersItem} 
                    name="itemSuppliers" 
                    options={suppliersSelect} 
                    isMulti 
                    className="basic-multi-select" 
                    classNamePrefix="select"
                    onChange={this.handleSuppliers}/>
                </FormGroup>
                <FormGroup>
                  <Label>Price Reductions</Label>
                  <Select
                    
                    name="itemPrinceReduction" 
                    options={priceReductionSelect} 
                    isMulti 
                    className="basic-multi-select" 
                    classNamePrefix="select"
                    onChange={this.handlePrices}/>
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
export default withRouter(ItemNew);