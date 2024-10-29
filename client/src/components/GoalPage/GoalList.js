import React, { useState, useEffect } from 'react';
import Card from './Card';
import { v4 as uuidv4 } from 'uuid';

// SAR, measurable, time to props and pass to individual cards

// grab fetched goal data and pass to respective components
// assign SAR, measurable, time to props and pass to goalist
// map to populate state array with users goals and render a card component for each goal


const GoalList = ({ goals }) => {


    const totalProgressGoals = goals.reduce((acc, currentGoal) => {
    const progressValue = Number(currentGoal.progress); // Convert to number
    const existingGoal = acc.find((goal) => goal.goal_id === currentGoal.goal_id);
  
    if (existingGoal) {
      return acc.map((goal) =>
        goal.goal_id === currentGoal.goal_id
          ? { ...goal, progress: goal.progress + progressValue } // Update the existing goal with summed progress
          : goal
      );
    }
  
    return [...acc, { ...currentGoal, progress: progressValue }]; // Ensure new goals have numeric progress
  }, []);


  return (
    <div style={{
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      margin: '20px 0',
    }}>
      <h1 style={{
        color: '#1c3e7f',
        fontSize: '26px',
        marginBottom: '15px',
        fontWeight: 600,
      }}>Goal List</h1>
      {totalProgressGoals.length > 0 ? (
        totalProgressGoals.map((goal) => (
          <Card
            // fetchGoals={fetchGoals}
            // userInfo={userInfo}
            key={uuidv4()}
            goalId={goal.goal_id}
            goalName={goal.sar}
            goalAmount={goal.measurable}
            goalDuration={goal.target_completion_date}
            goalProgress={goal.progress}
            goalPercentage={Math.round((goal.progress / goal.measurable) * 100)}
          />
        ))
      ) : (
        <p style={{
          color: '#1c3e7f',
          fontSize: '20px',
          marginBottom: '15px',
          fontWeight: 600,
        }}>No goals found. Please add some goals!</p>
      )}
    </div>
  );
};

export default GoalList;
