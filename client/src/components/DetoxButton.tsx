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
        {/* Copo com Canudo SVG */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 64 64"
          style={{
            width: '20px',
            height: '20px',
            fill: 'white'
          }}
        >
          {/* Copo */}
          <path d="M18 16h28l-4 40H22z" stroke="white" strokeWidth="2" fill="none"/>
          {/* Base do copo */}
          <ellipse cx="32" cy="56" rx="11" ry="3" fill="white"/>
          {/* Topo do copo */}
          <ellipse cx="32" cy="16" rx="14" ry="3" fill="white"/>
          {/* Canudo */}
          <rect x="42" y="8" width="2" height="20" fill="white"/>
          {/* Curva do canudo */}
          <path d="M42 8 Q46 6 48 10" stroke="white" strokeWidth="2" fill="none"/>
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