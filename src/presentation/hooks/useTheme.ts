import { useState, useEffect } from 'react';

type Theme = 'dark' | 'light';

export function useTheme() {
  // Inicializar estado leyendo localStorage o default 'dark'
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('cipher-theme');
    return (saved as Theme) || 'dark';
  });

  useEffect(() => {
    // Sincronizar con el DOM
    const root = document.body;
    if (theme === 'light') {
      root.classList.add('light-theme');
    } else {
      root.classList.remove('light-theme');
    }
    // Guardar preferencia
    localStorage.setItem('cipher-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return { theme, toggleTheme };
}
