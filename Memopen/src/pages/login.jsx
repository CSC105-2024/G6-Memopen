import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

function Login() {
  const navigateLogin = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState(""); 

const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

    const handleLogin = async ({ username, password }) => {
      setServerError("");
      try {
        const res = await fetch("http://localhost:3000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials:"include",
          body: JSON.stringify({ username, password }), //send the username and password in the request body
        });
    
        let data;
        try {
          data = await res.json(); 
        } catch {
          const text = await res.text(); 
          setServerError(text || "Something went wrong");
          return;
        }
    
        if (res.ok) {
          //localStorage.setItem("token", data.token); -> no longer need as we use cookies
          navigateLogin("/HomePage");
        } else {
          setServerError(data.message || "Login failed");
        }
      } catch (error) {
        setServerError("Network error: " + error.message);
      }
    };
    
    /**
     Token - after login, server create token -> sent to client
     -> proof that the user is authenticated
     */
  
  const openEye = <FontAwesomeIcon icon={faEye} />;
  const closeEye = <FontAwesomeIcon icon={faEyeSlash} />;

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-b from-white via-white/40 to-[#B1B1B1] overflow-hidden md:bg-none">
      {/* Top Left Logo */}
      <h1 className="absolute top-6 left-6 text-black md:text-white text-xl font-bold z-10">
        MEMOPEN
      </h1>

      {/* Left Side Image (hidden on small screens) */}
      <div className="hidden relative md:block md:w-1/2 lg:w-1/2">
        <div className="absolute inset-0 bg-[url('/assets/loginImg/Login_background.jpg')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white"></div>
        </div>
      </div>

      {/* Right Side Login Box */}
      <div className="flex flex-col justify-center items-center md:w-1/2 w-full max-h-[700px] my-auto">
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="flex items-center justify-center w-full h-full 2xl:max-w-2xl"
        >
          <div className="w-full p-9 max-w-md">
            <div className="flex justify-center mt-16 xl:-mb-12">
              <img
                className="max-w-48 max-h-48 mb-16"
                src="/assets/loginImg/Login_logo.png"
                alt="Login Logo"
              />
            </div>

            <h1 className="text-2xl md:text-3xl text-center 2xl:text-4xl font-bold mb-6">
              Login to your account
            </h1>

            {/* Username */}
            <label className="block font-medium mb-1">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              {...register("username")}
              type="text"
              placeholder="ex.mewInwZa007"
              className="bg-white w-full p-3 2xl:p-5 border rounded-2xl mb-1"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mb-4">
                {errors.username.message}
              </p>
            )}

            {/* Password */}
            <div className="relative">
              <label className="block font-medium mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                className="bg-white w-full p-3 2xl:p-5 border rounded-2xl mb-1"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-10 right-3 2xl:top-12 cursor-pointer"
              >
                {showPassword ? openEye : closeEye}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mb-4">
                  {errors.password.message}
                </p>
              )}

              {serverError && (
                <p className="text-red-500 text-sm mb-4">{serverError}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full p-3 bg-black text-white rounded-2xl hover:bg-gray-800 cursor-pointer mt-5"
            >
              Login
            </button>

            {/* Register Link */}
            <p className="text-gray-600 mt-4 text-center">
              Don't have an account?{" "}
              <button
                onClick={() => navigateLogin("/register")}
                className="text-black font-bold cursor-pointer"
              >
                Register
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
