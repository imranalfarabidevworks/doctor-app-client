"use client";
import { useState, useEffect } from "react";
import DoctorsCard from "@/app/components/DoctorsCard";

export default function AllAppointments() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("default");

  useEffect(() => {
    fetch("https://doctor-app-server.vercel.app/doctors")
      .then((res) => res.json())
      .then((data) => {
        // ডাটা চেক করা হচ্ছে
        if (data && data.success) {
          setDoctors(data.data);
        }
      })
      .catch((err) => console.error("Error fetching doctors:", err));
  }, []);

  // ডাটা ফিল্টারিং এবং সর্টিং
  const filteredDoctors = [...doctors]
    .filter((doc) => 
      doc.name && doc.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      // রেটিং বের করার সময় ডাটা ফরম্যাট নিশ্চিত করা
      const ratingA = parseFloat(a.rating) || 0;
      const ratingB = parseFloat(b.rating) || 0;

      if (sortOrder === "low-high") return ratingA - ratingB;
      if (sortOrder === "high-low") return ratingB - ratingA;
      return 0;
    });

  return (
    <section className="min-h-screen bg-slate-950 text-white py-28 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">All Appointments</h1>
          <p className="text-slate-400 text-lg mb-8">Browse all doctors and book appointments easily.</p>
          
          <div className="flex flex-col md:flex-row gap-4">
            <input 
              type="text" 
              placeholder="Search by doctor name..." 
              className="flex-1 p-4 rounded-xl bg-slate-900 border border-slate-700 outline-none focus:border-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {/* <select 
              className="p-4 rounded-xl bg-slate-900 border border-slate-700 outline-none cursor-pointer"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="default">Default Order</option>
              <option value="high-low">Rating: High to Low</option>
              <option value="low-high">Rating: Low to High</option>
            </select> */}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <DoctorsCard key={doctor._id || doctor.id} doctor={doctor} />
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-slate-500 text-xl">No doctors found.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}