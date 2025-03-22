
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import TagList from "../components/TagList";

const Sidebar = () => {
  const [username, setUsername] = useState("User");
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setUsername(localStorage.getItem("username") || "Guest");
    setTags(JSON.parse(localStorage.getItem("userTags")) || [{ name: "Default Tag", color: "gray" }]);
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  return (
    <>
      {!isOpen && (
        <button className="fixed top-4 left-4 z-50 p-2 text-black text-2xl rounded-md md:hidden" onClick={() => setIsOpen(true)}>
          <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
        </button>
      )}

      <aside className={`fixed top-0 left-0 h-screen w-64 bg-black p-6 flex flex-col items-center transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:relative md:w-64`}>
        {isOpen && (
          <button className="absolute top-5 right-4 z-50 text-white text-2xl" onClick={() => setIsOpen(false)}>
            <FontAwesomeIcon icon={faTimes} className="w-6 h-6" />
          </button>
        )}

        <h1 className="text-white text-2xl font-bold self-start">MEMOPEN</h1>

        <div className="relative">
          <img src={image || "https://via.placeholder.com/100"} alt="Profile" className="w-35 h-35 rounded-full border-2 border-gray-300 object-cover mt-5" />
          <label className="absolute bottom-1 right-1 bg-[#A3A3A3] text-black p-2 rounded-full cursor-pointer">
            <FontAwesomeIcon icon={faCamera} className="w-5" />
            <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          </label>
        </div>

        <h2 className="text-white text-lg mt-4">Welcome back, <span className="font-bold">{username}</span></h2>

        <div className="mt-6 w-full">
          <TagList tags={tags} />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;


