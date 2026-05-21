export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-6">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full border-4 border-slate-700" />
        <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
        <div
          className="absolute inset-3 rounded-full border-4 border-indigo-500 border-b-transparent animate-spin"
          style={{ animationDirection: "reverse", animationDuration: "0.8s" }}
        />
      </div>
      <div className="text-center">
        <p className="text-slate-300 font-semibold text-lg">Loading Bookings</p>
        <p className="text-slate-500 text-sm mt-1">Fetching your appointments...</p>
      </div>
    </div>
  );
}