import axios from "axios";

const api = axios.create({
  baseURL: 'http://192.168.0.105:8000',
});

export const apiPrivate = axios.create({
  baseURL: process.env.SERVER_HTTP,
  headers: {'Content-Type': 'application/json'},
  withCredentials: true
})

export default api;