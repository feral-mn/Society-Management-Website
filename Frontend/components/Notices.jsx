// src/components/Notices.jsx
import React from "react";

export default function Notices() {
  const notices = [
    { title: "Water Supply Maintenance", date: "28 Aug 2025" },
    { title: "Independence Day Celebration", date: "15 Aug 2025" },
    { title: "Monthly Meeting", date: "05 Sep 2025" },
  ];

  return (
    <section className="py-12 px-6">
      <h2 className="text-3xl font-bold text-center mb-6">Latest Notices</h2>
      <div className="max-w-4xl mx-auto grid gap-4">
        {notices.map((notice, i) => (
          <div
            key={i}
            className="p-4 border rounded-lg shadow hover:shadow-lg transition"
          >
            <p className="text-lg font-semibold">{notice.title}</p>
            <p className="text-gray-500 text-sm">{notice.date}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
