"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";

export default function AppointmentModal({ doctorName, userEmail }) { // ✅ userEmail props
  const [loading, setLoading] = useState(false);

  const handleAppointment = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const appointmentData = {
      doctorName: doctorName,
      email: userEmail, // ✅ session থেকে আসা email, form input না
      patientName: form.patientName.value,
      gender: form.gender.value,
      phone: form.phone.value,
      appointmentDate: form.appointmentDate.value,
      appointmentTime: form.appointmentTime.value,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointmentData),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Appointment booked successfully! 🎉");
        e.target.reset();
      } else {
        toast.error("Failed to book appointment!");
      }
    } catch (error) {
      toast.error("Server error! Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal>
      <Modal.Trigger>
        <button className="mt-8 bg-blue-600 hover:bg-blue-500 py-3 px-8 rounded-2xl font-semibold transition-all w-full md:w-auto text-white">
          Book Appointment
        </button>
      </Modal.Trigger>
      <Modal.Backdrop>
        <Modal.Container placement="center">
          <Modal.Dialog className="sm:max-w-xl">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Appointment Booking</Modal.Heading>
              <p className="text-sm text-gray-500 mt-2">Fill the form to confirm appointment</p>
            </Modal.Header>
            <Modal.Body>
              <Surface variant="default">
                <form onSubmit={handleAppointment} className="flex flex-col gap-4 p-2">
                  <TextField className="w-full">
                    <Label>Doctor Name</Label>
                    <Input value={doctorName} readOnly />
                  </TextField>

                  {/* ✅ Email দেখাবে কিন্তু change করা যাবে না */}
                  <TextField className="w-full">
                    <Label>Your Email</Label>
                    <Input value={userEmail || ""} readOnly className="opacity-60 cursor-not-allowed" />
                  </TextField>

                  <TextField className="w-full">
                    <Label>Patient Name</Label>
                    <Input name="patientName" placeholder="Enter patient name" required />
                  </TextField>
                  <div className="flex flex-col gap-2">
                    <Label>Gender</Label>
                    <select name="gender" required className="border rounded-xl px-4 py-3 bg-transparent outline-none">
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <TextField className="w-full">
                    <Label>Phone</Label>
                    <Input name="phone" placeholder="01XXXXXXXX" required />
                  </TextField>
                  <TextField className="w-full">
                    <Label>Date</Label>
                    <Input name="appointmentDate" type="date" required />
                  </TextField>
                  <TextField className="w-full">
                    <Label>Time</Label>
                    <Input name="appointmentTime" type="time" required />
                  </TextField>
                  <Button type="submit" disabled={loading || !userEmail}>
                    {loading ? "Booking..." : "Confirm Appointment"}
                  </Button>
                </form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}