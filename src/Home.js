import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import { Button, Container, Input, Label,  Form, FormGroup   } from 'reactstrap';
import { withCookies } from 'react-cookie';
import AuthenticationService from './AuthenticationService';

class Home extends Component {
  state = {
    isLoading: true,
    isAuthenticated: false,
    username: '',
    password: ''
  };  

  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      isAuthenticated: false,
      username: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event){

      AuthenticationService
      .executeJwtAuthenticationService(this.state.username, this.state.password)
      .then((response) => {
        console.log("response", response);
        AuthenticationService.registerSuccessfulLoginForJwt(this.state.username, response.data.token)
        this.props.history.push(`/item`);
      }).catch(() => {
        this.setState({ isAuthenticated: false });
      });
    
  }

  handleChange(event){
    this.setState({
      [event.target.name] : event.target.value
    });
  }

  render() {

    return (
      <div>
        <AppNavbar/>
        <Container fluid>

        <Label for="username">Username</Label>
              <Input type="text" name="username" id="username"
              onChange={this.handleChange} autoComplete="00.00"></Input>
               <Label for="password">Password</Label>
              <Input type="password" name="password" id="password"
              onChange={this.handleChange} autoComplete="00.00"></Input>
            <Button color="primary" type="submit" onClick={this.handleSubmit}>Login</Button>{' '}
          {/* <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input type="text" name="username" id="username"
              onChange={this.handleChange} autoComplete="00.00"></Input>
            </FormGroup>

            <FormGroup>
              <Label for="password">Password</Label>
              <Input type="password" name="password" id="password"
              onChange={this.handleChange} autoComplete="00.00"></Input>
            </FormGroup>

            <FormGroup>
              <Button color="primary" type="submit">Login</Button>{' '}
            </FormGroup>
          </Form> */}
        </Container>
      </div>
    );
  }

}

export default Home;