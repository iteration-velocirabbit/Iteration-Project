import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../../redux/actions/actions';
import { useUserAuth } from '../../contexts/useUserAuth';

// functionaliity

const GoalCreator = ({ onGoalAdd }) => {
  const { loggedInUser } = useUserAuth();
  const goal = useSelector((state) => state.goals.tempGoal);
  const dispatch = useDispatch();
  let parsedUser = loggedInUser;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const updatedTempGoal = { ...goal, [name]: value };
    dispatch(actions.goalActionCreator(updatedTempGoal));
  };

  const handleSubmit = async (e) => {
    let googleAcc = false;
    e.preventDefault();
    console.log('submit button is pressed');
    if (typeof loggedInUser !== 'object') {
      parsedUser = JSON.parse(loggedInUser);
      console.log('Parsed logged in User', parsedUser);
    } else {
      googleAcc = true;
    }
    try {
      //console.log(userInfo);
      const response = await fetch('http://localhost:3000/api/creategoal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: parsedUser.id,
          ...goal,
          google: googleAcc,
          credentials: 'include',
        }),
      });

      const data = await response.json();
      console.log('goal created', data);
      dispatch(actions.storeGoalsActionCreator(data));
      dispatch(
        actions.goalActionCreator({
          goalName: '',
          goalDuration: '',
          goalAmount: '',
        })
      );
      onGoalAdd();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div
      id='goalCreatorDiv'
      style={{
        backgroundColor: '#a4d4fc',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        margin: '20px auto',
        transition: 'transform 0.2s',
      }}
    >
      <h1
        style={{
          color: '#1c3e7f',
          fontSize: '26px',
          marginBottom: '15px',
          fontWeight: 600,
        }}
      >
        Enter Your Goal
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          required
          placeholder='Goal name'
          id='goalName'
          name='goalName'
          value={goal.goalName}
          onChange={handleInputChange}
          style={{
            width: 'calc(100% - 22px)',
            padding: '10px',
            border: '1px solid #14a5fb',
            borderRadius: '5px',
            marginBottom: '15px',
            fontSize: '16px',
          }}
        />
        <input
          type='number'
          required
          placeholder='Goal Amount'
          id='goalAmount'
          name='goalAmount'
          value={goal.goalAmount}
          onChange={handleInputChange}
          style={{
            width: 'calc(100% - 22px)',
            padding: '10px',
            border: '1px solid #14a5fb',
            borderRadius: '5px',
            marginBottom: '15px',
            fontSize: '16px',
          }}
        />
        <input
          type='number'
          required
          placeholder='Goal duration (days)'
          id='goalDuration'
          name='goalDuration'
          value={goal.goalDuration}
          onChange={handleInputChange}
          style={{
            width: 'calc(100% - 22px)',
            padding: '10px',
            border: '1px solid #14a5fb',
            borderRadius: '5px',
            marginBottom: '15px',
            fontSize: '16px',
          }}
        />
        <button
          type='submit'
          style={{
            background: '#619aa9',
            color: 'white',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background 0.3s ease',
            marginLeft: '10px',
          }}
        >
          Add Goal
        </button>
      </form>
    </div>
  );
};

export default GoalCreator;
