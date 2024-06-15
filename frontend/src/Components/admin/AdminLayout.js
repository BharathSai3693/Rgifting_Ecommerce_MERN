// Layout.js

import React from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Sidebar from "../admin/Sidebar.js";

const AdminLayout = () => {
  return (
    <div className="grid grid-cols-7">
      <Sidebar />
      <div className="col-span-6 p-5 py-5">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
