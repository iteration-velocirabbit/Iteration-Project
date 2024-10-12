const React = require('react');

const Card = ({ goalName, goalAmount, goalDuration, key, goalProgress }) => {

  const handleDelete = async () => {
    try {
      const id = key;
      const response = fetch(`http://localhost:3000/deletegoal/${id}`, {
        method: "delete",
      });
      if(response.ok) {
        console.log('Goal deleted')
      }
    } catch (error) {
        console.error('Error deleting goal');
    }
  };

  return (
    <div className='cardDiv'>
      <p> Goal: {goalName} </p>
      <p> Goal Amount: {goalAmount} </p>
      <p> Goal Duration: {goalDuration} </p>
      <p> Goal Progress: {goalProgress} </p>
      <button onClick={() => handleDelete()}> Delete </button>
    </div>
  );
};

module.exports = Card;
