const React = require('react');
const GoalList = require('./components/GoalList');
const Graph = require('./components/Graph');
const GoalCreator = require('./components/GoalCreator');
const Header = require('./components/Header');

const App = () => {
  // Function for creating a goal and sending a request to the back end

  // Styled components?

  return (
    <div className='headerDiv'>
      <Header></Header>
      <h1>My Goal Progress</h1>
      <div className='appDiv'>
        <div className='leftDiv'>
          <GoalList id='goalList'></GoalList>
          <GoalCreator id='goalCreator'></GoalCreator>
        </div>
        <div className='rightDiv'>
          <Graph></Graph>
        </div>
      </div>
    </div>
  );
};

module.exports = App;
