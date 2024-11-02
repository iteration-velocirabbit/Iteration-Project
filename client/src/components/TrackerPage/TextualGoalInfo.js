import React from 'react';

const TextualGoalInfo = ({ goalName, goalAmount, goalDuration }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '8px', width: '100%', maxWidth: '300px' }}>
      <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>{goalName}</div>
      <div style={{ fontSize: '16px', color: '#4a4a4a' }}>Amount: {goalAmount}</div>
      <div style={{ fontSize: '16px', color: '#4a4a4a' }}>Duration: {goalDuration}</div>
    </div>
  );
};

export default TextualGoalInfo;
