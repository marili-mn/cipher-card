import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { useLanguage, LANGUAGES } from '../hooks/useLanguage';
import type { Language } from '../hooks/useLanguage';
import { useSession } from '../../core/context/SessionContext';
import { Moon, Sun, Shield, Smartphone, LogOut, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export const SettingsView: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { logout } = useSession();

  const sectionStyle = {
    background: 'var(--surface)',
    borderRadius: '8px',
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
      <h1 style={{ marginBottom: '30px', fontSize: '1.5rem', letterSpacing: '1px' }}>{t('settings.title')}</h1>

      {/* Interface Settings */}
      <section style={sectionStyle}>
        <h3 style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '15px', letterSpacing: '2px' }}>{t('settings.interface')}</h3>
        
        {/* Theme Toggle */}
        <div style={rowStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
            <span style={{ fontSize: '0.9rem' }}>{t('settings.visual')}</span>
          </div>
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            style={{
              background: theme === 'dark' ? '#ffffff' : '#000000',
              border: 'none',
              color: theme === 'dark' ? '#000000' : '#ffffff',
              padding: '8px 16px',
              borderRadius: '4px',
              fontSize: '0.7rem',
              fontWeight: 900,
              minWidth: '80px',
              textTransform: 'uppercase'
            }}
          >
            {theme}
          </motion.button>
        </div>

        {/* Language Matrix - HIGH CONTRAST VERSION */}
        <div style={{ padding: '12px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
            <Globe size={18} color="var(--text-main)" />
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{t('settings.lang')}</span>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
            {Object.keys(LANGUAGES).map((langKey) => {
              const isActive = language === langKey;
              return (
                <motion.button
                  key={langKey}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setLanguage(langKey as Language)}
                  style={{
                    height: '45px',
                    borderRadius: '6px',
                    // BOTÓN ACTIVO: Blanco sobre Negro (o viceversa)
                    background: isActive ? '#ffffff' : 'rgba(255,255,255,0.05)',
                    border: isActive ? '2px solid #ffffff' : '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    // SOMBRA DE BRILLO SI ESTÁ ACTIVO
                    boxShadow: isActive ? '0 0 20px rgba(255,255,255,0.3)' : 'none',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    opacity: isActive ? 1 : 0.3
                  }}
                  title={LANGUAGES[langKey as Language].label}
                >
                  {LANGUAGES[langKey as Language].flag}
                </motion.button>
              );
            })}
          </div>
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
             <span style={{ fontSize: '0.7rem', color: '#fff', fontWeight: 800, opacity: 0.8, textTransform: 'uppercase', letterSpacing: '1px' }}>
                {LANGUAGES[language as Language].label}
             </span>
          </div>
        </div>
      </section>

      {/* Security Info */}
      <section style={sectionStyle}>
        <h3 style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '15px', letterSpacing: '2px' }}>{t('settings.security')}</h3>
        
        <div style={rowStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Shield size={18} />
            <span style={{ fontSize: '0.9rem' }}>{t('settings.bio')}</span>
          </div>
          <span style={{ color: 'var(--success)', fontSize: '0.7rem', fontWeight: 900 }}>ENABLED</span>
        </div>

        <div style={{ ...rowStyle, borderBottom: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Smartphone size={18} />
            <span style={{ fontSize: '0.9rem' }}>{t('settings.device')}</span>
          </div>
          <span style={{ color: '#fff', fontSize: '0.7rem', fontWeight: 900, background: '#333', padding: '2px 6px', borderRadius: '4px' }}>TRUSTED</span>
        </div>
      </section>

      <motion.button 
        whileTap={{ scale: 0.98 }}
        onClick={logout}
        style={{ 
          width: '100%', 
          padding: '18px', 
          color: '#ffffff', 
          background: 'rgba(153, 27, 27, 0.2)', 
          borderRadius: '4px',
          fontWeight: 900,
          marginTop: '20px',
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          border: '2px solid rgba(153, 27, 27, 0.5)',
          letterSpacing: '2px',
          fontSize: '0.8rem'
        }}
      >
        <LogOut size={18} />
        {t('settings.logout')}
      </motion.button>
      
      <p style={{ textAlign: 'center', marginTop: '30px', fontSize: '0.6rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
        {t('settings.id')}
      </p>
    </div>
  );
};