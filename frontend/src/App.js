import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useLogout } from "./hooks/useLogout";
import Login from './pages/login/Login';
import SignUp from './pages/signup/SignUp';
import {useAuthContext} from './hooks/useAuthContext';
import Dashboard from "./pages/dashboard/Dashboard";
import AllotMeters from "./pages/allotMeters/allotMeters";
import Sidebar from "./components/sidebar/sidebar";
const App = () => {
  const {user} = useAuthContext()
  const { logout } = useLogout();
  return (
    <div>
          <div>
          
      <div className=" bg-green-300 w-full h-20  px-5 py-2 ">
        <div className="flex w-full">
          <div className="flex justify-start">
            <img className="h-12 " src="./greenify-removebg.png" alt="/" />
          </div>

          <div className="w-full flex justify-end">
            <button
              className="h-10 bg-green-500  py-1 px-3  hover:bg-green-700 rounded text-white mt-4 md:mt-0"
              onClick={() => logout()}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="flex p-4">
      {/* <Sidebar/> */}
      <Router>
        <Routes>
          
        <Route path="/dashboard" element={user? <Dashboard />: <Navigate to="/login"/>} />
          <Route path="/login" exact element={ !user ? <Login /> : <Navigate to='/dashboard'/>} />
          <Route path="/signup" exact element={!user ?<SignUp />: <Navigate to='/dashboard'/> }/>
          <Route path="/allot-meters" exact element={user ?<AllotMeters/>: <Navigate to="/login"/> }/>
          <Route path="/" element={<Navigate replace to="/login" />} />
        </Routes>
      </Router>
      </div>
    </div>
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
