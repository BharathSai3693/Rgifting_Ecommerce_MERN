import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function SearchBar() {
  return (
    <>
      <input
        className="w-5/6 h-5/6 rounded-sm p-2"
        type="text"
        placeholder="Search..."
      />
      <div className="rounded-sm bg-white h-5/6 flex items-center p-1">
        <FontAwesomeIcon
          icon={faSearch}
          className="text-gray-500 cursor-pointer"
        />
      </div>
    </>
  );
}

export default SearchBar;
