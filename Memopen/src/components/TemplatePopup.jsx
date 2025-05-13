import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import cute1 from "/assets/img/1.png";
import cute2 from "/assets/img/2.png";
import cute3 from "/assets/img/3.png";
import cute4 from "/assets/img/4.png";

import nature1 from "/assets/img/5.png";
import nature2 from "/assets/img/6.png";
import nature3 from "/assets/img/7.png";
import nature4 from "/assets/img/8.png";

import festival1 from "/assets/img/9.png";
import festival2 from "/assets/img/10.png";
import festival3 from "/assets/img/11.png";
import festival4 from "/assets/img/12.png";

import vintage1 from "/assets/img/13.png";
import vintage2 from "/assets/img/14.png";
import vintage3 from "/assets/img/15.png";
import vintage4 from "/assets/img/16.png";

import { useNavigate } from "react-router-dom";

const templates = {
  Cute: [cute1, cute2, cute3, cute4],
  Nature: [nature1, nature2, nature3, nature4],
  Festival: [festival1, festival2, festival3, festival4],
  Vintage: [vintage1, vintage2, vintage3, vintage4],
};

const allTemplates = [
  "/assets/img/blank.png",
  ...Object.values(templates).flat(),
];

export default function TemplatePopup({ onChoose, onClose }) {
  const [canvases , setCanvases] = useState([]);
  const [category, setCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [canvasCount , setCanvasCount]= useState(()=>{
    return parseInt(localStorage.getItem("canvasCount")) || 0;
  });

  const edNavigate = useNavigate();

  useEffect(() => {
    const storedCanvases = localStorage.getItem("canvases");
    if (storedCanvases) {
      setCanvases(JSON.parse(storedCanvases));
    }
    const saved = JSON.parse(localStorage.getItem("canvases")|| "[]")
    setCanvases(saved)
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const itemsPerPage = isMobile ? 2 : category === "All" ? 6 : 4;
  const gridCols = isMobile
    ? "grid-cols-1"
    : category === "All"
    ? "grid-cols-3"
    : "grid-cols-2";
  const categoryTemplates =
    category === "All" ? allTemplates : templates[category];
  const totalPages = Math.ceil(categoryTemplates.length / itemsPerPage);
  const displayedTemplates = categoryTemplates.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  let colorIndex = 0; // Declare at the top of your file

  const handleChooseTemplate = async () => {
    const selectedTemplate = displayedTemplates[selectedId];
    if (selectedId !== null) {
      const newId = Date.now().toString();

      const colorOptions = [
        { value: "#ff0000" },
        { value: "#ff8800" },
        { value: "#ffff00" },
        { value: "#008000" },
        { value: "#0000ff" },
        { value: "#800080" },
      ];

      const tagCreation = "note";
      const tagColorCreation = colorOptions[colorIndex].value;
      colorIndex = (colorIndex + 1) % colorOptions.length; // update for next call

      const userId = parseInt(localStorage.getItem("userId"));
      localStorage.setItem("eidtor_bg_img", selectedTemplate);

      try {
        const res = await fetch("http://localhost:3000/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userId,
            tag: tagCreation,
            tagColor: tagColorCreation,
            thumbnail: selectedTemplate,
            backgroundImg: selectedTemplate,
            json: null
          })
        });

        if (!res.ok) {
          const errorText = await res.text();
          console.error("Failed to create post:", errorText);
          return;
        }

        const data = await res.json();
        setCanvases(data);
        edNavigate(`/editor/${data.data.id}`);
      } catch (error) {
        console.error("Network error", error);
      }
    }
  };


  /**
   const handleChooseTemplate = () => {
    const selectedTemplate = displayedTemplates[selectedId];
    if (selectedId !== null) {
      const newId = Date.now().toString();

      const colorOptions = [
        { value: "#ff0000" }, 
        { value: "#ff8800" },
        { value: "#ffff00" }, 
        { value: "#008000" }, 
        { value: "#0000ff" },
        { value: "#800080" }, 
      ];

      const getcanvasesSizeCount = canvases;
      const canvasesSizeCount = getcanvasesSizeCount.length +1 ;
      const tagCreation = "note_" + canvasesSizeCount;
      const colorIndex =(getcanvasesSizeCount.length % colorOptions.length) //canvas.length = 0 -> 0%5=0 , 1%5=1 , 5%5 = 0 
      const tagColorCreation = colorOptions[colorIndex].value;
      const newCanvas = {
        id:newId, tag:  tagCreation, tagColor: tagColorCreation, json:null , thumbnail: selectedTemplate};
      const updated = [...canvases , newCanvas];
      localStorage.setItem("canvases", JSON.stringify(updated))
      localStorage.setItem("eidtor_bg_img",selectedTemplate);
      onChoose(selectedTemplate);
      //localStorage.setItem("canvasCount" , newCount.toString());
      //setCanvasCount(newCount);
      console.log(canvases);
      edNavigate(`/editor/${newId}`);
    }
  };
   */
  return (
    <div>
      <div className="fixed inset-0  bg-black/40  bg-opacity-50 z-40"></div>
      <div className="fixed inset-0  flex justify-center items-center z-50">
      <div className="bg-white w-[90%] max-w-3xl rounded-lg shadow-2xl p-6 relative">
        <button onClick={onClose} className="absolute top-5 right-8 text-3xl">
          ✖
        </button>
        <h2 className="text-xl font-bold mb-4">Choose your template</h2>
        <hr className="border-t-2 border-gray-300 my-4" />

        <div className="overflow-x-auto justify-normal md:justify-center flex gap-2 mb-4 mt-10">
          {["All", "Cute", "Nature", "Festival", "Vintage"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setCategory(tab);
                setCurrentPage(0);
              }}
              className={`px-8 py-1 whitespace-nowrap rounded-lg ${
                category === tab
                  ? "bg-[#00917C] text-white"
                  : "bg-white text-black border"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            disabled={currentPage === 0}
            className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-50"
          >
            <FaChevronLeft />
          </button>

          <div className={`grid ${gridCols} gap-4`}>
            {displayedTemplates.map((src, index) => (
              <div
                key={index}
                className={`cursor-pointer p-1 rounded-lg transition-all  ${
                  selectedId === index ? "border border-black" : ""
                }`}
                onClick={() => setSelectedId(index)}
              >
                <img
                  src={src}
                  alt={`Template ${index}`}
                  className={`w-full h-32 object-cover rounded-md ${
                    src.includes("blank.png") ? "border border-gray-400" : ""
                  }`}
                />
              </div>
            ))}
          </div>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
            }
            disabled={currentPage === totalPages - 1}
            className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-50"
          >
            <FaChevronRight />
          </button>
        </div>

        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                currentPage === i ? "bg-[#00917C]" : "bg-gray-300"
              }`}
              onClick={() => setCurrentPage(i)}
            />
          ))}
        </div>

        <div className="flex justify-end">
          <button
            className="bg-[#00917C] text-white px-6 py-2 rounded-lg hover:bg-[#007f68]"
            onClick={handleChooseTemplate}
          >
            Choose
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}
