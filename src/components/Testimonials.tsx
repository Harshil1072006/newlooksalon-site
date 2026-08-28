import { useState } from "react";
import { config, Review } from "../config";

export default function Testimonials() {
  const [active, setActive] = useState(0);

  if (!config.features.reviews || !config.reviews || config.reviews.length === 0) {
    return null; // Hide if no real reviews
  }

  return (
    <section className="bg-black py-24 px-6 lg:px-16">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: header + nav */}
          <div>
            <p className="font-['Jost',sans-serif] text-[#fbb034] text-[15px] font-medium tracking-widest uppercase mb-4">
              Testimonials
            </p>
            <h2 className="font-['Poppins',sans-serif] font-bold text-white text-[38px] md:text-[44px] leading-[1.1] mb-8">
              What Our Clients Say
            </h2>

            {/* Selector tabs */}
            <div className="flex flex-col gap-4">
              {config.reviews.map((t: Review, i: number) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`flex items-center gap-4 text-left p-4 border-l-4 transition-all duration-200 ${
                    active === i
                      ? "border-[#fbb034] bg-white/5"
                      : "border-transparent hover:border-white/20"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-['Poppins',sans-serif] font-bold text-[13px] shrink-0 transition-colors duration-200 ${
                      active === i ? "bg-[#fbb034] text-black" : "bg-white/10 text-white"
                    }`}
                  >
                    {t.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className={`font-['Poppins',sans-serif] font-bold text-[15px] transition-colors duration-200 ${active === i ? "text-white" : "text-white/50"}`}>
                      {t.name}
                    </p>
                    <p className="font-['Jost',sans-serif] text-[13px] text-[#9a9a9a]">{t.date}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right: active testimonial */}
          <div className="bg-[#0d0d0d] p-10 border border-white/10 relative">
            {/* Large quote mark */}
            <div className="font-['Poppins',sans-serif] font-bold text-[#fbb034]/20 text-[120px] leading-none absolute top-4 left-6 select-none">
              "
            </div>

            <div className="relative z-10">
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: config.reviews[active].rating }).map((_, i) => (
                  <span key={i} className="text-[#fbb034] text-[18px]">★</span>
                ))}
              </div>

              <blockquote className="font-['Poppins',sans-serif] font-normal text-white text-[18px] leading-[1.7] mb-8">
                "{config.reviews[active].text}"
              </blockquote>

              <div className="border-t border-white/10 pt-6">
                <p className="font-['Poppins',sans-serif] font-bold text-white text-[16px]">
                  {config.reviews[active].name}
                </p>
                <p className="font-['Jost',sans-serif] text-[#fbb034] text-[14px] mt-1">
                  {config.reviews[active].date}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
