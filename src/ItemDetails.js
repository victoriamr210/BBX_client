import React, { Component } from 'react';
import { Container, Table, Button } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import AppNavbar from './AppNavbar';
import isItemValid from './utils';
import ItemService from './services/ItemService';


class ItemDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
            item: {}, isLoading: true, redirectLogin: false
        }
    }



    componentDidMount() {

      ItemService.getItem(this.props.match.params.id)
      .then(response => this.setState({item: response.data, isLoading: false}))
      .catch(error => {
        this.setState({redirectLogin: true})
      });

        fetch(`/api/item/get/${this.props.match.params.id}`)
            .then(response => response.json())
            .then(data => this.setState({item: data,  isLoading: false}));
    }


    render(){
        const {item, isLoading, redirectLogin} = this.state;
        let falg = true;

        if(redirectLogin){
          return <Redirect to="/login" /> 
        }


        if(isLoading){
            return <p>Loading...</p>;
        }

        // if(isItemValid(item)){
          let supplierList = item.supplierDTOList.map(sup => {
            return  <p key={sup.idSupplier}>
              {sup.name}
              </p>
          });

          let priceReductionList = item.priceReductionDTOS.map(pr => {
            return <tr key={pr.idPriceReduction}>
              <td>{pr.reducedPrice} €</td>
              <td>{pr.startDate}</td>
              <td>{pr.endDate}</td>
            </tr>
          })
          
          let date =  <td>{new Intl.DateTimeFormat('en-GB').format(new Date(item.creationDate))}</td>
          return(
            <div>
              <AppNavbar/>
                <h3>Item Details</h3>
                <Container fluid>
                  <Table className="mt-5">
                      <tbody>
                          <tr>
                              <td width="20%">Item Code</td>
                              <td width="20%">{item.itemCode}</td>
                          </tr>
                          <tr>
                              <td width="20%">Description</td>
                              <td width="20%">{item.description}</td>
                          </tr>
                          <tr>
                              <td width="20%">Price</td>
                              <td width="20%">{item.price}</td>
                          </tr>
                          <tr>
                              <td width="20%">State</td>
                              <td width="20%">{item.state}</td>
                          </tr>
                          <tr>
                              <td width="20%">Creation Date</td>
                              {date}
                          </tr>
                          <tr>
                              <td>Suppliers</td>
                              <td>
                              {supplierList}
                              </td>
                          </tr>
                      </tbody>
                    </Table>
                    <p><b>Price Reductions</b></p>
                    <Table>
                    <thead>
                      <tr>
                        <th width="10%">Amount</th>
                        <th width="10%">Start Date</th>
                        <th width="10%">End Date</th>
                      </tr>
                      </thead>
                      <tbody>
                        {priceReductionList}
                      </tbody>
                    </Table>
                    <Button size="sm" color="primary" tag={Link} to={"/item"}>Back</Button>
                </Container>
            </div>
        );
    // } else {
        return(
            <div>
                  <AppNavbar/>
                  <Container fluid>
                      <h3>Error</h3>
                      <p>Se ha producido un error</p>
                  </Container>
            </div>
        );
    // }
  }
}

export default ItemDetails;