// import React, {useState} from 'react'
// import Navbar from '../../components/Navbar'
// import { userLinks } from '../../src/assets/constants'
// import Complaint from '../../components/Complaint'
// import ComplaintForm from '../../components/ComplaintForm'

// function ComplaintPage() {
//   const [refresh, setRefresh] = useState(false)
//   return (
//     <>
//     <Navbar links={userLinks}/>
//     <ComplaintForm onComplaintAdded={()=>setRefresh(!refresh)}/>
//     <Complaint refresh={refresh}/>
//     </> 
//   )
// }

// export default ComplaintPage

import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { userLinks } from "../../src/assets/constants";
import Complaint from "../../components/Complaint";
import ComplaintForm from "../../components/ComplaintForm";

function ComplaintPage() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar links={userLinks} />

      {/* Main Dashboard */}
      <main className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Complaint Form */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Submit a Complaint
              </h2>
              <ComplaintForm onComplaintAdded={() => setRefresh(!refresh)} />
            </div>
          </div>

          {/* Right: Complaints Table */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Complaints
              </h2>
              <Complaint refresh={refresh} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ComplaintPage;
