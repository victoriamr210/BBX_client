const { default: axios } = require("axios");
const API_URL = 'http://localhost:8080'

class SupplierService {

  listSuppliers(){
    return axios.get(`${API_URL}/api/supplier/list`);
  }
}

export default new SupplierService();