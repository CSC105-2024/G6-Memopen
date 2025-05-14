import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TagListPopup from "./TagListPopup";

const TagList = ({handleFilterClickAgain, activeFilter}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const showPopup = queryParams.get("popup");

  const [tags, setTags] = useState([]);
  const userId = localStorage.getItem("userId");
  const syncTag = async () => {
  try {
    const response = await fetch(`http://localhost:3000/tags/user/${userId}`);
    if (!response.ok) throw new Error('Failed to fetch tags');
    
    const data = await response.json();
    const allTags = data.map(tag => ({ name: tag.title, color: tag.color }));

    setTags(allTags);
    localStorage.setItem("tags", JSON.stringify(allTags)); // Optional caching
  } catch (error) {
    console.error("Error syncing tags from backend:", error);
  }
};

  useEffect(() => {
    syncTag();
    const interval = setInterval(syncTag, 500);
    return () => clearInterval(interval);
  }, []);

return (
    <div className="bg-white p-4 rounded-lg shadow w-full mb-4">
      <h2 className="text-black text-lg font-semibold mb-4">My tags</h2>

      <div className="max-h-64 overflow-y-auto pr-2">
        {tags.length > 0 ? (
          tags.map((tag, index) => (
            <button
              key={tag.title}
              className="flex items-center p-2 border rounded-lg mb-2 w-full"
              style={{
                backgroundColor:
                  activeFilter?.tag === tag.title &&
                  activeFilter?.tagColor === tag.color
                    ? "#00917C"
                    : "#FFFFFF",
                color:
                  activeFilter?.tag === tag.title &&
                  activeFilter?.tagColor === tag.color
                    ? "#fff"
                    : "#000",
              }}
              onClick={() => handleFilterClickAgain(tag.title, tag.color)}
            >
              <span
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: tag.color }}
              ></span>
              <span>{tag.title}</span>
            </button>
          ))
        ) : (
          <p className="text-gray-500">No tags available</p>
        )}
      </div>

      <button
        className="mt-4 text-black font-semibold"
        onClick={() => navigate("?popup=taglist")}
      >
        + Manage list
      </button>

      {showPopup === "taglist" && (
        <TagListPopup
          tags={tags}
          setTags={setTags}
          onClose={() => {
            navigate("?");
            syncTag(); 
          }}
        />
      )}
    </div>
  );
};

export default TagList;
