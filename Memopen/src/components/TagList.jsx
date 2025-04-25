import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TagListPopup from "./TagListPopup";

const TagList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const showPopup = queryParams.get("popup");

  const [tags, setTags] = useState([]);

  const syncTag = () => {
    const savedCanvas = JSON.parse(localStorage.getItem("canvases")) || [];
    const manualTags = JSON.parse(localStorage.getItem("manualTags")) || [];

    const tagSet = new Set();
    savedCanvas.forEach((canvas) => {
      if (canvas.tag && canvas.tag.trim() && canvas.tagColor) {
        const tagKey = `${canvas.tag.trim()}-${canvas.tagColor}`;
        tagSet.add(tagKey);
      }
    });

    manualTags.forEach((tag) => {
      const tagKey = `${tag.name}-${tag.color}`;
      tagSet.add(tagKey);
    });

    const allTags = Array.from(tagSet).map((tagKey) => {
      const [name, color] = tagKey.split("-");
      return { name, color };
    });

    setTags(allTags);
    localStorage.setItem("tags", JSON.stringify(allTags));
  };

  useEffect(() => {
    syncTag();
    const interval = setInterval(syncTag, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow w-full">
      <h2 className="text-black text-lg font-semibold mb-4">My tags</h2>

      <div className="max-h-64 overflow-y-auto pr-2">
        {tags.length > 0 ? (
          tags.map((tag, index) => (
            <div key={index} className="flex items-center p-2 border rounded-lg mb-2">
              <span
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: tag.color }}
              ></span>
              <span>{tag.name}</span>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No tags available</p>
        )}
      </div>

      <button
        className="mt-4 text-black font-semibold"
        onClick={() => navigate("?popup=taglist")}
      >
        + add list
      </button>

      {showPopup === "taglist" && (
        <TagListPopup
          tags={tags}
          setTags={setTags}
          onClose={() => navigate("?")}
        />
      )}
    </div>
  );
};

export default TagList;
