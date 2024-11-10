"use client"
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface UserData {
  // Replace with the actual user data type structure
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  login: (userData: UserData) => void;
  logout: () => void;
  checkAuthStatus: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  checkAuthStatus: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const router = useRouter();

  const checkAuthStatus = () => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const login = (userData: UserData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setIsLoggedIn(true);
    router.refresh(); // Force a refresh of the current page
  };

  const logout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    router.refresh(); // Force a refresh of the current page
    router.push('/'); // Redirect to home page or login page
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, checkAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
