import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClockRotateLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import TemplatePopup from "../components/TemplatePopup";
import Sidebar from "../components/Sidebar";

function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const showPopup =
    new URLSearchParams(location.search).get("popup") === "true";

  const [canvases, setCanvases] = useState([]);
  const [tags, setTags] = useState([]);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [activeFilter , setActiveFilter] = useState(null);

  useEffect(() => {
    const storedCanvases = localStorage.getItem("canvases");
    if (storedCanvases) {
      setCanvases(JSON.parse(storedCanvases));
    }
    const storedTags = localStorage.getItem("tags");
    if (storedTags) {
      setTags(JSON.parse(storedTags));
    }
  }, []);

  const handleDelete = (id) => {
    const filtered = canvases.filter((c) => c.id !== id);
    localStorage.setItem("canvases", JSON.stringify(filtered));
    setCanvases(filtered);
  };

  const handleChooseTemplate = (template) => {
    console.log("Template chosen:", template);
  };

  const filteredCanvas = canvases.filter((c)=>{
    const filterTag = c.tag?.trim();
    const filterColor = c.tagColor;

    if(!activeFilter) return true; //if there are no active filter select
    return (
      (activeFilter.tag ? filterTag === activeFilter.tag : true) &&
      (activeFilter.tagColor ? filterColor === activeFilter.tagColor : true)
    )

  })

  const handleFilterClickAgain = (tag,color) =>{
    if(activeFilter?.tag === tag && activeFilter?.tagColor === color){
      setActiveFilter(null)
    }else{
      setActiveFilter({tag,tagColor: color});
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar activeFilter={activeFilter} handleFilterClickAgain={handleFilterClickAgain} />
      <div className="flex-1 overflow-y-auto  ">
      <div className="top-nav-container fixed left-0 right-0 bg-white shadow z-10 px-4 sm:px-6 py-4">
        <div className="topnav flex pt-1.5 sm:pt-1 justify-between items-center gap-4">
          <h1 className="relative left-10 md:left-64  text-xl sm:text-3xl font-bold text-center sm:text-left">
            Recent notes
            <FontAwesomeIcon icon={faClockRotateLeft} className="ml-2 text-black" />
          </h1>
          <button
            className="bg-[#00917C] text-white px-4 py-2 rounded-lg text-sm sm:text-base sm:px-6"
            onClick={() => navigate("?popup=true")}
          >
            <span className="sm:hidden">+</span>
            <span className="hidden sm:inline">+ Create new</span>
          </button>
        </div>
      </div>
        
        {showPopup && (
          <TemplatePopup
            onChoose={handleChooseTemplate}
            onClose={() => navigate("?popup=false")}
          />
        )}
        <div className="recent-canvas pt-[90px] px-6 pb-[30px]">
        {filteredCanvas.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">{
            activeFilter ? `No notes matches with this tag` : "No notes yet"
          }</p>
        ) : (
          <div className="flex justify-center items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 lg:gap-15">
              {filteredCanvas.map((canvas, index) => (
                <div
                  key={index}
                  className={`relative max-w-[450px] border p-4 rounded-lg transition duration-300 bg-white text-black ${
                    hoverIndex === index ? "border-black bg-gray-100" : ""
                  }`}
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                >
                  {canvas.thumbnail ? (
                    <img
                      src={canvas.thumbnail}
                      className="w-full h-[80] object-cover rounded-md mb-2"
                      onClick={() => navigate(`/editor/${canvas.id}`)}
                    />
                  ) : (
                    <span>no</span>
                  )}

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex gap-2 items-center">
                      <span
                        className="w-4 h-4 rounded-full inline-block border"
                        style={{ backgroundColor: canvas.tagColor }}
                      ></span>
                      <span>{canvas.tag}</span>
                    </div>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(canvas.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        </div>
        
      </div>
    </div>
  );
}

export default Home;
