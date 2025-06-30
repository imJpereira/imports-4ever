import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { setAuthToken } from '../services/api'; 

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const signIn = async (credentials) => {
    try {
      
      const response = await axios.post('http://189.30.255.90:8000/auth/signin', credentials); 

      const userData = response.data.user;
      const token = response.data.token;

      setUser(userData);
      setToken(token);
      setAuthToken(token); 

    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  };

  const signOut = () => {
    setUser(null);
    setToken(null);
    setAuthToken(null); 
  };

  return (
    <AuthContext.Provider value={{ user, token, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
