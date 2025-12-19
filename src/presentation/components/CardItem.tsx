import React from 'react';
import styles from './CardItem.module.css';
import { Card } from '../../core/domain/Card';
import { Shield, ShieldOff, Cpu } from 'lucide-react';
import { clsx } from 'clsx';

interface Props {
  card: Card;
  onToggleLock: (id: string) => void;
}

export const CardItem: React.FC<Props> = ({ card, onToggleLock }) => {
  const isFrozen = card.status === 'frozen';

  return (
    <div 
      className={clsx(styles.cardContainer, isFrozen && styles.frozen)}
      onClick={() => onToggleLock(card.id)}
    >
      <div className={styles.statusIndicator}>
        <div className={clsx(styles.led, isFrozen && styles.ledFrozen)} />
        <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', fontWeight: 'bold' }}>
          {isFrozen ? 'SECURED / FROZEN' : 'ACTIVE / ENCRYPTED'}
        </span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Cpu color="#94a3b8" size={32} strokeWidth={1.5} />
        <span className={styles.provider}>{card.provider.toUpperCase()}</span>
      </div>

      <div className={styles.cardNumber}>
        {isFrozen ? "•••• •••• •••• " + card.pan.slice(-4) : card.pan}
      </div>

      <div className={styles.footer}>
        <div>
          <p className={styles.label}>Card Holder</p>
          <p className={styles.value}>{card.holderName}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p className={styles.label}>Expiry</p>
          <p className={styles.value}>{card.expiry}</p>
        </div>
      </div>
      
      {/* Icono de estado flotante al interactuar */}
      <div style={{ position: 'absolute', bottom: '24px', right: '120px', opacity: 0.1 }}>
        {isFrozen ? <ShieldOff size={80} /> : <Shield size={80} />}
      </div>
    </div>
  );
};
