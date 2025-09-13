import React, {useState} from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useAuth } from "../Context/AuthContext"; 
function Complaint() {
    const [complaint, setComplaint] = useState([])
    const { token, role } = useAuth(); 

    useEffect(()=>{
        const fecthComplaint = async () => {
            const endpoint = role === "admin" ? "/api/v1/complaint/getAll" : "/api/v1/complaint/get"
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}${endpoint}`,{
                headers: {Authorization: `Bearer ${token}`}
            })
            setComplaint(res.data.complaints)
        }
        fecthComplaint()
    },[token])
  return (
    <section className="py-12 px-6">
      <h2 className="text-3xl font-bold text-center mb-6">Latest Notices</h2>
      <div className="max-w-4xl mx-auto grid gap-4">
        {complaint.map((complaint, i) => (
          <div
            key={i}
            className="p-4 border rounded-lg shadow hover:shadow-lg transition"
          >
            <p className="text-lg font-semibold">{complaint.title}</p>
            <p className="text-gray-500 text-sm">{complaint.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Complaint
