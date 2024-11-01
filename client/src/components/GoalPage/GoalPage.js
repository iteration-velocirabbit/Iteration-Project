import React, { useState, useEffect } from 'react';
import GoalList from './GoalList';
import GoalCreator from './GoalCreator';
import { useSelector, useDispatch } from 'react-redux';
import { useUserAuth } from '../../contexts/useUserAuth';
import * as actions from '../../../redux/actions/actions';

const GoalPage = () => {
  const { loggedInUser } = useUserAuth();
  let parsedUser = loggedInUser;
  const dispatch = useDispatch();

  const fetchGoals = async () => {
    let google = false;
    if (typeof loggedInUser !== 'object') {
      parsedUser = JSON.parse(loggedInUser);
      console.log('Parsed logged in User', parsedUser);
      console.log('LOGGED IN USER ID IN FETCHGOALS', parsedUser.id);
      const endpoint = `http://localhost:3000/api/fetchgoal?id=${parsedUser.id}`;
      const response = await fetch(endpoint);
      const data = await response.json();
      console.log('response from fetch call', data);
      dispatch(actions.storeGoalsActionCreator(data));
    } else {
      google = true;
      console.log('LOGGED IN USER ID IN FETCHGOALS', parsedUser.id);
      const endpoint = `http://localhost:3000/api/fetchgoal?id=${parsedUser.id}&google=${google}`;
      const response = await fetch(endpoint);
      const data = await response.json();
      console.log('response from fetch call', data);
      dispatch(actions.storeGoalsActionCreator(data));
    }
  };

  useEffect(() => {
    fetchGoals();
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
      <GoalCreator id='goalCreator' />
      <div>
        <GoalList id='goalList' />
      </div>
    </div>
  );
};

export default GoalPage;
