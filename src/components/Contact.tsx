import { useState } from "react";
import { config } from "../config";
import { openWhatsApp } from "../utils";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const serviceName = config.services.find(s => s.id === form.service)?.name || form.service;
    
    const msg = `Hi New Look Salon,
I would like to book an appointment.

Service: ${serviceName || 'General'}
Preferred Date: ${form.date || 'Flexible'}
Preferred Time: ${form.time || 'Flexible'}

Name: ${form.name}
Phone: ${form.phone}
Email: ${form.email}

Notes: ${form.message}

Please confirm availability.`;

    openWhatsApp(msg);
  };

  const openHours = config.openingHours.filter(h => h.open);

  return (
    <section id="contact" className="bg-[#0a0a0a] py-24 px-6 lg:px-16">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-14">
          <p className="font-['Jost',sans-serif] text-[#fbb034] text-[15px] font-medium tracking-widest uppercase mb-4">
            Get In Touch
          </p>
          <h2 className="font-['Poppins',sans-serif] font-bold text-white text-[38px] md:text-[46px] leading-[1.1]">
            Book Your Appointment
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="bg-black border border-white/15 focus:border-[#fbb034] outline-none px-5 py-4 font-['Poppins',sans-serif] text-white text-[14px] placeholder:text-white/30 transition-colors duration-200"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  className="bg-black border border-white/15 focus:border-[#fbb034] outline-none px-5 py-4 font-['Poppins',sans-serif] text-white text-[14px] placeholder:text-white/30 transition-colors duration-200"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="bg-black border border-white/15 focus:border-[#fbb034] outline-none px-5 py-4 font-['Poppins',sans-serif] text-white text-[14px] placeholder:text-white/30 transition-colors duration-200"
                />
                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  required
                  className="bg-black border border-white/15 focus:border-[#fbb034] outline-none px-5 py-4 font-['Poppins',sans-serif] text-[14px] placeholder:text-white/30 transition-colors duration-200 appearance-none cursor-pointer"
                  style={{ color: form.service ? "#fff" : "rgba(255,255,255,0.3)" }}
                >
                  <option value="" disabled>Select a Service</option>
                  {config.services.map(s => (
                    <option key={s.id} value={s.id} className="text-white bg-black">{s.name}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                  className="bg-black border border-white/15 focus:border-[#fbb034] outline-none px-5 py-4 font-['Poppins',sans-serif] text-white text-[14px] placeholder:text-white/30 transition-colors duration-200"
                  style={{ color: form.date ? "#fff" : "rgba(255,255,255,0.3)" }}
                />
                <input
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  required
                  className="bg-black border border-white/15 focus:border-[#fbb034] outline-none px-5 py-4 font-['Poppins',sans-serif] text-white text-[14px] placeholder:text-white/30 transition-colors duration-200"
                  style={{ color: form.time ? "#fff" : "rgba(255,255,255,0.3)" }}
                />
              </div>
              <textarea
                name="message"
                placeholder="Additional Notes (optional)"
                rows={4}
                value={form.message}
                onChange={handleChange}
                className="bg-black border border-white/15 focus:border-[#fbb034] outline-none px-5 py-4 font-['Poppins',sans-serif] text-white text-[14px] placeholder:text-white/30 transition-colors duration-200 resize-none"
              />
              <button
                type="submit"
                className="bg-[#fbb034] hover:bg-[#ffd600] transition-colors duration-200 py-[18px] px-10 font-['Poppins',sans-serif] font-bold text-[15px] text-black self-start"
              >
                Send Request via WhatsApp
              </button>
            </form>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-10">
            {config.address && (
              <div>
                <h3 className="font-['Poppins',sans-serif] font-bold text-white text-[18px] mb-4 pb-3 border-b border-white/10">
                  Location
                </h3>
                <p className="font-['Poppins',sans-serif] text-[#9a9a9a] text-[15px] leading-[1.8] whitespace-pre-wrap">
                  {config.address}<br />
                  {config.city}, {config.state} {config.pincode || ''}
                </p>
                {config.googleMapsUrl && (
                  <a href={config.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-[#fbb034] hover:underline text-[14px]">
                    Get Directions
                  </a>
                )}
              </div>
            )}

            {openHours.length > 0 && (
              <div>
                <h3 className="font-['Poppins',sans-serif] font-bold text-white text-[18px] mb-4 pb-3 border-b border-white/10">
                  Opening Hours
                </h3>
                <div className="flex flex-col gap-3">
                  {openHours.map((h) => (
                    <div key={h.day} className="flex justify-between">
                      <span className="font-['Poppins',sans-serif] text-[#9a9a9a] text-[14px]">{h.label}</span>
                      <span className="font-['Poppins',sans-serif] font-bold text-white text-[14px]">{h.open} – {h.close}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(config.phone || config.email) && (
              <div>
                <h3 className="font-['Poppins',sans-serif] font-bold text-white text-[18px] mb-4 pb-3 border-b border-white/10">
                  Contact
                </h3>
                <div className="flex flex-col gap-2">
                  {config.phone && (
                    <a href={`tel:${config.phone.replace(/\s/g, '')}`} className="font-['Poppins',sans-serif] text-[#9a9a9a] hover:text-[#fbb034] text-[15px] transition-colors duration-200">
                      {config.phone}
                    </a>
                  )}
                  {config.email && (
                    <a href={`mailto:${config.email}`} className="font-['Poppins',sans-serif] text-[#9a9a9a] hover:text-[#fbb034] text-[15px] transition-colors duration-200">
                      {config.email}
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
