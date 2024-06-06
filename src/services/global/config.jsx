import axios from "axios";
import URL from "./url";

const { API_URL } = URL;

export const api = axios.create({
  baseURL: API_URL,
});
