"use client";
import { useState } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", image: "" });
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // পাসওয়ার্ড ৮ ক্যারেক্টারের কম হলে রিকোয়েস্ট পাঠাবে না (Better Auth এর ডিফল্ট রুল)
    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long!");
      return;
    }

    setLoading(true);
    const { data, error } = await authClient.signUp.email({
      email: formData.email,
      password: formData.password,
      name: formData.name,
      image: formData.image,
    });

    setLoading(false);

    if (error) {
      toast.error(error.message || "Registration failed!");
    } else {
      toast.success("Account created successfully!");
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="bg-slate-900/40 p-8 rounded-3xl border border-slate-800 w-full max-w-md shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Create Account</h2>
        
        <form onSubmit={handleRegister} className="space-y-4">
          <input type="text" placeholder="Full Name" className="w-full bg-slate-950 text-white p-3.5 rounded-xl border border-slate-800 focus:border-blue-500 outline-none" onChange={(e) => setFormData({...formData, name: e.target.value})} required />
          <input type="email" placeholder="Email" className="w-full bg-slate-950 text-white p-3.5 rounded-xl border border-slate-800 focus:border-blue-500 outline-none" onChange={(e) => setFormData({...formData, email: e.target.value})} required />
          <input type="password" placeholder="Password (min 8 chars)" className="w-full bg-slate-950 text-white p-3.5 rounded-xl border border-slate-800 focus:border-blue-500 outline-none" onChange={(e) => setFormData({...formData, password: e.target.value})} required />
          <input type="text" placeholder="Profile Image URL" className="w-full bg-slate-950 text-white p-3.5 rounded-xl border border-slate-800 focus:border-blue-500 outline-none" onChange={(e) => setFormData({...formData, image: e.target.value})} />
          
          <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold h-12 rounded-xl transition-all disabled:opacity-50">
            {loading ? "Processing..." : "Register"}
          </button>
        </form>

        <div className="my-6 space-y-3">
           <button onClick={() => authClient.signIn.social({ provider: "google" })} className="w-full flex items-center justify-center gap-2 bg-white text-black font-semibold h-12 rounded-xl hover:bg-slate-100 transition-all">
             <FcGoogle size={22} /> Continue with Google
           </button>
           <button onClick={() => authClient.signIn.social({ provider: "github" })} className="w-full flex items-center justify-center gap-2 bg-slate-800 text-white font-semibold h-12 rounded-xl hover:bg-slate-700 transition-all">
             <FaGithub size={22} /> Continue with GitHub
           </button>
        </div>
        
        <p className="text-slate-400 text-sm text-center">
          Already have an account? <Link href="/login" className="text-blue-500 font-semibold underline">Login</Link>
        </p>
      </div>
    </div>
  );
}