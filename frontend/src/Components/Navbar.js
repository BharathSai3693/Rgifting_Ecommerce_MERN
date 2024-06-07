import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext"; // Import AuthProvider
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { logOut } from "../auth";
import ProfileDropdown from "./Navbar/ProfileDropdown";



const Navbar = () => {
  const { currentUser } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdown = () => setDropdownOpen(!dropdownOpen);

 

  const renderLoggedInLinks = () => (
    <div className="relative">
      <div className="mx-4 cursor-pointer" onMouse onMouseEnter={handleDropdown} onMouseLeave={handleDropdown}>
        Profile
        {dropdownOpen &&  <ProfileDropdown />}
      </div>
    </div>
  );

  const renderLoggedOutLinks = () => (
    <>
      <Link className="mx-4" to="/login">
        Login
      </Link>
      <Link className="mx-4" to="/signup">
        Signup
      </Link>
    </>
  );

  return (
    <nav className="text-white flex flex-row justify-between p-3 bg-red-500">
      <div className="basis-1/3">
        <img
          className="w-15 h-10"
          src="https://content.jdmagicbox.com/comp/khammam/t4/9999p8742.8742.230911094010.v2t4/catalogue/r-giftingz-khammam-gift-shops-r4ijq78giw.jpg"
          alt="Logo"
        />
      </div>
      <div className="flex flex-row items-center justify-start basis-1/2">
        <input className="w-5/6 h-5/6 rounded-sm p-2" type="text" placeholder="Search..." />
        <div className="rounded-sm bg-white h-5/6 flex items-center p-1">
          <FontAwesomeIcon icon={faSearch} className="text-gray-500 cursor-pointer" />
        </div>
      </div>
      <div className="basis-1/3 flex flex-row-reverse items-center relative">
        {currentUser ? renderLoggedInLinks() : renderLoggedOutLinks()}
        <Link className="mx-4" to="/">
          Dashboard
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
