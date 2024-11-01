// frontend/src/apiClient.js

import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000', // Replace with your API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;

