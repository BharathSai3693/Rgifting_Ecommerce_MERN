import React, { useContext } from 'react';
import { FormContext } from './FormContext';


const categoryData = [
  {
    category: 'Occasion',
    subcategories: ['Birthday', 'Anniversary', 'Wedding & Engagement', 'House Waring', "Baby Shower", "Best Wishes"]
  },
  {
    category: 'Special Days',
    subcategories: ["Father's Day", "Mother's Day", "Teacher's Day"]
  },
  {
    category: 'Recipient',
    subcategories: ['Men', 'Women', 'Kids', 'Couples']
  }
];

const GiftCategory = () => {
  const { selectedCategories, setSelectedCategories } = useContext(FormContext);

  const handleCategoryChange = (event, category) => {
    const isChecked = event.target.checked;
    setSelectedCategories(prevState => ({
      ...prevState,
      [category]: {
        ...prevState[category],
        isSelected: isChecked
      }
    }));
    console.log(selectedCategories)
  };

  const handleSubcategoryChange = (event, category, subcategory) => {
    const isChecked = event.target.checked;
    setSelectedCategories(prevState => ({
      ...prevState,
      [category]: {
        ...prevState[category],
        subcategories: {
          ...prevState[category]?.subcategories,
          [subcategory]: isChecked
        }
      }
    }));
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
        {categoryData.map(({ category, subcategories }) => (
          <div key={category} className="mb-4">
            <div>
              <input
                type="checkbox"
                id={category}
                name={category}
                checked={selectedCategories[category]?.isSelected || false}
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
                    checked={selectedCategories[category]?.subcategories?.[subcategory] || false}
                    onChange={(event) => handleSubcategoryChange(event, category, subcategory)}
                    disabled={!selectedCategories[category]?.isSelected}
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
