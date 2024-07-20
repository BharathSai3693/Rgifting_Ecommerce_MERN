import React, { useContext, useEffect, useState } from "react";
import { FormContext } from "./FormContext";

const GiftPhotos = () => {
  const { Photos, setPhotos } = useContext(FormContext);
  const [dispPhotos, setDispPhotos] = useState([]); 
  const [first, setFirst] = useState(false);
  useEffect(() => {
    if(Photos.length!=0 && !first){
      setDispPhotos(Photos)
      setFirst(!first); 
    }
    console.log(Photos)
    console.log(dispPhotos)
  }, [Photos]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setPhotos([...Photos, ...selectedFiles])
    const newUrls = selectedFiles.map((file) => URL.createObjectURL(file));

    setDispPhotos((prevPhotos) => [...prevPhotos, ...newUrls]);
  };

  const handleRemovePhoto = (index) => {
    setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
    setDispPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
  };

  return (
    <div className="col-span-full">
      <label
        htmlFor="cover-photo"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Cover photos
      </label>
      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-300"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
              clipRule="evenodd"
            />
          </svg>
          <div className="mt-4 flex text-sm leading-6 text-gray-600">
            <label className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
              <span>Upload files</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                multiple
                className="sr-only"
                onChange={handleFileChange}
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs leading-5 text-gray-600">
            PNG, JPG, GIF up to 10MB each
          </p>
        </div>
      </div>
      {/* Display selected images in a grid */}
      <div className="mt-4 grid grid-cols-4 gap-4">
        {dispPhotos.length > 0 &&
          dispPhotos.map((file, index) => {
            const imageUrl = file;
            return (
              <div key={index} className="relative w-full h-64">
                <img
                  src={imageUrl}
                  className="object-cover w-full h-full rounded"
                  style={{ objectFit: "cover" }}
                  height={"100px"}
                  width={"100px"}
                />
                <button
                  type="button"
                  onClick={() => handleRemovePhoto(index)}
                  className="absolute top-0 right-0 m-1 p-1 rounded-full bg-red-600 text-white text-xs hover:bg-red-700"
                >
                  &times;
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default GiftPhotos;
