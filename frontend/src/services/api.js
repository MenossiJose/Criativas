import axios from "axios";

//Alterar para onde o backend está rodando
export const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  timeout: 5000,
});
