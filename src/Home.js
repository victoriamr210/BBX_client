import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import { Button, Container, Input, Label,  Form, FormGroup   } from 'reactstrap';
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
        AuthenticationService.registerSuccessfulLoginForJwt(this.state.username, response.data.token);
        this.props.history.push('/item');
      }).catch(error => {
        if(error.response.status === 401){
          this.setState({ isAuthenticated: false });
          alert("Nombre de usuario y contraseña incorrectos");
        } else {
          alert("Ha ocurrido un error");
        }

      });
    
  }

  handleChange(event){
    this.setState({
      [event.target.name] : event.target.value
    });
  }

  render() {

    return (
      <div className="app">
        <Container fluid>
          <h2 className="App">Item Management</h2>
        <div className="login-form">
          <div className="input-container">

            <Label for="username">Username</Label>
            <Input type="text" name="username" id="username"
                onChange={this.handleChange} autoComplete="00.00"></Input>
          </div>
          <div className="input-container">

            <Label for="password">Password</Label>
            <Input type="password" name="password" id="password"
                  onChange={this.handleChange} autoComplete="00.00"></Input>
          </div>
          <div className="button-container">
            <Button color="primary" type="submit" onClick={this.handleSubmit}>Login</Button>{' '}
          </div>
          </div>
          {/* <Form>
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
              <Button color="primary" type="submit" onClick={this.handleSubmit}>Login</Button>{' '}
            </FormGroup>
          </Form> */}
        </Container>
      </div>
    );
  }

}

export default Home;