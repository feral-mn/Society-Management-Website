// src/components/Stats.jsx
import React from "react";

export default function Stats() {
  const stats = [
    { label: "Total Flats", value: "120+" },
    { label: "Members", value: "350+" },
    { label: "Amenities", value: "10+" },
    { label: "Established", value: "2015" },
  ];

  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((stat, i) => (
          <div key={i} className="p-4 bg-white rounded-xl shadow">
            <p className="text-2xl font-bold text-blue-600">{stat.value}</p>
            <p className="text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
