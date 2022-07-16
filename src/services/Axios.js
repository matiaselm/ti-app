import axios from 'axios';

const bareAxios = axios.create({
  baseURL: 'http://192.168.1.48:8000',
});

export { bareAxios };
