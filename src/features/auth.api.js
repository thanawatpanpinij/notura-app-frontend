import api from "../lib/api";

async function login(credentials) {
  const response = await api.post("/auth/login", credentials);
  return response.data;
}

export { login };
