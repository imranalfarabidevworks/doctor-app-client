"use client";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function EditModal({ booking }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    patientName: booking.patientName,
    appointmentDate: booking.appointmentDate,
    appointmentTime: booking.appointmentTime,
    phone: booking.phone,
  });
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments/${booking._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Booking updated!");
        setOpen(false);
        router.refresh();
      } else {
        toast.error("Failed to update!");
      }
    } catch (error) {
      toast.error("Server error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-xl transition"
      >
        <FaEdit /> Edit
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h2 className="text-xl font-bold mb-4">Edit Booking</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-semibold">Patient Name</label>
                <input name="patientName" value={formData.patientName} onChange={handleChange} className="w-full border rounded-xl px-4 py-2 mt-1 bg-transparent outline-none" required />
              </div>
              <div>
                <label className="text-sm font-semibold">Date</label>
                <input name="appointmentDate" type="date" value={formData.appointmentDate} onChange={handleChange} className="w-full border rounded-xl px-4 py-2 mt-1 bg-transparent outline-none" required />
              </div>
              <div>
                <label className="text-sm font-semibold">Time</label>
                <input name="appointmentTime" type="time" value={formData.appointmentTime} onChange={handleChange} className="w-full border rounded-xl px-4 py-2 mt-1 bg-transparent outline-none" required />
              </div>
              <div>
                <label className="text-sm font-semibold">Phone</label>
                <input name="phone" value={formData.phone} onChange={handleChange} className="w-full border rounded-xl px-4 py-2 mt-1 bg-transparent outline-none" required />
              </div>
              <div className="flex gap-3 mt-2">
                <button type="button" onClick={() => setOpen(false)} className="flex-1 border rounded-xl py-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition">Cancel</button>
                <button type="submit" disabled={loading} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-2 transition">
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}