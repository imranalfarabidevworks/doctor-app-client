"use client";

const stats = [
  { id: 1, number: "15,000+", label: "Happy Patients Served" },
  { id: 2, number: "550+", label: "Verified Specialists" },
  { id: 3, number: "25+", label: "Medical Specialties" },
  { id: 4, number: "4.9/5", label: "Patient Satisfaction" }
];

export default function StatsSection() {
  return (
    <section className="relative bg-slate-950 py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-900 overflow-hidden">
    
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[150px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.id} className="p-4">
              <p className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-500 bg-clip-text text-transparent tracking-tight">
                {stat.number}
              </p>
              <p className="mt-2 text-xs sm:text-sm text-slate-400 font-medium uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}