import React, { useState, useEffect, createContext, useContext } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const UserAuthContext = createContext();

export const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Initialize user state from localStorage
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loggedInUser, setLoggedInUser] = useState(() => {
    // Initialize loggedInUser state from localStorage
    const storedLoggedInUser = localStorage.getItem('loggedInUser');
    return storedLoggedInUser ? JSON.parse(storedLoggedInUser) : null;
  });

  const navigate = useNavigate();

  const successfulDefaultLogin = () => {};

  const setLoggedInUserFunction = (userCookie) => {
    setLoggedInUser(userCookie);
  };

  const loginGoogle = useGoogleLogin({
    onSuccess: (response) => {
      console.log('Login successful!', response);
      setUser(response.access_token);
      console.log("USER IN USER CONTEXT", response.access_token)
      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify(response.access_token));
    },
    onError: () => {
      console.log('Login failed');
    },
  });

  const login = () => {
    navigate('/login');
  };

  const signup = () => {
    navigate('/signup');
  };


  useEffect(() => {
    const fetchUserInfo = async (user) => {
      try {
        const response = await fetch(
          'https://www.googleapis.com/oauth2/v2/userinfo',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${user}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch user info');
        }

        const userInfo = await response.json();
        console.log('User Info:', userInfo);
        fetchData(userInfo);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
    const fetchData = async (userInfo) => {
      try {
        const response = await fetch('http://localhost:3000/api/loginGoogle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userInfo }),
        });
        console.log('response', response);
        if (response.ok) {
          const data = await response.json();
          console.log('Logged in user data:', data);
          setLoggedInUser(data.loggedInUser);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    if (user) {
      fetchUserInfo(user);
    }
  }, [user]); // Runs whenever `user` is updated

  useEffect(() => {
    if (loggedInUser) {
      // Store loggedInUser in localStorage
      localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
      console.log("LOGGED IN USER IN USER CONTEXT", loggedInUser);
      // navigate('/goal-page');
    }
  }, [loggedInUser, navigate]);

  const logout = () => {
    setUser(null);
    setLoggedInUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('loggedInUser');
    navigate('/');
  };

  return (
    <UserAuthContext.Provider
      value={{
        user,
        loggedInUser,
        loginGoogle,
        logout,
        login,
        setLoggedInUser,
        setLoggedInUserFunction,
        signup,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(UserAuthContext);
};
