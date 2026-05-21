import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 relative overflow-hidden">
      
      {/* Background blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 text-center max-w-lg mx-auto">

        {/* 404 big number */}
        <div className="relative mb-6">
          <h1 className="text-[10rem] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-slate-600 to-slate-800 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-blue-600/20 border border-blue-500/30 rounded-2xl px-6 py-3 backdrop-blur-sm">
              <span className="text-blue-400 font-semibold text-lg tracking-widest uppercase">
                Page Not Found
              </span>
            </div>
          </div>
        </div>

        {/* Doctor icon */}
        <div className="text-6xl mb-6">🩺</div>

        {/* Message */}
        <h2 className="text-2xl font-bold text-white mb-3">
          Oops! Wrong Prescription
        </h2>
        <p className="text-slate-400 text-base mb-10 leading-relaxed">
          The page you're looking for has either moved or doesn't exist.
          Let's get you back on track!
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-3 rounded-2xl transition-all duration-200 hover:scale-105 active:scale-95"
          >
            Go Home
          </Link>
          <Link
            href="/dashboard/my-bookings"
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-8 py-3 rounded-2xl border border-slate-700 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            My Bookings
          </Link>
        </div>

      </div>
    </div>
  );
}