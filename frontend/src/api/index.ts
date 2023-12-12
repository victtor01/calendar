import axios from "axios";
import { Server } from "@/constants/server";

const api = axios.create({
  baseURL: Server,
});

export const apiPrivate = axios.create({
  baseURL: Server,
  headers: {'Content-Type': 'application/json'},
  withCredentials: true
})

export default api;