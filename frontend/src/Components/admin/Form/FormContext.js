import React, { createContext, useEffect, useState } from 'react';

// Create the context
export const FormContext = createContext();

// Create a provider component
export const FormProvider = ({ children }) => {
  useEffect(()=> {
    fetch("http://localhost:4000/admin/settings")
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {

      setTags(data.settings.filter(x => {return x.settingType=="Tags"})[0]['settings'])
      setVariants(data.settings.filter(x => {return x.settingType=="variants"})[0]['settings'])
      setCategories(data.settings.filter(x => {return x.settingType=="categories"})[0]['settings'])
    })
    .catch(error => {
     console.log(error)
    });
  }, [])

  const [name, setName] = useState("");
  const [price, setPrice] = useState('');
  const [summary, setSummary] = useState('');
  const [desc, setDesc] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState({});

  const [Photos, setPhotos] = useState([]);
  const [highlights, setHighlights] = useState(['']);
  const [variants, setVariants] = useState({});

  const [checkedVariants, setCheckedVariants] = useState({
   Sizes : new Set(),
   Colors : new Set()
  })

  const [tags, setTags] = useState([]);
  const [checkedTags, setCheckedTags] = useState([]);

 

  return (
    <FormContext.Provider value={{name, setName, price, 
    setPrice,summary, setSummary, desc, setDesc, Photos,
     setPhotos, highlights, setHighlights, tags,setTags, checkedTags, 
     setCheckedTags, variants, setVariants, checkedVariants, 
     setCheckedVariants,categories, setCategories, selectedCategories,
      setSelectedCategories }}>
      {children}
    </FormContext.Provider>
  );
};
