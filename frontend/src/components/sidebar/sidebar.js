import React, { useState } from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";
function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const permissions = user?.permissions;
  const allotMeters = permissions?.includes("AllotMeters") || false;

  const userManagement = permissions?.includes("UserManagement") || false;
  const roleManagement = permissions?.includes("RoleManagement") || false;
  return (
    <div
      className={`sidebar ${
        isSidebarOpen ? "open" : ""
      }  bg-green-300 border-2 border-green-900`}
    >
      <ul>
        <Link className="pt-4 pl-4" to="/dashboard">
          <li>Readings</li>
        </Link>
        {allotMeters && (
          <Link className="pt-4 pl-4" to="/allot-meters">
            <li>Allot Meters</li>
          </Link>
        )}
        {userManagement && (
          <Link className="pt-4 pl-4" to="/user-management">
            <li>User Management</li>
          </Link>
        )}

        {/* {roleManagement && (
          <Link className="pt-4 pl-4" to="/role-management">
            <li>Role Management</li>
          </Link>
        )} */}
      </ul>
      {/* <button className="toggle-button" onClick={toggleSidebar}>
        {isSidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
      </button> */}
    </div>
  );
}



export default Sidebar;
//the sidebar will not go anywhere, no special effects in pc screen, but as soon as you go to the mobile screen
//the postion becomes fixed & i will be providing the open & close button
