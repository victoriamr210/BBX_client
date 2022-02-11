const { default: axios } = require("axios");
const API_URL = 'http://localhost:8080'

class ItemService {

  listSuppliers(){
    return axios.get(`${API_URL}/api/supplier/list`);
  }
}

export default new ItemService();