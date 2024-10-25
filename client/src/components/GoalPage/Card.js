import React, { useState } from 'react';

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
        credentials: 'include',
      });
      const data = await response.json();
      // window.location.reload();
      if (response.ok) {
        console.log('progress updated', data);

        setFormData({ progress: '' }); // Clear form
        fetchGoals(); // Refresh goals without reloading the page
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

  const getUnit = (goalString) => {
    if (!goalString) return ''; // Check for empty or undefined input
  
    const words = goalString.trim().split(' '); // Trim and split by spaces
    return cleanString(words[words.length - 1]); // Return the last word
  };

  const cleanString = (str) => {
    return str
      .toLowerCase()                  // Convert to lowercase
      .replace(/[^\w\s]|_/g, '')       // Remove punctuation
      .replace(/\s+/g, ' ')            // Replace multiple spaces with a single space
      .trim();                         // Remove leading/trailing spaces
  };

  const handleAdd = async () => {};

  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid #a4d4fc',
      borderRadius: '8px',
      padding: '20px',
      margin: '10px 0',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.2s',
    }}>
      <p style={{
        margin: '10px 0',
        fontSize: '18px',
        color: '#1c3e7f',
      }}> {goalName}</p>
      <p style={{
        margin: '10px 0',
        fontSize: '18px',
        color: '#1c3e7f',
      }}> Amount: {goalAmount} {getUnit(goalName)}</p>
      <p style={{
        margin: '10px 0',
        fontSize: '18px',
        color: '#1c3e7f',
      }}> Duration: {goalDuration} days</p>
      <p style={{
        margin: '10px 0',
        fontSize: '18px',
        color: '#1c3e7f',
      }}> Progress: {goalProgress} {getUnit(goalName)}</p>
      <p style={{
        margin: '10px 0',
        fontSize: '18px',
        color: '#1c3e7f',
      }}> Completion: {goalPercentage}%</p>
      <form style={{
        margin: '10px 0',
        fontSize: '22px',
        color: '#1c3e7f',
      }} onSubmit={handleAdd}>Add Progress: </form>
      <form onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
        <input
          type='number'
          required
          placeholder='Input your progress!'
          id='progress'
          name='progress'
          value={formData.progress}
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
        <button type='submit' style={{
          background: '#619aa9',
          color: 'white',
          border: 'none',
          padding: '10px 15px',
          borderRadius: '5px',
          cursor: 'pointer',
          transition: 'background 0.3s ease',
          marginLeft: '10px',
        }}>Update Progress</button>
      </form>
      <button onClick={setGraphId} style={{
        background: '#619aa9',
        color: 'white',
        border: 'none',
        padding: '10px 15px',
        borderRadius: '3px',
        cursor: 'pointer',
        transition: 'background 0.3s ease',
        marginRight: '5px',
      }}>Show Graph</button>
      <button onClick={() => handleDelete()} style={{
        background: '#619aa9',
        color: 'white',
        border: 'none',
        padding: '10px 15px',
        borderRadius: '3px',
        cursor: 'pointer',
        transition: 'background 0.3s ease',
        marginRight: '5px',
      }}> Delete </button>
    </div>
  );
};

export default Card;
