import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Layout from './components/ReusableComponents/Layout.js';
import GoalPage from './components/GoalPage/GoalPage.js';
import Login from './components/LoginPage/Login.js';
import SignUp from './components/LoginPage/SignUp';
import LoginPage from './components/LoginPage/LoginPage.js';
import PrivateRoutes from './routes/PrivateRoutes.js';
import PublicRoutes from './routes/PublicRoutes.js';
import TrackerPage from './components/TrackerPage/TrackerPage.js';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { UserAuthProvider } from './contexts/useUserAuth.js';

function App() {
  return (
    <Router>
      <GoogleOAuthProvider clientId='232840471473-ahk4ppges7oqaklig8ql1cuqtn9fkgmn.apps.googleusercontent.com'>
        <UserAuthProvider>
          <Layout>
            <Routes>
              <Route element={<PrivateRoutes />}>
                <Route path='/goal-page' element={<GoalPage />}> </Route>
                <Route path='/track-progress' element={<TrackerPage />}> </Route>
              </Route>
              <Route element={<PublicRoutes />}>
                <Route path='/' element={<LoginPage />} > </Route>
                <Route path='/login' element={<Login />} > </Route>
                <Route path='/signup' element={<SignUp/>} />
              </Route>
            </Routes>
          </Layout>
        </UserAuthProvider>
      </GoogleOAuthProvider>
    </Router>
  );
}

export default App;
