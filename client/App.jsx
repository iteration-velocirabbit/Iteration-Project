const React = require('react');
const GoalList = require('./components/GoalList');
const Graph = require('./components/Graph');
const GoalCreator = require('./components/GoalCreator');

const App = () => {
  // Function for creating a goal and sending a request to the back end
    
  // Styled components?


  return (
    <div>
      <h1>This is a test!</h1>
      <div>
        <GoalList></GoalList>
      </div>
      <div>
        {/* <Graph></Graph>
        <GoalCreator></GoalCreator> */}
      </div>
    </div>
  );
};

module.exports = App;
