import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/ReusableComponents/Layout";
import GoalPage from "./components/GoalPage/GoalPage";
import LoginPage from "./components/LoginPage/LoginPage";
import PrivateRoutes from "./routes/PrivateRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserAuthProvider } from "./contexts/useUserAuth";
function App() {
  return (
    <Router>
      <GoogleOAuthProvider clientId="232840471473-ahk4ppges7oqaklig8ql1cuqtn9fkgmn.apps.googleusercontent.com">
        <UserAuthProvider>
          <Layout>
            <Routes>
              <Route element={<PrivateRoutes />}>
                <Route path="/goal-page" element={<GoalPage />} />
              </Route>
              <Route element={<PublicRoutes />}>
                <Route path="/" element={<LoginPage />} />
              </Route>
            </Routes>
          </Layout>
        </UserAuthProvider>
      </GoogleOAuthProvider>
    </Router>
  );
}

export default App;
