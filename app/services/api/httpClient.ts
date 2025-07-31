import axios, { AxiosInstance } from 'axios';

const httpClient: AxiosInstance = axios.create({
  baseURL: 'https://space.posei.me', // replace with env var
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10_000,
});

export default httpClient;
