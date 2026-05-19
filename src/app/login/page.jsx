"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    toast.success("Login successful!");
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="bg-slate-900/40 p-8 rounded-3xl border border-slate-900 w-full max-w-md shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Login</h2>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" placeholder="Email" className="w-full bg-slate-950 text-white p-3.5 rounded-xl border border-slate-800 focus:border-blue-500 outline-none" onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" className="w-full bg-slate-950 text-white p-3.5 rounded-xl border border-slate-800 focus:border-blue-500 outline-none" onChange={(e) => setPassword(e.target.value)} required />
          
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold h-12 rounded-xl transition-all">Login</Button>
        </form>
        
        <div className="my-6 space-y-3">
           <button className="w-full flex items-center justify-center gap-2 bg-white text-black font-semibold h-12 rounded-xl hover:bg-slate-100 transition-all">
             <FcGoogle size={20} /> Login with Google
           </button>
           <button className="w-full flex items-center justify-center gap-2 bg-slate-800 text-white font-semibold h-12 rounded-xl hover:bg-slate-700 transition-all">
             <FaGithub size={20} /> Login with GitHub
           </button>
        </div>
        
        <p className="text-slate-400 text-sm text-center">Don't have an account? <Link href="/register" className="text-blue-500 font-semibold">Register</Link></p>
      </div>
    </div>
  );
}