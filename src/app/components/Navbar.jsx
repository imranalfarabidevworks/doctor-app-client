"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FiMenu, FiX, FiLogOut } from "react-icons/fi";
import { FaStethoscope, FaUser } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      toast.success("Logged out successfully!");
      setDropdownOpen(false);
      router.push("/");
      router.refresh();
    } catch (err) {
      toast.error("Logout failed!");
    }
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/appointments", label: "All Appointments" },
    { href: "/dashboard", label: "Dashboard" },
  ];

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-md shadow-sm border-b border-slate-900 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between h-16 w-full">

          {/* Logo */}
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

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-2 mx-auto">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.href)
                    ? "bg-blue-950/60 text-blue-400 border border-blue-900/40"
                    : "text-slate-300 hover:text-blue-400 hover:bg-slate-900/60"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="focus:outline-none"
                >
                  <img
                    src={
                      user.image ||
                      `https://ui-avatars.com/api/?name=${user.name || "User"}&background=2563eb&color=fff`
                    }
                    alt="avatar"
                    className="w-9 h-9 rounded-full border-2 border-blue-500 object-cover cursor-pointer hover:ring-2 hover:ring-blue-300 transition-all"
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-slate-900 rounded-2xl shadow-xl border border-slate-800 py-2 z-50">
                    {/* User Info */}
                    <div className="px-4 py-2 border-b border-slate-800">
                      <p className="font-semibold text-sm text-white truncate">{user.name}</p>
                      <p className="text-xs text-slate-400 truncate">{user.email}</p>
                    </div>

                    {/* Profile Link */}
                    <Link
                      href="/dashboard/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 transition-colors"
                    >
                      <FaUser size={14} /> Profile
                    </Link>

                    {/* Logout */}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:bg-red-950/20 text-left transition-colors"
                    >
                      <FiLogOut size={14} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="text-sm font-medium text-white bg-transparent border border-slate-800 hover:bg-slate-900/80 h-9 px-4 rounded-xl flex items-center"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 h-9 px-4 rounded-xl flex items-center shadow-lg shadow-blue-500/20"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-slate-400" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-900 p-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2 text-slate-300 hover:text-blue-400"
            >
              {link.label}
            </Link>
          ))}

          {user ? (
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <Link
                href="/dashboard/profile"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:text-blue-400"
              >
                <FaUser size={14} /> Profile
              </Link>
              <button
                onClick={() => { handleLogout(); setMenuOpen(false); }}
                className="flex items-center gap-2 px-4 py-2 text-red-400 w-full"
              >
                <FiLogOut size={14} /> Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 pt-2">
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-2 text-center border border-slate-800 rounded-xl"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-2 text-center bg-blue-600 rounded-xl"
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