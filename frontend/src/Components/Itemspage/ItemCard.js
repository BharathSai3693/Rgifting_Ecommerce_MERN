import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";
import ItemTitle from "./ItemTitle";
import ItemDetails from "./ItemDetails";

function ItemCard() {
  const src =
    "https://cdn.igp.com/f_auto,q_auto,t_pnopt19prodlp/products/p-chocolate-ecstasy-father-s-day-cake-300-gm--285193-m.jpg";

  const badges = [
    "Personalisable",
    "Same Day Delivery",
    "Badge",
    "Badge",
    "Badge",
    "Badge",
    "Badge",
    "Badge",
  ];

  const handleFavouriteClick = () => {
    // Handle the logic for adding to favourites
    console.log("Added to favourites");
  };

  return (
    <div className="relative bg-red-500 m-1 rounded-md shadow-md w-[20em] h-[30em] overflow-hidden">
      <img
        src={src}
        alt="Product"
        className="h-3/4 w-full rounded-t-md object-cover"
      />
      <button
        onClick={handleFavouriteClick}
        className="absolute top-2 right-2 bg-white text-red-500 p-2 rounded-full shadow-md hover:bg-red-100 transition-colors"
        aria-label="Add to favourites"
      >
        <FontAwesomeIcon icon={faRegularHeart} />
      </button>
      <div className="p-3 h-1/4 flex flex-col justify-between">
        <ItemTitle />
        <ItemDetails />
        <div className="flex mt-1 h-full overflow-x-auto whitespace-nowrap">
          {badges.map((badge, index) => (
            <span
              key={index}
              className="m-1 inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
