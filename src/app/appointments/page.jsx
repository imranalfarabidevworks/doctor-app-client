"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button, Spinner } from "@heroui/react";
import { getTopDoctors } from "@/app/data/DoctorData";
import { FiSearch, FiMapPin, FiClock, FiSliders, FiBriefcase } from "react-icons/fi";

export default function AllAppointments() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearch, setActiveSearch] = useState(""); 
  const [sortOrder, setSortOrder] = useState("default");
  
  const user = null; // Better Auth বা সেশন সেটআপের পর এটি ডাইনামিক হবে

  // 🩺 ডাটাবেস/সার্ভার থেকে এপিআই-এর মাধ্যমে ডক্টরদের ডাটা লোড করা
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await getTopDoctors();
        setDoctors(data);
      } catch (error) {
        console.error("Error loading doctors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  // ১. সার্চ বাটন ট্রিগার হ্যান্ডলার (রিকোয়ারমেন্ট অনুযায়ী সার্চ বাটনে ক্লিক করলেই সার্চ হবে)
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setActiveSearch(searchQuery);
  };

  // ২. ডক্টর নেম দিয়ে ফিল্টারিং লজিক (Challenge Requirement)
  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(activeSearch.toLowerCase())
  );

  // ৩. সর্টিং লজিক (Optional/Challenge Feature - ফি অনুযায়ী কম থেকে বেশি / বেশি থেকে কম)
  const sortedDoctors = [...filteredDoctors].sort((a, b) => {
    if (sortOrder === "low-to-high") return a.fee - b.fee;
    if (sortOrder === "high-to-low") return b.fee - a.fee;
    return 0;
  });

  return (
    <section className="bg-slate-950 min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* পেজ হেডার */}
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Available Appointments
          </h1>
          <p className="mt-2 text-slate-400 text-sm sm:text-base">
            Browse through our responsive list of certified medical specialists and book your slot.
          </p>
        </div>

        {/* সার্চ এবং সর্টিং কন্ট্রোল প্যানেল (Uniform Heading & Input Styles) */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-900/30 backdrop-blur-md p-4 rounded-2xl border border-slate-900 mb-10 w-full">
          
          {/* সার্চ ফর্ম */}
          <form onSubmit={handleSearchSubmit} className="flex gap-2 w-full md:max-w-md">
            <div className="relative flex-grow">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg" />
              <input
                type="text"
                placeholder="Search doctor by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 text-white pl-11 pr-4 py-2.5 rounded-xl border border-slate-800 focus:border-blue-500 focus:outline-none text-sm placeholder-slate-500 transition-all"
              />
            </div>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-sm px-5 h-10 transition-all">
              Search
            </Button>
          </form>

          {/* সর্টিং ড্রপডাউন */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <div className="flex items-center gap-2 text-slate-400 text-sm whitespace-nowrap">
              <FiSliders className="text-blue-500" />
              <span>Sort By Fee:</span>
            </div>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="bg-slate-950 text-white text-sm px-4 py-2.5 rounded-xl border border-slate-800 focus:border-blue-500 focus:outline-none cursor-pointer transition-all min-w-[160px]"
            >
              <option value="default">Default</option>
              <option value="low-to-high">Fee: Low to High</option>
              <option value="high-to-low">Fee: High to Low</option>
            </select>
          </div>

        </div>

        {/* লোডিং স্পিনার (Requirement: Show loading spinner while fetching data) */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Spinner size="lg" color="primary" />
            <p className="text-slate-500 text-sm font-medium animate-pulse">Loading available specialists...</p>
          </div>
        ) : sortedDoctors.length > 0 ? (
          /* রেসপন্সিভ গ্রিড লেআউট (Equal Height & Width Cards) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedDoctors.map((doctor) => (
              <div 
                key={doctor._id || doctor.id} 
                className="flex flex-col h-full bg-slate-900/20 backdrop-blur-sm border border-slate-900 rounded-3xl overflow-hidden hover:border-slate-800 transition-all duration-300 group"
              >
                {/* ইমেজ এরিয়া */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-950">
                  <img 
                    src={doctor.image} 
                    alt={doctor.name} 
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" 
                  />
                  <span className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md text-blue-400 text-xs font-medium px-3 py-1 rounded-xl border border-slate-800 flex items-center gap-1">
                    <FiBriefcase className="text-xs" /> {doctor.experience || "N/A"}
                  </span>
                </div>

                {/* কার্ড কন্টেন্ট */}
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-xs font-semibold text-blue-400 uppercase mb-1 tracking-wider">
                    {doctor.specialty}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-2 truncate">
                    {doctor.name}
                  </h3>
                  <p className="text-slate-400 text-sm mb-6 line-clamp-2 leading-relaxed">
                    {doctor.description}
                  </p>
                  
                  {/* হসপিটাল ও লোকেশন ইনফো */}
                  <div className="space-y-2 border-t border-slate-900 pt-4 mb-6 text-sm text-slate-400 mt-auto">
                    <div className="flex items-center gap-2.5">
                      <FiMapPin className="text-blue-500 shrink-0" />
                      <span className="truncate">{doctor.hospital} ({doctor.location || "BD"})</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <FiClock className="text-blue-500 shrink-0" />
                      <span className="truncate">{doctor.availability?.[0] || "Check Details"}</span>
                    </div>
                  </div>

                  {/* ফি এবং অ্যাকশন বাটন (Home Page-এর মতো সেম বাটন স্টাইল ও লিংক) */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-medium">Consultation Fee</p>
                      <p className="text-lg font-bold text-emerald-400">৳ {doctor.fee}</p>
                    </div>
                    
                    {/* রিকোয়ারমেন্ট নিয়ম: লগইন করা থাকলে ডিটেইলস পেজে যাবে, নয়তো লগইন পেজে */}
                    <Link href={user ? `/appointments/${doctor._id || doctor.id}` : "/login"}>
                      <Button className="text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 px-5 h-10 rounded-xl transition-all">
                        View Details
                      </Button>
                    </Link>
                  </div>

                </div>
              </div>
            ))}
          </div>
        ) : (
          /* সার্চ রেজাল্ট না থাকলে নো ডাটা ফাউন্ড অ্যালার্ট */
          <div className="text-center py-20 bg-slate-900/10 rounded-3xl border border-dashed border-slate-900">
            <p className="text-slate-500 text-lg font-medium">
              No specialists found matching "{activeSearch}"
            </p>
          </div>
        )}

      </div>
    </section>
  );
}