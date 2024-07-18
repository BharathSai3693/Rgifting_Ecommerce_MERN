import React, { useState, useContext } from "react";
import { FormContext } from "./FormContext";
import { faEdit, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GiftTags = () => {
  const { checkedTags, setCheckedTags } = useContext(FormContext);
  const { tags, setTags } = useContext(FormContext);
  const [editMode, setEditMode] = useState(false);
  const [newTag, setNewTag] = useState("");

  const handleCheckboxChange = (itemLabel) => {
    setCheckedTags((prevCheckedTags) => {
      if (prevCheckedTags.includes(itemLabel)) {
        return prevCheckedTags.filter((tag) => tag !== itemLabel);
      } else {
        return [...prevCheckedTags, itemLabel];
      }
    });
  };

  const handleTagChange = (index, value) => {
    var updatedTags = [...tags];
    updatedTags[index] = value;
    updatedTags = updatedTags.filter(tag => tag.trim() !== ''); 
    setTags(updatedTags);
  };

  const handleNewTagChange = (e) => {
    setNewTag(e.target.value);
  };

  const addNewTag = async (e) => {
    e.preventDefault();
    if (newTag.trim() !== "") {
      var newTags = [...tags, newTag.trim()]
      setTags(newTags);
      setNewTag("");
    }
  };

  const toggleEditMode = async (e) => {
    e.preventDefault();
    if(editMode){
      const formData = new FormData();
      // Append text fields 
      formData.append("settingType", "Tags");
      formData.append("settings",JSON.stringify(tags) );
      const response = await fetch("http://localhost:4000/admin/settings", {
        method: "PUT",
        body: formData,
      });

    }
    setEditMode(!editMode);
  };

  return (
    <div className="col-span-3 mx-16 p-3 border border-yellow-600 rounded">
      <div className="flex flex-row justify-between">
        <label
          htmlFor="highlights"
          className="block text-sm font-medium leading-6 text-gray-900 mb-2"
        >
          Gift Tags
        </label>
        <button
          onClick={(e)=>toggleEditMode(e)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-sm py-2 px-2 rounded"
        >
          <FontAwesomeIcon
            icon={editMode ? faSave : faEdit}
            className="text-white mr-2"
          />
          {editMode ? "Save" : "Edit"}
        </button>
      </div>
      <div className="flex flex-col items-start space-y-2">
        {tags.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            {editMode ? (
              <input
                type="text"
                value={item}
                onChange={(e) => handleTagChange(index, e.target.value)}
                className="border border-gray-300 rounded px-2 py-1"
              />
            ) : (
              <>
                <input
                  type="checkbox"
                  id={index}
                  checked={checkedTags.includes(item)}
                  onChange={() => handleCheckboxChange(item)}
                  className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor={item.id} className="text-sm text-gray-700">
                  {item}
                </label>
              </>
            )}
          </div>
        ))}
        {editMode && (
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newTag}
              onChange={handleNewTagChange}
              className="border border-gray-300 rounded px-2 py-1"
              placeholder="Add new tag"
            />
            <button
              onClick={(e)=>addNewTag(e)}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
            >
              Add
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GiftTags;
