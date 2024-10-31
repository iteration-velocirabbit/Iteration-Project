import React, { useState, useEffect } from 'react';
import Card from './Card';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
// SAR, measurable, time to props and pass to individual cards

// grab fetched goal data and pass to respective components
// assign SAR, measurable, time to props and pass to goalist
// map to populate state array with users goals and render a card component for each goal


const GoalList = () => {


  const goals = useSelector(state => state.goals.goals);


  /*
        goalId: '',
        goalName: '',
        goalAmount: '',
        goalDuration: '',
        goalProgress: '',
        goalPercentage: ''
  */
  return (
    <div>
      {goals &&
      
      goals.map(goal => {
        <Card 
        goalName={goal.goalName}
        goalAmount={goal.goalAmount}
        goalDuration={goal.goalDuration}
        goalId={goal.goalId}
        goalProgress={goal.goalProgress}
        goalPercentage={goal.goalPercentage}
        />
      })}
    </div>
  );
};

export default GoalList;
