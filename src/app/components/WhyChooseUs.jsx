"use client";

import { FiShield, FiClock, FiUserCheck, FiHeart } from "react-icons/fi";

const features = [
  {
    id: 1,
    icon: <FiShield className="text-blue-500 text-2xl" />,
    title: "100% Verified Doctors",
    desc: "Every medical specialist on our platform is strictly verified with BMDC registration and background checks."
  },
  {
    id: 2,
    icon: <FiClock className="text-emerald-500 text-2xl" />,
    title: "Instant Live Booking",
    desc: "No more waiting in long hospital queues. Select your preferred time slot and secure your appointment instantly."
  },
  {
    id: 3,
    icon: <FiUserCheck className="text-indigo-500 text-2xl" />,
    title: "Expert Top Specialists",
    desc: "Direct access to senior consultants from top medical colleges and hospitals across Bangladesh."
  },
  {
    id: 4,
    icon: <FiHeart className="text-rose-500 text-2xl" />,
    title: "Patient-First Care",
    desc: "Manage your medical bookings, previous history, and reviews smoothly with our secure digital dashboard."
  }
];

export default function WhyChooseUs() {
  return (
    <section className="bg-slate-950 py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-900">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16">
          <span className="text-emerald-400 text-xs font-semibold tracking-widest uppercase bg-emerald-950/40 px-4 py-1.5 rounded-full border border-emerald-900/30">
            Our Core Values
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why Patients Trust DocAppoint
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item) => (
            <div 
              key={item.id} 
              className="p-6 bg-slate-900/20 backdrop-blur-sm border border-slate-900 rounded-2xl hover:border-slate-800/80 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center border border-slate-800 mb-5 shadow-inner">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}