const { default: axios } = require("axios");
const API_URL = 'http://localhost:8080'

class UserService {

  listUsers(){
    return axios.get(`${API_URL}/api/user/list`);
  }
}

export default new UserService();