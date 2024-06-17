import React, { useContext } from "react";
import Giftname from "./Giftname";
import GiftPrice from "./GiftPrice";
import GiftSummary from "./GiftSummary";
import GiftDesc from "./GiftDesc";
import GiftHighlights from "./GiftHighlights";
import GiftTags from "./GiftTags";
import GiftVariants from "./GiftVariants";
import GiftPhotos from "./GiftPhotos";
import GiftCategory from "./GiftCategory";
import { FormContext } from "./FormContext";
import { useForm } from "react-hook-form";

const ItemsForm = () => {
  const {
    name,
    price,
    summary,
    desc,
    Photos,
    highlights,
    checkedTags,
    checkedVariants,
    selectedCategories,
  } = useContext(FormContext);

  const handleSubmit = async (e) => {


    e.preventDefault();
    // const textData = {
    //   name,
    //   price,
    //   summary,
    //   desc,
    //   highlights,
    //   checkedTags,
    //   checkedVariants,
    //   selectedCategories,
    // };
    // formData.append("textData", textData);
    // formData.append("giftPhotos", Photos);
    const formData = new FormData();

  // Append text fields
  formData.append("name", name);
  formData.append("price", price);
  formData.append("summary", summary);
  formData.append("desc", desc);
  formData.append("highlights", highlights);
  formData.append("checkedTags", JSON.stringify(checkedTags));
  formData.append("checkedVariants", JSON.stringify(checkedVariants));
  formData.append("selectedCategories", JSON.stringify(selectedCategories));

  // Append files
  Photos.forEach((photo, index) => {
    formData.append(`giftPhotos`, photo);
  });

    console.log(formData);

    try {
      const response = await fetch("http://localhost:4000/admin/newGift", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("File uploaded successfully:", result);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="p-8 py-0">
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4 grid grid-cols-4 space-x-20 p-3 border border-yellow-600 rounded">
                <Giftname />

                <GiftPrice />
              </div>

              <GiftSummary />

              <GiftDesc />

              <GiftHighlights />
              <GiftTags />

              <GiftVariants />

              <GiftCategory />

              <GiftPhotos />
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItemsForm;
