"use client";
import { authClient } from "@/lib/auth-client";

export default function Profile() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) return <div>Loading...</div>;

  return (
    <div className="text-white p-8">
      <img src={session?.user?.image} alt="Profile" className="w-20 h-20 rounded-full" />
      <h2 className="text-xl">{session?.user?.name}</h2>
      <p>{session?.user?.email}</p>
    </div>
  );
}