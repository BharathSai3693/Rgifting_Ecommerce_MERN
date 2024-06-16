import React from "react";
import Highlights from "./GiftHighlights";
import { FormProvider } from "./FormContext";
import Giftname from "./Giftname";
import GiftPrice from "./GiftPrice";
import GiftSummary from "./GiftSummary";
import GiftDesc from "./GiftDesc";
import GiftHighlights from "./GiftHighlights";
import GiftTags from "./GiftTags";
import GiftVariants from "./GiftVariants";
import GiftPhotos from "./GiftPhotos";
import GiftCategory from "./GiftCategory";


const ItemsForm = () => {
  return (
    <div className="p-8 py-0">
      <FormProvider>
        <form>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4 grid grid-cols-4 space-x-20 p-3 border border-yellow-600 rounded">
                  <Giftname />

                  <GiftPrice />
                </div>

                <GiftSummary/>

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
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default ItemsForm;
