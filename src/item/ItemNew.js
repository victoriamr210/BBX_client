import React, { Component } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label, FormFeedback   } from 'reactstrap';
import AppNavbar from '../AppNavbar';
import Select from 'react-select';
import SupplierService from '../services/SupplierService';
import ItemService from '../services/ItemService';
import PriceReductionService from '../services/PriceReductionService'; 
import {areDatesValid} from '../utils';
import '../App.css';
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
        creator: {}
      };


      constructor(props) {
        super(props);
        this.state = {
          item: this.emptyItem,
          suppliers: [],
          priceReductions: [],
          validation : {
              itemCode: false,
              description: false,
              prices: true
          },
          isLoading: true,
          redirectLogin: false,
          errorItem: 'This field cannot be null',
          errorDescription: 'This field cannot be null',
          errorPrices: 'Prices overlap'
          
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
        this.getSupplierDTO = this.getSupplierDTO.bind(this);
        this.handleSuppliers = this.handleSuppliers.bind(this);
        this.handlePrices = this.handlePrices.bind(this);
        this.getPriceReductionDTO = this.getPriceReductionDTO.bind(this);
        this.isFormValid = this.isFormValid.bind(this);
      }

    componentDidMount() {

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
            .catch(error => {
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

      handleSuppliers(event){
        const {item} = this.state;
        item.supplierDTOList = this.getSupplierDTO(event);
        this.setState({item: item});
      }

      handlePrices(event){
        const {item, validation} = this.state;
        item.priceReductionDTOS = this.getPriceReductionDTO(event);
        this.setState({item: item});

        if(areDatesValid(item.priceReductionDTOS)){
          this.setState({item: item});
        } else {
            validation.prices = false;
            this.setState({validation})
        } 
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
          let {validation, errorItem, errorDescription} = this.state;
          
          if(event.target.name === "itemCode"){
            if(event.target.value){
              validation.itemCode = true;
              ItemService.checkItemCode(event.target.value)
                .then(response => {
                  if(response.data === false){
                    validation.itemCode = false;
                    errorItem = 'This code is already taken';
                    this.setState({validation, errorItem});
                  }
                });
            } else {
              validation.itemCode = false;
              errorItem = "This field cannot be null";
              this.setState({validation, errorItem});
            }
          }

          if(event.target.name === "description"){
            if(event.target.value){
              validation.description = true;
              this.setState({validation, errorDescription});
            } else {
              validation.description = false;
              errorDescription = "This field cannot be null";
              this.setState({validation, errorDescription});
            }
          }  
      }

      isFormValid(){
        const {validation} = this.state;
        let flag = true;
        Object.values(validation).map(el => {
          if(!el)
            flag = false;
        });
        return flag
        
      }

      handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;
        if(this.isFormValid()){

          ItemService.newItem(item)
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
        const {validation, suppliers, priceReductions, isLoading, 
          redirectLogin, errorDescription, errorItem, errorPrices} = this.state;

        if(redirectLogin){
          return <Redirect to="/login" /> 
        }

        if(isLoading){
          return <p>Loading...</p>;
        }

        const title = <h2>Add Item</h2>;
        
        // const {validation} = this.state;
        // const {suppliers} = this.state;

        let suppliersSelect = suppliers.map(supplier => ({
            value: supplier.idSupplier,
            label: supplier.name, }));
        
        let priceReductionSelect = priceReductions.map(pr => (
          {
            value: pr.idPriceReduction,
            label: pr.reducedPrice + "??? (start: " + pr.startDate + " / end: " + pr.endDate + ")"
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
                    invalid={!validation.itemCode}
                    valid={validation.itemCode} 
                    onChange={(e) =>{
                      this.handleValidation(e);
                      this.handleChange(e);
                    }}/>
                    <FormFeedback>{errorItem}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="description">Description</Label>
                  <Input type="text" name="description" id="description"  
                  invalid={!validation.description}
                  valid={validation.description} 
                  onChange={(e) =>{
                    this.handleValidation(e);
                    this.handleChange(e);
                        }}/>
                    <FormFeedback>{errorDescription}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="price">Price</Label>
                  <Input type="number" name="price" id="price"
                  onChange={this.handleChange} autoComplete="00.00"></Input>
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
                    <span className="error"> {!validation.prices ? errorPrices : null}</span>

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