import React, { useContext, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Checkbox from "@mui/material/Checkbox";
import { FormContext } from "./FormContext";
import { faEdit, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GiftVariants = () => {
  const [expanded, setExpanded] = useState(false);
  const { variants, setVariants, checkedVariants, setCheckedVariants } =
    useContext(FormContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newVariantName, setNewVariantName] = useState("");
  const [newVariantValue, setNewVariantValue] = useState("");
  const [editValues, setEditValues] = useState({});

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleCheckBox = (event, variant, value) => {
    const updatedCheckedVariants = {
      ...checkedVariants,
      [variant]: new Set(checkedVariants[variant]), // Create a new Set to avoid mutating state directly
    };

    if (updatedCheckedVariants[variant].has(value)) {
      updatedCheckedVariants[variant].delete(value);
    } else {
      updatedCheckedVariants[variant].add(value);
    }
    setCheckedVariants(updatedCheckedVariants);
  };

  const handleEditToggle = async (e) => {
    e.preventDefault();
    setIsEditing(!isEditing);
    setEditValues({});
  };

  const handleAddNewVariant = () => {
    if (newVariantName.trim() !== "" && newVariantValue.trim() !== "") {
      setVariants((prevVariants) => ({
        ...prevVariants,
        [newVariantName]: [newVariantValue],
      }));
      setNewVariantName("");
      setNewVariantValue("");
    }
  };

  const handleEditChange = (variant, index, e) => {
    e.preventDefault();
    setEditValues((prevValues) => ({
      ...prevValues,
      [variant]: {
        ...prevValues[variant],
        [index]: e.target.value,
      },
    }));
  };

  const handleRemoveItem = (variant, index, e) => {
    e.preventDefault();
    setVariants((prevVariants) => {
      const updatedVariant = [...prevVariants[variant]];
      updatedVariant.splice(index, 1);

      if (updatedVariant.length === 0) {
        const { [variant]: _, ...rest } = prevVariants;
        return rest;
      } else {
        return {
          ...prevVariants,
          [variant]: updatedVariant,
        };
      }
    });
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    const updatedVariants = { ...variants };

    Object.entries(editValues).forEach(([variant, values]) => {
      updatedVariants[variant] = updatedVariants[variant].map((val, idx) =>
        values[idx] !== undefined ? values[idx] : val
      );
    });
    for (const key in updatedVariants) {
      updatedVariants[key] = updatedVariants[key].filter((item) => item !== "");
      if (updatedVariants[key].length === 0) {
        delete updatedVariants[key];
      }
    }

    console.log(updatedVariants);
    setVariants(updatedVariants);

    const formData = new FormData();
    // Append text fields
    formData.append("settingType", "variants");
    formData.append("settings", JSON.stringify(updatedVariants));

    const response = await fetch("http://localhost:4000/admin/settings", {
      method: "PUT",
      body: formData,
    });
    setIsEditing(false);
    setEditValues({});
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
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                {variant}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="flex flex-row space-x-10">
                {values.map((value, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    {!isEditing ? (
                      <>
                        <Checkbox
                          checked={
                            checkedVariants[variant]?.has(value) || false
                          }
                          value={value}
                          onChange={(event) =>
                            handleCheckBox(event, variant, value)
                          }
                        />
                        <label>{value}</label>
                      </>
                    ) : (
                      <>
                        <input
                          type="text"
                          value={editValues[variant]?.[idx] || value}
                          onChange={(e) => handleEditChange(variant, idx, e)}
                          className="border border-gray-300 px-2 py-1"
                        />
                        <button
                          onClick={(e) => handleRemoveItem(variant, idx, e)}
                          className="text-red-500"
                        >
                          Remove
                        </button>
                      </>
                    )}
                  </div>
                ))}
              </div>
              {isEditing && (
                <div className="flex items-center mt-3">
                  <input
                    type="text"
                    value={editValues[variant]?.new || ""}
                    onChange={(e) => handleEditChange(variant, "new", e)}
                    placeholder={`Enter new ${variant.slice(0, -1)}`}
                    className="border border-gray-300 px-2 py-1 mr-2"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (editValues[variant]?.new) {
                        setVariants((prevVariants) => ({
                          ...prevVariants,
                          [variant]: [
                            ...prevVariants[variant],
                            editValues[variant].new,
                          ],
                        }));
                        setEditValues((prevValues) => ({
                          ...prevValues,
                          [variant]: {
                            ...prevValues[variant],
                            new: "",
                          },
                        }));
                      }
                    }}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                  >
                    Add {variant.slice(0, -1)}
                  </button>
                </div>
              )}
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
      {isEditing && (
        <div className="mt-4">
          <div className="flex items-center mb-2">
            <input
              type="text"
              value={newVariantName}
              onChange={(e) => setNewVariantName(e.target.value)}
              placeholder="Enter new variant name"
              className="border border-gray-300 px-2 py-1 mr-2"
            />
            <input
              type="text"
              value={newVariantValue}
              onChange={(e) => setNewVariantValue(e.target.value)}
              placeholder="Enter first value"
              className="border border-gray-300 px-2 py-1 mr-2"
            />
            <button
              type="button"
              onClick={handleAddNewVariant}
              className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
            >
              Add New Variant
            </button>
          </div>
        </div>
      )}
      <div className="mt-4">
        <button
          onClick={isEditing ? (e) => handleSaveChanges(e) : (e) => handleEditToggle(e)}
          className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
        >
           <FontAwesomeIcon
            icon={isEditing ? faSave : faEdit}
            className="text-white mr-2"
          />
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>
    </div>
  );
};

export default GiftVariants;
