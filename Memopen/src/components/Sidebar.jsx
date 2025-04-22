import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faBars,
  faTimes,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import TagList from "../components/TagList";

const Sidebar = () => {
  const [username, setUsername] = useState("User");
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setUsername(localStorage.getItem("username") || "Guest");

    const storedImage = localStorage.getItem("profileImage");
    if (storedImage) {
      setImage(storedImage);
    }

    setTags(
      JSON.parse(localStorage.getItem("userTags")) || [
        { name: "Default Tag", color: "gray" },
      ]
    );
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        setImage(base64Image);
        localStorage.setItem("profileImage", base64Image);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("userTags");
    localStorage.removeItem("profileImage");
    setUsername("Guest");
    setTags([]);
    setImage(null);
  };

  return (
    <>
      {!isOpen && (
        <button
          className="fixed top-4 left-4 p-2 text-black text-2xl rounded-md md:hidden z-50"
          onClick={() => setIsOpen(true)}
        >
          <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
        </button>
      )}

      <aside
        className={`fixed top-0 left-0 z-40 min-h-screen w-64 bg-black p-6 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:w-64`}
      >
        {isOpen && (
          <button
            className="absolute top-5 right-4 z-50 text-white text-2xl"
            onClick={() => setIsOpen(false)}
          >
            <FontAwesomeIcon icon={faTimes} className="w-6 h-6" />
          </button>
        )}

        <div className="flex flex-col h-full w-full">
          <div>
            <h1 className="text-white text-2xl font-bold mb-4">MEMOPEN</h1>

            <div className="relative w-fit mx-auto">
              <img
                src={image || "https://via.placeholder.com/100"}
                alt="Profile"
                className="w-24 h-24 rounded-full border-2 border-gray-300 object-cover"
              />
              <label className="absolute bottom-1 right-1 bg-[#A3A3A3] text-black p-2 rounded-full cursor-pointer">
                <FontAwesomeIcon icon={faCamera} className="w-4" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>

            <h2 className="text-white text-lg mt-4 text-center">
              Welcome back, <span className="font-bold">{username}</span>
            </h2>

            <div className="mt-6 w-full">
              <TagList tags={tags} />
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="mt-auto bg-white hover:bg-red-700 text-black hover:text-white px-4 py-2 rounded-lg flex items-center gap-2 w-full justify-center"
          >
            <FontAwesomeIcon icon={faRightFromBracket} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

