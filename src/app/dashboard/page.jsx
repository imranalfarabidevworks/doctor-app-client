"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { FiEdit2, FiTrash2, FiCalendar, FiClock } from "react-icons/fi";
import { toast } from "react-hot-toast";

export default function Dashboard() {
  // ডামি বুকিং ডাটা (এখানে পরে মঙ্গোডিবি থেকে ডেটা আসবে)
  const [bookings, setBookings] = useState([
    { id: 1, doctorName: "Dr. Ayesha Rahman", date: "2026-05-25", time: "10:30 AM", status: "Pending" }
  ]);

  const handleDelete = (id) => {
    // রিকোয়ারমেন্ট: delete item from UI instantly
    setBookings(bookings.filter(b => b.id !== id));
    toast.success("Appointment deleted successfully!");
  };

  return (
    <section className="min-h-screen bg-slate-950 pt-28 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">My Bookings</h1>

        {bookings.length > 0 ? (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-slate-900/40 border border-slate-900 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-white">{booking.doctorName}</h3>
                  <div className="flex gap-4 text-sm text-slate-400 mt-2">
                    <span className="flex items-center gap-1"><FiCalendar /> {booking.date}</span>
                    <span className="flex items-center gap-1"><FiClock /> {booking.time}</span>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button className="bg-blue-600 text-white font-semibold rounded-xl">Update</Button>
                  <Button onClick={() => handleDelete(booking.id)} className="bg-red-600 text-white font-semibold rounded-xl">
                    <FiTrash2 />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-500 text-center">No appointments booked yet.</p>
        )}
      </div>
    </section>
  );
}