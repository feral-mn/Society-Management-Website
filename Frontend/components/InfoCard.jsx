import React from "react";
import { useAuth } from "../Context/AuthContext";
import { Camera, Lock } from "lucide-react"; // icons

function InfoCard() {
  const { user a} = useAuth();

  if (!user) {
    return (
      <div className="bg-white shadow-lg rounded-xl p-6 text-center">
        <h2 className="text-lg font-semibold mb-4">Your Info</h2>
        <p className="text-gray-500">No user info available. Please log in.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-xl p-8 max-w-xl mx-auto">
      {/* Profile Section */}
      <div className="flex flex-col items-center">
        <div className="relative w-28 h-28">
          <img
            src={user.profilePhoto || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-blue-500"
          />
          <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow hover:bg-blue-700 transition">
            <Camera size={16} />
          </button>
        </div>
        <h2 className="text-2xl font-bold mt-4">{user.fullname}</h2>
        <p className="text-gray-500">@{user.username}</p>
      </div>

      {/* Info Section */}
      <div className="mt-6 grid grid-cols-2 gap-4 text-gray-700">
        <p><span className="font-medium">Flat:</span> {user.flatNumber}</p>
        <p><span className="font-medium">Block:</span> {user.block}</p>
        <p><span className="font-medium">Mobile:</span> {user.mobile}</p>
        <p><span className="font-medium">Email:</span> {user.email}</p>
        <p><span className="font-medium">Role:</span> {user.role}</p>
        <p><span className="font-medium">Ownership:</span> {user.ownershipType}</p>
        <p className="col-span-2">
          <span className="font-medium">Living Status:</span>{" "}
          {user.isLiving ? (
            <span className="text-green-600 font-semibold">Yes</span>
          ) : (
            <span className="text-red-500 font-semibold">No</span>
          )}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-center gap-4">
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">
          <Camera size={16} /> Edit Photo
        </button>
        <button className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-700 transition">
          <Lock size={16} /> Change Password
        </button>
      </div>
    </div>
  );
}

export default InfoCard;
