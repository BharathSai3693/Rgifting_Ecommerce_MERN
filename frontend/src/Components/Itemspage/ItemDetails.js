import React from "react";

function ItemDetails({price}) {
  return (
    <div className="flex justify-between text-sm">
      <span>Price : ₹{price}/-</span>
      <span>Rating : *****</span>
    </div>
  );
}

export default ItemDetails;
