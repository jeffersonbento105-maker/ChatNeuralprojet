import React, { useState } from 'react';

const DetoxButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    // Could trigger a detox recipe request or open detox functionality
    console.log('Detox button clicked');
  };

  return (
    <div 
      className="top-buttons"
      style={{
        position: 'fixed',
        top: '15px',
        right: '15px',
        display: 'flex',
        gap: '10px',
        zIndex: 9999
      }}
    >
      <div
        className="detox-btn-container"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        style={{ position: 'relative' }}
      >
      <button 
        className="detox-btn"
        onClick={handleClick}
        style={{
          background: '#4caf50',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          padding: '6px 12px',
          fontSize: '14px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          boxShadow: '0 3px 6px rgba(0,0,0,0.2)',
          transition: 'background 0.25s, transform 0.25s'
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
          fill="currentColor"
          width="18" 
          height="18"
          style={{ verticalAlign: 'middle', marginRight: '6px' }}
        >
          <path d="M20 2h24v6H20zM24 10h16l-2 44H26z" />
          <path d="M32 14c-8 0-14 6-14 14h28c0-8-6-14-14-14z" />
          <circle cx="32" cy="28" r="4" />
        </svg>
        Detox
      </button>
      
        {/* Tooltip */}
        {isVisible && (
          <div 
            style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              right: '0',
              maxWidth: '260px',
              background: '#333',
              color: '#fff',
              borderRadius: '6px',
              padding: '6px 10px',
              fontSize: '13px',
              lineHeight: '1.4',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              whiteSpace: 'normal',
              opacity: 1,
              pointerEvents: 'none',
              transform: 'translateY(0)',
              transition: 'opacity 0.25s ease, transform 0.25s ease',
              zIndex: 10000
            }}
          >
            Ask Chat for a detox recipe for your diet.
            <div 
              style={{
                position: 'absolute',
                top: '-6px',
                right: '12px',
                border: '6px solid transparent',
                borderBottomColor: '#333'
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DetoxButton;