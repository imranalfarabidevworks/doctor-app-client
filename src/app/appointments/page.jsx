"use client";
import { useState, useEffect } from "react";
import DoctorsCard from "@/app/components/DoctorsCard";

export default function AllAppointments() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctors`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.success) {
          setDoctors(data.data);
        }
      })
      .catch((err) => console.error("Error fetching doctors:", err))
      .finally(() => setLoading(false));
  }, []);

  const filteredDoctors = [...doctors]
    .filter((doc) =>
      doc.name && doc.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const ratingA = parseFloat(a.rating) || 0;
      const ratingB = parseFloat(b.rating) || 0;
      if (sortOrder === "low-high") return ratingA - ratingB;
      if (sortOrder === "high-low") return ratingB - ratingA;
      return 0;
    });

  return (
    <section className="min-h-screen bg-slate-950 text-white py-28 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">All Appointments</h1>
          <p className="text-slate-400 text-lg mb-8">Browse all doctors and book appointments easily.</p>

          {/* Search & Sort */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search by doctor name..."
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-900 border border-slate-700 outline-none focus:border-blue-500 transition-colors text-white placeholder-slate-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select
              className="px-5 py-4 rounded-xl bg-slate-900 border border-slate-700 outline-none cursor-pointer text-slate-300 focus:border-blue-500 transition-colors"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="default">Default Order</option>
              <option value="high-low">⭐ Rating: High to Low</option>
              <option value="low-high">⭐ Rating: Low to High</option>
            </select>
          </div>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-6">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 rounded-full border-4 border-slate-700" />
              <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
              <div className="absolute inset-3 rounded-full border-4 border-indigo-500 border-b-transparent animate-spin animate-reverse" style={{ animationDirection: "reverse", animationDuration: "0.8s" }} />
            </div>
            <div className="text-center">
              <p className="text-slate-300 font-semibold text-lg">Loading Doctors</p>
              <p className="text-slate-500 text-sm mt-1">Please wait a moment...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Result count */}
            {search && (
              <p className="text-slate-400 text-sm mb-6">
                {filteredDoctors.length} result{filteredDoctors.length !== 1 ? "s" : ""} found for{" "}
                <span className="text-blue-400 font-medium">"{search}"</span>
              </p>
            )}

            {/* Doctors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor) => (
                  <DoctorsCard key={doctor._id || doctor.id} doctor={doctor} />
                ))
              ) : (
                <div className="col-span-full text-center py-20">
                  <div className="text-6xl mb-4">🔍</div>
                  <p className="text-slate-400 text-xl font-semibold">No doctors found.</p>
                  <p className="text-slate-600 text-sm mt-2">Try a different search term.</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}