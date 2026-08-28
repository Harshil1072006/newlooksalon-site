import { useState } from "react";
import { config, Service } from "../config";
import { openWhatsApp } from "../utils";

const categoryIcons: Record<string, string> = {
  "Hair": "✂",
  "Treatments": "⌘",
  "Skin & Facials": "✨",
  "Makeup": "💄",
  "Bridal": "💍",
};

export default function Services() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="services" className="bg-[#0a0a0a] py-24 px-6 lg:px-16">
      <div className="max-w-[1440px] mx-auto">
        {/* Section header */}
        <div className="mb-16">
          <p className="font-['Jost',sans-serif] text-[#fbb034] text-[15px] font-medium tracking-widest uppercase mb-4">
            What We Offer
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-['Poppins',sans-serif] font-bold text-white text-[38px] md:text-[46px] leading-[1.1] max-w-[480px]">
              Our Premium Services
            </h2>
            <button
              onClick={() => openWhatsApp()}
              className="inline-block self-start md:self-auto bg-[#fbb034] hover:bg-[#ffd600] transition-colors duration-200 px-10 py-[16px] font-['Poppins',sans-serif] font-bold text-[15px] text-black shrink-0"
            >
              Book Appointment
            </button>
          </div>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
          {config.services.map((service: Service) => (
            <div
              key={service.id}
              onClick={() => openWhatsApp(service.whatsappMsg)}
              onMouseEnter={() => setHovered(service.id)}
              onMouseLeave={() => setHovered(null)}
              className={`group relative bg-[#0a0a0a] p-10 transition-colors duration-300 cursor-pointer ${
                hovered === service.id ? "bg-[#111]" : ""
              }`}
            >
              {/* Amber left border on hover */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-[3px] bg-[#fbb034] transition-opacity duration-300 ${
                  hovered === service.id ? "opacity-100" : "opacity-0"
                }`}
              />

              <div
                className={`text-[32px] mb-6 transition-colors duration-300 ${
                  hovered === service.id ? "text-[#fbb034]" : "text-white/30"
                }`}
              >
                {categoryIcons[service.category] || "◈"}
              </div>

              <h3 className="font-['Poppins',sans-serif] font-bold text-white text-[20px] mb-3">
                {service.name}
              </h3>
              <p className="font-['Poppins',sans-serif] font-normal text-[#9a9a9a] text-[14px] leading-[1.7] mb-6">
                {service.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="font-['Poppins',sans-serif] font-bold text-[#fbb034] text-[16px]">
                  {service.startingPrice ? `from ${service.startingPrice}` : 'Book Now'}
                </span>
                <span className="font-['Jost',sans-serif] text-white/40 text-[13px]">
                  {service.duration || 'Varies'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
