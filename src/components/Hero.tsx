import textureBg from "@/imports/LandingPage/43ea96a5ec62bb14cf7ef726d48cca0c6edb5fff.png";
import barberImg from "@/imports/LandingPage/46fe9c0a350ac22f0aefa37429c9a5a5efe9457f.png";
import { config } from "../config";
import { openWhatsApp } from "../utils";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative w-full min-h-screen overflow-hidden bg-black"
    >
      {/* Grunge texture overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={textureBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
      </div>

      {/* Barber image — right side */}
      <div className="absolute right-0 bottom-0 top-0 w-[55%] md:w-[52%] pointer-events-none hidden md:block">
        <img
          src={config.heroImage}
          alt="Professional barber styling hair"
          className="absolute inset-0 w-full h-full object-cover object-left"
        />
        {/* Fade to black on the left edge */}
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-black to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-16 pt-[160px] pb-[100px] min-h-screen flex flex-col justify-center">
        <div className="max-w-[480px]">
          {/* Welcome label */}
          <p className="font-['Jost',sans-serif] font-normal text-[#fbb034] text-[16px] mb-5 tracking-wide">
            Welcome To {config.name}
          </p>

          {/* Main heading */}
          <h1 className="font-['Poppins',sans-serif] font-bold text-white text-[42px] md:text-[52px] leading-[1.05] mb-6">
            {config.tagline}
          </h1>

          {/* Description */}
          <p className="font-['Poppins',sans-serif] font-normal text-[#9a9a9a] text-[18px] md:text-[20px] leading-[1.55] mb-10 max-w-[380px]">
            {config.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => openWhatsApp()}
              className="inline-block bg-[#fbb034] hover:bg-[#ffd600] transition-colors duration-200 px-[53px] py-[18px] font-['Poppins',sans-serif] font-bold text-[15px] text-black"
            >
              Book Now
            </button>
            <a
              href="#services"
              className="inline-block border border-white hover:border-[#fbb034] hover:text-[#fbb034] transition-colors duration-200 px-[53px] py-[18px] font-['Poppins',sans-serif] font-bold text-[15px] text-white"
            >
              All Services
            </a>
          </div>
        </div>
      </div>

      {/* Mobile barber image */}
      <div className="md:hidden relative w-full h-[280px] mt-[-40px]">
        <img
          src={config.heroImage}
          alt="Professional barber styling hair"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-y-0 left-0 right-0 top-0 h-16 bg-gradient-to-b from-black to-transparent" />
      </div>
    </section>
  );
}
