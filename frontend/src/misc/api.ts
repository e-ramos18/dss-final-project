import axios from "axios";

const PORT = process.env.API_PORT || 5000;
const api = "http" + "://[::1]:";
const base = process.env.API_ENDPOINT || api;
export const baseURL = base + PORT;

export default axios.create({
  baseURL,
});
