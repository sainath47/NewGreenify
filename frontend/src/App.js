import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from './pages/login/Login';
import SignUp from './pages/signup/SignUp';
import {useAuthContext} from './hooks/useAuthContext';
import Dashboard from "./pages/dashboard/Dashboard";
const App = () => {
  const {user} = useAuthContext()
  return (
    <div>
      <Router>
        <Routes>
        <Route path="/dashboard" element={user? <Dashboard />: <Navigate to="/login"/>} />
          <Route path="/login" exact element={ !user ? <Login /> : <Navigate to='/dashboard'/>} />
          <Route path="/signup" exact element={!user ?<SignUp />: <Navigate to='/dashboard'/> }/>
          <Route path="/" element={<Navigate replace to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
//workout buddy logic for login
//api to login 
//signup api
//the dashboard will be only visible only when the token is present in the local-storage
//signup will be registered in to database & show the alert now & style it later sucessful login



//styling for responsiveness will be done later
//toggle to show password code
