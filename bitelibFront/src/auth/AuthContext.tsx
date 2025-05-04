import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  user: string | null;
  login: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('bytelib_user');
    if (stored) setUser(stored);
  }, []);

  const login = (email: string) => {
    localStorage.setItem('bytelib_user', email);
    setUser(email);
  };
  const logout = () => {
    localStorage.removeItem('bytelib_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);