const { default: axios } = require("axios");
const API_URL = 'http://localhost:8080'

class UserService {

  listUsers(){
    return axios.get(`${API_URL}/api/user/list`);
  }

  getUser(idUser){
    return axios.get(`${API_URL}/api/user/get/${idUser}`);
  }
}

export default new UserService();