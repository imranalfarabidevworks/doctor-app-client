import DoctorsCard from "@/app/components/DoctorsCard";

export default async function TopDoctors() {

  const res = await fetch(
    "http://localhost:5000/doctors",
    {
      cache: "no-store",
    }
  );

  const doctors = await res.json();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

      {doctors?.slice(0, 3).map((doc) => (
        <DoctorsCard
          key={doc._id}
          doctor={doc}
        />
      ))}

    </div>
  );
}