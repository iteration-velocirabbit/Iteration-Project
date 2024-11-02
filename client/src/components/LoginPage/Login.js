import React, { useState, useEffect } from 'react';
//import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../contexts/useUserAuth';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../../redux/actions/actions';

const Login = () => {
  const { setLoggedInUser } = useUserAuth();

  const username = useSelector((state) => state.login.username);
  const password = useSelector((state) => state.login.password);

  const dispatch = useDispatch();

  //const navigate = useNavigate();

  const submitLogin = async () => {
    console.log('USERNAME', username);
    console.log('PASSWORD', password);
    const reqBody = {
      userInfo: {
        username: username,
        password: password,
      },
    };
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(reqBody),
    });
    const data = await response.json();
    console.log('response', data);
    // console.log('Logging in as:' + username, password);

    if (data.success) {
      setLoggedInUser(JSON.stringify(data.loggedInUser));
      //   localStorage.setItem('loggedInUser', JSON.stringify(data.loggedInUser));
    }
  };

  return (
    <div className='login-page'>
      <div className='login-container'>
        <input
          type='username'
          placeholder='Username'
          value={username}
          className='loginPrompt'
          onChange={(e) =>
            dispatch(actions.loginUsernameActionCreator(e.target.value))
          } // update state
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          className='loginPrompt'
          onChange={(e) =>
            dispatch(actions.loginPasswordActionCreator(e.target.value))
          } // update state
        />
        <button className='loginButtom' onClick={submitLogin}>
          Login
        </button>
        <a href='/signup'>
          <button className='signupButton'>Signup</button>
        </a>
      </div>
    </div>
  );
};

export default Login;
