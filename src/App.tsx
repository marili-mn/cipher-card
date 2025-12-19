import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DashboardView } from './presentation/views/DashboardView';
import { SettingsView } from './presentation/views/SettingsView';
import { CreateCardView } from './presentation/views/CreateCardView';
import { DockNav } from './presentation/components/DockNav';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardView />} />
        <Route path="/create" element={<CreateCardView />} />
        <Route path="/settings" element={<SettingsView />} />
      </Routes>
      
      {/* El Dock de navegación siempre visible */}
      <DockNav />
    </BrowserRouter>
  );
}

export default App;