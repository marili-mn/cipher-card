import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type AppState = 'splash' | 'login' | 'ready';

interface SessionContextType {
  appState: AppState;
  login: () => void;
  logout: () => void;
  finishSplash: () => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [appState, setAppState] = useState<AppState>('splash');

  const login = () => setAppState('ready');
  const logout = () => {
    console.log("🔒 Wiping session memory...");
    setAppState('splash'); 
  };
  const finishSplash = () => setAppState('login');

  return (
    <SessionContext.Provider value={{ appState, login, logout, finishSplash }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};