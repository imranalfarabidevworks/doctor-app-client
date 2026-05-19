"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Spinner, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/react";
import { getTopDoctors } from "@/app/data/DoctorData"; // তোমার তৈরি করা ডাটা ফাংশন
import { FiMapPin, FiClock, FiBriefcase, FiDollarSign, FiActivity, FiUser, FiPhone, FiCalendar } from "react-icons/fi";
import { toast } from "react-hot-toast"; // অথবা তোমার প্রজেক্টে ব্যবহৃত টোস্ট লাইব্রেরি

export default function DoctorDetails() {
  const { id } = useParams();
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // ফর্ম স্টেট (মঙ্গোডিবি-তে সেভ করার ডেমো ডেটা ফরম্যাট অনুযায়ী)
  const [formData, setFormData] = useState({
    patientName: "",
    gender: "Male",
    phone: "",
    appointmentDate: "",
    appointmentTime: "",
  });

  // ডাইনামিক ডক্টর ডেটা লোড করা
  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const data = await getTopDoctors();
        // ID ম্যাচ করে নির্দিষ্ট ডক্টরকে খুঁজে বের করা
        const singleDoctor = data.find((doc) => (doc._id || doc.id) === id);
        setDoctor(singleDoctor);
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctorDetails();
  }, [id]);

  // ইনপুট চেঞ্জ হ্যান্ডলার
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ফর্ম সাবমিট হ্যান্ডলার (MongoDB Integration)
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const bookingData = {
      userEmail: "user@gmail.com", // Better Auth সেটআপের পর এটি সেশন থেকে ডাইনামিক হবে
      doctorName: doctor.name,
      ...formData,
    };

    try {
      // 🚀 এখানে তোমার এক্সপ্রেস ব্যাকএন্ডের বুকিং এপিআই কল হবে
      // const response = await fetch("YOUR_BACKEND_API/bookings", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(bookingData),
      // });
      
      // ডামি সাকসেস রেসপন্স (টেস্টিং এর জন্য)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // রিকোয়ারমেন্ট মেসেজ: “Appointment booked successfully!” (কোনো ডিফল্ট অ্যালার্ট ব্যবহার করা যাবে না)
      toast.success("Appointment booked successfully!"); 
      
      onClose(); // মোডাল বন্ধ করা
      router.push("/dashboard"); // বুকিং শেষে ড্যাশবোর্ডে রিডাইরেক্ট
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 gap-3">
        <Spinner size="lg" color="primary" />
        <p className="text-slate-500 text-sm font-medium">Loading specialist profiles...</p>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-center px-4">
        <h2 className="text-2xl font-bold text-white mb-2">Specialist Not Found</h2>
        <p className="text-slate-400 text-sm mb-6">The requested doctor's profile could not be located.</p>
        <Button onClick={() => router.push("/appointments")} className="bg-blue-600 text-white rounded-xl">Back to List</Button>
      </div>
    );
  }

  return (
    <section className="bg-slate-950 min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* মেইন ডটকম গ্রিড লেআউট */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          
          {/* বাঁদিকের পার্ট: ইমেজ কার্ড */}
          <div className="md:col-span-1 bg-slate-900/20 backdrop-blur-sm border border-slate-900 rounded-3xl p-4 overflow-hidden">
            <div className="relative w-full aspect-[3/4] overflow-hidden rounded-2xl bg-slate-950 mb-4">
              <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover object-top" />
            </div>
            <div className="bg-blue-950/20 border border-blue-900/30 rounded-2xl p-4 text-center">
              <p className="text-xs text-slate-500 uppercase font-medium">Consultation Fee</p>
              <p className="text-2xl font-extrabold text-emerald-400 mt-1">৳ {doctor.fee}</p>
            </div>
          </div>

          {/* ডানদিকের পার্ট: ডক্টর ফুল ডিটেইলস */}
          <div className="md:col-span-2 flex flex-col h-full bg-slate-900/10 backdrop-blur-sm border border-slate-900 rounded-3xl p-6 sm:p-8">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest bg-blue-950/40 px-3 py-1.5 rounded-xl border border-blue-900/30 w-fit mb-3">
              {doctor.specialty}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 tracking-tight">{doctor.name}</h1>
            
            <div className="flex flex-wrap gap-4 items-center text-sm text-slate-400 mb-6">
              <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1 rounded-lg border border-slate-900">
                <FiBriefcase className="text-blue-500" /> <span>{doctor.experience} Experience</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1 rounded-lg border border-slate-900">
                <FiActivity className="text-blue-500" /> <span>Highly Rated</span>
              </div>
            </div>

            <h3 className="text-white font-semibold text-base mb-2 border-b border-slate-900 pb-2">Professional Biography</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">{doctor.description}</p>

            {/* চেম্বার ও সিডিউল কার্ড */}
            <h3 className="text-white font-semibold text-base mb-4">Chamber & Schedules</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-900 flex gap-3 items-start">
                <FiMapPin className="text-blue-500 text-lg mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-white font-medium text-sm mb-1">Hospital Location</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">{doctor.hospital}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{doctor.location || "Dhaka, Bangladesh"}</p>
                </div>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-900 flex gap-3 items-start">
                <FiClock className="text-blue-500 text-lg mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-white font-medium text-sm mb-1">Available Hours</h4>
                  {doctor.availability?.map((time, idx) => (
                    <p key={idx} className="text-slate-400 text-xs mb-0.5">{time}</p>
                  )) || <p className="text-slate-400 text-xs">Contact for schedule</p>}
                </div>
              </div>
            </div>

            {/* রিকোয়ারমেন্ট বাটন: Book Appointment */}
            <Button onClick={onOpen} className="w-full sm:w-fit mt-auto bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 h-12 rounded-xl transition-all shadow-lg shadow-blue-500/10">
              Book Appointment
            </Button>
          </div>

        </div>

        {/* 📌 APPOINTMENT BOOKING MODAL FORM */}
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" classNames={{
          base: "bg-slate-950 border border-slate-900 rounded-3xl p-2 max-w-md mx-4",
          header: "text-white font-bold text-xl border-b border-slate-900 pb-3",
          closeButton: "hover:bg-slate-900 text-slate-400 rounded-xl"
        }}>
          <ModalContent>
            {(onClose) => (
              <form onSubmit={handleBookingSubmit}>
                <ModalHeader>Confirm Appointment</ModalHeader>
                <ModalBody className="py-6 space-y-4">
                  
                  {/* ডাক্তার ইনফো (Read-only) */}
                  <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-900 text-xs text-slate-400">
                    Consulting: <span className="text-white font-semibold">{doctor.name}</span>
                  </div>

                  {/* Patient Name */}
                  <div className="space-y-1.5">
                    <label className="text-slate-400 text-xs font-medium flex items-center gap-1"><FiUser/> Patient Name</label>
                    <input type="text" name="patientName" required value={formData.patientName} onChange={handleInputChange} placeholder="Enter patient's full name" className="w-full bg-slate-900 text-white px-4 py-2.5 rounded-xl border border-slate-800 focus:border-blue-500 focus:outline-none text-sm transition-all" />
                  </div>

                  {/* Gender Selector */}
                  <div className="space-y-1.5">
                    <label className="text-slate-400 text-xs font-medium flex items-center gap-1"><FiUser/> Gender</label>
                    <select name="gender" value={formData.gender} onChange={handleInputChange} className="w-full bg-slate-900 text-white px-4 py-2.5 rounded-xl border border-slate-800 focus:border-blue-500 focus:outline-none text-sm transition-all cursor-pointer">
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-slate-400 text-xs font-medium flex items-center gap-1"><FiPhone/> Contact Number</label>
                    <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} placeholder="e.g. 01712345678" className="w-full bg-slate-900 text-white px-4 py-2.5 rounded-xl border border-slate-800 focus:border-blue-500 focus:outline-none text-sm transition-all" />
                  </div>

                  {/* Date & Time Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-slate-400 text-xs font-medium flex items-center gap-1"><FiCalendar/> Date</label>
                      <input type="date" name="appointmentDate" required value={formData.appointmentDate} onChange={handleInputChange} className="w-full bg-slate-900 text-white px-3 py-2.5 rounded-xl border border-slate-800 focus:border-blue-500 focus:outline-none text-sm transition-all text-slate-400" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-slate-400 text-xs font-medium flex items-center gap-1"><FiClock/> Time Slot</label>
                      <select name="appointmentTime" required value={formData.appointmentTime} onChange={handleInputChange} className="w-full bg-slate-900 text-white px-3 py-2.5 rounded-xl border border-slate-800 focus:border-blue-500 focus:outline-none text-sm transition-all cursor-pointer text-slate-400">
                        <option value="">Select Time</option>
                        {doctor.availability?.map((time, idx) => (
                          <option key={idx} value={time}>{time}</option>
                        )) || <option value="10:30 AM">10:30 AM</option>}
                      </select>
                    </div>
                  </div>

                </ModalBody>
                <ModalFooter className="border-t border-slate-900 pt-3">
                  <Button type="button" variant="flat" onClick={onClose} className="text-slate-400 hover:bg-slate-900 text-sm rounded-xl px-5">
                    Cancel
                  </Button>
                  <Button type="submit" isLoading={submitting} className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm rounded-xl px-6">
                    Confirm Slot
                  </Button>
                </ModalFooter>
              </form>
            )}
          </ModalContent>
        </Modal>

      </div>
    </section>
  );
}