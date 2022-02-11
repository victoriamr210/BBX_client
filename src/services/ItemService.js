const { default: axios } = require("axios");
const API_URL = 'http://localhost:8080'

class ItemService {

  listItems(){
    return axios.get(`${API_URL}/api/item/list`);
  }

  newItem(){
    return axios.post(`${API_URL}/api/item/new`);
  }

  getItem(idItem){
    return axios.get(`${API_URL}/api/item/get/${idItem}`);
  }

  updateItem(item){
    return axios.put(`${API_URL}/api/item/update`, item);
  }

  deleteItem(idItem){
    return axios.delete(`${API_URL}/api/item/delete/${idItem}`);
  }
}

export default new ItemService();