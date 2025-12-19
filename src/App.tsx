import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SplashView } from './presentation/views/SplashView';
import { LoginView } from './presentation/views/LoginView';
import { DashboardView } from './presentation/views/DashboardView';
import { SettingsView } from './presentation/views/SettingsView';
import { CreateCardView } from './presentation/views/CreateCardView';
import { DockNav } from './presentation/components/DockNav';
import { AnimatePresence, motion } from 'framer-motion';
import { SessionProvider, useSession } from './core/context/SessionContext';

// Componente interno que consume el contexto
const AppContent = () => {
  const { appState, finishSplash, login } = useSession();

  if (appState === 'splash') {
    return <SplashView onComplete={finishSplash} />;
  }

  if (appState === 'login') {
    return (
      <AnimatePresence>
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <LoginView onLogin={login} />
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-app)' }}>
        <Routes>
          <Route path="/" element={<DashboardView />} />
          <Route path="/create" element={<CreateCardView />} />
          <Route path="/settings" element={<SettingsView />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <DockNav />
      </div>
    </BrowserRouter>
  );
};

// Root Component
function App() {
  return (
    <SessionProvider>
      <AppContent />
    </SessionProvider>
  );
}

export default App;