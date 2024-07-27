import axios from "axios";
import { Environment } from "../constants";

export const apiClient = axios.create({
  baseURL: Environment.SERVER_BASE_URL
});
