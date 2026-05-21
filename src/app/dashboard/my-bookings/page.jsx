import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import DeleteButton from "@/app/components/DeleteButton";
import EditModal from "@/app/components/EditModal";

export default async function MyBookings() {
  let bookings = [];
  let userEmail = null;

  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    // ✅ better-auth এ user email
    userEmail = session?.user?.email;
    console.log("User email:", userEmail); // terminal

    if (userEmail) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/appointments/${userEmail}`,
        { cache: "no-store" }
      );

      if (res.ok) {
        const data = await res.json();
        bookings = data.data || [];
        console.log("Bookings fetched:", bookings.length); // terminal
      } else {
        console.error("Fetch failed with status:", res.status);
      }
    } else {
      console.warn("No user email found in session");
    }
  } catch (error) {
    console.error("Error:", error);
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8 mt-20 text-center">My Bookings</h1>

      {/*Debug info */}
      {process.env.NODE_ENV === "development" && (
        <p className="text-center text-xs text-slate-400 mb-4">
          Email: {userEmail || "Not found"} | Bookings: {bookings.length}
        </p>
      )}

      {bookings.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-slate-400 text-lg">You have no bookings yet.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-md hover:shadow-xl transition-all p-5"
            >
              <div className="mb-4">
                <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                  Dr. {booking.doctorName}
                </h2>
                <p className="text-sm text-slate-500">Appointment Booking</p>
              </div>
              <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                <p><span className="font-semibold">Patient:</span> {booking.patientName}</p>
                <p><span className="font-semibold">Date:</span> {booking.appointmentDate}</p>
                <p><span className="font-semibold">Time:</span> {booking.appointmentTime}</p>
                <p><span className="font-semibold">Phone:</span> {booking.phone}</p>
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
  );
}