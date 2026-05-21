// src/app/dashboard/layout.jsx এ আপডেট করুন
"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({ children }) {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login"); 
    }
  }, [session, isPending, router]);

  if (isPending) return <p className="p-10">Loading...</p>;

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
       {/* ... sidebar code ... */}
       <main className="flex-1 p-8">{children}</main>
    </div>
  );
}