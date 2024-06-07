import React from "react";
import { logOut } from "../../auth";
import { Link } from "react-router-dom";

function ProfileDropdown() {
  const handleLogout = async () => {
    await logOut();
    console.log("Logged out");
  };
  return (
    <div className="absolute right-0 w-48 bg-white border border-gray-200 rounded shadow-lg">
      <Link
        to="/settings"
        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
      >
        Settings
      </Link>
      <Link
        to="/orders"
        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
      >
        Orders
      </Link>
      <div
        onClick={handleLogout}
        className="block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
      >
        Logout
      </div>
    </div>
  );
}

export default ProfileDropdown;
