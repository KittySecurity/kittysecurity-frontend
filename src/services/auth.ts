import axios from "axios";
import api from "./api";

export async function login(email: string, master_hash: string) {
  try {
    const response = await axios.post("/api/auth/login", {
      "email": email,
      "master_hash": master_hash,
    });
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error; // Re-throw the error for further handling
  }
}

export async function register(username: string, email: string, master_hash: string) {
  const response = await axios.post("/api/auth/register", {
    "username": username,
    "email": email,
    "master_hash": master_hash,
  });
  return response.data;
}

export async function logout() {
  const response = await api.post(
    "/auth/logout",
  );
  return response.data;
}