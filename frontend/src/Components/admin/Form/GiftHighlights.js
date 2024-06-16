import React, { useContext } from 'react';
import {  IconButton } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import { FormContext } from './FormContext';



const GiftHighlights = () => {

  const {highlights, setHighlights} = useContext(FormContext);


  const handlePointChange = (index, value) => {
    const newPoints = [...highlights];
    newPoints[index] = value;
    setHighlights(newPoints);

    if (index === highlights.length - 1 && value !== '') {
      setHighlights([...highlights, '']);
    }
  };

  const handleRemovePoint = (index) => {
    const newPoints = highlights.filter((_, i) => i !== index);
    setHighlights(newPoints);
  };

  return (
    <div className="col-span-3 p-3 border border-yellow-600 rounded">
      <label
        htmlFor="highlights"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Highlights
      </label>

      <div className="space-y-4">
        {highlights.map((point, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
            type="text"
            value={point}
            onChange={(e) => handlePointChange(index, e.target.value)}
            placeholder="Enter a bullet point"
            className="border border-gray-300 w-full rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
            {index !== highlights.length - 1 && (
              <IconButton onClick={() => handleRemovePoint(index)}>
                <CloseIcon />
              </IconButton>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GiftHighlights;
