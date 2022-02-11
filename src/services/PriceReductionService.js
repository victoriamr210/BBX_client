const { default: axios } = require("axios");
const API_URL = 'http://localhost:8080';

class PriceReductionService {

  listPrices(){
    return axios.get(`${API_URL}/api/priceReduction/list`);
  }
}

export default new PriceReductionService();