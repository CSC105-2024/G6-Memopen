import React, { useState } from "react";
import { X } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faArrowTurnDown } from "@fortawesome/free-solid-svg-icons";

const colors = [
  { value: "#ff0000" },
  { value: "#ff8800" },
  { value: "#ffff00" },
  { value: "#008000" },
  { value: "#0000ff" },
  { value: "#800080" },
];

const TagListPopup = ({ tags, setTags, onClose, canvases, setCanvases }) => {
  const [newTag, setNewTag] = useState("");
  const [newColor, setNewColor] = useState(colors[0].value);
  const [colorPickerIndex, setColorPickerIndex] = useState(null);

  const handleTagRemoval = async (tagToRemove) => {
    try{
      const res = await fetch(`http://localhost:3000/tag/${tagToRemove.id}`,{
        method:"DELETE",
        credentials:"include",
      })
      if(!res.ok){
        const errorText = await res.text();
        console.error("Failed to delete tag:", errorText);
        return;
      }
      const updatedTags = tags.filter(t => t.id !== tagToRemove.id);
      setTags(updatedTags);
      if (setCanvases) {
      const updatedCanvases = canvases.filter(
        canvas => canvas.tag !== tagToRemove.name || canvas.tagColor !== tagToRemove.color
      );
      setCanvases(updatedCanvases);
    }
    }catch(e){
      console.error("Error deleting tag:", e);
    }
    
  };

  const addTag = async () => {
    if(!newTag.trim()) return;
    try{
      const res = await fetch("http://localhost:3000/tag",{
        method:"POST",
        credentials:"include",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          tagManual: newTag.trim(),
          tagColorManual: newColor
        })
      })
      if(!res.ok){
         const errorText = await res.text();
      console.error("Failed to create tag:", errorText);
      return;
      }
      const data = await res.json();
      console.log("Created tag:", data);
      setTags((prev)=> [...prev,{
          id:data.data.id,
         name:newTag.trim(),
         color:newColor
      }])
      setNewTag("");
      setNewColor(colors[0].value);
    }catch(e){
      console.error("Error creating tag:", e);
    }
    
  };

  const removeTag = (index) => {
    const tagToRemove = tags[index];
    handleTagRemoval(tagToRemove); // Remove the tag and associated canvases
  };

  const updateTag = async (index, newName, newColor) => {
    /**
     * 
     * const updatedTags = [...tags];
    updatedTags[index] = { name: newName, color: newColor };
    setTags(updatedTags);

    const manualTags = JSON.parse(localStorage.getItem("manualTags")) || [];
    const tagToUpdate = tags[index];

    const updatedManual = manualTags.map((tag) =>
      tag.name === tagToUpdate.name && tag.color === tagToUpdate.color
        ? { name: newName, color: newColor }
        : tag
    );
    localStorage.setItem("manualTags", JSON.stringify(updatedManual));
     */
    const tagToUpdate = tags[index];
    try{
      const res = await fetch(`http://localhost:3000/tag/${tagToUpdate.id}`,{
        method:"PATCH",
        credentials:"include",
        headers:{
          "Content-Type": "application/json"
        },
        body:JSON.stringify({
          tagManual:newName,
          tagColorManual:newColor 
        })

      })
      if(!res.ok){
        const errorText = await res.text();
        console.error("Failed to update tag:", errorText);
        return;
      }
      const updatedTags = [...tags];
      updatedTags[index] = {...tagToUpdate, name:newName, color:newColor}
      setTags(updatedTags);
    }catch (e) {
    console.error("Error updating tag:", e);
  }
    
  };

  return (
    <div className="fixed inset-0 bg-gray-200 bg-opacity-10 flex justify-end sm:justify-center">
      <div className="bg-white h-full w-80 sm:w-96 p-6 shadow-lg sm:rounded-lg overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold md:text-2xl ">Tag list</h2>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="space-y-3">
          {tags.map((tag, index) => (
            <div key={index} className="flex items-center justify-between p-2 border rounded-lg">
              <div className="flex space-x-2 relative">
                <div
                  className="w-4 h-4 rounded-full border cursor-pointer"
                  style={{ backgroundColor: tag.color }}
                  onClick={() => setColorPickerIndex(index)}
                ></div>
                {colorPickerIndex === index && (
                  <div className="absolute top-6 bg-black p-2 rounded-lg shadow-lg flex space-x-2 z-10">
                    {colors.map((color) => (
                      <div
                        key={color.value}
                        className="w-4 h-4 rounded-full cursor-pointer"
                        style={{ backgroundColor: color.value }}
                        onClick={() => {
                          updateTag(index, tag.name, color.value);
                          setColorPickerIndex(null);
                        }}
                      ></div>
                    ))}
                  </div>
                )}
              </div>
              <input
                type="text"
                value={tag.name}
                onChange={(e) => updateTag(index, e.target.value, tag.color)}
                className="p-1 flex-grow bg-transparent border-none outline-none w-[60%] text-sm"
              />
              {tag.isManual && (
                <span className="text-[9px]  text-gray-500 mr-2">(manually)</span>
                )}
              <button onClick={() => removeTag(index)} className="text-red-500">
                <FontAwesomeIcon icon={faTrash} style={{ color: "#ff0000" }} size="sm" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex items-center mt-4 border p-2 rounded-lg relative w-full">
          <div className="relative">
            <div
              className="w-4 h-4 rounded-full border cursor-pointer"
              style={{ backgroundColor: newColor }}
              onClick={() => setColorPickerIndex(-1)}
            ></div>
            {colorPickerIndex === -1 && (
              <div className="absolute top-10 left-0 bg-black p-2 rounded-lg shadow-lg flex space-x-2 z-10">
                {colors.map((color) => (
                  <div
                    key={color.value}
                    className="w-4 h-4 rounded-full cursor-pointer border-2"
                    style={{ backgroundColor: color.value }}
                    onClick={() => {
                      setNewColor(color.value);
                      setColorPickerIndex(null);
                    }}
                  ></div>
                ))}
              </div>
            )}
          </div>
          <input
            type="text"
            placeholder="Enter new tag"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            className="border p-1 flex-grow rounded-lg w-[65%] ml-2 text-sm"
          />
          <button onClick={addTag} className="ml-2 bg-[#00917C] text-white px-2 py-1 rounded-lg text-xs">
            Add
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-6 flex items-center text-gray-500 sm:hidden text-sm"
        >
          <FontAwesomeIcon icon={faArrowTurnDown} rotation={90} className="mr-2" style={{ color: "#000000" }} />
        </button>
      </div>
    </div>
  );
};

export default TagListPopup;
