import axios from 'axios';

const bareAxios = axios.create({
  baseURL: 'http://localhost:8000',
});

export { bareAxios };
