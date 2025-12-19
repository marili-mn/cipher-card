import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

interface Props {
  onComplete: () => void;
}

const BOOT_SEQUENCES = [
  "ESTABLISHING SATELLITE LINK...",
  "DECRYPTING RSA-4096 VAULT...",
  "LOADING GOTHAM FINANCIAL PROTOCOLS...",
  "BYPASSING MULTI-FACTOR AUTH...",
  "ACCESS GRANTED: WAYNE_ENTERPRISES"
];

export const SplashView: React.FC<Props> = ({ onComplete }) => {
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    if (currentLine < BOOT_SEQUENCES.length) {
      const timer = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
      }, 600);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(onComplete, 1500); // Dar tiempo para leer el último
      return () => clearTimeout(timer);
    }
  }, [currentLine, onComplete]);

  return (
    <div style={{
      backgroundColor: '#000',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    }}>
      {/* Icon Breathing Effect */}
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.5, 1, 0.5],
          filter: ["blur(0px)", "blur(2px)", "blur(0px)"]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
        style={{ marginBottom: '40px' }}
      >
        <ShieldCheck color="#fff" size={80} strokeWidth={1} />
      </motion.div>

      {/* Terminal Text */}
      <div style={{ 
        fontFamily: 'monospace', 
        fontSize: '10px', 
        color: '#555',
        textAlign: 'center',
        width: '100%',
        height: '20px'
      }}>
        <AnimatePresence mode="wait">
          <motion.p
            key={currentLine}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {BOOT_SEQUENCES[currentLine] || "FINALIZING..."}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Progress Bar Industrial */}
      <div style={{ 
        width: '150px', 
        height: '2px', 
        background: '#111', 
        marginTop: '20px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 3, ease: "linear" }}
          style={{ height: '100%', background: '#fff' }}
        />
      </div>
    </div>
  );
};
