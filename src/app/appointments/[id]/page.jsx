

import AppointmentModal from "@/app/components/AppointmentModal";
import Image from "next/image";


export default async function DoctorDetails({ params }) {
  const { id } = await params; // Next.js 15+ fix

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctors/${id}`, { cache: "no-store" });
  const data = await res.json();

  if (!data.success) return <div className="text-center py-20 text-white">Doctor not found</div>;
  const doctor = data.data;

  return (
   
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
       
      <div className="max-w-4xl w-full bg-slate-900/40 border border-slate-800 rounded-3xl p-8 grid md:grid-cols-2 gap-10">
        <div className="relative w-full h-[350px]">
          
          <Image src={doctor.image} alt={doctor.name} fill className="rounded-3xl object-cover border-2 border-blue-500" />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-extrabold mb-2">{doctor.name}</h1>
          <p className="text-blue-400 text-lg mb-4">{doctor.specialty}</p>
          <p className="text-slate-400 mb-6 leading-relaxed">{doctor.description}</p>
          <div className="space-y-2 text-slate-300">
            <p>Experience: {doctor.experience}</p>
            <p>Hospital: {doctor.hospital}</p>
            <p className="text-2xl font-bold text-emerald-400 mt-4">৳ {doctor.fee}</p>
          </div>
      
<AppointmentModal doctorName={doctor.name} />
        </div>
      </div>
    </div>
  );
}