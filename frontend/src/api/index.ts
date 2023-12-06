import axios from "axios";

const api = axios.create({
  baseURL: 'http://192.168.0.106:8000',
});

export const apiPrivate = axios.create({
  baseURL: 'http://192.168.0.106:8000',
  headers: {'Content-Type': 'application/json'},
  withCredentials: true
})

export default api;