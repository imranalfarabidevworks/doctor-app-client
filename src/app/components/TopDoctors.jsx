import Link from "next/link";
import { Button } from "@heroui/react";
import { getTopDoctors } from "@/app/data/DoctorData";
import { FiMapPin, FiClock, FiBriefcase } from "react-icons/fi";

export default async function TopDoctors() {
  const users = await getTopDoctors();

  return (
    <section className="bg-slate-950 py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-900">
      <div className="max-w-7xl mx-auto">
        
        {/* সেকশন হেডার */}
        <div className="text-center mb-16">
          <span className="text-blue-500 text-xs font-semibold tracking-widest uppercase bg-blue-950/50 px-4 py-1.5 rounded-full border border-blue-900/40">
            Meet Our Experts
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Top Rated Specialists
          </h2>
          <p className="mt-4 text-base text-slate-400 max-w-xl mx-auto">
            Book appointments with our most trusted senior consultants.
          </p>
        </div>

        {/* গ্রিড কন্টেইনার */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {users && users.slice(0, 3).map((doctor) => (
            <div 
              key={doctor._id || doctor.id} 
              className="flex flex-col h-full bg-slate-900/40 backdrop-blur-sm border border-slate-900 rounded-3xl overflow-hidden p-6 hover:border-slate-800 transition-all duration-300 group"
            >
              {/* ইমেজ কন্টেইনার */}
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl mb-4 bg-slate-950">
                <img 
                  src={doctor.image} 
                  alt={doctor.name} 
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                {doctor.experience && (
                  <span className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md text-blue-400 text-xs font-medium px-3 py-1 rounded-xl border border-slate-800 flex items-center gap-1">
                    <FiBriefcase className="text-xs" /> {doctor.experience}
                  </span>
                )}
              </div>

              {/* কন্টেন্ট বডি */}
              <div className="flex flex-col flex-grow">
                <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">
                  {doctor.specialty}
                </span>
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">
                  {doctor.name}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-2">
                  {doctor.description}
                </p>

                {/* ইনফো এরিয়া */}
                <div className="space-y-3 border-t border-slate-900 pt-4 mb-6 text-sm text-slate-400 mt-auto">
                  <div className="flex items-center gap-2.5">
                    <FiMapPin className="text-blue-500 shrink-0" />
                    <span className="truncate">{doctor.hospital || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <FiClock className="text-blue-500 shrink-0" />
                    <span className="truncate">{doctor.availability?.[0] || "Available Today"}</span>
                  </div>
                </div>

                {/* ফি এবং অ্যাকশন বাটন */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-medium">Fee</p>
                    <p className="text-lg font-bold text-emerald-400">৳ {doctor.fee}</p>
                  </div>
                  
                  {/* 🌟 ফিক্স: Button-এর ভেতর থেকে as={Link} বাদ দিয়ে Link দিয়ে বাটনটি মুড়ে দেওয়া হয়েছে */}
                  <Link href="/login">
                    <Button className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-5 h-10 rounded-xl transition-all">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}