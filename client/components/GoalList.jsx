const React = require('react');
const Card = require('./Card');
const { useState } = require('react');
const { useEffect } = require('react');
// SAR, measurable, time to props and pass to individual cards

// grab fetched goal data and pass to respective components
// assign SAR, measurable, time to props and pass to goalist
// map to populate state array with users goals and render a card component for each goal

const GoalList = () => {
  const user = 3;
  const [goals, setGoals] = useState([]);

  const fetchGoals = async () => {
    const endpoint = `http://localhost:3000/api/fetchgoal?id=${user}`; // Adjust the endpoint based on your API
    try {
      const response = await fetch(endpoint);
      if (response.ok) {
        const data = await response.json();
        console.log('response from fetch call', data);
        setGoals(data);
      } else {
        const errorData = await response.json();
        console.error('Error fetching accounts:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  console.log('goal state', goals);
  // Use effect to constantly fetch from db
  useEffect(() => {
    if (user) {
      fetchGoals(); // Fetch accounts when the component mounts
    }
  }, [user]);

  return (
    <div id ='goalListDiv'>
        <h1>Goal list</h1>
        {goals.length > 0 ? (
        goals.map((goal) => (
          <Card
            key={goal.id}
            goalName={goal.sar}
            goalAmount={goal.measurable
            }
            goalDuration={goal.target_completion_date}
            goalProgress={goal.progress
            }
          />
        ))
      ) : (
        <p>No goals found. Please add some goals!</p>
      )}
    </div>
  );
};

module.exports = GoalList;
