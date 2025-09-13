import React, {useState} from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useAuth } from "../Context/AuthContext"; 

function Announcment() {
const [announcment, setAnnouncment] = useState([])
    const { token } = useAuth(); 

    useEffect(()=>{
        const fecthAnnouncment = async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/announcment/get`,{
                headers: {Authorization: `Bearer ${token}`}
            })
            setAnnouncment(res.data.announcment)
        }
        fecthAnnouncment()
    },[token])
  return (
    <section className="py-12 px-6">
      <h2 className="text-3xl font-bold text-center mb-6">Latest Announcments</h2>
      <div className="max-w-4xl mx-auto grid gap-4">
        {announcment.map((announcment, i) => (
          <div
            key={i}
            className="p-4 border rounded-lg shadow hover:shadow-lg transition"
          >
            <p className="text-lg font-semibold">{announcment.title}</p>
            <p className="text-gray-500 text-sm">{announcment.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Announcment
