import axios from "axios";

export async function login(email: string, master_hash: string) {
  const response = await axios.post("/auth/login", {
    email,
    master_hash,
  });
  return response.data;
}

export async function register(username: string, email: string, master_hash: string) {
  const response = await axios.post("/auth/register", {
    username,
    email,
    master_hash,
  });
  return response.data;
}