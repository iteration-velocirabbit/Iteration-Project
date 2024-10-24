const React = require('react');
const GoalList = require('./components/GoalList');
const Graph = require('./components/Graph');
const GoalCreator = require('./components/GoalCreator');
const Header = require('./components/Header');
const { useGoogleLogin } = require('@react-oauth/google');
const { useEffect, useState } = require('react');

const App = () => {
  //user login state
  const [user, setUser] = useState(localStorage.getItem('accessToken') || null);
  // login function using login.
  const [loggedInUser, setLoggedinUser] = useState(null);

  const login = useGoogleLogin({
    onSuccess: (response) => {
      console.log('Login successful!', response);
      setUser(response.access_token); // assuming response contains profile info
      const token = response.access_token;
      localStorage.setItem('accessToken', token);
      console.log('google user', user);
    },
    onError: () => {
      console.log('Login failed');
    },
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!user) return;
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
      if (!userInfo) return;
      try {
        const response = await fetch('http://localhost:3000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userInfo }),
        });
        console.log('response', response);
        if (response.ok) {
          const data = await response.json();
          console.log('data.user info', data.loggedInUser);
          console.log('Logged in user data:', data);
          // This will log the updated user
          setLoggedinUser(data.loggedInUser);
    
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    if (user && !loggedInUser) {
      fetchUserInfo();
    }
  }, [user]); // Runs whenever `user` is updated

  // Styled components?

  const handleLogout = () => {
    setUser(null);
    setLoggedinUser(null);
    localStorage.removeItem('accessToken'); // Clear token
  };

  return (
    <div className='headerDiv'>
      <Header handleLogout={handleLogout}></Header>
      <h1>My Goal Progress</h1>
      {/* If user is logged in, show the main app */}
      {loggedInUser ? (
        <div className='appDiv'>
          <div className='leftDiv'>
            <GoalList id='goalList' userInfo={loggedInUser}></GoalList>
            <GoalCreator id='goalCreator' userInfo={loggedInUser}></GoalCreator>
          </div>
          <div className='rightDiv'>
            <Graph userInfo={loggedInUser}></Graph>
          </div>
        </div>
      ) : (
        // Show login button if the user is not logged in
        <button onClick={() => login()}>Login with Google</button>
      )}
    </div>
  );
};

module.exports = App;
