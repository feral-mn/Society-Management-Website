import React, {useState} from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useAuth } from "../Context/AuthContext"; 
import {Trash} from 'lucide-react'

function Announcment({refresh}) {
  const [announcment, setAnnouncment] = useState([])
  const { token, role } = useAuth(); 

  useEffect(()=>{
    const fecthAnnouncment = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/announcment/get`,{
        headers: {Authorization: `Bearer ${token}`}
      })
      setAnnouncment(res.data.announcment)
    }
    fecthAnnouncment()
  },[token, refresh])

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/announcment/delete/${id}`,
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
      <h2 className="text-3xl font-bold text-center mb-6">Latest Announcments</h2>
      <div className="max-w-4xl mx-auto grid gap-4">
        {announcment.length > 0 ? (
          announcment.map((announcment, i) => (
          <div
            key={i}
            className="p-4 border rounded-lg shadow hover:shadow-lg transition flex justify-between"
          >
            <div>
              <p className="text-lg font-semibold">{announcment.title}</p>
              <p className="text-gray-500 text-sm">{announcment.description}</p>
            </div>
            {role === "admin" && (
              <button 
                onClick={() => handleDelete(announcment._id)}
                className="text-red-500 hover:text-red-700"
              > <Trash /> </button>
            )}
            
          </div>
        ))
        ) : (  <p className="text-center text-gray-500">No announcment found.</p> )
        }
      </div>
    </section>
  )
}

export default Announcment

















// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useAuth } from "../Context/AuthContext";
// import { Trash, Loader2 } from "lucide-react"; // 👈 Loader icon

// function Announcment({ refresh }) {
//   const [announcment, setAnnouncment] = useState([]);
//   const [deletingId, setDeletingId] = useState(null); // 👈 track which one is deleting
//   const { token, role } = useAuth();

//   useEffect(() => {
//     const fecthAnnouncment = async () => {
//       const res = await axios.get(
//         `${import.meta.env.VITE_API_BASE_URL}/api/v1/announcment/get`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setAnnouncment(res.data.announcment);
//     };
//     fecthAnnouncment();
//   }, [token, refresh]);

//   const handleDelete = async (id) => {
//     try {
//       setDeletingId(id); // 👈 set loading state
//       await axios.delete(
//         `${import.meta.env.VITE_API_BASE_URL}/api/v1/announcment/delete/${id}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setAnnouncment((prev) => prev.filter((a) => a._id !== id));
//       alert("Announcement deleted!");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete announcement");
//     } finally {
//       setDeletingId(null); // 👈 reset
//     }
//   };

//   return (
//     <section className="py-12 px-6">
//       <h2 className="text-3xl font-bold text-center mb-6">Latest Announcements</h2>
//       <div className="max-w-4xl mx-auto grid gap-4">
//         {announcment.length > 0 ? (
//           announcment.map((announcment, i) => (
//             <div
//               key={i}
//               className="p-4 border rounded-lg shadow hover:shadow-lg transition flex justify-between"
//             >
//               <div>
//                 <p className="text-lg font-semibold">{announcment.title}</p>
//                 <p className="text-gray-500 text-sm">{announcment.description}</p>
//               </div>

//               {role === "admin" && (
//                 <button
//                   onClick={() => handleDelete(announcment._id)}
//                   disabled={deletingId === announcment._id} // 👈 disable while deleting
//                   className="text-red-500 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {deletingId === announcment._id ? (
//                     <Loader2 className="animate-spin" /> // 👈 spinner while deleting
//                   ) : (
//                     <Trash />
//                   )}
//                 </button>
//               )}
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-gray-500">No announcement found.</p>
//         )}
//       </div>
//     </section>
//   );
// }

// export default Announcment;
