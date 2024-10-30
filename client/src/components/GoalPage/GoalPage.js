import React, { useState, useEffect } from 'react';
import GoalList from './GoalList';
import GoalCreator from './GoalCreator';
import { useUserAuth } from '../../contexts/useUserAuth';

const GoalPage = () => {
  const { loggedInUser } = useUserAuth();
  const [goals, setGoals] = useState(null);

  const fetchGoals = async () => {
    const endpoint = `http://localhost:3000/api/fetchgoal?id=${loggedInUser}`; // Adjust the endpoint based on your API
    try {
      const response = await fetch(endpoint);
      if (response.ok) {
        const data = await response.json();
        console.log('response from fetch call', data);
        setGoals([{
          goalId: 100,
          goalName: "hello",
          goalAmount: 100,
          goalDuration: '10/12/2024',
          goalProgress: '100',
          goalPercentage: Math.round((100 / 100) * 100)
        }]);
      } else {
        const errorData = await response.json();
        console.error('Error fetching accounts:', errorData);
        setGoals([{fetchGoals: fetchGoals,
          userInfo: loggedInUser,
          goalId: 100,
          goalName: "hello",
          goalAmount: 100,
          goalDuration: '10/12/2024',
          goalProgress: '100',
          goalPercentage: Math.round((100 / 100) * 100)
        }]);
      }
    } catch (error) {
      console.error('Error:', error);
      setGoals([{
        goalId: 100,
        goalName: "hello",
        goalAmount: 100,
        goalDuration: '10/12/2024',
        goalProgress: '100',
        goalPercentage: Math.round((100 / 100) * 100)
      }]);
    }
  };

  console.log('goal state', goals);
  // Use effect to constantly fetch from db
  useEffect(() => {
      fetchGoals(); // Fetch accounts when the component mounts
  }, [loggedInUser]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'start',
        padding: '20px',
      }}
    >
    <GoalCreator id='goalCreator' userInfo={loggedInUser} />
      <div
        style={{
          flex: 1,
          marginRight: '20px',
          background: '#ffffff',
          border: '1px solid #14a5fb',
          borderRadius: '8px',
          padding: '20px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        {goals ? <GoalList id='goalList' goals={goals} /> : <div>No goals to display</div>}
        

      </div>

    </div>
  );
};

export default GoalPage;
