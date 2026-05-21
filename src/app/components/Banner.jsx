"use client";

import { useState, useEffect, useRef } from "react";
import { FiSearch, FiCalendar, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const slides = [
  {
    id: 1,
    tag: "✦ Verified Healthcare Platform",
    title: "Your Health,",
    highlight: "Our Priority",
    subtitle: "Book appointments with certified specialists in minutes. Real doctors, genuine reviews, and care you can trust — right at your fingertips.",
    cta1: { label: "Browse Doctors", href: "/appointments", icon: "search" },
    cta2: { label: "My Bookings", href: "/dashboard", icon: "calendar" },
    stats: [
      { value: "500+", label: "Verified Doctors" },
      { value: "4.9★", label: "Avg. Rating" },
      { value: "50k+", label: "Happy Patients" },
    ],
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=100&w=2560&auto=format&fit=crop",
    overlay: "from-slate-950/95 via-slate-950/70 to-transparent",
  },
  {
    id: 2,
    tag: "✦ 550+ Certified Specialists",
    title: "Expert Care,",
    highlight: "Whenever You Need",
    subtitle: "From general physicians to top-tier surgeons — find the right specialist for your needs and book a slot that works for your schedule.",
    cta1: { label: "Find a Specialist", href: "/appointments", icon: "search" },
    cta2: { label: "My Bookings", href: "/dashboard", icon: "calendar" },
    stats: [
      { value: "550+", label: "Specialists" },
      { value: "98%", label: "Patient Satisfaction" },
      { value: "24/7", label: "Online Support" },
    ],
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=100&w=2560&auto=format&fit=crop",
    overlay: "from-slate-950/95 via-slate-950/65 to-transparent",
  },
  {
    id: 3,
    tag: "✦ Simple, Safe & Secure",
    title: "Stay on Top of",
    highlight: "Your Wellness",
    subtitle: "Track every appointment, receive smart reminders, and keep your health records organized — all from one secure, easy-to-use platform.",
    cta1: { label: "Get Started Free", href: "/register", icon: "search" },
    cta2: { label: "My Bookings", href: "/dashboard", icon: "calendar" },
    stats: [
      { value: "100%", label: "Data Privacy" },
      { value: "< 10min", label: "Avg. Booking Time" },
      { value: "#1", label: "Rated Platform" },
    ],
    image: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?q=100&w=2560&auto=format&fit=crop",
    overlay: "from-slate-950/95 via-slate-950/65 to-transparent",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [mounted, setMounted] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => { setMounted(true); }, []);

  const goTo = (index) => {
    if (animating || index === current) return;
    setAnimating(true);
    setTimeout(() => { setCurrent(index); setAnimating(false); }, 400);
  };

  const next = () => goTo((current + 1) % slides.length);
  const prev = () => goTo((current - 1 + slides.length) % slides.length);

  useEffect(() => {
    timerRef.current = setInterval(next, 5500);
    return () => clearInterval(timerRef.current);
  }, [current]);

  if (!mounted) return <div className="w-full bg-slate-950 h-[600px] lg:h-[850px]" />;

  const slide = slides[current];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Outfit:wght@300;400;500;600;700&display=swap');
        .hero-title { font-family: 'Cormorant Garamond', serif; }
        .hero-section { font-family: 'Outfit', sans-serif; }
        .btn-primary { background: white; color: #0f172a; display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; border-radius: 10px; font-weight: 600; transition: 0.3s; }
        .btn-secondary { background: rgba(255,255,255,0.08); color: white; display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.2); backdrop-filter: blur(10px); }
        .nav-btn { width: 44px; height: 44px; border-radius: 50%; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.18); color: white; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px); }
        .dot.active { width: 28px; background: white; }
        .progress-bar { height: 2px; background: white; animation: progress 5.5s linear infinite; }
        @keyframes progress { from { width: 0% } to { width: 100% } }
      `}</style>

      <section className="hero-section relative w-full overflow-hidden h-[600px] lg:h-[850px]">
        <div className={`absolute inset-0 transition-opacity duration-700 ${animating ? "opacity-0" : "opacity-100"}`}
             style={{ backgroundImage: `url(${slide.image})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        
        <div className={`absolute inset-0 bg-gradient-to-r ${slide.overlay}`} />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-slate-950 to-transparent" />

        <div className={`relative z-10 h-full flex flex-col justify-center px-6 md:px-10 lg:px-20 transition-opacity duration-500 ${animating ? "opacity-0" : "opacity-100"}`}>
          <div className="max-w-2xl">
            <span className="inline-block text-white/70 text-[10px] sm:text-xs tracking-[0.2em] uppercase px-4 py-2 rounded-full border border-white/10 mb-6 bg-white/5">
              {slide.tag}
            </span>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold text-white leading-[1] mb-2 hero-title">
              {slide.title}
            </h1>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold text-white/80 leading-[1] mb-6 hero-title">
              {slide.highlight}
            </h1>
            <p className="text-white/60 text-sm sm:text-lg mb-8 max-w-lg leading-relaxed">
              {slide.subtitle}
            </p>
            
            <div className="flex flex-wrap gap-4 mb-12">
              <a href={slide.cta1.href} className="btn-primary hover:scale-105 transition-transform">
                {slide.cta1.icon === "search" ? <FiSearch /> : <FiCalendar />} {slide.cta1.label}
              </a>
              <a href={slide.cta2.href} className="btn-secondary hover:bg-white/15 transition-all">
                <FiCalendar /> {slide.cta2.label}
              </a>
            </div>

            <div className="flex flex-wrap gap-6">
              {slide.stats.map((stat, i) => (
                <div key={i} className="flex items-center gap-4">
                  {i > 0 && <div className="w-[1px] h-8 bg-white/20 hidden sm:block" />}
                  <div>
                    <div className="text-xl font-bold text-white hero-title">{stat.value}</div>
                    <div className="text-white/40 text-[10px] uppercase tracking-widest">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-6 md:left-20 z-20 flex gap-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} className={`dot h-2 rounded-full transition-all ${i === current ? "bg-white w-8" : "bg-white/30 w-2"}`} />
          ))}
        </div>

        <div className="absolute bottom-6 right-6 md:right-20 z-20 flex gap-2">
          <button className="nav-btn" onClick={prev}><FiChevronLeft size={20} /></button>
          <button className="nav-btn" onClick={next}><FiChevronRight size={20} /></button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20">
          <div key={current} className="progress-bar" />
        </div>
      </section>
    </>
  );
}