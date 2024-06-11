import React from "react";
import Carousel from "../Components/Home/Carousel";
import Carousel2 from "../Components/Home/Carousel2";
import Breadcrumbs from "../Components/Tools/Breadcrumbs";
import { useAuth } from "../AuthContext";

export default function Home() {
  const { currentUser } = useAuth();
  console.log(currentUser);
  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "Category", link: "/category" },
    { label: "Sub-category", link: "/category/sub-category" },
    { label: "Product", link: null }, // The current page doesn't need a link
  ];
  return (
    <div>
      <Carousel />
      <Breadcrumbs items={breadcrumbItems} />
      <div className="p-4">
        <h1 className="font-sans text-2xl">Browse by Category</h1>
        <Carousel2 />
        <hr className="my-3"></hr>
        <h1 className="font-sans text-2xl">Browse by Category</h1>
        <Carousel2 />
      </div>
    </div>
  );
}
