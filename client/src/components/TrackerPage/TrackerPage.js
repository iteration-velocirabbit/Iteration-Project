import React, { useState, useEffect } from 'react';
import GoalList from './GoalList';
import GoalCreator from './GoalCreator';
import { useSelector, useDispatch } from 'react-redux';
import { useUserAuth } from '../../contexts/useUserAuth';
import * as actions from '../../../redux/actions/actions';

const TrackerPage = () => {
  const { loggedInUser } = useUserAuth();
  let parsedUser = loggedInUser;
  const dispatch = useDispatch();

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
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '400px',
          backgroundColor: 'white',
          marginTop: '50px',
        }}
      ></div>

      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '400px',
          backgroundColor: 'white',
          marginTop: '50px',
        }}
      ></div>
    </div>
  );
};
export default TrackerPage;
