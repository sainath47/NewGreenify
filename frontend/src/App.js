import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import { useAuthContext } from "./hooks/useAuthContext";
import Dashboard from "./pages/dashboard/Dashboard";
import AllotMeters from "./pages/allotMeters/allotMeters";
import Sidebar from "./components/sidebar/sidebar";
import Navbar from "./components/navbar/navbar";
import UserManagement from "./pages/userManagement/userManagement";
import { useLocation } from "react-router-dom";
import RoleManagement from "./pages/roleManagement/roleMangement";
import Page from "./pages/Rough/Rough";

const App = () => {
  const { user } = useAuthContext();
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";
  const isSignupPage = location.pathname === "/signup";
  const showBars = !isLoginPage && !isSignupPage;

  return (
    <div>
      {showBars && <Navbar />}

      <div className="flex">
        {showBars && <Sidebar />}
        <div className="p-4 w-full">
          <Routes>
            <Route
              path="/allot-meters"
              exact
              element={user ? <AllotMeters /> : <Navigate to="/login" />}
            />
            <Route
              path="/dashboard"
              exact
              element={user ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/user-management"
              exact
              element={user ? <UserManagement /> : <Navigate to="/login" />}
            />

            <Route
              path="/role-management"
              exact
              element={user ? <RoleManagement /> : <Navigate to="/login" />}
            />
            <Route
              path="/page"
              exact
              element={user ? <Page /> : <Navigate to="/page" />}
            />
            <Route
              path="/login"
              exact
              element={!user ? <Login /> : <Navigate to="/dashboard" />}
            />
            <Route
              path="/signup"
              exact
              element={!user ? <SignUp /> : <Navigate to="/dashboard" />}
            />

            <Route path="/" element={<Navigate replace to="/login" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
