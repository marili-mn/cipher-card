// Debugging layer
console.log('🚀 [Boot] Iniciando aplicación...');

window.onerror = function(message, source, lineno, colno, error) {
  console.error('🔥 [CRITICAL] Error global no capturado:', message, error);
  document.body.innerHTML = `<div style="color:red; padding:20px; font-family:monospace; background:#1a1a1a; height:100vh">
    <h1>System Crash</h1>
    <p>${message}</p>
    <p>Source: ${source}:${lineno}</p>
  </div>`;
};

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

console.log('✅ [Boot] Importaciones completadas');

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('❌ [Boot] No se encontró el elemento #root en el DOM');
  throw new Error("FATAL: Root element missing");
}

console.log('✅ [Boot] Elemento root encontrado, montando React...');

try {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  console.log('✅ [Boot] Render inicial disparado');
} catch (e) {
  console.error('❌ [Boot] Falló createRoot o render:', e);
}