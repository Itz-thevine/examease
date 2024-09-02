import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the shape of the context value
type AuthContextType = {
  isAuthenticated: boolean;
  user: any;
  login: (user: any) => void;
  logout: () => void;
  SetOTP: (otp: any) => void;
  otp: any;
  SetEmail: (otp: any) => void;
  email: string;
  JWTtoken: string;
  SetJWTtoken: (token: any) => void;
  selectedPlan: any ;
  setSelectedPlan: (value: any) => void
};

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
  SetOTP: () => {},   
  otp: () => {},   
  email: '',
  SetEmail: () => {},
  JWTtoken: '',
  SetJWTtoken: () => {},
  selectedPlan: {}, 
  setSelectedPlan: () => {}
});

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<string | null >(null);
  const [otp, setOtp] = useState();
  const [email, setEmail] = useState<string>('')
  const [selectedPlan, setSelectedPlan] = useState<any>({})

  const [JWTtoken, setJWTtoken] = useState<string>('')

  const loadUserData = useCallback(async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Failed to load user data', error);
    }
  }, []);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  const login = useCallback(async (user: any) => {
    setIsAuthenticated(true);
    setUser(user);
    await AsyncStorage.setItem('user', JSON.stringify(user));
    loadUserData();
  }, [loadUserData]);

  const logout = useCallback(async () => {
    setIsAuthenticated(false);
    await AsyncStorage.removeItem('user');
    setUser(null);
    loadUserData();
  }, [loadUserData]);

  const SetOTP = (otp: any) => {
    setOtp(otp)
  }

  const SetEmail = (email: string) => {
    setEmail(email)
  }

  const SetJWTtoken = (token: string) => {
    setJWTtoken(token)
  }

  return (
    <AuthContext.Provider value={{
        isAuthenticated, 
        user, 
        login, 
        logout, 
        SetOTP, 
        otp, 
        email , 
        SetEmail,
        JWTtoken, 
        SetJWTtoken,
        selectedPlan, 
        setSelectedPlan

    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
