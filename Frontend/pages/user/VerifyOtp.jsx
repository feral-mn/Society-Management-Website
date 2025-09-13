import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext"; // <-- import context


const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { username, mobile } = location.state || {};
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const {login} = useAuth()

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/verify`,
        { otp: data.otp }
      );
      alert("Login Successful!");
      // localStorage.setItem("token", response.data.token);
      login(response.data.token, "user", response.data.user)
      navigate("/user/home");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "OTP verification failed");
    }
  };

  if (!username || !mobile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600">Invalid session. Go back and login again.</p>
      </div>
    );
  }

  return (
  <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-gray-100">
    <div className="bg-white shadow-xl rounded-2xl p-8 w-96 border border-gray-200">
      {/* Title */}
      <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
        Verify OTP
      </h2>

      {/* Info text */}
      <p className="text-center text-gray-600 mb-6">
        OTP has been sent to your registered mobile number ending with{" "}
        <span className="font-semibold">{mobile.slice(-4)}</span>.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* OTP Input */}
        <div className="mb-5">
          <label className="block mb-2 font-medium text-gray-700">
            Enter OTP
          </label>
          <input
            type="text"
            {...register("otp", {
              required: "OTP is required",
              pattern: {
                value: /^[0-9]{6}$/,
                message: "OTP must be 6 digits",
              },
            })}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition shadow-sm"
            placeholder="Enter your 6-digit OTP"
          />
          {errors.otp && (
            <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 rounded-lg transition text-white font-semibold shadow-md ${
            isSubmitting
              ? "bg-green-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {isSubmitting ? "Verifying..." : "Verify OTP"}
        </button>

        {/* Resend Link */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Didn't receive the code?{" "}
          <a
            href="#"
            // onClick={handleResendOtp}
            className="text-green-600 hover:underline"
          >
            Resend OTP
          </a>
        </p>
      </form>
    </div>
  </div>
);

};

export default VerifyOtp;
