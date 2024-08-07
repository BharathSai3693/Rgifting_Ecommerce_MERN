import React, { useContext } from "react";
import { FormContext } from "./FormContext";

const Giftname = () => {

  const {name, setName} = useContext(FormContext);

  const handleChange = (e) => {
    setName(e.target.value);
  };



  return (
    <div className="col-span-2">
      <label
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Gift Name
      </label>
      <div className="mt-2">
        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
          <input
            type="text"
            name="username"
            id="username"
            className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            placeholder="Enter Gift Name"
            value={name}
            onChange={(event)=>handleChange(event)}
          />
        </div>
      </div>
    </div>
  );
};

export default Giftname;
