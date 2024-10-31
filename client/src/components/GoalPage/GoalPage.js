import React, { useState, useEffect } from 'react';
import GoalList from './GoalList';
import GoalCreator from './GoalCreator';
import { useSelector, useDispatch } from 'react-redux';
import { useUserAuth } from '../../contexts/useUserAuth';

const GoalPage = () => {
  const { loggedInUser } = useUserAuth();
  
  // console.log(goal);
  // const [goals, setGoals] = useState(null);

  const fetchGoals = async () => {
    console.log("LOGGED IN USER ID IN FETCHGOALS", loggedInUser.id)
    const endpoint = `http://localhost:3000/api/fetchgoal?id=${loggedInUser.id}`; // Adjust the endpoint based on your API
    try {
      const response = await fetch(endpoint);
      if (response.ok) {
        const data = await response.json();
        console.log('response from fetch call', data);
        useDispatch(actions.storeGoalsActionCreator(data));
      } else {
        const errorData = await response.json();
        console.error('Error fetching accounts:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

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
      <div>
        <GoalList id='goalList' />
      </div>

    </div>
  );
};

export default GoalPage;
