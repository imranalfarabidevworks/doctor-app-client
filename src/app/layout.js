import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 🌟 এসাইনমেন্টের রিকোয়ারমেন্ট অনুযায়ী মিনিংফুল মেটাডাটা
export const metadata = {
  title: "DocAppoint | Premium Doctor Appointment Manager",
  description: "Book doctor appointments instantly with verified medical specialists. Manage your health with confidence.",
};

export default function RootLayout({ children }) {
  return (
    // 💡 পুরো সাইট যেন ডার্ক থিম পায় সেজন্য 'dark' ক্লাস অ্যাড করতে পারেন
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full bg-slate-950 text-slate-100 flex flex-col">
        {/* ন্যাভবার সবসময় সবার উপরে থাকবে */}
        <Navbar />
        
        {/* মেইন কন্টেন্ট এরিয়া */}
        <main className="flex-grow">{children}</main>
        
        {/* ফুটার সবসময় সবার নিচে থাকবে */}
        <Footer />  
      </body>
    </html>
  );
}