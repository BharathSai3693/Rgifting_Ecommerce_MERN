import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../AuthContext"; 

import ProfileDropdown from "./ProfileDropdown";
import Logo from "./Logo";
import SearchBar from "./SearchBar";



const Navbar = () => {
  const { currentUser } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdown = () => setDropdownOpen(!dropdownOpen);


  const renderLoggedInLinks = () => (
    <div className="relative">
      <div className="mx-4 cursor-pointer"  onMouseEnter={handleDropdown} onMouseLeave={handleDropdown}>
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
        <Logo tclass={"w-15 h-10"} />
      </div>
 
      <div className="flex flex-row items-center justify-start basis-1/2">
        <SearchBar />
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
