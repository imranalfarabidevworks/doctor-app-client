"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@heroui/react";
import toast from "react-hot-toast";
import { FiMenu, FiX, FiLogOut } from "react-icons/fi";
import { FaStethoscope } from "react-icons/fa";

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null); // আপনার Auth স্টেট (Firebase/Context) এখানে কানেক্ট হবে

  const handleLogout = async () => {
    try {
      setUser(null);
      toast.success("Logged out successfully!");
    } catch {
      toast.error("Logout failed!");
    }
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/appointments", label: "All Appointments" },
  ];

  const activeLinks = user ? [...navLinks, { href: "/dashboard", label: "Dashboard" }] : navLinks;

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-md shadow-sm border-b border-slate-900 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between h-16 w-full">
          
          {/* বাম পাশ: লোগো এরিয়া */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-600/20">
                <FaStethoscope className="text-white text-lg" />
              </div>
              <span className="font-sans font-bold text-xl text-blue-400 tracking-wide">
                DocAppoint
              </span>
            </Link>
          </div>

          {/* মাঝখান: ডেক্সটপ নেভিগেশন লিঙ্কস */}
          <div className="hidden md:flex items-center gap-2 mx-auto">
            {activeLinks.map((link) => {
              const currentActive = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    currentActive
                      ? "bg-blue-950/60 text-blue-400 border border-blue-900/40"
                      : "text-slate-300 hover:text-blue-400 hover:bg-slate-900/60"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* ডান পাশ: ইউজার প্রোফাইল অথবা লগইন/রেজিস্টার বাটনস */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button onClick={() => setDropdownOpen(!dropdownOpen)} className="focus:outline-none">
                  <img
                    src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || "User"}&background=2563eb&color=fff`}
                    alt="avatar"
                    className="w-9 h-9 rounded-full border-2 border-blue-500 object-cover cursor-pointer hover:ring-2 hover:ring-blue-300 transition-all"
                  />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-slate-900 rounded-2xl shadow-xl border border-slate-800 py-2 z-50">
                    <div className="px-4 py-2 border-b border-slate-800">
                      <p className="font-semibold text-sm text-white truncate">{user.displayName || "User"}</p>
                      <p className="text-xs text-slate-400 truncate">{user.email}</p>
                    </div>
                    <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:bg-red-950/20 text-left transition-colors">
                      <FiLogOut size={14} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                {/* 🌟 ফিক্সড পিওর Next.js Link লগইন বাটন */}
                <Link 
                  href="/login" 
                  className="inline-flex items-center justify-center text-sm font-medium text-white bg-transparent border border-slate-800 hover:bg-slate-900/80 h-9 px-4 rounded-xl transition-all duration-200"
                >
                  Login
                </Link>
                
                <Link 
                  href="/register" 
                  className="inline-flex items-center justify-center text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 h-9 px-4 rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-200"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* মোবাইল মেনু বাটন */}
          <div className="flex items-center md:hidden gap-2">
            <button
              className="p-2 rounded-lg text-slate-400 hover:bg-slate-900 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>

        </div>
      </div>

      {/* মোবাইল রেসপন্সিভ ড্রপডাউন মেনু */}
      {menuOpen && (
        <div className="md:hidden py-4 border-t border-slate-900 space-y-3 bg-slate-950 px-4 transition-all duration-300">
          <div className="space-y-1">
            {activeLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium ${
                  isActive(link.href) ? "bg-blue-950/50 text-blue-400" : "text-slate-300"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          {!user && (
            <div className="flex flex-col gap-2 pt-3 border-t border-slate-900">
              {/* 🌟 মোবাইল ভিউতেও পিওর Link দিয়ে ফিক্স করা হয়েছে */}
              <Link 
                href="/login" 
                className="w-full flex items-center justify-center text-sm font-medium text-white bg-transparent border border-slate-800 h-10 rounded-xl hover:bg-slate-900/80 transition-all"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link 
                href="/register" 
                className="w-full flex items-center justify-center text-sm font-medium text-white bg-blue-600 h-10 rounded-xl hover:bg-blue-500 transition-all"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;