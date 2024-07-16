import React, { useContext } from 'react';
import { FormContext } from './FormContext';

const GiftTags = () => {
  const { checkedTags, setCheckedTags } = useContext(FormContext);

  const items = [
    { id: 1, label: 'Same Day Delivery' },
    { id: 2, label: 'Personalisable' },
    { id: 3, label: 'Next day delivery' },
    { id: 4, label: 'Premium' },
    { id: 5, label: 'Limited Deal' },
    { id: 6, label: 'Budget Friendly' },
    // Add more items as needed
  ];

  const handleCheckboxChange = (itemLabel) => {
    setCheckedTags((prevCheckedTags) => {
      if (prevCheckedTags.includes(itemLabel)) {
        // Remove the item if it's already checked
        return prevCheckedTags.filter((tag) => tag !== itemLabel);
      } else {
        // Add the item if it's not checked
        return [...prevCheckedTags, itemLabel];
      }
    });
  };

  return (
    <div className="col-span-3 mx-16 p-3 border border-yellow-600 rounded">
      <label
        htmlFor="highlights"
        className="block text-sm font-medium leading-6 text-gray-900 mb-2"
      >
        Gift Tags
      </label>
      <div className="flex flex-col items-start space-y-2">
        {items.map((item) => (
          <div key={item.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={item.id}
              checked={checkedTags.includes(item.label)}
              onChange={() => handleCheckboxChange(item.label)}
              className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor={item.id} className="text-sm text-gray-700">
              {item.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GiftTags;
