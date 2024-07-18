// Layout.js

import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Components/admin/Sidebar.js";
import Navbar from "../Components/Navbar/Navbar.js";

const UserLayout = () => {
  return (
    <div className="">
      <Navbar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
