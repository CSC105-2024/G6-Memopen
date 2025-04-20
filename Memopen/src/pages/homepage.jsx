import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClockRotateLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import TemplatePopup from "../components/TemplatePopup";
import Sidebar from "../components/Sidebar";
function Home(){
  const navigate = useNavigate();
  const location = useLocation();
  const showPopup = new URLSearchParams(location.search).get("popup") === "true";

  const [notes, setNotes] = useState([]);
  const [tags, setTags] = useState([]);
  const [hoverIndex, setHoverIndex] = useState(null);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes") || "[]");
    setNotes(storedNotes);
    let storedTags = localStorage.getItem("tags");
    if (storedTags) {
      setTags(JSON.parse(storedTags));
    }
  }, []);

  {/*const saveNotesToStorage = (newNotes) => {
    localStorage.setItem("notes", JSON.stringify(newNotes));
    setNotes(newNotes);
  }; */}

  

  const handleDelete = (index) => {
    let newNotes = [...notes];
    newNotes.splice(index, 1);
    saveNotesToStorage(newNotes);
  };

  const getTagColor = (noteName) => {
    for (let tag of tags) {
      if (tag.name === noteName) {
        return tag.color;
      }
    }
    return "#000000";
  };

  const handleChooseTemplate = (template) => {
    
    console.log("Template chosen:", template);
  };

  
    return(
        <div className="flex">
        <Sidebar/>
        <div className="flex-1">
        <div className="flex-1 p-6">
      <div className="flex justify-between items-center mt-15 mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold ml-5">
          Recent notes
          <FontAwesomeIcon icon={faClockRotateLeft} className="ml-2 text-black" />
        </h1>
        <button className="bg-[#00917C] text-white px-4 py-2 rounded-lg sm:px-6" onClick={() => navigate("?popup=true")}>
          <span className="sm:hidden">+</span>
          <span className="hidden sm:inline">+ Create new</span>
        </button>
      </div>

      {showPopup && <TemplatePopup onChoose={handleChooseTemplate} onClose={() => navigate("?popup=false")} />}

      {notes.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">No notes yet</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          {notes.map((note, index) => (
            <div
              key={index}
              className={`relative border p-4 rounded-lg transition duration-300 bg-white text-black ${hoverIndex === index ? "border-black bg-gray-100" : ""}`}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <span className="cursor-text w-full">{note.text}</span>
              <div className="flex items-center justify-between mt-2">
                <span className="w-4 h-4 rounded-full inline-block" style={{ backgroundColor: getTagColor(note.text) }}></span>
                <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(index)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
        </div>
      </div>
        
  );
};
export default Home;