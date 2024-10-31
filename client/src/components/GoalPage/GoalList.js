import React, { useState, useEffect } from 'react';
import Card from './Card';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';

const GoalList = () => {
  const goals = useSelector(state => state.goals.goals);

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
      justifyContent: 'center',
      padding: '20px'
    }}>
      {goals && goals.map(goal => (
        <div key={goal.goalId} style={{
          flex: '1 1 300px',
          maxWidth: '300px', 
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          borderRadius: '8px',
          padding: '20px',
          backgroundColor: '#fff',
          margin: '10px'
        }}>
          <Card 
            goalName={goal.goalName}
            goalAmount={goal.goalAmount}
            goalDuration={goal.goalDuration}
            goalId={goal.goalId}
            goalProgress={goal.goalProgress}
            goalPercentage={goal.goalPercentage}
          />
        </div>
      ))}
    </div>
  );
};

export default GoalList;
