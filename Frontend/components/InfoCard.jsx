import React from "react";
import { useAuth } from "../Context/AuthContext"; 

function InfoCard() {
  const { user } = useAuth(); 
  console.log(user)
  if (!user) {
    return (
      <div className="bg-white shadow-lg rounded-xl p-6 col-span-1">
        <h2 className="text-lg font-semibold mb-4">Your Info</h2>
        <p className="text-gray-500">No user info available. Please log in.</p>
      </div>
    );
  }
  
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 col-span-1">
      <h2 className="text-lg font-semibold mb-4">Your Info</h2>
      <p><span className="font-medium">Name:</span> {user.fullname}</p>
      <p><span className="font-medium">Flat:</span> {user.flatNumber}</p>
      <p><span className="font-medium">Block:</span> {user.block}</p>
      <p><span className="font-medium">Mobile:</span> {user.mobile}</p>
      <p><span className="font-medium">Email:</span> {user.email}</p>
      <p><span className="font-medium">Username:</span> {user.username}</p>
      <p><span className="font-medium">Role:</span> {user.role}</p>
      <p><span className="font-medium">Ownership:</span> {user.ownershipType}</p>
      <p><span className="font-medium">isLiving:</span> {user.isLiving === true ? "true" : "false"}</p>

    </div>
  );
}

export default InfoCard;
