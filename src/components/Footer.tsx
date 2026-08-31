import { config } from "../config";
import { openInstagram, openFacebook } from "../utils";

const footerLinks = {
  Services: config.services.map(s => s.name).slice(0, 6), // Top 6 services
  Company: ["About Us", "Our Team", "Careers", "Press"],
  Support: ["Book Appointment", "FAQ", "Pricing", "Contact"],
};

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8 px-6 lg:px-16">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <span className="font-['Poppins',sans-serif] font-bold text-white text-[20px]">{config.name}</span>
            </div>
            <p className="font-['Poppins',sans-serif] text-[#9a9a9a] text-[14px] leading-[1.8] max-w-[280px] mb-6">
              {config.description}
            </p>
            <div className="flex gap-3">
              {config.instagramUrl && (
                <button
                  onClick={() => openInstagram()}
                  aria-label="Visit our Instagram profile"
                  className="w-9 h-9 border border-white/15 hover:border-[#fbb034] hover:text-[#fbb034] flex items-center justify-center font-['Poppins',sans-serif] font-bold text-[11px] text-white/50 transition-colors duration-200 bg-transparent cursor-pointer"
                >
                  IG
                </button>
              )}
              {config.facebookUrl && (
                <button
                  onClick={() => openFacebook()}
                  aria-label="Visit our Facebook page"
                  className="w-9 h-9 border border-white/15 hover:border-[#fbb034] hover:text-[#fbb034] flex items-center justify-center font-['Poppins',sans-serif] font-bold text-[11px] text-white/50 transition-colors duration-200 bg-transparent cursor-pointer"
                >
                  FB
                </button>
              )}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-['Poppins',sans-serif] font-bold text-white text-[14px] mb-5 pb-3 border-b border-white/10">
                {category}
              </h4>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-['Poppins',sans-serif] text-[#9a9a9a] hover:text-[#fbb034] text-[14px] transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-7 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-['Poppins',sans-serif] text-[#9a9a9a] text-[13px]">
            © {new Date().getFullYear()} {config.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="font-['Poppins',sans-serif] text-[#9a9a9a] hover:text-white text-[13px] transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="font-['Poppins',sans-serif] text-[#9a9a9a] hover:text-white text-[13px] transition-colors duration-200">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
