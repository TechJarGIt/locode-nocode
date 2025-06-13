import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  return (
    <AuthContext.Provider
      value={{
        email, setEmail,
        name, setName,
        number, setNumber,
        password, setPassword,
        isAuthenticated, setIsAuthenticated,
        error, setError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
