import React from 'react';
import GoalList from './GoalList';
import Graph from './Graph';
import GoalCreator from './GoalCreator';
import { useUserAuth } from '../../contexts/useUserAuth';

const GoalPage = () => {
  const { loggedInUser } = useUserAuth();

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '20px',
      }}
    >
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
        <GoalList id='goalList' userInfo={loggedInUser} />
        <GoalCreator id='goalCreator' userInfo={loggedInUser} />
      </div>
      <div
        style={{
          flex: 1,
          background: '#ffffff',
          border: '1px solid #14a5fb',
          borderRadius: '8px',
          padding: '20px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Graph userInfo={loggedInUser} />
      </div>
    </div>
  );
};

export default GoalPage;
