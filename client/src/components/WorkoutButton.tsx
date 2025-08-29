import React, { useState } from 'react';

const WorkoutButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    // Could trigger a workout request or open workout functionality
    console.log('Workout button clicked');
  };

  return (
    <button
      id="workout-btn"
      onClick={handleClick}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      title="Ask the chat for exercises to train at home or at the gym"
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
        transition: 'background 0.25s, transform 0.25s',
        position: 'relative'
      }}
      onMouseEnter={(e) => {
        setIsVisible(true);
        e.currentTarget.style.background = '#45a049';
        e.currentTarget.style.transform = 'scale(1.05)';
      }}
      onMouseLeave={(e) => {
        setIsVisible(false);
        e.currentTarget.style.background = '#4caf50';
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      {/* Dumbbell Icon SVG */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="currentColor"
        width="18" 
        height="18"
        style={{ verticalAlign: 'middle', marginRight: '6px' }}
      >
        <path d="M4 10h2v4H4v-4zm14 0h2v4h-2v-4zM7 7h2v10H7V7zm8 0h2v10h-2V7zm-4 2h2v6h-2V9z"/>
      </svg>
      Workout
      
      {/* Tooltip */}
      {isVisible && (
        <div 
          style={{
            content: 'attr(data-tooltip)',
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
          Ask the chat for exercises to train at home or at the gym.
          <div 
            style={{
              content: '',
              position: 'absolute',
              top: '-6px',
              right: '12px',
              border: '6px solid transparent',
              borderBottomColor: '#333'
            }}
          />
        </div>
      )}
    </button>
  );
};

export default WorkoutButton;