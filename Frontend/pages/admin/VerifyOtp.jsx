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
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/verify`,
        { otp: data.otp }
      );
      alert("Login Successful!");
      // localStorage.setItem("token", response.data.token);
      login(response.data.token, "admin", response.data.user)
      navigate("/admin/home");
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
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Verify OTP</h2>
        <p className="mb-4 text-gray-700 text-sm">
          OTP has been sent to your registered mobile number ending with{" "}
          <span className="font-semibold">{mobile.slice(-4)}</span>.
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block mb-1">Enter OTP</label>
            <input
              type="text"
              {...register("otp", {
                required: "OTP is required",
                pattern: { value: /^[0-9]{6}$/, message: "OTP must be 6 digits" },
              })}
              className="w-full border px-3 py-2 rounded-md"
            />
            {errors.otp && (
              <p className="text-red-500 text-sm">{errors.otp.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-600 text-white w-full py-2 rounded-md hover:bg-green-700 transition"
          >
            {isSubmitting ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
