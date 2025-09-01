import React, { useState } from 'react';

const WorkoutButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    console.log('Investment button clicked');
  };

  return (
    <div 
      className="workout-btn-container"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      style={{
        position: 'fixed',
        top: '15px',
        right: '80px', // Afastado do botão detox
        zIndex: 9999
      }}
    >
      <button 
        className="workout-btn"
        onClick={handleClick}
        aria-label="Investment"
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
        {/* Dollar Sign */}
        <span style={{
          fontSize: '20px',
          fontWeight: 'bold',
          color: 'white'
        }}>
          $
        </span>
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
          Want to know the future of your money? Simulate on ChatNeural a 5% projection of your invested capital in Bitcoin over 10 years. Satisfy your curiosity!
        </div>
      )}
    </div>
  );
};

export default WorkoutButton;