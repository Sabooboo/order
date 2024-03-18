import React, { createContext, useState } from 'react';
import axios from 'axios';

export const UserContext = createContext<UserContextState>({
  user: null,
  signIn: async () => {},
  signOut: () => {},
});

export type User = {
    id: number;
    email: string;
}

export type UserContextState = {
  user: User | null;
  signIn: (email: string) => Promise<void>;
  signOut: () => void;
};

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setCustomer] = useState<User | null>(null);

  const signIn = async (email: string) => {
    try {
      const response = await axios.post<string>('/api/signin', { email });
      setCustomer({
        id: Number.parseInt(response.data),
        email,
      });
    } catch (error) {
      console.error('Sign-in failed:', error);
    }
  };

  const signOut = () => {
    setCustomer(null);
  };

  return (
    <UserContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </UserContext.Provider>
  );
};