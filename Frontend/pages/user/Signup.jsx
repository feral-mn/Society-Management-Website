import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

const Signup = () => {
  const navigate = useNavigate();
  const {login} = useAuth()

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({defaultValues:{role: "user"}});

  // Submit handler
  const onSubmit = async (data) => {
    try {
        const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/register`,
        data
      );
      login(response.data.token, "user", response.data.user)
      alert("Signup Successful!");
      navigate("/user/home");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Signup failed. Try again.");
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
        Owner Registration
      </h2>
      <input type="hidden" {...register("role")} />

      {/* Full Name */}
      <div className="mb-5">
        <label className="block mb-2 font-medium text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          {...register("fullname", { 
            required: "Full name is required",
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
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.fullname.message}</p>
        )}
      </div>

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
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="mb-5">
        <label className="block mb-2 font-medium text-gray-700">Email</label>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email",
            },
          })}
          className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm"
          placeholder="example@email.com"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
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
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>
        )}
      </div>

        {/* Block */}
      <div className="mb-5">
        <label className="block mb-2 font-medium text-gray-700">
        Select Block
        </label>
        <div className="flex gap-3">
          {["A", "B", "C", "D"].map((val) => (
          <label key={val} className="flex items-center gap-2">
            <input
              type="radio"
              value={val}
              {...register("block", {
              required: "Please select a block",
              })}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="text-gray-700">{val}</span>
          </label>
          ))}
        </div>
        {errors.block && (
        <p className="text-red-500 text-sm mt-1">{errors.block.message}</p>
        )}
      </div>

      {/* Flat Number */}
      <div className="mb-5">
        <label className="block mb-2 font-medium text-gray-700">
          Flat Number
        </label>
        <input
          type="text"
          {...register("flatNumber", { 
            required: "Flat Number is required",
        })}
          className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm"
          placeholder="John Doe"
        />
        {errors.flatNumber && (
          <p className="text-red-500 text-sm mt-1">{errors.flatNumber.message}</p>
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
        {isSubmitting ? "Signing up..." : "Sign Up"}
      </button>

      {/* Login Redirect */}
      <p className="text-center text-sm text-gray-600 mt-4">
        Already have an account?{" "}
        <a href="/user/login" className="text-blue-600 hover:underline">
          Login here
        </a>
      </p>
    </form>
  </div>
);

};

export default Signup;

