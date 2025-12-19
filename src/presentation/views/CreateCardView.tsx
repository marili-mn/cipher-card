import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Database, Server, Lock, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

export const CreateCardView: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="container">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div style={{ 
          border: '1px dashed var(--border-color)', 
          padding: '24px', 
          borderRadius: '8px',
          background: 'var(--surface)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <FileText color="var(--text-main)" size={24} />
            <h1 style={{ fontSize: '1.1rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-main)' }}>{t('manifesto.title')}</h1>
          </div>

          <p style={{ fontSize: '1rem', lineHeight: '1.6', color: 'var(--text-main)', marginBottom: '20px', fontWeight: 500 }}>
            {t('manifesto.body')}
          </p>

          <div style={{ padding: '16px', background: 'rgba(255, 165, 0, 0.1)', borderLeft: '4px solid orange', borderRadius: '4px', marginBottom: '24px' }}>
            <h4 style={{ fontSize: '0.8rem', color: 'orange', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertTriangle size={14}/> {t('manifesto.status_title')}
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-main)', opacity: 0.9 }}>
              {t('manifesto.status_desc')}
            </p>
          </div>

          <div style={{ height: '1px', background: 'var(--border-color)', margin: '20px 0' }} />

          <h3 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '15px', letterSpacing: '1px' }}>
            {t('manifesto.arch')}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <TechItem 
              icon={<Server size={20} />} 
              title={t('manifesto.tech1.title')} 
              desc={t('manifesto.tech1.desc')} 
            />
            <TechItem 
              icon={<Database size={20} />} 
              title={t('manifesto.tech2.title')} 
              desc={t('manifesto.tech2.desc')} 
            />
            <TechItem 
              icon={<Lock size={20} />} 
              title={t('manifesto.tech3.title')} 
              desc={t('manifesto.tech3.desc')} 
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const TechItem = ({ icon, title, desc }: any) => (
  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
    <div style={{ marginTop: '2px', color: 'var(--text-main)' }}>{icon}</div>
    <div>
      <h4 style={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--text-main)' }}>{title}</h4>
      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>{desc}</p>
    </div>
  </div>
);