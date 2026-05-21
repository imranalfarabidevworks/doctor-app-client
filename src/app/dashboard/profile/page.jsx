"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(session?.user?.name || "");
  const [image, setImage] = useState(session?.user?.image || "");

  const handleUpdate = async () => {
    try {
      await authClient.updateUser({ // ✅ সঠিক method
        name: name,
        image: image,
      });
      toast.success("Profile updated successfully!");
      setIsEditing(false);
      router.refresh();
    } catch (err) {
      toast.error("Update failed!");
    }
  };

  const handleDeleteAccount = async () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        await authClient.deleteUser(); // ✅ সঠিক method
        toast.success("Account deleted!");
        router.push("/");
      } catch (err) {
        toast.error("Failed to delete account!");
      }
    }
  };

  if (!session) return <p className="text-slate-400">Loading...</p>;

  return (
    <div className="max-w-xl text-white">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex items-center gap-6 mb-6">
          <img
            src={session.user.image || `https://ui-avatars.com/api/?name=${session.user.name}`}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-slate-700 object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold">{session.user.name}</h2>
            <p className="text-slate-400">{session.user.email}</p>
          </div>
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 bg-slate-950 rounded-xl border border-slate-700"
              placeholder="Name"
            />
            <input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full p-3 bg-slate-950 rounded-xl border border-slate-700"
              placeholder="Image URL"
            />
            <div className="flex gap-3">
              <button
                onClick={handleUpdate}
                className="bg-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-500"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-slate-700 px-6 py-2 rounded-lg font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-500"
            >
              Edit Profile
            </button>
            <button
              onClick={handleDeleteAccount}
              className="bg-red-900/50 text-red-400 px-6 py-2 rounded-lg font-medium hover:bg-red-900"
            >
              Delete Account
            </button>
          </div>
        )}
      </div>
    </div>
  );
}