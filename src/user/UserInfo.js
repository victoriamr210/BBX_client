import { withRouter, Redirect } from "react-router-dom";
import UserService from '../services/UserService';
import { Table, Container } from "react-bootstrap";
import AppNavbar from "../AppNavbar";
const { Component } = require("react");

class UserInfo extends Component{
  constructor(props){
    super(props);
    this.state = {
      user: {},
      redirectLogin: false,
      isLoading: true
    }
  }


  componentDidMount() {
    UserService.getUser(this.props.match.params.id)
    .then(response => {
      this.setState({user: response.data, isLoading: false});
    })
    .catch(error => {
      if(error.response.status === 401){
        this.setState({redirectLogin: true})
      }

      if(error.response.status === 500){
        alert("Se ha producido un error");
      }
    });
  }



  render(){
    const {user, redirectLogin, isLoading} = this.state;

    if(redirectLogin){
      return <Redirect to="/login" /> 
    }


    if(isLoading){
        return <p>Loading...</p>;
    }

    return (
      <div>
        <AppNavbar/>
        <Container fluid>

          <h2>My User Info</h2>
          <Table classname="mt-2">
            <tbody>
              <tr>
                <td width="10%">Name</td>
                <td>{user.name}</td>
              </tr>
              <tr>
                <td width="10%">Username</td>
                <td>{user.username}</td>
              </tr>
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default withRouter(UserInfo);