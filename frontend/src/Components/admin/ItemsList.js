import React, { useEffect, useState } from "react";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ItemsList = () => {
  const [gifts, setGifts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/admin/allgifts")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setGifts(data.gifts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {gifts.map((gift, index) => (
        <li key={index} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <img
              className="h-12 w-12 flex-none rounded-full bg-gray-50"
              src={gift.photos[0]}
              alt=""
            />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {gift.name}
              </p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                {gift.summary}
              </p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-lg leading-6 text-gray-900">₹{gift.price}/-</p>
            <div class="mt-1 text-xs leading-5 text-gray-500">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-sm py-2 px-2 rounded">
                <FontAwesomeIcon icon={faEdit} className="text-white mr-2" />
                Edit
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ItemsList;
