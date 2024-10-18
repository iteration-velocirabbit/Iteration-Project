const React = require('react');
const { useState } = require('react');

const Card = ({
  goalName,
  goalAmount,
  goalDuration,
  goalId,
  goalProgress,
  goalPercentage,
  fetchGoals,
  userInfo,
  
}) => {
  const [formData, setFormData] = useState({
    progress: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/updateprogress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          progress: formData.progress,
          goalId,
          userInfo,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        console.log('progress updated', data);

        setFormData({ progress: '' }); // Clear form
      } else {
        console.error('Failed to create goal');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const setGraphId = () => {
    localStorage.setItem('graphId', goalId);
  };

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

  const handleAdd = async () => {};

  return (
    <div className='cardDiv'>
      <p> Goal: {goalName} </p>
      <p> Goal Amount: {goalAmount} </p>
      <p> Goal Duration: {goalDuration} </p>
      <p> Goal Progress: {goalProgress} </p>
      <p> Goal %: {goalPercentage} </p>
      <form  className ="addProg" onSubmit={handleAdd}>Add Progress: </form>
      <form onSubmit={handleSubmit}>
        <input
          type='number'
          required
          placeholder='Input your progress!'
          id='progress'
          name='progress'
          value={formData.progress}
          onChange={handleInputChange}
        />
        <button className = "update" type='submit'>Update Progress</button>
      </form>
      <button onClick={setGraphId}>Show Graph</button>
      <button onClick={() => handleDelete()}> Delete </button>
    </div>
  );
};

module.exports = Card;
