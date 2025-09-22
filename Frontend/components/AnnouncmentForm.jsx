import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import {useAuth} from '../Context/AuthContext'

function AnnouncmentForm({onAnnouncmentAdded}) {
    const {token} = useAuth();

    const{
        register, 
        handleSubmit,
        formState : {errors, isSubmitting},
        reset,
    } = useForm();

    const onSubmit = async (data) => {
        try{
            console.log("Form Data", data)
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/announcment/register`, data,{ 
                headers: { Authorization: `Bearer ${token}` } 
            });
            //alert("Form Submitted Succesfully");
            reset();
            onAnnouncmentAdded();
        }catch(err){
            console.error(err);
            alert("Error Submiting Announcment")
        }
    }

  return (
    <form 
        onSubmit={handleSubmit(onSubmit)}
        className='max-w-md mx-auto p-6 border rounded-lg shadow'
    >
        <h2 className="text-2xl font-bold mb-4">Submit an Announcment</h2>

        {/* Title field */}
        <label className="block mb-2 font-semibold">Title</label>
        <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="w-full p-2 border rounded mb-2"
        />
        {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}

        {/* Description field */}
        <label className="block mb-2 font-semibold">Description</label>
        <textarea
            {...register("description", {required: "Description is required"})}
            className="w-full p-2 border rounded mb-2"
        ></textarea>
        {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
        
        {/* Submit button */}
        <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
            {isSubmitting ? "Submitting..." : "Submit Complaint"}
        </button>
    </form>
  )
}

export default AnnouncmentForm
