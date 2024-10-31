import React from 'react';
import { useUserAuth } from '../../contexts/useUserAuth';

const LoginPage = () => {
  const { loginGoogle, login } = useUserAuth();

  return (
    <div className="login-page">
      <div className="login-container animated">
        <h2>Goal Tracker App!</h2>
        <p>Please log in to continue</p>
        <button className="login-button" onClick={() => login()}>
          Login
        </button>
        <button className="login-button google" onClick={() => loginGoogle()}>
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
