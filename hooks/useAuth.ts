import { createContext, useContext } from "react";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={{ user: null }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
