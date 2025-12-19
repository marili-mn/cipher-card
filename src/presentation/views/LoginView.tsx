import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ChevronRight } from 'lucide-react';

interface Props {
  onLogin: () => void;
}

export const LoginView: React.FC<Props> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const runDemoWayne = () => {
    if (isTyping) return;
    setIsTyping(true);
    const targetEmail = "bruce.wayne@wayne.ent";
    let current = "";
    let i = 0;

    const interval = setInterval(() => {
      current += targetEmail[i];
      setEmail(current);
      i++;
      if (i >= targetEmail.length) {
        clearInterval(interval);
        setTimeout(onLogin, 800);
      }
    }, 50);
  };

  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ textAlign: 'center', marginBottom: '60px' }}
      >
        <ShieldCheck color="#fff" size={48} style={{ marginBottom: '10px' }} />
        <h1 style={{ letterSpacing: '4px', fontSize: '1.2rem', fontWeight: 900 }}>SYSTEM ACCESS</h1>
      </motion.div>

      <div style={{ marginBottom: '30px' }}>
        <p style={{ fontSize: '0.6rem', color: '#555', letterSpacing: '2px', marginBottom: '10px' }}>IDENTITY IDENTIFIER</p>
        <div style={{ 
          background: '#0a0a0a', 
          border: '1px solid #222', 
          padding: '16px', 
          borderRadius: '4px',
          fontFamily: 'monospace',
          color: '#fff'
        }}>
          {email || <span style={{ color: '#222' }}>waiting_for_input...</span>}
        </div>
      </div>

      <button 
        onClick={runDemoWayne}
        disabled={isTyping}
        style={{
          width: '100%',
          padding: '20px',
          background: '#fff',
          color: '#000',
          fontWeight: 900,
          borderRadius: '4px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
          letterSpacing: '2px'
        }}
      >
        {isTyping ? "ENCRYPTING..." : "WAYNE PROTOCOL"}
        <ChevronRight size={20} />
      </button>

      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.6rem', color: '#333' }}>SECURED BY AES-4096 GOTHAM FINANCIAL</p>
      </div>
    </div>
  );
};
