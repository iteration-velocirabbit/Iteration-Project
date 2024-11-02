import React, { useState, useEffect } from 'react';
import Graph from './Graph';
import TextualGoalInfo from './TextualGoalInfo';
import { useSelector, useDispatch } from 'react-redux';
import { useUserAuth } from '../../contexts/useUserAuth';
import * as actions from '../../../redux/actions/actions';

const TrackerPage = () => {
  const { loggedInUser } = useUserAuth();
  let parsedUser = loggedInUser;
  const dispatch = useDispatch();
  const [goalsWithProgress, setGoalsWithProgress] = useState([]);
  const goals = useSelector((state) => state.goals.goals);

  const fetchGoals = async () => {
    let google = false;
    if (typeof loggedInUser !== 'object') {
      parsedUser = JSON.parse(loggedInUser);
      const endpoint = `http://localhost:3000/api/fetchgoal?id=${parsedUser.id}`;
      const response = await fetch(endpoint);
      const data = await response.json();
      dispatch(actions.storeGoalsActionCreator(data));
    } else {
      google = true;
      const endpoint = `http://localhost:3000/api/fetchgoal?id=${parsedUser.id}&google=${google}`;
      const response = await fetch(endpoint);
      const data = await response.json();
      dispatch(actions.storeGoalsActionCreator(data));
    }

    // Fetch progress data for each goal
    const fetchedGoals = goals || [];
    const fetchProgressPromises = fetchedGoals.map(async (goal) => {
      const endpoint = `http://localhost:3000/api/fetchprogress?graphId=${goal.goal_id}`;
      const response = await fetch(endpoint);
      const progressData = await response.json();
      return { ...goal, goalProgress: progressData };
    });

    const goalsWithProgressData = await Promise.all(fetchProgressPromises);
    setGoalsWithProgress(goalsWithProgressData);
    console.log("GOALS WITH PROGRESS", goalsWithProgressData)
  };

  useEffect(() => {
    fetchGoals();
    
  }, [loggedInUser]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {Array.isArray(goalsWithProgress) &&
        goalsWithProgress.map((goal) => (
          <div
            key={goal.goal_id}
            style={{
              display: 'flex',
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              width: '1500px',
              height: '450px',
              backgroundColor: 'white',
              marginTop: '50px',
              borderRadius: '10px',
              gap: '50px'
            }}
          >
            <TextualGoalInfo
            goalName={goal.sar}
            goalAmount={goal.goal_amount}
            goalDuration={goal.goal_duration}
            />
            {goal.goalProgress && <Graph goalProgress={goal.goalProgress[0].progress} />}
          </div>
        ))}
    </div>
  );
};

export default TrackerPage;
