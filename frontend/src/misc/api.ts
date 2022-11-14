import axios from "axios";

const PORT = process.env.API_PORT || 5000;
const base = process.env.API_ENDPOINT || "http://[::1]:";
export const baseURL = base + PORT;

export default axios.create({
  baseURL,
});
