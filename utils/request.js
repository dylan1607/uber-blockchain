import axios from 'axios';

const token = process.env.NEXT_PUBLIC_STRAPI_ACCESS_TOKEN;

const request = axios.create({
  timeout: 50000,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default request;
