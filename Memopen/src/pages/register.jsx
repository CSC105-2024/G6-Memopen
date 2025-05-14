import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Schema definition
const RegisterSchema = z
  .object({
    username: z.string().min(1, "Username is required."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter.")
      .regex(/[a-z]/, "Must contain at least one lowercase letter.")
      .regex(/[0-9]/, "Must contain at least one number."),
    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const returnLoginPage = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegisterSchema),
  });

  const handleRegister = async (formData) => {
    try {
      const res = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      let data;
      try {
        data = await res.json();
      } catch (e) {
        const text = await res.text();
        alert(text || "Server did not return valid JSON");
        return;
      }

      if (res.ok) {
        returnLoginPage("/"); // Redirect to login
      } else {
        alert(data.msg || "Registration failed");
      }
    } catch (error) {
      alert("Network error: " + error.message);
    }
  };

  const openEye = <FontAwesomeIcon icon={faEye} />;
  const closeEye = <FontAwesomeIcon icon={faEyeSlash} />;

  return (
    <div className="flex min-h-screen min-w-screen bg-gradient-to-b from-white via-white/40 to-[#B1B1B1] overflow-hidden md:bg-none">
      <h1 className="absolute top-6 left-6 text-black md:text-white text-xl font-bold z-10">
        MEMOPEN
      </h1>
      <div className="hidden relative md:block md:w-1/2 lg:w-1/2">
        <div className="absolute inset-0 bg-[url('/assets/loginImg/Login_background.jpg')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white"></div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:w-1/2 md:items-center w-full justify-center">
        <div className="md:hidden flex justify-center mt-16">
          <img
            className="max-w-48 max-h-48"
            src="/assets/loginImg/Login_logo.png"
            alt="Logo"
          />
        </div>
        <div className="md:flex-1 flex items-center justify-center 2xl:max-w-2xl">
          <form
            onSubmit={handleSubmit(handleRegister)}
            className="w-full p-9"
            noValidate
          >
            <h1 className="text-2xl md:text-3xl 2xl:text-4xl font-bold mb-6">
              Register your account
            </h1>

            {/* Username */}
            <label className="block font-medium mb-1">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              {...register("username")}
              type="text"
              placeholder="ex.mewInwZa007"
              className="bg-white w-full p-3 md:p-4 border rounded-2xl mb-1"
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
                className="bg-white w-full p-3 md:p-4 border rounded-2xl mb-1"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mb-4">
                  {errors.password.message}
                </p>
              )}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-10 md:top-11 right-3 cursor-pointer"
              >
                {showPassword ? openEye : closeEye}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label className="block font-medium mb-1">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                {...register("confirmPassword")}
                type={showConfirmPassword ? "text" : "password"}
                className="bg-white w-full p-3 md:p-4 border rounded-2xl mb-1"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mb-4">
                  {errors.confirmPassword.message}
                </p>
              )}
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-10 md:top-11 right-3 cursor-pointer"
              >
                {showConfirmPassword ? openEye : closeEye}
              </button>
            </div>

            {/* Password requirements */}
            <div className="text-sm text-gray-600 mb-6">
              <p>Password must contain:</p>
              <ul className="list-disc pl-5">
                <li>At least 8 characters long</li>
                <li>Uppercase letters: A-Z</li>
                <li>Lowercase letters: a-z</li>
                <li>Numbers: 0-9</li>
              </ul>
            </div>

            {/* Register button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-96 p-3 bg-black text-white rounded-2xl hover:bg-gray-800 cursor-pointer"
              >
                Register
              </button>
            </div>

            {/* Login link */}
            <p className="text-gray-600 mt-4 text-center">
              Already have an account?{" "}
              <button
                className="text-black font-bold cursor-pointer"
                onClick={() => returnLoginPage("/")}
              >
                Login
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
