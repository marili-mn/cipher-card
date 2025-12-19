import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Settings, PlusCircle } from 'lucide-react';

export const DockNav: React.FC = () => {
  const navStyle = {
    position: 'fixed' as const,
    bottom: 0,
    left: 0,
    right: 0,
    height: 'var(--nav-height)',
    backgroundColor: 'var(--surface)',
    borderTop: '1px solid var(--border-color)',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 100,
    backdropFilter: 'blur(10px)', // Efecto vidrio
    maxWidth: '480px', // Limitar ancho en desktop
    margin: '0 auto' // Centrar en desktop
  };

  const linkStyle = ({ isActive }: { isActive: boolean }) => ({
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    textDecoration: 'none',
    color: isActive ? 'var(--primary)' : 'var(--text-muted)',
    transition: 'color 0.2s',
  });

  return (
    <nav style={navStyle}>
      <NavLink to="/" style={linkStyle}>
        {({ isActive }) => (
          <>
            <LayoutDashboard size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span style={{ fontSize: '10px', marginTop: '4px', fontWeight: isActive ? 'bold' : 'normal' }}>Vault</span>
          </>
        )}
      </NavLink>

      <NavLink to="/create" style={linkStyle}>
        {({ isActive }) => (
          <div style={{ 
            transform: 'translateY(-20px)', 
            background: 'var(--bg-app)', 
            padding: '6px', 
            borderRadius: '50%',
            border: '1px solid var(--border-color)'
          }}>
            <PlusCircle size={48} color="var(--primary)" fill="var(--surface)" />
          </div>
        )}
      </NavLink>

      <NavLink to="/settings" style={linkStyle}>
        {({ isActive }) => (
          <>
            <Settings size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span style={{ fontSize: '10px', marginTop: '4px', fontWeight: isActive ? 'bold' : 'normal' }}>System</span>
          </>
        )}
      </NavLink>
    </nav>
  );
};
