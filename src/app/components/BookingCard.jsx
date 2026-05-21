"use client";

import { Button } from "@heroui/react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";

export default function BookingCard({ booking }) {
  const router = useRouter();

  const handleDelete = async (id) => {
    if (!confirm("আপনি কি নিশ্চিত যে এই অ্যাপয়েন্টমেন্টটি ডিলিট করতে চান?")) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      
      if (data.success) {
        alert("ডিলিট সফল হয়েছে!");
        router.refresh(); // পেজটি রিফ্রেশ করে নতুন ডাটা দেখাবে
      }
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-md hover:shadow-xl transition-all p-5">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">Dr. {booking.doctorName}</h2>
        <p className="text-sm text-slate-500">Appointment Booking</p>
      </div>

      <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
        <p><span className="font-semibold">Patient:</span> {booking.patientName}</p>
        <p><span className="font-semibold">Date:</span> {booking.appointmentDate}</p>
        <p><span className="font-semibold">Time:</span> {booking.appointmentTime}</p>
      </div>

      <div className="flex gap-3 mt-5">
        <Button 
            onClick={() => router.push(`/edit-booking/${booking._id}`)} 
            className="flex-1 bg-blue-600 text-white rounded-xl"
        >
          <FaEdit /> Edit
        </Button>

        <Button 
            onClick={() => handleDelete(booking._id)} 
            className="flex-1 bg-red-500 text-white rounded-xl"
        >
          <MdDelete /> Delete
        </Button>
      </div>
    </div>
  );
}