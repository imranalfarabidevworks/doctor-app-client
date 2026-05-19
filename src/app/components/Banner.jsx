"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import Link from "next/link";
import { Button } from "@heroui/react";
import { FiArrowRight } from "react-icons/fi";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
  {
    id: 1,
    tag: "Trusted Healthcare Platform",
    title: "Book Doctor Appointments",
    highlight: "Instantly",
    subtitle: "Connect with certified specialists, choose your preferred time, and receive quality care from the comfort of your home.",
    cta: "Find a Doctor",
    ctaHref: "/appointments",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=600&auto=format&fit=crop", // ডক্টর ইমেজ ১
    glowColor: "bg-blue-600/10",
  },
  {
    id: 2,
    tag: "550+ Verified Specialists",
    title: "Expert Doctors At Your",
    highlight: "Fingertips",
    subtitle: "Browse through our network of experienced and highly-rated doctors across all specialties. Your health, our absolute priority.",
    cta: "Browse Doctors",
    ctaHref: "/appointments",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=600&auto=format&fit=crop", // ডক্টর ইমেজ ২
    glowColor: "bg-indigo-600/10",
  },
  {
    id: 3,
    tag: "Simple & Secure Management",
    title: "Manage Your Health With",
    highlight: "Confidence",
    subtitle: "Track your upcoming appointments, get timely reminders, and maintain your health records — all in one secure, modern platform.",
    cta: "Get Started Now",
    ctaHref: "/register",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=600&auto=format&fit=crop", // ডক্টর ইমেজ ৩
    glowColor: "bg-teal-600/10",
  },
];

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-full bg-slate-950" style={{ height: "clamp(550px, 80vh, 750px)" }} />;
  }

  return (
    <section className="relative w-full bg-slate-950 pt-16 overflow-hidden">
      <style>{`
        .swiper-pagination-bullet {
          background: #475569 !important;
          opacity: 0.5;
          width: 10px;
          height: 10px;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          background: #3b82f6 !important;
          width: 28px;
          border-radius: 6px;
          opacity: 1;
          box-shadow: 0 0 12px rgba(59, 130, 246, 0.6);
        }
        .swiper-pagination {
          bottom: 30px !important;
        }
      `}</style>

      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="w-full"
        style={{ height: "clamp(550px, 80vh, 750px)" }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center border-b border-slate-900 px-4 sm:px-6 lg:px-8">
              
              {/* নিয়ন গ্লো */}
              <div className={`absolute -right-12 top-12 w-[500px] h-[500px] rounded-full ${slide.glowColor} blur-[120px] pointer-events-none`} />

              <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center z-10">
                
                {/* বাম পাশ: কন্টেন্ট */}
                <div className="text-left order-2 md:order-1">
                  <span className="inline-block bg-slate-900/90 backdrop-blur-md text-blue-400 text-xs font-semibold tracking-wider uppercase px-4 py-1.5 rounded-full mb-6 border border-slate-800 shadow-inner">
                    {slide.tag}
                  </span>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.15] mb-2 tracking-tight">
                    {slide.title}
                  </h1>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.15] mb-6 tracking-tight bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-500 bg-clip-text text-transparent">
                    {slide.highlight}
                  </h1>
                  <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
                    {slide.subtitle}
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    <Button
                      as={Link}
                      href={slide.ctaHref}
                      color="primary"
                      size="lg"
                      className="font-semibold text-sm px-8 h-12 rounded-xl shadow-lg shadow-blue-500/20"
                      endContent={<FiArrowRight />}
                    >
                      {slide.cta}
                    </Button>
                  </div>
                </div>

                {/* ডান পাশ: ইমেজ স্লাইড */}
                <div className="relative w-full aspect-square max-w-[450px] mx-auto order-1 md:order-2 flex justify-center items-center">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-indigo-500/0 rounded-3xl blur-2xl pointer-events-none" />
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover rounded-3xl shadow-2xl border border-slate-800/80 transform hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>

              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}