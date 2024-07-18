import React, { useContext, useState } from "react";
import { FormContext } from "./FormContext";
import { faEdit, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GiftCategory = () => {
  const {
    categories,
    setCategories,
    selectedCategories,
    setSelectedCategories,
  } = useContext(FormContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [newSubcategory, setNewSubcategory] = useState({});
  const [editingCategories, setEditingCategories] = useState(categories);


  const handleCategoryChange = (event, category) => {
    event.preventDefault();
    const isChecked = event.target.checked;

    setSelectedCategories((prevState) => {
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
    event.preventDefault();
    const isChecked = event.target.checked;

    setSelectedCategories((prevState) => {
      const newSelectedCategories = { ...prevState };

      if (isChecked) {
        newSelectedCategories[category] = [
          ...newSelectedCategories[category],
          subcategory,
        ];
      } else {
        newSelectedCategories[category] = newSelectedCategories[
          category
        ].filter((item) => item !== subcategory);
      }

      if (newSelectedCategories[category].length === 0) {
        delete newSelectedCategories[category];
      }

      return newSelectedCategories;
    });
  };

  const handleAddCategory = (event) => {
    event.preventDefault();
    if (newCategory.trim()) {
      setEditingCategories((prevCategories) => [
        ...prevCategories,
        { category: newCategory, subcategories: [] },
      ]);
      setNewCategory("");
    }
  };

  const handleAddSubcategory = (category, event) => {
    event.preventDefault();
    if (newSubcategory[category]?.trim()) {
      setEditingCategories((prevCategories) =>
        prevCategories.map((cat) =>
          cat.category === category
            ? {
                ...cat,
                subcategories: [...cat.subcategories, newSubcategory[category]],
              }
            : cat
        )
      );
      setNewSubcategory((prevState) => ({ ...prevState, [category]: "" }));
    }
  };

  const handleRemoveCategory = (categoryToRemove, event) => {
    event.preventDefault();
    setEditingCategories((prevCategories) =>
      prevCategories.filter((cat) => cat.category !== categoryToRemove)
    );
    setSelectedCategories((prevSelected) => {
      const newSelected = { ...prevSelected };
      delete newSelected[categoryToRemove];
      return newSelected;
    });
  };

  const handleRemoveSubcategory = (category, subcategoryToRemove, event) => {
    event.preventDefault();
    setEditingCategories((prevCategories) =>
      prevCategories.map((cat) =>
        cat.category === category
          ? {
              ...cat,
              subcategories: cat.subcategories.filter(
                (sub) => sub !== subcategoryToRemove
              ),
            }
          : cat
      )
    );
    setSelectedCategories((prevSelected) => {
      const newSelected = { ...prevSelected };
      if (newSelected[category]) {
        newSelected[category] = newSelected[category].filter(
          (sub) => sub !== subcategoryToRemove
        );
        if (newSelected[category].length === 0) delete newSelected[category];
      }
      return newSelected;
    });
  };

  const handleEdit = (event) => {
    event.preventDefault();
    setEditingCategories(categories);
    setIsEditing(true);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    setCategories(editingCategories);

    const formData = new FormData();
    // Append text fields
    formData.append("settingType", "categories");
    formData.append("settings", JSON.stringify(editingCategories));
    const response = await fetch("http://localhost:4000/admin/settings", {
      method: "PUT",
      body: formData,
    });
    setIsEditing(false);
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
        {isEditing ? (
          <div>
            {editingCategories.map(({ category, subcategories }) => (
              <div key={category} className="mb-4">
                <div className="flex items-center">
                  <input
                    type="text"
                    value={category}
                    onChange={(e) =>
                      setEditingCategories((prevCategories) =>
                        prevCategories.map((cat) =>
                          cat.category === category
                            ? { ...cat, category: e.target.value }
                            : cat
                        )
                      )
                    }
                    className="border border-gray-300 px-2 py-1 mr-2"
                  />
                  <button
                    onClick={(event) => handleRemoveCategory(category, event)}
                    className="ml-2 text-red-500"
                  >
                    Remove
                  </button>
                </div>
                <div className="ml-6 mt-2">
                  {subcategories.map((subcategory) => (
                    <div key={subcategory} className="flex items-center">
                      <input
                        type="text"
                        value={subcategory}
                        onChange={(e) =>
                          setEditingCategories((prevCategories) =>
                            prevCategories.map((cat) =>
                              cat.category === category
                                ? {
                                    ...cat,
                                    subcategories: cat.subcategories.map(
                                      (sub) =>
                                        sub === subcategory
                                          ? e.target.value
                                          : sub
                                    ),
                                  }
                                : cat
                            )
                          )
                        }
                        className="border border-gray-300 px-2 py-1 mr-2"
                      />
                      <button
                        onClick={(event) =>
                          handleRemoveSubcategory(category, subcategory, event)
                        }
                        className="ml-2 text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <div className="mt-2 flex items-center">
                    <input
                      type="text"
                      value={newSubcategory[category] || ""}
                      onChange={(e) =>
                        setNewSubcategory({
                          ...newSubcategory,
                          [category]: e.target.value,
                        })
                      }
                      placeholder="Add subcategory"
                      className="border border-gray-300 px-2 py-1 mr-2"
                    />
                    <button
                      onClick={(e) => handleAddSubcategory(category,e)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                    >
                      Add Subcategory
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="mt-4">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Add category"
                className="border border-gray-300 px-2 py-1 mr-2"
              />
              <button
                onClick={handleAddCategory}
                className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
              >
                Add Category
              </button>
            </div>
            <div className="mt-4">
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
              >
                 <FontAwesomeIcon
            icon={faSave}
            className="text-white mr-2"
          />
                Save
              </button>
            </div>
          </div>
        ) : (
          <div>
            {categories.map(({ category, subcategories }) => (
              <div key={category} className="mb-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={category}
                    name={category}
                    checked={!!selectedCategories[category]}
                    onChange={(event) => handleCategoryChange(event, category)}
                  />
                  <label htmlFor={category} className="ml-2">
                    {category}
                  </label>
                </div>
                <div className="ml-6 mt-2">
                  {subcategories.map((subcategory) => (
                    <div key={subcategory} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`${category}-${subcategory}`}
                        name={`${category}-${subcategory}`}
                        checked={
                          selectedCategories[category]?.includes(subcategory) ||
                          false
                        }
                        onChange={(event) =>
                          handleSubcategoryChange(event, category, subcategory)
                        }
                        disabled={!selectedCategories[category]}
                      />
                      <label
                        htmlFor={`${category}-${subcategory}`}
                        className="ml-2"
                      >
                        {subcategory}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="mt-4">
              <button
                onClick={handleEdit}
                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
              >
                 <FontAwesomeIcon
            icon={faEdit}
            className="text-white mr-2"
          />
                Edit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GiftCategory;
