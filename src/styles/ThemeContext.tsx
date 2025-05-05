// styles/ThemeContext.js
import React, { createContext, useState, ReactNode } from 'react';
type Theme = {
    isDarkTheme: boolean;
    toggleTheme: () => void;
    colors: {
      background: string;
      text: string;
    };
  };
export const ThemeContext = createContext<Theme | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => setIsDarkTheme(prev => !prev);

  const theme = {
    isDarkTheme,
    toggleTheme,
    colors: isDarkTheme
      ? {
          background: '#000',
          text: '#fff',
        }
      : {
          background: '#fff',
          text: '#000',
        },
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};
