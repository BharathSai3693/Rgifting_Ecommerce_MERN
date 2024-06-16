// src/Components/Sidebar/Sidebar.js
import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Navbar/Logo";

const Sidebar = () => {



  const sideBarStyle = "bg-red-950 hover:bg-red-700 text-white p-2 rounded-sm w-100";

  return (
    <div className="sidebar flex flex-col justify-between h-screen bg-red-500 col-span-1">
      <div className="flex flex-col">
        <Logo tclass={"w-16 h-16 mx-auto mb-3"} />
        <Link className={sideBarStyle} to="/admin">
          Dashboard
        </Link>
        <Link className={sideBarStyle} to="/admin/items">
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
