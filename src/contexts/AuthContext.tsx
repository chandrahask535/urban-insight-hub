
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user database (in a real app, this would be a database)
const MOCK_USERS: Record<string, User & { password: string }> = {
  'admin@urbaninsight.com': {
    id: '1',
    name: 'Admin User',
    email: 'admin@urbaninsight.com',
    password: 'admin123',
    role: 'admin',
  },
  'user@example.com': {
    id: '2',
    name: 'Demo User',
    email: 'user@example.com',
    password: 'password123',
    role: 'user',
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved auth on app load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const lowerEmail = email.toLowerCase();
    const user = MOCK_USERS[lowerEmail];
    
    if (user && user.password === password) {
      // Create a copy without the password for storage
      const { password: _, ...userWithoutPassword } = user;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      toast.success(`Welcome back, ${user.name}!`);
      setIsLoading(false);
      return true;
    } else {
      toast.error('Invalid email or password');
      setIsLoading(false);
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const lowerEmail = email.toLowerCase();
    
    if (MOCK_USERS[lowerEmail]) {
      toast.error('Email already in use');
      setIsLoading(false);
      return false;
    }
    
    // Create new user
    const newUser = {
      id: `${Object.keys(MOCK_USERS).length + 1}`,
      name,
      email: lowerEmail,
      password,
      role: 'user' as const,
    };
    
    // In a real app, this would be an API call
    MOCK_USERS[lowerEmail] = newUser;
    
    // Store user without password
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    
    toast.success('Account created successfully!');
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
