import React, { createContext, useState } from 'react';

// Create the context
export const FormContext = createContext();

// Create a provider component
export const FormProvider = ({ children }) => {
  const [coverPhotos, setCoverPhotos] = useState([]);
  const [highlights, setHighlights] = useState(['']);

  const [variants, setVariants] = useState({
    Sizes : ['Small', "Medium", 'Large'],
    Colors : ['Black', 'White', 'Red', 'Green', 'Blue', 'Yellow']
  });

  const [checkedVariants, setCheckedVariants] = useState({
   Sizes : new Set(),
   Colors : new Set()
  })

  const [checkedTags, setCheckedTags] = useState({});

  

  const addPhoto = (photo) => {
    setCoverPhotos((prevPhotos) => [...prevPhotos, photo]);
  };

  const removePhoto = (index) => {
    setCoverPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
  };


  return (
    <FormContext.Provider value={{ coverPhotos, addPhoto, removePhoto, highlights, setHighlights, checkedTags, setCheckedTags, variants, setVariants, checkedVariants, setCheckedVariants }}>
      {children}
    </FormContext.Provider>
  );
};
