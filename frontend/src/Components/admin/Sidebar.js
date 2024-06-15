// src/Components/Sidebar/Sidebar.js
import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Navbar/Logo";

const Sidebar = () => {



  const sideBarStyle = "bg-red-950 hover:bg-red-700 text-white p-2 rounded-sm w-100";

  return (
    <div className="sidebar flex flex-col justify-between min-h-screen bg-red-500 col-span-1 py-5">
      <div className="flex flex-col">
        <h2>Logo</h2>
        <Link className={sideBarStyle} to="/admin/dashboard">
          Dashboard
        </Link>
        <Link className={sideBarStyle} to="/admin/additems">
          Items
        </Link>
        <Link className={sideBarStyle} to="/admin/orders">
          Orders
        </Link>
        <Link className={sideBarStyle} to="/admin/users">
          Users
        </Link>
      </div>
      <div className="flex flex-col">
        <Link className={sideBarStyle}  to="/admin/users">Profile</Link>
        <Link className={sideBarStyle} to="/admin/users">Logout</Link>
      </div>
    </div>
  );
};

export default Sidebar;
