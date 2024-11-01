import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useUserAuth } from '../../contexts/useUserAuth';
import * as actions from '../../../redux/actions/actions';

const Card = ({
  goalName,
  goalAmount,
  goalDuration,
  goalId,
  goalProgress,
  goalPercentage,
}) => {
  const dispatch = useDispatch();
  const progress = useSelector((state) => state.goals.progress);

  const currentGoals = useSelector((state => state.goals.goals));
  // const thisGoalName = useSelector((state) => state.goals.goals.goalName);
  // const thisGoalAmount = useSelector(
  //   (state) => state.goals.goals.goalAmount
  // );
  // const thisGoalDuration = useSelector(
  //   (state) => state.goals.goals.goalDuration
  // );
  // const thisGoalId = useSelector((state) => state.goals.goals.goalId);
  // const thisGoalProgress = useSelector(
  //   (state) => state.goals.goals.goalProgress
  // );
  // const thisGoalPercentage = useSelector(
  //   (state) => state.goals.goals.goalPercentage
  // );

  // const {
  // goalName,
  // goalAmount,
  // goalDuration,
  // goalId,
  // goalProgress,
  // goalPercentage,
  // } = useSelector((state) => state.goals.tempGoals);

  // console.log('goalname', goalName);

  const { loggedInUser } = useUserAuth();
  let parsedUser = loggedInUser;


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    dispatch(actions.updateProgressActionCreator(value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (typeof loggedInUser !== 'object') {
      parsedUser = JSON.parse(loggedInUser);
      console.log('Parsed logged in User', parsedUser);
    }

    try {
      const response = await fetch('http://localhost:3000/api/updateprogress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          progress,
          goalId,
          loggedInUser: parsedUser.id,
        }),
        credentials: 'include',
      });
      const updatedGoal = await response.json();
      dispatch(
        actions.storeGoalsActionCreator((prevGoals) =>
          prevGoals.map((goal) =>
            goal.id === goalId ? { ...goal, ...updatedGoal } : goal
          )
        )
      );
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async () => {
    const endpoint = `http://localhost:3000/api/deletegoal?id=${goalId}`;
    try {
      const response = await fetch(endpoint, { method: 'DELETE' });
      if (response.ok) {
        const updatedGoals = currentGoals.filter((goal) => goal.id !== goalId);
        dispatch(actions.storeGoalsActionCreator(updatedGoals));
      } else {
        console.error('Failed to delete goals', await response.text());
      }
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };

  const getUnit = (goalString) => {
    if (!goalString) return ''; // Check for empty or undefined input

    const words = goalString.trim().split(' '); // Trim and split by spaces
    return cleanString(words[words.length - 1]); // Return the last word
  };

  const cleanString = (str) => {
    return str
      .toLowerCase() // Convert to lowercase
      .replace(/[^\w\s]|_/g, '') // Remove punctuation
      .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
      .trim(); // Remove leading/trailing spaces
  };

  return (
    <div
      style={{
        background: '#ffffff',
        border: '1px solid #a4d4fc',
        borderRadius: '8px',
        padding: '20px',
        margin: '10px 0',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s',
      }}
    >
      <p
        style={{
          margin: '10px 0',
          fontSize: '18px',
          color: '#1c3e7f',
        }}
      >
        {' '}
        {goalName}
      </p>
      <p
        style={{
          margin: '10px 0',
          fontSize: '18px',
          color: '#1c3e7f',
        }}
      >
        {' '}
        Amount: {goalAmount} {getUnit(goalName)}
      </p>
      <p
        style={{
          margin: '10px 0',
          fontSize: '18px',
          color: '#1c3e7f',
        }}
      >
        {' '}
        Duration: {goalDuration} days
      </p>
      <p
        style={{
          margin: '10px 0',
          fontSize: '18px',
          color: '#1c3e7f',
        }}
      >
        {' '}
        Progress: {goalProgress} {getUnit(goalName)}
      </p>
      <p
        style={{
          margin: '10px 0',
          fontSize: '18px',
          color: '#1c3e7f',
        }}
      >
        {' '}
        Completion: {goalPercentage}%
      </p>
      <form
        style={{
          margin: '10px 0',
          fontSize: '22px',
          color: '#1c3e7f',
        }}
        onSubmit={handleSubmit}
      >
        Add Progress:{' '}
      </form>
      <form onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
        <input
          type='number'
          required
          placeholder='Input your progress!'
          id='progress'
          name='progress'
          value={progress.progress}
          onChange={handleInputChange}
          style={{
            width: '80%',
            maxWidth: '300px',
            padding: '10px',
            border: '1px solid #14a5fb',
            borderRadius: '5px',
            marginBottom: '10px',
            fontSize: '16px',
            boxSizing: 'border-box',
          }}
        />
        <button
          type='submit'
          style={{
            background: 'blue',
            color: 'white',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background 0.3s ease',
            // marginLeft: '10px',
          }}
        >
          Update Progress
        </button>
      </form>
      <button
        onClick={() => handleDelete()}
        style={{
          background: 'red',
          color: 'white',
          border: 'none',
          padding: '10px 15px',
          borderRadius: '3px',
          cursor: 'pointer',
          transition: 'background 0.3s ease',
          marginRight: '5px',
        }}
      >
        {' '}
        Delete{' '}
      </button>
    </div>
  );
};

export default Card;
