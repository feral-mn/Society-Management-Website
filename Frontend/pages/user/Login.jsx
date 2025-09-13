import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  // Submit handler
  const onSubmit = async (data) => {
    try {
       await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/login`,
        data
      );
      alert("OTP sent to your mobile!");
      navigate("/user/verify-otp", { state: { username: data.username, mobile: data.mobile } });

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
  <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-gray-100">
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white shadow-xl rounded-2xl p-8 w-96 border border-gray-200"
    >
      {/* Title */}
      <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
        Owner Login
      </h2>

      {/* Username */}
      <div className="mb-5">
        <label className="block mb-2 font-medium text-gray-700">
          Username
        </label>
        <input
          type="text"
          {...register("username", { 
            required: "Username is required",
            minLength: {
            value: 3,
            message: "Name must be at least 3 characters long",
            },
            maxLength: {
            value: 30,
            message: "Name cannot exceed 30 characters",
            } 
        })}
          className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm"
          placeholder="John Doe"
        />
        {errors.username && (
          <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="mb-5">
        <label className="block mb-2 font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm"
          placeholder="********"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Mobile Number */}
      <div className="mb-5">
        <label className="block mb-2 font-medium text-gray-700">
          Mobile Number
        </label>
        <input
          type="text"
          {...register("mobile", { 
            required: "Mobile Number is required",
            minLength: {
            value: 10,
            message: "Mobile Number must be 10 digits",
            },
            maxLength: {
            value: 10,
            message: "Mobile Number must be 10 digits",
            } 
        })}
          className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm"
          placeholder="John Doe"
        />
        {errors.mobile && (
          <p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-2 rounded-lg transition text-white font-semibold shadow-md ${
          isSubmitting
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isSubmitting ? "Logging in..." : "Log in"}
      </button>

      {/* Login Redirect */}
      <p className="text-center text-sm text-gray-600 mt-4">
        Don't have an account?{" "}
        <a href="/user/signup" className="text-blue-600 hover:underline">
          Signup here
        </a>
      </p>

    </form>
  </div>
);

};

export default Login;


