import React, { Component } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { Button, Container, Form, FormGroup, FormFeedback, Input, Label  } from 'reactstrap';
import AppNavbar from './AppNavbar';
import Select from 'react-select';
import SupplierService from './services/SupplierService';
import ItemService from './services/ItemService';
import PriceReductionService from './services/PriceReductionService'; 
import {areDatesValid} from './utils';
import './App.css';

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
          isLoading: true,
          redirectLogin: false,
          errorPrices: 'Prices overlap',
          errorDescription: 'This field cannot be null',
          validation: {
            prices: true,
            description: true
          }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getSuppliersItem = this.getSuppliersItem.bind(this);
        this.getSupplierDTOs = this.getSupplierDTOs.bind(this);
        this.getPriceListItem = this.getPriceReductionItem.bind(this);
        this.handleSuppliersChange = this.handleSuppliersChange.bind(this);
        this.handlePricesChange = this.handlePricesChange.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
      }

      componentDidMount() {

        ItemService.getItem(this.props.match.params.id)
          .then(response => {
            this.setState({item: response.data})});
        
        SupplierService.listSuppliers()
            .then(response => this.setState({suppliers: response.data}))
            .catch(error => {
              if(error.response.status === 401){
                this.setState({redirectLogin: true})
              }
      
              if(error.response.status === 500){
                alert("Se ha producido un error");
              } 
            });
        
        PriceReductionService.listPrices()
            .then(response => this.setState({priceReductions: response.data, isLoading: false}))
            .catch(error =>  {
              if(error.response.status === 401){
                this.setState({redirectLogin: true})
              }
      
              if(error.response.status === 500){
                alert("Se ha producido un error");
              } 
            });

      }

      handleChange(event) {
        const target = event.target;
        const name = target.name;
        let item = {...this.state.item};
       
        const value = target.value;
        item[name] = value;
        this.setState({item});
      }

      handleSuppliersChange(event){
        const {item} = this.state;
        item.supplierDTOList = this.getSupplierDTOs(event);
        this.setState({item: item});
      }

      handlePricesChange(event){
        const {item, validation} = this.state;
        item.priceReductionDTOS = this.getPriceReductionDto(event);
        if(areDatesValid(item.priceReductionDTOS)){
          this.setState({item: item});
        } else {
            validation.prices = false;
            this.setState({validation})
        } 
      }

      handleValidationPrices(event){
        const {item, validation} = this.state;
        if(areDatesValid(item.priceReductionDTOS)){
          this.setState({item: item});
        } else {
            validation.prices = false;
            this.setState({validation})
        } 
      }

      handleValidation(event){
        let {validation} = this.state;
        if(event.target.name === "description"){
          if(event.target.value){
            console.log(event.target.value)
            validation.description = true;
            this.setState({validation});
          } else {
            validation.description = false;
            this.setState({validation});
          }
        }
      }

      getSuppliersItem(){
        const {item} = this.state;
        let suppliersItem = item.supplierDTOList;
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
        const {item, validation} = this.state;

        if(validation.description && validation.prices){

          ItemService.updateItem(item)
          .then(response => this.props.history.push('/item'))
          .catch(error => {
            if(error.response.status === 401){
              this.setState({redirectLogin: true})
            }
    
            if(error.response.status === 500){
              alert("Se ha producido un error");
            } 
          });
        } else {
          alert("Hay errores en el formulario");
        }
      
      }

      render() {

       
        const {item, isLoading, redirectLogin, validation, errorPrices, errorDescription} = this.state;
        if(redirectLogin){
          return <Redirect to="/login" /> 
        }

        if(isLoading){
          return <p>Loading...</p>;
        }
        const title = <h2>Edit Item</h2>;

        const {suppliers, priceReductions} = this.state;

        let suppliersItemSelector = this.getSuppliersItem();
        // console.log("item: ", suppliersItemSelector);


        let suppliersSelect = suppliers.map(supplier => ({
          value: supplier.idSupplier,
          label: supplier.name, }));

        let pricesSelect = priceReductions.map(pr => ({
            value: pr.idPriceReduction,
            label: pr.reducedPrice + "€ (start: " + pr.startDate + " / end: " + pr.endDate + ")"
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
                  <Input type="text" name="itemCode" editable="false" id="itemCode" defaultValue={item.itemCode}></Input>
                </FormGroup>
                <FormGroup>
                  <Label for="description">Description</Label>
                  <Input type="text" name="description" id="description" 
                    value={item.description}
                    invalid={!validation.description}
                    valid={validation.description} 
                    onChange={(e) => {
                      this.handleValidation(e);
                      this.handleChange(e)}}
                   autoComplete="description"></Input>
                    <FormFeedback>{errorDescription}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="price">Price</Label>
                  <Input type="number" name="price" id="price" value={item.price}
                  onChange={this.handleChange}
                  ></Input>
                 
                </FormGroup>
                {/* <FormGroup>
                  <Label for="state">State</Label>
                  <Input name="state" id="state" type="select"  value={item.state} onChange={this.handleChange} autoComplete="ACTIVE">
                    <option value="ACTIVE">Active</option>
                    <option value="DISCONTINUED">Discontinued</option>
                  </Input>
                </FormGroup> */}
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
                    onChange={
                      this.handlePricesChange}/>
                    <span class="error"> {!validation.prices ? errorPrices : null}</span>
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