import { useState } from "react";
import { config } from "../config";
import { openWhatsApp } from "../utils";
import logoImg from "../assets/logo.jpeg";

const navLinks = [
  { label: "Home", href: "#home", active: true },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

// Smooth scroll to a section with header offset
function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    const headerHeight = 96;
    const top = el.getBoundingClientRect().top + window.scrollY - headerHeight;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/5">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 min-h-[96px] py-3 flex items-center justify-between">
        {/* Logo */}
        <a 
          href="#home" 
          onClick={(e) => { e.preventDefault(); scrollToSection("home"); setActiveLink("Home"); }}
          className="flex items-center gap-3 shrink-0"
        >
          <img
            src={logoImg}
            alt={config.name}
            className="h-[60px] w-[60px] md:h-[72px] md:w-[72px] rounded-full object-cover shadow-md border border-[#fbb034]/30"
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-12">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                setActiveLink(link.label);
                scrollToSection(link.href.replace("#", ""));
              }}
              className={`font-['Poppins',sans-serif] font-bold text-[15px] transition-colors duration-200 hover:text-[#fbb034] ${
                activeLink === link.label ? "text-[#fbb034]" : "text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Book Now Button */}
        <button
          onClick={() => openWhatsApp()}
          className="hidden md:block bg-[#fbb034] hover:bg-[#ffd600] transition-colors duration-200 px-8 py-[14px] font-['Poppins',sans-serif] font-bold text-[15px] text-black whitespace-nowrap"
        >
          Book Now
        </button>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block h-[2px] w-6 bg-white transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`block h-[2px] w-6 bg-white transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-[2px] w-6 bg-white transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black border-t border-white/10 px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                setActiveLink(link.label);
                setMenuOpen(false);
                // Wait for menu to close, then scroll smoothly with header offset
                setTimeout(() => {
                  scrollToSection(link.href.replace("#", ""));
                }, 150);
              }}
              className={`font-['Poppins',sans-serif] font-bold text-[15px] transition-colors duration-200 ${
                activeLink === link.label ? "text-[#fbb034]" : "text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => { openWhatsApp(); setMenuOpen(false); }}
            className="bg-[#fbb034] text-black font-['Poppins',sans-serif] font-bold text-[15px] px-8 py-[14px] text-center mt-2 w-full"
          >
            Book Now
          </button>
        </div>
      )}
    </header>
  );
}
