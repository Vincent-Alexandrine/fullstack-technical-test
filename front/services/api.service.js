import axios from 'axios';

// NOTE: should be in env file
const BASE_URL = 'http://localhost:4000';

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export default {
  cart: {
    async create () {
      return await instance.post('/cart');
    },

    async get(id) {
      return await instance.get(`/cart/${id}`);
    },

    async addToCart(id, items) {
      return await instance.post(`/cart/${id}`, { items });
    },

    async removeFromCart(id, items) {
      return await instance.patch(`/cart/${id}`, { items });
    },
  },
};
