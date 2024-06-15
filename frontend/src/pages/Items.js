import React, { useState } from "react";
import Breadcrumbs from "../Components/Tools/Breadcrumbs";
import Sortby from "../Components/Itemspage/Sortby";
import Itemsflex from "../Components/Itemspage/Itemsflex";

function Items() {
  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "Products", link: "/products" },
    { label: "Electronics", link: "/products/electronics" },
    { label: "Laptops" }, // No link for the current page
  ];

  const [selectedOption, setSelectedOption] = useState("Popularity");

  const options = [
    "Popularity",
    "Latest First",
    "Price Low to High",
    "Price High to Low",
  ];

  return (
    <div className="p-9">
      <Breadcrumbs items={breadcrumbItems} />
      <div className="flex flex-row justify-between">
        <div className="text-5xl font-sans flex flex-row items-end">
          <p>Plants for Father days</p>
          <p className="text-grey text-2xl mx-2"> 20 Items</p>
        </div>
        <div>
            <Sortby options={options} selectedOption={selectedOption} onSelect={setSelectedOption} />
        </div>
      </div>
      <hr className="my-2"></hr>
      <div>
        <Itemsflex />
      </div>
    </div>
  );
}

export default Items;
