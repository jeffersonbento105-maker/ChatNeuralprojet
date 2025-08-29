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
        {/* Detox Icon SVG */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 64 64"
          style={{
            width: '20px',
            height: '20px',
            fill: 'white'
          }}
        >
          <path d="M20 2h24v6H20zM24 10h16l-2 44H26z" />
          <path d="M32 14c-8 0-14 6-14 14h28c0-8-6-14-14-14z" />
          <circle cx="32" cy="28" r="4" />
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