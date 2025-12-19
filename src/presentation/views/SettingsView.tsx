import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { Moon, Sun, Shield, Smartphone, LogOut } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const sectionStyle = {
    background: 'var(--surface)',
    borderRadius: '12px',
    padding: '16px',
    marginBottom: '20px',
    border: '1px solid var(--border-color)'
  };

  const rowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: '1px solid var(--border-color)'
  };

  return (
    <div className="container">
      <h1 style={{ marginBottom: '30px', fontSize: '1.5rem' }}>System Config</h1>

      {/* Theme Control */}
      <section style={sectionStyle}>
        <h3 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '10px' }}>INTERFACE</h3>
        
        <div style={{ ...rowStyle, borderBottom: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
            <span>Theme Mode</span>
          </div>
          
          <button 
            onClick={toggleTheme}
            style={{
              background: 'var(--bg-app)',
              border: '1px solid var(--primary)',
              color: 'var(--primary)',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: 'bold',
              minWidth: '80px'
            }}
          >
            {theme.toUpperCase()}
          </button>
        </div>
      </section>

      {/* Security Info */}
      <section style={sectionStyle}>
        <h3 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '10px' }}>SECURITY</h3>
        
        <div style={rowStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Shield size={20} />
            <span>Biometrics</span>
          </div>
          <span style={{ color: 'var(--success)', fontSize: '0.8rem' }}>ENABLED</span>
        </div>

        <div style={{ ...rowStyle, borderBottom: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Smartphone size={20} />
            <span>Device Trust</span>
          </div>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>THIS DEVICE</span>
        </div>
      </section>

      <button style={{ 
        width: '100%', 
        padding: '16px', 
        color: 'var(--danger)', 
        background: 'rgba(239, 68, 68, 0.1)', 
        borderRadius: '12px',
        fontWeight: 'bold',
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'center',
        gap: '10px'
      }}>
        <LogOut size={20} />
        TERMINATE SESSION
      </button>
    </div>
  );
};
