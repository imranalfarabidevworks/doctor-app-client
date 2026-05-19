import Link from "next/link";

import { Button } from "@heroui/react";

export default function DoctorsCard({ doctor }) {

  const {
    _id,
    name,
    specialty,
    experience,
    image,
    fee,
  } = doctor;

  return (
    <div className="flex flex-col bg-slate-900/40 border border-slate-800 rounded-3xl p-6 transition-all duration-300 hover:border-blue-500 hover:-translate-y-1">

      {/* Image */}
      <img
        src={image}
        alt={name}
        className="w-full h-56 object-cover rounded-2xl mb-5"
      />

      {/* Specialty */}
      <span className="text-blue-400 text-sm font-semibold uppercase tracking-wider mb-2">
        {specialty}
      </span>

      {/* Name */}
      <h3 className="text-2xl font-bold text-white mb-3">
        {name}
      </h3>

      {/* Experience */}
      <p className="text-slate-400 text-sm mb-6">
        Experience:
        {" "}
        <span className="text-white font-medium">
          {experience}
        </span>
      </p>

      {/* Footer */}
      <div className="mt-auto pt-5 border-t border-slate-800 flex items-center justify-between">

        {/* Fee */}
        <div>
          <p className="text-xs text-slate-500 uppercase mb-1">
            Consultation Fee
          </p>

          <p className="text-2xl font-bold text-emerald-400">
            ৳ {fee}
          </p>
        </div>

        {/* Button */}
        <Link href={`/appointments/${_id}`}>
          <Button className="bg-blue-600 hover:bg-blue-500 text-white px-5 h-11 rounded-2xl font-semibold">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
}