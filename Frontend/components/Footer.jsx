// src/components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-10">
      <div className="max-w-5xl mx-auto text-center">
        <p className="mb-2">&copy; {new Date().getFullYear()} ABC Residency</p>
        <p className="text-sm">123 Green Street, New Delhi, India</p>
      </div>
    </footer>
  );
}
