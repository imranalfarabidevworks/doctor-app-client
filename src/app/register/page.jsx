"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { toast } from "react-hot-toast";
import { FiUser, FiMail, FiLock, FiImage } from "react-icons/fi";
// তুমি যদি Better Auth-এর client ব্যবহার করো, তবে ইম্পোর্ট হবে:
// import { authClient } from "@/lib/auth-client"; 

export default function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", photoURL: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // পাসওয়ার্ড ভ্যালিডেশন রুলস
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(formData.password)) {
      toast.error("Password must be at least 6 characters, including 1 Uppercase and 1 Lowercase letter.");
      return;
    }

    setLoading(true);
    try {
      // 🚀 এখানে Better Auth দিয়ে সাইনআপ হবে
      // await authClient.signUp.email(...)
      toast.success("Account created successfully!");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="bg-slate-900/40 p-8 rounded-3xl border border-slate-900 w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6">Register</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input type="text" placeholder="Full Name" className="w-full bg-slate-900 text-white p-3 rounded-xl border border-slate-800" onChange={(e) => setFormData({...formData, name: e.target.value})} required />
          <input type="email" placeholder="Email" className="w-full bg-slate-900 text-white p-3 rounded-xl border border-slate-800" onChange={(e) => setFormData({...formData, email: e.target.value})} required />
          <input type="text" placeholder="Photo URL" className="w-full bg-slate-900 text-white p-3 rounded-xl border border-slate-800" onChange={(e) => setFormData({...formData, photoURL: e.target.value})} />
          <input type="password" placeholder="Password" className="w-full bg-slate-900 text-white p-3 rounded-xl border border-slate-800" onChange={(e) => setFormData({...formData, password: e.target.value})} required />
          
          <Button type="submit" isLoading={loading} className="w-full bg-blue-600 text-white font-bold h-12 rounded-xl">Register</Button>
        </form>
        <p className="text-slate-400 text-sm mt-4 text-center">Already have an account? <Link href="/login" className="text-blue-500">Login</Link></p>
      </div>
    </div>
  );
}