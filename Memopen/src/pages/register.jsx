import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
function Register(){
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const openEye = <FontAwesomeIcon icon={faEye} />;
  const closeEye = <FontAwesomeIcon icon={faEyeSlash} />;
  
  const returnLoginPage  = useNavigate();
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
      <div className="flex flex-col md:flex-row md:w-1/2 md:items-center w-full justify-center">
        <div className="md:hidden flex justify-center mt-16">
          <img className="max-w-48 max-h-48" src="/src/assets/loginImg/Login_logo.png"></img>
        </div>
        <div className="md:flex-1 flex items-center justify-center 2xl:max-w-2xl">
          <div className="w-full p-9">
            <h1 className="text-2xl md:text-3xl 2xl:text-4xl font-bold mb-6">
              Register your account
            </h1>

            {/* username */}
            <label className="block font-medium mb-1">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="ex.mewInwZa007"
              className="bg-white w-full p-3 md:p-4 2xl:p-5 border rounded-2xl mb-4"
            />

            {/* password */}
            <div className="relative">
              <label className="block font-medium mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className="bg-white w-full p-3 md:p-4 2xl:p-5 border rounded-2xl mb-4"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-10 2xl:top-12 right-3 cursor-pointer"
              >
                {showPassword ? openEye : closeEye}
              </button>
            </div>

            {/* confirm password */}
            <div className="relative">
              <label className="block font-medium mb-1">
                Comfirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="bg-white w-full p-3 md:p-4 2xl:p-5 border rounded-2xl mb-4"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-10 right-3 2xl:top-12 cursor-pointer "
              >
                {showConfirmPassword ? openEye : closeEye}
              </button>
            </div>

            {/*password requirement*/}
            <div className="text-sm text-gray-600 mb-6">
              <p>Password must contain:</p>
              <ul className="list-disc pl-5">
                <li>At least 8 characters long</li>
                <li>Uppercase letters: A-Z</li>
                <li>Lowercase letters: a-z</li>
                <li>Numbers: 0-9</li>
              </ul>
            </div>

            {/* Register Button */}
           
              <button type="submit" className="w-full p-3 bg-black text-white rounded-lg hover:bg-gray-800 cursor-pointer"onClick={()=> returnLoginPage("/")}>
                Register
              </button>
            

            {/* Login Link */}
            <p className="text-gray-600 mt-4 text-center">
              Already have an account?{" "}
              <button me="text-black font-bold cursor-pointer" onClick={()=> returnLoginPage("/")}>
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;