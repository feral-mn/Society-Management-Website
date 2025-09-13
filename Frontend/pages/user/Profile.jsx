import React from 'react'

function Profile() {
const user = {
    name: "Priyanshu Mall",
    flat: "A-302",
    block: "Block B",
    mobile: "9876543210",
    maintenanceDue: "₹2500",
  };

  const notices = [
    { id: 1, title: "Water supply maintenance", date: "2025-09-01" },
    { id: 2, title: "Ganesh Chaturthi Celebration", date: "2025-09-10" },
    { id: 3, title: "Monthly Society Meeting", date: "2025-09-15" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Welcome back, {user.name} 👋</h1>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Info Card */}
        


        {/* Notices Card */}
        <div className="bg-white shadow-lg rounded-xl p-6 col-span-1 md:col-span-1">
          <h2 className="text-lg font-semibold mb-4">Notices & Announcements</h2>
          <ul className="space-y-2">
            {notices.map((notice) => (
              <li key={notice.id} className="border-b pb-2">
                <p className="font-medium">{notice.title}</p>
                <p className="text-sm text-gray-500">{notice.date}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  );
}

export default Profile

