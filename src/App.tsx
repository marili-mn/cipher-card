import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SplashView } from './presentation/views/SplashView';
import { LoginView } from './presentation/views/LoginView';
import { DashboardView } from './presentation/views/DashboardView';
import { SettingsView } from './presentation/views/SettingsView';
import { CreateCardView } from './presentation/views/CreateCardView';
import { DockNav } from './presentation/components/DockNav';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [appState, setAppState] = useState<'splash' | 'login' | 'ready'>('splash');

  if (appState === 'splash') {
    return <SplashView onComplete={() => setAppState('login')} />;
  }

  if (appState === 'login') {
    return (
      <AnimatePresence>
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <LoginView onLogin={() => setAppState('ready')} />
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
}

export default App;
