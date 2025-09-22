// import React, {useState} from 'react'
// import { useEffect } from 'react'
// import axios from 'axios'
// import { useAuth } from "../Context/AuthContext"; 

// function Complaint({refresh}) {
//     const [complaint, setComplaint] = useState([])
//     const { token, role } = useAuth(); 

//     useEffect(()=>{
//         const fecthComplaint = async () => {
//             const endpoint = role === "admin" ? "/api/v1/complaint/getAll" : "/api/v1/complaint/get"
//             const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}${endpoint}`,{
//                 headers: {Authorization: `Bearer ${token}`}
//             })
//             role === "admin" ? setComplaint(res.data.complaints) : setComplaint(res.data.data)
//         }
//         fecthComplaint()
//     },[token, token, refresh])

//   return (
//     <section className="py-12 px-6">
//       <h2 className="text-3xl font-bold text-center mb-6">Latest Notices</h2>
//       <div className="max-w-4xl mx-auto grid gap-4">
//         {complaint.length > 0 ? (
//           complaint.map((complaint, i) => (
//           <div
//             key={i}
//             className="p-4 border rounded-lg shadow hover:shadow-lg transition"
//           >
//             <p className="text-lg font-semibold">{complaint.title}</p>
//             <p className="text-gray-500 text-sm">{complaint.description}</p>
//           </div>
//         ))
//         ) : (<p className="text-center text-gray-500">No complaints found.</p>)
//         }
//       </div>
//     </section>
//   )
// }

// export default Complaint

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../Context/AuthContext";

function Complaint({ refresh }) {
  const [complaints, setComplaints] = useState([]);
  const { token, role } = useAuth();

  useEffect(() => {
    const fetchComplaint = async () => {
      const endpoint =
        role === "admin"
          ? "/api/v1/complaint/getAll"
          : "/api/v1/complaint/get";

      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}${endpoint}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      role === "admin"
        ? setComplaints(res.data.complaints)
        : setComplaints(res.data.data);
    };
    fetchComplaint();
  }, [token, role, refresh]);

    const handleStatus = async (id) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/complaint/update/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setAnnouncment((prev) => prev.filter((a) => a._id !== id));
      alert("Announcment deleted!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete announcment");
    }
  };

  return (
    <section className="py-12 px-6">
      <h2 className="text-3xl font-bold text-center mb-6">Complaints</h2>
      <div className="max-w-6xl mx-auto overflow-x-auto">
        {complaints.length > 0 ? (
          <table className="w-full text-sm text-left border border-gray-200 shadow-sm rounded-lg overflow-hidden">
  <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm uppercase">
    <tr>
      <th className="px-4 py-3">Complaint No</th>
      <th className="px-4 py-3">Date</th>
      <th className="px-4 py-3">Category</th>
      <th className="px-4 py-3">Sub Category</th>
      <th className="px-4 py-3">Details</th>
      <th className="px-4 py-3 text-center">Status</th>
      <th className="px-4 py-3">Name</th>
      <th className="px-4 py-3">Block</th>
      <th className="px-4 py-3">Flat No</th>
      <th className="px-4 py-3">Phone Number</th>
    </tr>
  </thead>
  <tbody className="divide-y divide-gray-200 bg-white">
    {complaints.map((c, i) => (
      <tr
        key={c._id || i}
        className="hover:bg-gray-50 transition"
      >
        <td className="px-4 py-3 font-mono text-blue-600">
          {c._id?.slice(-6).toUpperCase() || i + 1}
        </td>
        <td className="px-4 py-3">{new Date(c.createdAt).toLocaleDateString()}</td>
        <td className="px-4 py-3">{c.category}</td>
        <td className="px-4 py-3">{c.subCategory}</td>
        <td className="px-4 py-3 text-gray-700">{c.description}</td>
        <td className="px-4 py-3 text-center font-semibold">
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              c.status === "pending"
                ? "bg-red-100 text-red-600"
                : c.status === "in-progress"
                ? "bg-yellow-100 text-yellow-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {c.status}
          </span>
        </td>
        <td className="px-4 py-3">{c.userId.fullname}</td>
        <td className="px-4 py-3">{c.userId.block}</td>
        <td className="px-4 py-3">{c.userId.flatNumber}</td>
        <td className="px-4 py-3">{c.userId.mobile}</td>
      </tr>
    ))}
  </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500">No complaints found.</p>
        )}
      </div>
    </section>
  );
}

export default Complaint;
