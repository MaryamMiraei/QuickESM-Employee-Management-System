import axios from "axios";

const serverApi = axios.create({
  baseURL: process.env.JSON_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default serverApi;
