import api from "../lib/api";

async function login(credentials) {
  const response = await api.post("/auth/login", credentials);
  return response.data;
}

async function logout() {
  const response = await api.post("/auth/logout");
  return response.data;
}

async function createAccount(credentials) {
  const response = await api.post("/auth/register", credentials);
  return response.data;
}

export { login, logout, createAccount };
