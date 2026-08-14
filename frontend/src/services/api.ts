import axios from "axios";
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  // baseURL: "http://localhost:3200",
  headers: {
    "Content-Type": "application/json"
  },
});


