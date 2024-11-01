import React, { useState, useEffect } from 'react';
import GoalList from '../GoalPage/GoalList';
import GoalCreator from '../GoalPage/GoalCreator';
import Graph from './Graph';
import TextualGoalInfo from './TextualGoalInfo';
import { useSelector, useDispatch } from 'react-redux';
import { useUserAuth } from '../../contexts/useUserAuth';
import * as actions from '../../../redux/actions/actions';

const TrackerPage = () => {
  const { loggedInUser } = useUserAuth();
  let parsedUser = loggedInUser;
  const dispatch = useDispatch();
  const goals = useSelector((state) => state.goals.goals);

  const fetchGoals = async () => {
    if (typeof loggedInUser !== 'object') {
      parsedUser = JSON.parse(loggedInUser);
      console.log('Parsed logged in User', parsedUser);
    }
    try {
      console.log('LOGGED IN USER ID IN FETCHGOALS', parsedUser.id);
      const endpoint = `http://localhost:3000/api/fetchgoal?id=${parsedUser.id}`;
      const response = await fetch(endpoint);
      const data = await response.json();
      console.log('response from fetch call', data);
      dispatch(actions.storeGoalsActionCreator(data));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, [loggedInUser]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {Array.isArray(goals) &&
        goals?.map((goal) => (
          <div
            key={goal.goalId}
            style={{
              display: 'flex',
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              width: '1500px',
              height: '450px',
              backgroundColor: 'white',
              marginTop: '50px',
            }}
          >
            <TextualGoalInfo goal={goal} />
            {goal.goalProgress && <Graph goalProgress={goal.goalProgress} />}
          </div>
        ))}
    </div>
  );
};
export default TrackerPage;
