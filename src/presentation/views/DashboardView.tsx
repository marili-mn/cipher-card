import React, { useEffect } from 'react';
import { useCards } from '../hooks/useCards';
import { CardItem } from '../components/CardItem';
import { ShieldCheck, Activity } from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { cards, isLoading, toggleCardLock, error } = useCards();

  // Quitamos los estilos inline hardcoded para permitir temas
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
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>CipherCard</h1>
        </div>
      </header>

      <main style={{ paddingBottom: '80px' }}>
        {isLoading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
            <p>Decrypting secure vault...</p>
          </div>
        ) : error ? (
          <div style={{ color: 'var(--danger)', padding: '20px', textAlign: 'center' }}>
            {error}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {cards.map(card => (
              <CardItem 
                key={card.id} 
                card={card} 
                onToggleLock={toggleCardLock} 
              />
            ))}
          </div>
        )}

        {/* Activity Feed */}
        <section style={{ marginTop: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Activity size={18} color="var(--text-muted)" />
            <h2 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Security Events
            </h2>
          </div>
          <div style={{ background: 'var(--surface)', padding: '15px', borderRadius: '12px', borderLeft: '4px solid var(--primary)' }}>
            <p style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Mock Adapter Active</p>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Running in demonstration mode</p>
          </div>
        </section>
      </main>
    </div>
  );
};
