import React, { useContext, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Checkbox from '@mui/material/Checkbox';
import { FormContext } from './FormContext';

const GiftVariants = () => {
  const [expanded, setExpanded] = useState(false);
  const { variants, setVariants, checkedVariants, setCheckedVariants } = useContext(FormContext);
  const [newSize, setNewSize] = useState('');
  const [newColor, setNewColor] = useState('');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleCheckBox = (event, variant, value) => {
    const updatedCheckedVariants = {
      ...checkedVariants,
      [variant]: new Set(checkedVariants[variant]) // Create a new Set to avoid mutating state directly
    };

    if (updatedCheckedVariants[variant].has(value)) {
      updatedCheckedVariants[variant].delete(value);
    } else {
      updatedCheckedVariants[variant].add(value);
    }
    setCheckedVariants(updatedCheckedVariants);
  };

  const addNewSize = () => {
    if (newSize.trim() !== '') {
      setVariants((prevVariants) => ({
        ...prevVariants,
        Sizes: [...prevVariants.Sizes, newSize]
      }));
      setNewSize('');
    }
  };

  const addNewColor = () => {
    if (newColor.trim() !== '') {
      setVariants((prevVariants) => ({
        ...prevVariants,
        Colors: [...prevVariants.Colors, newColor]
      }));
      setNewColor('');
    }
  };

  return (
    <div className="col-span-full p-3 border border-yellow-600 rounded">
      <label
        htmlFor="highlights"
        className="block text-sm font-medium leading-6 text-gray-900 py-3"
      >
        Variants
      </label>
      <div>
        {Object.entries(variants).map(([variant, values], index) => (
          <Accordion
            key={index}
            expanded={expanded === variant}
            onChange={handleChange(variant)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${variant}-content`}
              id={`${variant}-header`}
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                {variant}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="flex flex-row space-x-10">
                {values.map((value, index) => (
                  <div key={index}>
                    <Checkbox
                      checked={checkedVariants[variant].has(value)}
                      value={value}
                      onChange={(event) => {
                        handleCheckBox(event, variant, value);
                      }}
                    />
                    <label>{value}</label>
                  </div>
                ))}
              </div>
              {variant === 'Sizes' && (
                <div className="flex items-center mt-3">
                  <input
                    type="text"
                    value={newSize}
                    onChange={(e) => setNewSize(e.target.value)}
                    placeholder="Enter new size"
                    className="border border-gray-300 px-2 py-1 mr-2"
                  />
                  <button
                    type="button"
                    onClick={addNewSize}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                  >
                    Add Size
                  </button>
                </div>
              )}
              {variant === 'Colors' && (
                <div className="flex items-center mt-3">
                  <input
                    type="text"
                    value={newColor}
                    onChange={(e) => setNewColor(e.target.value)}
                    placeholder="Enter new color"
                    className="border border-gray-300 px-2 py-1 mr-2"
                  />
                  <button
                    type="button"
                    onClick={addNewColor}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                  >
                    Add Color
                  </button>
                </div>
              )}
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default GiftVariants;
