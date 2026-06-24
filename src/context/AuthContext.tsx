import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

import { User } from "../types/user";

interface AuthContextType {
  user: User | null;
  token: string | null;

  loginUser: (
    user: User,
    token: string
  ) => void;

  logoutUser: () => void;
}

const AuthContext =
  createContext<AuthContextType | null>(null);

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [user, setUser] =
    useState<User | null>(
      JSON.parse(
        localStorage.getItem("user") || "null"
      )
    );

  const [token, setToken] =
    useState<string | null>(
      localStorage.getItem("token")
    );

  const loginUser = (
    userData: User,
    tokenData: string
  ) => {
    setUser(userData);
    setToken(tokenData);

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    localStorage.setItem(
      "token",
      tokenData
    );
  };

  const logoutUser = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within AuthProvider"
    );
  }

  return context;
};