// যদি auth.js ফাইলটি src ফোল্ডারে থাকে
import { auth } from "@/lib/auth";
import { Button } from "@heroui/react";
import { headers } from "next/headers";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
export default async function MyBookings() {
const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
    
});
const user= session?.user;
 //console.log("User Data:", user); // Check the session data in the console

  const res= await fetch(`http://localhost:5000/appointments/user@gmail.com/${user?.email}`);
console.log("Fetch Response:", res); // Check the fetch response in the console
  const data= await res.json();
  console.log("Bookings Data:", data); // Check the bookings data in the console
 
  return (
  
<div>
  <h1 className="text-3xl font-bold mb-8 mt-20 text-center">
    My Bookings
  </h1>

  {data?.data?.length > 0 ? (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {data.data.map((booking) => (
        <div
          key={booking._id}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-md hover:shadow-xl transition-all p-5"
        >
          {/* Header */}
          <div className="mb-4">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">
              Dr. {booking.doctorName}
            </h2>
            <p className="text-sm text-slate-500">
              Appointment Booking
            </p>
          </div>

          {/* Info */}
          <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <p>
              <span className="font-semibold">Patient:</span>{" "}
              {booking.patientName}
            </p>
            <p>
              <span className="font-semibold">Date:</span>{" "}
              {booking.appointmentDate}
            </p>
            <p>
              <span className="font-semibold">Time:</span>{" "}
              {booking.appointmentTime}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-5">
            <Button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-xl transition">
              <FaEdit />
              Edit
            </Button>

            <Button className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 rounded-xl transition">
              <MdDelete />
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="text-center py-10">
      <p className="text-slate-400 text-lg">You have no bookings yet.</p>
    </div>
  )}
</div>

  )
}
