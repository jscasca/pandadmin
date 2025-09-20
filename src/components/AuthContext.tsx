import React, { createContext, useState, useEffect } from "react";

export interface IUser {
  id: string;
  name: string;
  icon: string;
  token: string;
  refresh: string;
}

export interface IAuthContext {
  user: IUser | null;
  loading: boolean;
  // setUser: React.Dispatch<SetStateAction<any>>;
  logout: () => void;
  login: (user: IUser) => void;
}

export const IsAuthenticated = (): boolean => {
  const store = localStorage.getItem('user');
  return store !== null;
}

export const AuthContext = createContext<IAuthContext>({
  user: null,
  loading: true,
  login: (_) => {console.log('ctx login');},
  logout: () => {console.log('ctx logout');}
});

export const AuthProvider: React.FC<any> = ({ children }) => {
  const [ user, setUser ] = useState<IUser|null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const store = localStorage.getItem('user');
    if (store) {
      setUser(JSON.parse(store));
    }
    setLoading(false);
  }, []);

  const login = (u: IUser) => {
    localStorage.setItem('user', JSON.stringify(u));
    setUser(u);
  };

  const logout = async () => {
    localStorage.removeItem('user');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};