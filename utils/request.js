import axios from 'axios';

const request = axios.create({
  timeout: 50000,
});

export default request;
