import React, { useContext } from 'react';
import { FormContext } from './FormContext';


const GiftCategory = () => {
  const { categories, selectedCategories, setSelectedCategories } = useContext(FormContext);

  const handleCategoryChange = (event, category) => {
    const isChecked = event.target.checked;

    setSelectedCategories(prevState => {
      const newSelectedCategories = { ...prevState };
      if (isChecked) {
        newSelectedCategories[category] = [];
      } else {
        delete newSelectedCategories[category];
      }
      return newSelectedCategories;
    });
  };

  const handleSubcategoryChange = (event, category, subcategory) => {
    const isChecked = event.target.checked;

    setSelectedCategories(prevState => {
      const newSelectedCategories = { ...prevState };

      if (isChecked) {
        newSelectedCategories[category] = [...newSelectedCategories[category], subcategory];
      } else {
        newSelectedCategories[category] = newSelectedCategories[category].filter(item => item !== subcategory);
      }

      // If all subcategories are unchecked, remove the category key
      if (newSelectedCategories[category].length === 0) {
        delete newSelectedCategories[category];
      }

      return newSelectedCategories;
    });
  };

  return (
    <div className="col-span-full p-3 border border-yellow-600 rounded">
      <label
        htmlFor="categories"
        className="block text-sm font-medium leading-6 text-gray-900 py-3"
      >
        Categories
      </label>
      <div>
        {categories.map(({ category, subcategories }) => (
          <div key={category} className="mb-4">
            <div>
              <input
                type="checkbox"
                id={category}
                name={category}
                checked={!!selectedCategories[category]}
                onChange={(event) => handleCategoryChange(event, category)}
              />
              <label htmlFor={category} className="ml-2">{category}</label>
            </div>
            <div className="ml-6 mt-2">
              {subcategories.map((subcategory) => (
                <div key={subcategory}>
                  <input
                    type="checkbox"
                    id={`${category}-${subcategory}`}
                    name={`${category}-${subcategory}`}
                    checked={selectedCategories[category]?.includes(subcategory) || false}
                    onChange={(event) => handleSubcategoryChange(event, category, subcategory)}
                    disabled={!selectedCategories[category]}
                  />
                  <label htmlFor={`${category}-${subcategory}`} className="ml-2">{subcategory}</label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GiftCategory;
