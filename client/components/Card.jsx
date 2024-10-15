const React = require('react');

const Card = ({ goalName, goalAmount, goalDuration, goalId, goalProgress, goalPercentage, fetchGoals }) => {

  const handleDelete = async () => {
    const endpoint = `http://localhost:3000/api/deletegoal?id=${goalId}`;
    fetchGoals();
    try {
      const response = await fetch(endpoint, { method: 'DELETE' });
      if (response.ok) {
        console.log('Goal deleted successfully');
        fetchGoals(); // Re-fetch goals after deletion
      } else {
        console.error('Failed to delete goal');
      }
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };

  const handleAdd = async () => {
    
  };

  return (
    <div className='cardDiv'>
      <p> Goal: {goalName} </p>
      <p> Goal Amount: {goalAmount} </p>
      <p> Goal Duration: {goalDuration} </p>
      <p> Goal Progress: {goalProgress} </p>
      <p> Goal %: {goalPercentage} </p>
      <form onSubmit={handleAdd}>Add Progress: </form>
      <button onClick={() => handleDelete()}> Delete </button>
    </div>
  );
};

module.exports = Card;
