// src/components/Hero.jsx
import React from "react";
import { Link } from "react-router-dom";
import societyImage from "../src/assets/parsvnath.jpg"; 
export default function Hero() {
  return (
    <section className="relative h-[80vh] bg-gray-800 text-white flex items-center justify-center">
      <img
        src={societyImage}
        alt="Society"
        className="absolute inset-0 w-full h-full object-cover"
      />
        <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold">Parsvnath City</h1>
        <p className="mt-4 text-lg md:text-xl">Lucknow</p>
      <div className="mt-6 flex gap-4 justify-center">
  <Link to="/user/signup">
    <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition">
      User Login
    </button>
  </Link>

  <Link to="/admin/signup">
    <button className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg transition">
      Admin Login
    </button>
  </Link>
</div>
</div>
    </section>
  );
}