"use client";
import { MdDelete } from "react-icons/md";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function DeleteButton({ id }) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this booking?");
    if (!confirm) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Booking deleted!");
        router.refresh();
      } else {
        toast.error("Failed to delete!");
      }
    } catch (error) {
      toast.error("Server error!");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 rounded-xl transition"
    >
      <MdDelete /> Delete
    </button>
  );
}