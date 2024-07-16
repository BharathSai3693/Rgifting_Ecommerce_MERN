import React from "react";

function ItemTitle({title}) {
  return (
    <p className="text-sm font-semibold text-start mb-2">
      {title}
    </p>
  );
}

export default ItemTitle;
