import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import cute1 from "../assets/img/1.png";
import cute2 from "../assets/img/2.png";
import cute3 from "../assets/img/3.png";
import cute4 from "../assets/img/4.png";

import nature1 from "../assets/img/5.png";
import nature2 from "../assets/img/6.png";
import nature3 from "../assets/img/7.png";
import nature4 from "../assets/img/8.png";

import festival1 from "../assets/img/9.png";
import festival2 from "../assets/img/10.png";
import festival3 from "../assets/img/11.png";
import festival4 from "../assets/img/12.png";

import vintage1 from "../assets/img/13.png";
import vintage2 from "../assets/img/14.png";
import vintage3 from "../assets/img/15.png";
import vintage4 from "../assets/img/16.png";

const templates = {
  Cute: [cute1, cute2, cute3, cute4],
  Nature: [nature1, nature2, nature3, nature4],
  Festival: [festival1, festival2, festival3, festival4],
  Vintage: [vintage1, vintage2, vintage3, vintage4],
};

const allTemplates = ["/images/blank.png", ...Object.values(templates).flat()];

export default function TemplatePopup({ onChoose, onClose }) {
  const [category, setCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const itemsPerPage = isMobile ? 1 : category === "All" ? 6 : 4;
  const gridCols = isMobile ? "grid-cols-1" : category === "All" ? "grid-cols-3" : "grid-cols-2";
  const categoryTemplates = category === "All" ? allTemplates : templates[category];
  const totalPages = Math.ceil(categoryTemplates.length / itemsPerPage);
  const displayedTemplates = categoryTemplates.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white w-[90%] max-w-3xl rounded-lg shadow-2xl p-6 relative">
        <button onClick={onClose} className="absolute top-5 right-8 text-3xl">✖</button>
        <h2 className="text-xl font-bold mb-4">Choose your template</h2>
        <hr className="border-t-2 border-gray-300 my-4" />

        <div className="overflow-x-auto flex gap-2 mb-4 mt-10">
          {["All", "Cute", "Nature", "Festival", "Vintage"].map((tab) => (
            <button
              key={tab}
              onClick={() => { setCategory(tab); setCurrentPage(0); }}
              className={`px-8 py-1 whitespace-nowrap rounded-lg ${category === tab ? "bg-[#00917C] text-white" : "bg-white text-black border"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))} disabled={currentPage === 0} className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-50">
            <FaChevronLeft />
          </button>

          <div className={`grid ${gridCols} gap-4`}>
            {displayedTemplates.map((src, index) => (
              <div key={index} className={`cursor-pointer p-1 rounded-lg transition-all ${selectedId === index ? "border border-black" : ""}`} onClick={() => setSelectedId(index)}>
                <img src={src} alt={`Template ${index}`} className="w-full h-32 object-cover rounded-md" />
              </div>
            ))}
          </div>

          <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))} disabled={currentPage === totalPages - 1} className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-50">
            <FaChevronRight />
          </button>
        </div>

        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <div key={i} className={`w-3 h-3 rounded-full cursor-pointer ${currentPage === i ? "bg-[#00917C]" : "bg-gray-300"}`} onClick={() => setCurrentPage(i)} />
          ))}
        </div>

        <div className="flex justify-end">
          <button className="bg-[#00917C] text-white px-6 py-2 rounded-lg hover:bg-[#007f68]" onClick={() => onChoose(selectedId)}>Choose</button>
        </div>
      </div>
    </div>
  );
}




