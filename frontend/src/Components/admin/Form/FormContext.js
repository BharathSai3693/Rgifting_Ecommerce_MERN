import React, { createContext, useState } from 'react';

// Create the context
export const FormContext = createContext();

// Create a provider component
export const FormProvider = ({ children }) => {
  const [selectedCategories, setSelectedCategories] = useState({});

  const [Photos, setPhotos] = useState([]);

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

  


  return (
    <FormContext.Provider value={{ Photos, setPhotos, highlights, setHighlights, checkedTags, setCheckedTags, variants, setVariants, checkedVariants, setCheckedVariants, selectedCategories, setSelectedCategories }}>
      {children}
    </FormContext.Provider>
  );
};
