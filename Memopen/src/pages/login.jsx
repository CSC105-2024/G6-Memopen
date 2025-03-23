import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
function Login(){
    const navigateToHome = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

  const openEye = <FontAwesomeIcon icon={faEye} />;
  const closeEye = <FontAwesomeIcon icon={faEyeSlash} />;

  return (
    <div className="flex min-h-screen min-w-screen bg-gradient-to-b  from-white via-white/40 to-[#B1B1B1] overflow-hidden md:bg-none ">
      <h1 className="absolute top-6 left-6 text-black md:text-white text-xl font-bold z-10">
        MEMOPEN
      </h1>
      <div className="hidden relative md:block md:w-1/2 lg:w-1/2  ">
      <div className="absolute inset-0 bg-[url('/src/assets/loginImg/Login_background.jpg')] bg-cover bg-center"> 
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white"></div>
        </div>
      </div>
      <div className="flex flex-col md:w-1/2 md:items-center w-full justify-center">
        <div className="flex justify-center mt-16">
          <img className="max-w-48 max-h-48" src="/src/assets/loginImg/Login_logo.png"></img>
        </div>
        <div className="md:flex-1 flex items-center justify-center 2xl:max-w-2xl">
          <div className="w-full p-9">
            <h1 className="text-2xl md:text-3xl 2xl:text-4xl font-bold mb-6">Login to your account</h1>

            {/* username */}
            <label className="block font-medium mb-1">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="ex.mewInwZa007"
              className="bg-white w-full p-3  2xl:p-5 border rounded-2xl mb-4"
            />

            {/* password */}
            <div className="relative">
              <label className="block font-medium mb-1">Password <span className="text-red-500">*</span></label>
              <input
                type={showPassword ? "text" : "password"}
                className="bg-white w-full p-3 2xl:p-5 border rounded-2xl mb-4"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-10 right-3 2xl:top-12 cursor-pointer"
              >
                {showPassword ? openEye : closeEye}
              </button>
            </div>

            

            {/* login Button */}
            <a href="/homepage">
              <button type="submit" className="w-full p-3 bg-black text-white rounded-lg hover:bg-gray-800 cursor-pointer">
                Login
              </button>
            </a>

            {/* register Link */}
            <p className="text-gray-600 mt-4 text-center">
            Don't have an account?{" "}
              <button onClick={()=>navigateToHome("/")} className="text-black font-bold cursor-pointer">
                Register
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;