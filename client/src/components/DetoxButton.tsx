import React, { useState } from 'react';

const DetoxButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    // Could trigger a detox recipe request or open detox functionality
    console.log('Detox button clicked');
  };

  return (
    <div 
      className="detox-btn-container"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      style={{
        position: 'fixed',
        top: '15px',
        right: '15px',
        zIndex: 9999
      }}
    >
      <button 
        className="detox-btn"
        onClick={handleClick}
        style={{
          background: '#4caf50',
          border: 'none',
          borderRadius: '50%',
          width: '38px',
          height: '38px',
          cursor: 'pointer',
          boxShadow: '0px 3px 6px rgba(0,0,0,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.2s, background 0.2s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#45a049';
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = '#4caf50';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        {/* Copo de Milkshake com Canudo SVG */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 64 64"
          style={{
            width: '20px',
            height: '20px',
            fill: 'white'
          }}
        >
          {/* Copo de milkshake - formato mais largo em cima */}
          <path d="M20 22 L22 54 L42 54 L44 22 Z" fill="white"/>
          {/* Borda do copo */}
          <path d="M20 22 L22 54 L42 54 L44 22 Z" stroke="white" strokeWidth="1.5" fill="none"/>
          {/* Topo do copo (borda) */}
          <rect x="18" y="20" width="28" height="4" rx="2" fill="white"/>
          {/* Líquido do milkshake */}
          <path d="M21 24 L23 50 L41 50 L43 24 Z" fill="rgba(255,255,255,0.7)"/>
          {/* Canudo listrado */}
          <rect x="38" y="8" width="3" height="18" fill="white"/>
          <rect x="38" y="8" width="3" height="2" fill="rgba(255,255,255,0.5)"/>
          <rect x="38" y="12" width="3" height="2" fill="rgba(255,255,255,0.5)"/>
          <rect x="38" y="16" width="3" height="2" fill="rgba(255,255,255,0.5)"/>
          <rect x="38" y="20" width="3" height="2" fill="rgba(255,255,255,0.5)"/>
          {/* Curva do canudo no topo */}
          <path d="M39.5 8 Q43 6 45 10" stroke="white" strokeWidth="2" fill="none"/>
        </svg>
      </button>
      
      {/* Tooltip */}
      {isVisible && (
        <div 
          className="tooltip"
          style={{
            visibility: 'visible',
            width: '230px',
            backgroundColor: '#333',
            color: '#fff',
            textAlign: 'center',
            borderRadius: '6px',
            padding: '6px',
            position: 'absolute',
            zIndex: 1,
            top: '45px',
            right: '0',
            opacity: 1,
            transition: 'opacity 0.3s',
            fontSize: '13px'
          }}
        >
          Ask Chat for a detox recipe for your diet.
        </div>
      )}
    </div>
  );
};

export default DetoxButton;