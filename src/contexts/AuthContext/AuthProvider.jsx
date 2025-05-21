import { useState } from "react";
import AuthContext from "./AuthContext";
import api from "../../lib/api";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function getCurrentUser() {
    try {
      setIsLoading(true);
      const response = await api.get("/users/me");
      console.log(response);
      setUser(response.data.user);
    } catch (error) {
      console.error("Not authenticated", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, setUser, isLoading, setIsLoading, getCurrentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
