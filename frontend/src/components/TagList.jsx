import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TagListPopup from "./TagListPopup";

const TagList = ({handleFilterClickAgain, activeFilter}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const showPopup = queryParams.get("popup");

  const [tags, setTags] = useState([]);
  const fetchTags = async () => {
  const Canvasres = await fetch("http://localhost:3000/post", {
    method: "GET",
    credentials: "include"
  });
  const manualRes = await fetch("http://localhost:3000/tag", {
    method: "GET",
    credentials: "include"
  });

  if (Canvasres.ok && manualRes.ok) {
    const canvasesData = await Canvasres.json();
    const manualData = await manualRes.json();
    const manualTags = manualData.data || [];
    const canvases = canvasesData.data || [];

    const tagMap = new Map();
    canvases.forEach((canvas) => {
      const tag = canvas.tag?.trim();
      const color = canvas.tagColor;
      if (!tag || !color) return;

      const key = `${tag}|${color}`;
      if (!tagMap.has(key)) {
        tagMap.set(key, {
          id: canvas.id,
          name: tag,
          color,
          isManual: false,
          isCanvas: true,
        });
      } else {
        tagMap.get(key).isCanvas = true;
      }
    });
    manualTags.forEach((tag) => {
      const name = tag.tagManual?.trim();
      const color = tag.tagColorManual;
      if (!name || !color) return;

      const key = `${name}|${color}`;
      if (!tagMap.has(key)) {
        tagMap.set(key, {
          id: tag.id,
          name,
          color,
          isManual: true,
          isCanvas: false,
        });
      } else {
        const entry = tagMap.get(key);
        entry.isManual = true;
        entry.id = tag.id; 
      }
    });

    setTags([...tagMap.values()]);
  } else {
    console.error("Failed to fetch tags");
  }
};


  useEffect(() => {
    fetchTags();
    const interval = setInterval(fetchTags, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow w-full mb-4">
      <h2 className="text-black text-lg font-semibold mb-4">My tags</h2>

      <div className="max-h-64 overflow-y-auto pr-2">
        {tags.length > 0 ? (
  tags.map((tag, index) => (
    <button
      key={index}
      className="flex items-center p-2 border rounded-lg mb-2 w-full"
      style={{
        backgroundColor:
          activeFilter?.tag === tag.name && activeFilter?.tagColor === tag.color
            ? "#00917C"
            : "#FFFFFF",
        color:
          activeFilter?.tag === tag.name && activeFilter?.tagColor === tag.color
            ? "#FFFFFF"
            : "#000000",
      }}
      onClick={() => handleFilterClickAgain(tag.name, tag.color)}
    >
      <span
        className="w-3 h-3 rounded-full mr-2"
        style={{ backgroundColor: tag.color }}
      ></span>
      <span>{tag.name}</span>
    </button>
  ))
) : (
  <p className="text-gray-500 text-sm">No tags available</p>
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
          onClose={() => navigate("?")}
        />
      )}
    </div>
  );
};

export default TagList;
