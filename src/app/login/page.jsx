"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import toast from "react-hot-toast";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      // 💡 আপনার Authentication লগইন লজিক এখানে বসবে
      console.log("Logging in:", { email, password });
      
      toast.success("Welcome back!");
      router.push("/appointments"); // সফল হলে সোজা অ্যাপয়েন্টমেন্ট পেজে
    } catch (error) {
      toast.error("Invalid email or password!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-slate-950 min-h-screen flex items-center justify-center pt-24 pb-12 px-4">
      <div className="absolute w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md bg-slate-900/40 backdrop-blur-md border border-slate-900 p-8 rounded-3xl relative z-10 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-white tracking-tight">Welcome Back</h2>
          <p className="text-sm text-slate-400 mt-2">Log in to view your profile and appointments.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* ইমেইল */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Email Address</label>
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input type="email" name="email" required placeholder="name@example.com" className="w-full bg-slate-950/60 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-all" />
            </div>
          </div>

          {/* পাসওয়ার্ড */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Password</label>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input type={showPassword ? "text" : "password"} name="password" required placeholder="••••••••" className="w-full bg-slate-950/60 border border-slate-800 rounded-xl pl-11 pr-12 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-all" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <Button type="submit" isLoading={loading} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold h-12 rounded-xl shadow-lg shadow-blue-500/10 mt-2 transition-all">
            Sign In
          </Button>
        </form>

        <p className="text-center text-sm text-slate-400 mt-6">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-400 font-medium hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </section>
  );
}