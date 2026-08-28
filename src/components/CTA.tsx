import textureBg from "@/imports/LandingPage/43ea96a5ec62bb14cf7ef726d48cca0c6edb5fff.png";
import { config } from "../config";
import { openWhatsApp, openCall } from "../utils";

export default function CTA() {
  return (
    <section className="relative bg-black py-24 px-6 lg:px-16 overflow-hidden">
      {/* Texture overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={textureBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-[#fbb034]/5" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto text-center">
        <p className="font-['Jost',sans-serif] text-[#fbb034] text-[15px] font-medium tracking-widest uppercase mb-4">
          Ready to Transform?
        </p>
        <h2 className="font-['Poppins',sans-serif] font-bold text-white text-[40px] md:text-[52px] leading-[1.1] mb-6 max-w-[640px] mx-auto">
          Book Your Session at {config.name} Today
        </h2>
        <p className="font-['Poppins',sans-serif] font-normal text-[#9a9a9a] text-[17px] leading-[1.7] mb-10 max-w-[500px] mx-auto">
          Walk in looking good. Walk out looking exceptional. Our team is ready to give you the look you deserve.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => openWhatsApp()}
            className="inline-block bg-[#fbb034] hover:bg-[#ffd600] transition-colors duration-200 px-[53px] py-[18px] font-['Poppins',sans-serif] font-bold text-[15px] text-black"
          >
            Book Now
          </button>
          {config.phone && (
            <button
              onClick={() => openCall()}
              className="inline-block border border-white/30 hover:border-[#fbb034] hover:text-[#fbb034] transition-colors duration-200 px-[53px] py-[18px] font-['Poppins',sans-serif] font-bold text-[15px] text-white"
            >
              Call Us
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
