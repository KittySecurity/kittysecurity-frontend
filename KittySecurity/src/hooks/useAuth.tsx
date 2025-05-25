import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSessionStorage } from "./useSessionStorage";
import { login as apiLogin } from "../services/auth";

type AuthContextType = {
  accessToken: string | null;
  refreshToken: string | null;
  login: (email: string, master_hash: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider = ({ children }: { children: React.ReactNode}) => {
    const [accessToken, setAccessToken] = useSessionStorage("token", null);
    const [refreshToken, setRefreshToken] = useSessionStorage("refreshToken", null);
    const navigate = useNavigate();

  const login = async (email: string, master_hash: string) => {
    try {
      console.log("Logging in with email:", email);
      console.log("Using master hash:", master_hash);
      const data = await apiLogin(email, master_hash);
      setAccessToken(data.access_token);
      setRefreshToken(data.refresh_token);
      navigate("/vault");
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    navigate("/login", { replace: true });
  };

  const value = useMemo(
    () => ({
      accessToken,
      refreshToken,
      login,
      logout,
      isAuthenticated: !!accessToken,
    }),
    [accessToken, refreshToken]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}