"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client"; 
import { FaCalendarAlt, FaUser, FaHome, FaSignOutAlt } from "react-icons/fa";

export default function DashboardLayout({ children }) {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      {/* Sidebar - Desktop */}
      <aside className="w-64 border-r border-slate-800 p-6 hidden md:block shrink-0 h-screen sticky top-0">
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-blue-400">DocAppoint</h2>
          <p className="text-slate-500 text-sm mt-1">Patient Portal</p>
        </div>

        <nav className="space-y-4">
          <Link href="/dashboard" className="flex items-center gap-3 text-slate-300 hover:text-blue-400 transition-all">
            <FaHome /> Dashboard
          </Link>
          <Link href="/dashboard/my-bookings" className="flex items-center gap-3 text-slate-300 hover:text-blue-400 transition-all">
            <FaCalendarAlt /> My Bookings
          </Link>
          <Link href="/dashboard/profile" className="flex items-center gap-3 text-slate-300 hover:text-blue-400 transition-all">
            <FaUser /> My Profile
          </Link>
          <div className="pt-10 border-t border-slate-800">
            <Link href="/" className="flex items-center gap-3 text-slate-500 hover:text-white transition-all">
              <FaHome /> Back to Home
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-slate-950/50 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}