import axios from "axios";

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "";
const baseURL = (BASE ? BASE.replace(/\/$/, "") : "") + "/api";

const nextServer = axios.create({
  baseURL,
  withCredentials: true,
});

export default nextServer;