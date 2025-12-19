import React from 'react';
import styles from './CardItem.module.css';
import type { Card } from '../../core/domain/Card';
import { Shield, ShieldOff, Cpu } from 'lucide-react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

interface Props {
  card: Card;
  onToggleLock: (id: string) => void;
}

export const CardItem: React.FC<Props> = ({ card, onToggleLock }) => {
  const isFrozen = card.status === 'frozen';
  
  const frozenColor = "#991b1b";
  const borderColor = isFrozen ? frozenColor : "rgba(255,255,255,0.1)";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        borderColor: borderColor,
        boxShadow: isFrozen 
          ? `0 0 20px -5px ${frozenColor}` 
          : "0 10px 20px -5px rgba(0,0,0,0.8)"
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={styles.cardContainer}
      onClick={() => onToggleLock(card.id)}
      style={{
        borderWidth: '1px',
        borderStyle: 'solid'
      }}
    >
      <div className={styles.bgDeco} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <Cpu color="#525252" size={36} strokeWidth={1.5} />
        
        <div className={styles.statusIndicator}>
          <div className={clsx(styles.led, isFrozen && styles.ledFrozen)} />
          <span style={{ fontSize: '0.6rem', color: '#a3a3a3', fontWeight: 'bold', letterSpacing: '1px' }}>
            {isFrozen ? 'FROZEN' : 'ACTIVE'}
          </span>
        </div>
      </div>

      <div style={{ position: 'absolute', top: '28px', left: '70px' }}>
        <span className={styles.provider}>{card.provider.toUpperCase()}</span>
      </div>

      <div className={styles.cardNumber}>
        {isFrozen ? "•••• •••• •••• " + card.pan.slice(-4) : card.pan}
      </div>

      <div className={styles.footer}>
        <div>
          <p className={styles.label}>OPERATIVE</p>
          <p className={styles.value}>{card.holderName}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p className={styles.label}>EXP</p>
          <p className={styles.value}>{card.expiry}</p>
        </div>
      </div>
      
      <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', opacity: 0.05, transform: 'rotate(-15deg)' }}>
        {isFrozen ? <ShieldOff size={140} color="red" /> : <Shield size={140} color="white" />}
      </div>
    </motion.div>
  );
};