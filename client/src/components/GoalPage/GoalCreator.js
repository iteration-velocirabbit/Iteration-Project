import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../../redux/actions/actions';

// functionaliity

const GoalCreator = ({ userInfo }) => {
  
  console.log('goal creator user', userInfo);

  // getting initial state for new goal (empty strings initially) from store
  const goalName = useSelector(state => state.goals[0][goalName]);
  const goalAmount = useSelector(state => state.goals[0][goalAmount]);
  const goalDuration = useSelector(state => state.goals[0][goalDuration]);

  // const [formData, setFormData] = useState({
  //   goalName: '',
  //   goalAmount: '',
  //   goalDuration: '',
  // });

  const dispatch = useDispatch();

  // handles input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    dispatch(actions.goalActionCreator({ name: value }))
    
    // setFormData((prevData) => ({
    //   ...prevData,
    //   [name]: value,
    // }));
  };

  //on submit post request using formdata

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('submit button is pressed');
    try {
      console.log(userInfo);
      const response = await fetch('http://localhost:3000/api/creategoal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userInfo.id,
          goalName: goalName,
          goalAmount: goalAmount,
          // ...formData,
          goalDuration: goalDuration,
          credentials: 'include'
        }),

      });
      
      if (response.ok) {
        console.log('your info', goalName)
        const data = await response.json();
        console.log('goal created', data);
        dispatch(actions.goalActionCreator({ 
          goalName: '',
          goalAmount: '',
          goalDuration: '',
        }))
        // setFormData({ goalName: '', goalAmount: '', goalDuration: '' }); // Clear form
        //window.location.reload();
      } else {
        console.error('Failed to create goal');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div id='goalCreatorDiv' style={{
      backgroundColor: '#a4d4fc',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      maxWidth: '400px',
      margin: '20px auto',
      transition: 'transform 0.2s',
    }}>
      <h1 style={{
        color: '#1c3e7f',
        fontSize: '26px',
        marginBottom: '15px',
        fontWeight: 600,
      }}>Enter Your Goal</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          required
          placeholder='Goal name'
          id='goalName'
          name='goalName'
          value={goalName}
          onChange={handleInputChange}
          style={{
            width: 'calc(100% - 22px)',
            padding: '10px',
            border: '1px solid #14a5fb',
            borderRadius: '5px',
            marginBottom: '15px',
            fontSize: '16px',
          }}
        />
        <input
          type='number'
          required
          placeholder='Goal Amount'
          id='goalAmount'
          name='goalAmount'
          value={goalAmount}
          onChange={handleInputChange}
          style={{
            width: 'calc(100% - 22px)',
            padding: '10px',
            border: '1px solid #14a5fb',
            borderRadius: '5px',
            marginBottom: '15px',
            fontSize: '16px',
          }}
        />
        <input
          type='number'
          required
          placeholder='Goal duration (days)'
          id='goalDuration'
          name='goalDuration'
          value={goalDuration}
          onChange={handleInputChange}
          style={{
            width: 'calc(100% - 22px)',
            padding: '10px',
            border: '1px solid #14a5fb',
            borderRadius: '5px',
            marginBottom: '15px',
            fontSize: '16px',
          }}
        />
        <button 
          type='submit' 
          style={{
            background: '#619aa9',
            color: 'white',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background 0.3s ease',
            marginLeft: '10px',
          }}
        >
          Add Goal
        </button>
      </form>
    </div>
  );
};

export default GoalCreator;
