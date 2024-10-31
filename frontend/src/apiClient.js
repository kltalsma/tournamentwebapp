// frontend/src/apiClient.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true, // Include credentials if needed
});

export default apiClient;

