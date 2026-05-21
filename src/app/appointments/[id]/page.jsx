// app/doctors/[id]/page.jsx  (Server Component)
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import AppointmentModal from "@/app/components/AppointmentModal";

export default async function DoctorDetails({ params }) {
  const { id } = params;

  // ✅ Session থেকে email নিন
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userEmail = session?.user?.email || null;

  // Doctor data fetch
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctors/${id}`, {
    cache: "no-store",
  });
  const data = await res.json();
  const doctor = data.data;

  return (
    <div>
      {/* doctor info... */}
      
      {/* ✅ userEmail props হিসেবে পাঠান */}
      <AppointmentModal doctorName={doctor.name} userEmail={userEmail} />
    </div>
  );
}