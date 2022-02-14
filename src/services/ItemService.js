const { default: axios } = require("axios");
const API_URL = 'http://localhost:8080'

class ItemService {

  listItems(){
    return axios.get(`${API_URL}/api/item/list`);
  }

  newItem(item){
    return axios.post(`${API_URL}/api/item/new`, JSON.stringify(item));
  }

  getItem(idItem){
    return axios.get(`${API_URL}/api/item/get/${idItem}`);
  }

  updateItem(item){
    return axios.put(`${API_URL}/api/item/update/${item.idItem}`, JSON.stringify(item));
  }

  deleteItem(idItem){
    return axios.delete(`${API_URL}/api/item/delete/${idItem}`);
  }

  checkItemCode(itemCode){
    return axios.get(`${API_URL}/api/item/isCodeAvailable/${itemCode}`);
  }

  deactivateItem(idItem, reasonDeactivation){
    return axios.put(`${API_URL}/api/item/deactivateItem/${idItem}`, JSON.stringify(reasonDeactivation));
  }

  checkDatesPrices(item){
    return axios.get(`${API_URL}/api/item/checkDatePrices/`, JSON.stringify(item));
  }
}

export default new ItemService();