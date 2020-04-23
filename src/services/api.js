import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.0.54:3333/"
});

export default api;

//http://192.168.0.56:3333/'
//http://10.0.3.2:3333/
//http://157.245.112.55/
