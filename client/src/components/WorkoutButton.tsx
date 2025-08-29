import React, { useState } from 'react';

const WorkoutButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    console.log('Workout button clicked');
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
        {/* Dumbbell Icon SVG */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="white"
          style={{
            width: '20px',
            height: '20px'
          }}
        >
          <path d="M4 10h2v4H4v-4zm14 0h2v4h-2v-4zM7 7h2v10H7V7zm8 0h2v10h-2V7zm-4 2h2v6h-2V9z"/>
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
          Ask the chat for exercises to train at home or at the gym.
        </div>
      )}
    </div>
  );
};

export default WorkoutButton;