import React from "react";
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
const App = () => {
  const { user } = useAuthContext();
  return (
    <div>
      <Navbar />

      <div className="flex">
        {/* <Sidebar /> */}
        <div className="p-4">
            <Routes>
              <Route
                path="/dashboard"
                element={user ? <Dashboard /> : <Navigate to="/login" />}
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
              <Route
                path="/allot-meters"
                exact
                element={user ? <AllotMeters /> : <Navigate to="/login" />}
              />
              <Route path="/" element={<Navigate replace to="/login" />} />
            </Routes>
      
        </div>
      </div>
    </div>
  );
};

export default App;
