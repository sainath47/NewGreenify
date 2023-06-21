import React, { useState } from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";
function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className={`sidebar ${
        isSidebarOpen ? "open" : ""
      }  bg-green-300 border-2 border-green-900`}
    >
      <ul>
        <Link className="pt-4 pl-4" to="/dashboard">
          <li>Dashboard</li>
        </Link>
        <Link className="pt-4 pl-4" to="/allot-meters">
          <li>Allot Meters</li>
        </Link>
        <Link className="pt-4 pl-4" to="/user-management">
          <li>User Management</li>
        </Link>
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
