"use client";

import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

interface BookingProps {
  isVisible: boolean;
  onClose: () => void;
}

const Booking = ({ isVisible, onClose }: BookingProps) => {
  const [formData, setFormData] = useState({
    service: "",
    date: "",
    time: "",
    guests: "2",
    name: "",
    email: "",
    phone: "",
    specialRequests: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Prevent background scroll
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isVisible]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        service: formData.service || "Not selected",
        date: formData.date,
        time: formData.time,
        guests: formData.guests,
        message: formData.specialRequests || "No special requests",
      };

      await emailjs.send(
        "YOUR_SERVICE_ID",      // ← Replace with your EmailJS Service ID
        "YOUR_TEMPLATE_ID",     // ← Replace with your EmailJS Template ID
        templateParams,
        "YOUR_PUBLIC_KEY"       // ← Replace with your EmailJS Public Key
      );

      setIsSuccess(true);
    } catch (error) {
      alert("Failed to send booking. Please try again.");
      console.error("EmailJS Error:", error);
    } finally {
      setIsSubmitting(false);
    }

    // Auto close after success
    setTimeout(() => {
      if (isSuccess) {
        setFormData({
          service: "",
          date: "",
          time: "",
          guests: "2",
          name: "",
          email: "",
          phone: "",
          specialRequests: "",
        });
        onClose();
      }
    }, 2000);
  };

  const availableTimes = ["12:00", "12:30", "13:00", "13:30", "14:00", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30"];

  return (
    <>
      {/* Backdrop */}
      <div
        className={`
          fixed inset-0 z-[9999] bg-black/90 backdrop-blur-2xl
          transition-opacity duration-500 ease-in-out
          ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`
          fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6
          transition-all duration-500 ease-in-out overflow-auto
          ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full max-w-lg sm:max-w-4xl bg-zinc-950 border border-white/10 rounded-3xl overflow-hidden shadow-2xl my-auto">
          <div className="relative px-6 sm:px-12 pt-10 sm:pt-12 pb-8 border-b border-white/10">
            <h1 className="text-4xl sm:text-5xl font-light tracking-tighter">Book Your Experience</h1>
            <p className="text-lg sm:text-xl text-white/60 mt-3">Reserve your table at The Atelier</p>
          </div>

          <div className="max-h-[88vh] sm:max-h-[85vh] overflow-y-auto p-6 sm:p-12">
            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm uppercase tracking-widest text-white/60 mb-2">Service</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-5 py-4 text-base sm:text-lg focus:outline-none focus:border-white/30 transition-colors"
                    >
                      <option value="">Select Experience</option>
                      <option value="dinner">Dinner (à la carte)</option>
                      <option value="tasting">Chef's Tasting Menu</option>
                      <option value="wine">Wine Pairing Dinner</option>
                      <option value="private">Private Dining Room</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm uppercase tracking-widest text-white/60 mb-2">Date</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-5 py-4 text-base sm:text-lg focus:outline-none focus:border-white/30 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm uppercase tracking-widest text-white/60 mb-2">Time</label>
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-5 py-4 text-base sm:text-lg focus:outline-none focus:border-white/30 transition-colors"
                    >
                      <option value="">Select Time</option>
                      {availableTimes.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm uppercase tracking-widest text-white/60 mb-2">Guests</label>
                    <select
                      name="guests"
                      value={formData.guests}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-5 py-4 text-base sm:text-lg focus:outline-none focus:border-white/30 transition-colors"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? "Guest" : "Guests"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <h3 className="text-lg font-medium mb-6">Contact Information</h3>
                  <div className="space-y-6">
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-5 py-4 text-base sm:text-lg placeholder:text-white/40 focus:outline-none focus:border-white/30 transition-colors"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-5 py-4 text-base sm:text-lg placeholder:text-white/40 focus:outline-none focus:border-white/30 transition-colors"
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-5 py-4 text-base sm:text-lg placeholder:text-white/40 focus:outline-none focus:border-white/30 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm uppercase tracking-widest text-white/60 mb-3">Special Requests</label>
                  <textarea
                    name="specialRequests"
                    placeholder="Allergies, dietary requirements, special occasion..."
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full bg-zinc-900 border border-white/10 rounded-3xl px-5 py-5 text-base sm:text-lg placeholder:text-white/40 focus:outline-none focus:border-white/30 resize-y min-h-[110px] transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-8 bg-white text-black font-medium py-5 rounded-2xl text-lg sm:text-xl tracking-wide hover:bg-white/90 active:scale-[0.985] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "SENDING BOOKING..." : "CONFIRM RESERVATION"}
                </button>
              </form>
            ) : (
              <div className="text-center py-16 sm:py-20 px-6">
                <div className="mx-auto w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-8">
                  <span className="text-6xl">✓</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-light mb-4">Reservation Confirmed</h2>
                <p className="text-lg sm:text-xl text-white/70">Thank you! We look forward to welcoming you.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        className={`
          fixed top-6 right-6 sm:top-8 sm:right-8 text-white text-5xl sm:text-6xl 
          hover:scale-110 transition-transform z-[10001]
          ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      >
        ✕
      </button>
    </>
  );
};

export default Booking;