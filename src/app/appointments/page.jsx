import DoctorsCard from "@/app/components/DoctorsCard";

export default async function AllAppointments() {

  const res = await fetch(
    "http://localhost:5000/doctors",
    {
      cache: "no-store",
    }
  );

  const appointments = await res.json();

  return (
    <section className="min-h-screen bg-slate-950 text-white py-28 px-4">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
            All Appointments
          </h1>

          <p className="text-slate-400 text-lg">
            Browse all doctors and book appointments easily.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

          {appointments.map((appointment) => (
            <DoctorsCard
              key={appointment._id}
              doctor={appointment}
            />
          ))}

        </div>
      </div>
    </section>
  );
}