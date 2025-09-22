// import React from 'react'
// import { useForm } from 'react-hook-form'
// import axios from 'axios'
// import {useAuth} from '../Context/AuthContext'

// function ComplaintForm({onComplaintAdded}) {
//     const {token} = useAuth();

//     const{
//         register, 
//         handleSubmit,
//         formState : {errors, isSubmitting},
//         reset,
//     } = useForm();

//     const onSubmit = async (data) => {
//         try{
//             console.log("Form Data", data)
//             await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/complaint/register`, data,{ 
//                 headers: { Authorization: `Bearer ${token}` } 
//             });
//             //alert("Form Submitted Succesfully");
//             reset();
//             onComplaintAdded();
//         }catch(err){
//             console.error(err);
//             alert("Error Submiting Complaint")
//         }
//     }

//   return (
//     <form 
//         onSubmit={handleSubmit(onSubmit)}
//         className='max-w-md mx-auto p-6 border rounded-lg shadow'
//     >
//         <h2 className="text-2xl font-bold mb-4">Submit a Complaint</h2>

//         {/* Title field */}
//         <label className="block mb-2 font-semibold">Title</label>
//         <input
//             type="text"
//             {...register("title", { required: "Title is required" })}
//             className="w-full p-2 border rounded mb-2"
//         />
//         {errors.title && (
//             <p className="text-red-500 text-sm">{errors.title.message}</p>
//         )}

//         {/* Description field */}
//         <label className="block mb-2 font-semibold">Description</label>
//         <textarea
//             {...register("description", {required: "Description is required"})}
//             className="w-full p-2 border rounded mb-2"
//         ></textarea>
//         {errors.description && (
//             <p className="text-red-500 text-sm">{errors.description.message}</p>
//         )}
        
//         {/* Submit button */}
//         <button
//             type="submit"
//             disabled={isSubmitting}
//             className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//         >
//             {isSubmitting ? "Submitting..." : "Submit Complaint"}
//         </button>
//     </form>
//   )
// }

// export default ComplaintForm

import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";

const categories = [
  "Plumber",
  "Electricity",
  "Sweeping",
  "Gardening",
  "Security",
  "Office",
];

const subCategories = {
  Plumber: [
    { label: "Water supply not in entire flat" },
    { label: "Water continuous drain out" },
    { label: "Water not flow/flow slow in tap" },
    { label: "Flash not working" },
  ],
  Electricity: [
    { label: "Electricity supply not come in entire flat/block" },
    { label: "Fan not working / change of condenser" },
    { label: "AC Line Not Working" },
    { label: "Change of fused bulb/tube light" },
    { label: "Repairing of burned wiring" },
  ],
  Sweeping: [
    { label: "Sweeping of staircase not done" },
    { label: "Street road not sweeped/cleaned" },
    { label: "Parking Area not cleaned properly" },
    { label: "Main gate area/ main road not cleaned properly" },
  ],
  Gardening: [
    { label: "Central park Grass cutting not done" },
    { label: "Atal park Grass cutting not done" },
    { label: "D block park Grass cutting not done" },
    { label: "C block park Grass cutting not done" },
    { label: "Cleaning of parks not done properly" },
  ],
  Security: [{ label: "Security problems" }],
  Office: [{ label: "Office related problems" }],
};

function ComplaintForm({ onComplaintAdded }) {
  const { token } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm();

  const selectedCategory = watch("category");

  const onSubmit = async (data) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/complaint/register`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      reset();
      onComplaintAdded();
    } catch (err) {
      console.error(err);
      alert("Error submitting complaint");
    }
  };

  return (
    <form
  onSubmit={handleSubmit(onSubmit)}
  className="bg-white max-w-md mx-auto mt-10 p-8 rounded-xl shadow-lg"
>
  <h2 className="text-2xl font-bold mb-6 text-center">Submit a Complaint</h2>

  {/* Category Dropdown */}
  <label className="block mb-2 text-gray-700 font-medium">Category</label>
  <select
    {...register("category", { required: "Category is required" })}
    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
  >
    <option value="">-- Select Category --</option>
    {categories.map((cat) => (
      <option key={cat} value={cat}>
        {cat}
      </option>
    ))}
  </select>
  {errors.category && (
    <p className="text-red-500 text-sm mb-2">{errors.category.message}</p>
  )}

  {/* Sub-Category Dropdown */}
  <label className="block mb-2 text-gray-700 font-medium">Sub-Category</label>
  <select
    {...register("subCategory", { required: "Sub-category is required" })}
    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
    disabled={!selectedCategory}
  >
    <option value="">-- Select Sub-Category --</option>
    {selectedCategory &&
      subCategories[selectedCategory]?.map((sub, idx) => (
        <option key={idx} value={sub.label}>
          {sub.label}
        </option>
      ))}
  </select>
  {errors.subCategory && (
    <p className="text-red-500 text-sm mb-2">{errors.subCategory.message}</p>
  )}

  {/* Emergency field */}
  <label className="block mb-2 text-gray-700 font-medium">Emergency</label>
  <select
    {...register("emergency", { required: "Emergency level is required" })}
    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
  >
    <option value="">-- Select Emergency --</option>
    <option value="urgent">Urgent</option>
    <option value="normal">Normal</option>
  </select>
  {errors.emergency && (
    <p className="text-red-500 text-sm mb-2">{errors.emergency.message}</p>
  )}

  {/* Description field */}
  <label className="block mb-2 text-gray-700 font-medium">Description</label>
  <textarea
    {...register("description", { required: "Description is required" })}
    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
  ></textarea>
  {errors.description && (
    <p className="text-red-500 text-sm mb-2">{errors.description.message}</p>
  )}

  {/* Submit button */}
  <button
    type="submit"
    disabled={isSubmitting}
    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
  >
    {isSubmitting ? "Submitting..." : "Submit Complaint"}
  </button>
</form>

  );
}

export default ComplaintForm;


