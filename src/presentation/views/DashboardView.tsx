import React from 'react';
import { useCards } from '../hooks/useCards';
import { CardItem } from '../components/CardItem';
import { ShieldCheck, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';

export const DashboardView: React.FC = () => {
  const { cards, isLoading, toggleCardLock, error } = useCards();
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <div className="container">
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '32px',
        paddingTop: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <ShieldCheck color="var(--primary)" size={32} />
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-1px' }}>{t('dashboard.title')}</h1>
        </div>
        <div style={{ 
          fontSize: '0.6rem', 
          border: '1px solid var(--border-color)', 
          padding: '4px 8px', 
          borderRadius: '4px',
          color: 'var(--text-muted)'
        }}>
          BETA 0.9
        </div>
      </header>

      <main style={{ paddingBottom: '100px' }}>
        {isLoading ? (
          <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              style={{ display: 'inline-block', marginBottom: '10px' }}
            >
              <Activity size={24} />
            </motion.div>
            <p style={{ fontSize: '0.8rem', letterSpacing: '2px' }}>{t('dashboard.decrypting')}</p>
          </div>
        ) : error ? (
          <div style={{ color: 'var(--danger)', padding: '20px', textAlign: 'center', border: '1px solid var(--danger)' }}>
            ⚠️ {error}
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
          >
            {cards.length === 0 ? (
                <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>{t('dashboard.no_cards')}</p>
            ) : cards.map(card => (
              <CardItem 
                key={card.id} 
                card={card} 
                onToggleLock={toggleCardLock} 
              />
            ))}
          </motion.div>
        )}

        {/* Live Feed */}
        {!isLoading && (
          <motion.section 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.8 }}
            style={{ marginTop: '40px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Activity size={14} color="var(--text-muted)" />
              <h2 style={{ fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '2px' }}>
                {t('dashboard.feed.title')}
              </h2>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <FeedItem title="PROXY ROTATION" status="COMPLETE" time="02s ago" />
              <FeedItem title="GEO-FENCING" status="ACTIVE" time="45s ago" />
            </div>
          </motion.section>
        )}
      </main>
    </div>
  );
};

const FeedItem = ({ title, status, time }: any) => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    padding: '12px',
    background: 'var(--surface)',
    border: '1px solid var(--border-color)',
    borderRadius: '4px'
  }}>
    <div>
      <span style={{ fontSize: '0.7rem', fontWeight: 'bold', display: 'block' }}>{title}</span>
      <span style={{ fontSize: '0.6rem', color: 'var(--success)' }}>● {status}</span>
    </div>
    <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{time}</span>
  </div>
);
