import React, {createContext, useContext, useState} from 'react';

type User = {email: string};
type AuthContextType = {
  user: User | null;
  verified: boolean;
  login: (email: string) => void;
  logout: () => void;
  verify: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [verified, setVerified] = useState<boolean>(false);

  const login = (email: string) => {
    setUser({email});
    setVerified(false);
  };

  const verify = () => {
    setVerified(true);
  };

  const logout = () => {
    setUser(null);
    setVerified(false);
  };

  return (
    <AuthContext.Provider value={{user, verified, login, logout, verify}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
