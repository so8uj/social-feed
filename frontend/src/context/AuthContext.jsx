import { createContext, useContext, useEffect, useState } from "react";
import callApi from "../hooks/callApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { request } = callApi();

  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [userFullName, setUserFullName] = useState("");

  const authorize = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setAuthenticated(false);
      setUser(null);
      return false;
    }

    try {
      const response = await request({
        method: "POST",
        url: "/authorize",
      });

      setAuthenticated(true);
      setUser(response.user);
      setUserFullName(`${response.user.first_name} ${response.user.last_name}`);
      return true;
    } catch (error) {
      localStorage.removeItem("token");

      setAuthenticated(false);
      setUser(null);
      setUserFullName("");
      return false;
    }
  };

  const login = async (credentials) => {
    const response = await request({
      method: "POST",
      url: "/login",
      data: credentials,
    });

    localStorage.setItem("token", response.token);

    await authorize();

    return response;
  };

  const register = async (data) => {
    return await request({
      method: "POST",
      url: "/registration",
      data,
    });
  };

  const logout = async () => {
    try {
      await request({
        method: "POST",
        url: "/logout",
      });
    } catch (error) {}

    localStorage.removeItem("token");

    setAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    authorize();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        authenticated,
        login,
        logout,
        register,
        authorize,
        userFullName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
