import React from 'react';
import { useCards } from '../hooks/useCards';

// Versión simplificada y blindada del Dashboard
// Objetivo: Validar que el flujo de datos (Hooks -> Mock -> UI) funciona
export const DashboardView: React.FC = () => {
  const { cards, isLoading, error, toggleCardLock } = useCards();

  console.log('Renderizando Dashboard. Estado:', { isLoading, error, cardsLength: cards.length });

  // Estilos inline para evitar problemas de carga de CSS
  const styles = {
    container: {
      backgroundColor: '#0f172a',
      minHeight: '100vh',
      padding: '20px',
      color: 'white',
      fontFamily: 'sans-serif'
    },
    card: {
      backgroundColor: '#1e293b',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '15px',
      border: '1px solid #334155',
      cursor: 'pointer'
    },
    status: {
      fontSize: '12px',
      textTransform: 'uppercase' as const,
      color: '#94a3b8',
      marginBottom: '10px'
    },
    pan: {
      fontFamily: 'monospace',
      fontSize: '18px',
      letterSpacing: '2px',
      marginBottom: '10px'
    }
  };

  if (isLoading) {
    return <div style={{...styles.container, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <h2>⏳ Loading Secure Vault...</h2>
    </div>;
  }

  if (error) {
    return <div style={{...styles.container, color: 'red'}}>
      <h2>❌ Error: {error}</h2>
    </div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={{ marginBottom: '30px', borderBottom: '1px solid #334155', paddingBottom: '10px' }}>
        CipherCard <span style={{ fontSize: '12px', color: '#6366f1' }}>SECURE PROTOTYPE</span>
      </h1>

      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        {cards.map(card => (
          <div 
            key={card.id} 
            style={{
              ...styles.card,
              opacity: card.status === 'frozen' ? 0.6 : 1,
              borderColor: card.status === 'frozen' ? '#ef4444' : '#6366f1'
            }}
            onClick={() => toggleCardLock(card.id)}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={styles.status}>
                {card.status === 'frozen' ? '🔒 FROZEN' : '✅ ACTIVE'}
              </span>
              <span style={{ fontWeight: 'bold', color: '#6366f1' }}>{card.provider.toUpperCase()}</span>
            </div>
            
            <div style={styles.pan}>
              {card.status === 'frozen' ? '•••• •••• •••• ' + card.pan.slice(-4) : card.pan}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#cbd5e1' }}>
              <span>{card.holderName}</span>
              <span>{card.expiry}</span>
            </div>
            
            <p style={{ fontSize: '10px', marginTop: '15px', color: '#64748b' }}>
              Tap to {card.status === 'active' ? 'freeze' : 'unfreeze'}
            </p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '50px', fontSize: '12px', color: '#475569', textAlign: 'center' }}>
        Backend: Mock Adapter | Encryption: None (Demo)
      </div>
    </div>
  );
};