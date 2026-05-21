import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import DeleteButton from "@/app/components/DeleteButton";
import EditModal from "@/app/components/EditModal";
export default async function MyBookings() {
  let bookings = [];
  let error = null;

  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const email = session?.user?.email;

    if (email) {
      const encodedEmail = encodeURIComponent(email);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      const res = await fetch(`${apiUrl}/appointments/${encodedEmail}`, {
        cache: "no-store",
      });

      if (res.ok) {
        const data = await res.json();
        bookings = data.data || [];
      }
    }
  } catch (err) {
    console.error("Failed to fetch bookings:", err);
    error = err.message;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">My Bookings</h1>

        {error && (
          <p className="text-center text-red-400 text-sm mb-6">Error: {error}</p>
        )}

        {bookings.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📋</div>
            <p className="text-slate-400 text-lg font-semibold">You have no bookings yet.</p>
            <p className="text-slate-600 text-sm mt-2">Book an appointment to see it here.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-slate-900 border border-slate-800 rounded-2xl shadow-md hover:shadow-xl hover:border-slate-700 transition-all p-5"
              >
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-white">{booking.doctorName}</h2>
                  <p className="text-sm text-slate-500">Appointment Booking</p>
                </div>
                <div className="space-y-2 text-sm text-slate-300">
                  <p><span className="font-semibold text-slate-400">Patient:</span> {booking.patientName}</p>
                  <p><span className="font-semibold text-slate-400">Date:</span> {booking.appointmentDate}</p>
                  <p><span className="font-semibold text-slate-400">Time:</span> {booking.appointmentTime}</p>
                  <p><span className="font-semibold text-slate-400">Phone:</span> {booking.phone}</p>
                </div>
                <div className="flex gap-3 mt-5">
                  <EditModal booking={booking} />
                  <DeleteButton id={booking._id} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}