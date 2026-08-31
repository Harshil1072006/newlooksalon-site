import { config } from "../config";
import {
  openDirections,
  openGoogleReview,
  saveContact,
  openInstagram,
  openFacebook,
} from "../utils";

export default function QuickLinks() {
  return (
    <div className="bg-[#0a0a0a] border-b border-white/5 py-10 px-6 lg:px-16 relative z-20">
      <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-center gap-8 sm:gap-14 lg:gap-20">
        
        {config.instagramUrl && (
          // On mobile: opens Instagram app if installed, else browser.
          // On desktop: opens instagram.com in a new tab.
          <button
            onClick={() => openInstagram()}
            aria-label="Visit our Instagram profile"
            className="group flex flex-col items-center gap-3 cursor-pointer bg-transparent border-none p-0 m-0 focus:outline-none"
          >
            <div className="w-16 h-16 rounded-full border border-[#fbb034]/30 bg-[#fbb034]/5 flex items-center justify-center group-hover:bg-[#fbb034] group-hover:border-[#fbb034] group-hover:-translate-y-2 transition-all duration-300 shadow-lg shadow-[#fbb034]/5">
              <svg className="w-7 h-7 text-[#fbb034] group-hover:text-black transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="font-['Poppins',sans-serif] text-[14px] font-medium text-white group-hover:text-[#fbb034] transition-colors duration-300">Instagram</span>
          </button>
        )}

        {config.facebookUrl && (
          // On mobile: opens Facebook app if installed, else browser.
          // On desktop: opens facebook.com in a new tab.
          <button
            onClick={() => openFacebook()}
            aria-label="Visit our Facebook page"
            className="group flex flex-col items-center gap-3 cursor-pointer bg-transparent border-none p-0 m-0 focus:outline-none"
          >
            <div className="w-16 h-16 rounded-full border border-[#fbb034]/30 bg-[#fbb034]/5 flex items-center justify-center group-hover:bg-[#fbb034] group-hover:border-[#fbb034] group-hover:-translate-y-2 transition-all duration-300 shadow-lg shadow-[#fbb034]/5">
              <svg className="w-7 h-7 text-[#fbb034] group-hover:text-black transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="font-['Poppins',sans-serif] text-[14px] font-medium text-white group-hover:text-[#fbb034] transition-colors duration-300">Facebook</span>
          </button>
        )}

        {config.googleReviewUrl && (
          <button
            onClick={() => openGoogleReview()}
            className="group flex flex-col items-center gap-3 cursor-pointer bg-transparent border-none p-0 m-0 focus:outline-none"
          >
            <div className="w-16 h-16 rounded-full border border-[#fbb034]/30 bg-[#fbb034]/5 flex items-center justify-center group-hover:bg-[#fbb034] group-hover:border-[#fbb034] group-hover:-translate-y-2 transition-all duration-300 shadow-lg shadow-[#fbb034]/5">
              <svg className="w-7 h-7 text-[#fbb034] group-hover:text-black transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <span className="font-['Poppins',sans-serif] text-[14px] font-medium text-white group-hover:text-[#fbb034] transition-colors duration-300">Review Us</span>
          </button>
        )}

        {config.googleMapsUrl && (
          <button
            onClick={() => openDirections()}
            className="group flex flex-col items-center gap-3 cursor-pointer bg-transparent border-none p-0 m-0 focus:outline-none"
          >
            <div className="w-16 h-16 rounded-full border border-[#fbb034]/30 bg-[#fbb034]/5 flex items-center justify-center group-hover:bg-[#fbb034] group-hover:border-[#fbb034] group-hover:-translate-y-2 transition-all duration-300 shadow-lg shadow-[#fbb034]/5">
              <svg className="w-7 h-7 text-[#fbb034] group-hover:text-black transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <span className="font-['Poppins',sans-serif] text-[14px] font-medium text-white group-hover:text-[#fbb034] transition-colors duration-300">Directions</span>
          </button>
        )}

        <button
          onClick={() => saveContact()}
          className="group flex flex-col items-center gap-3 cursor-pointer bg-transparent border-none p-0 m-0 focus:outline-none"
        >
          <div className="w-16 h-16 rounded-full border border-[#fbb034]/30 bg-[#fbb034]/5 flex items-center justify-center group-hover:bg-[#fbb034] group-hover:border-[#fbb034] group-hover:-translate-y-2 transition-all duration-300 shadow-lg shadow-[#fbb034]/5">
            <svg className="w-7 h-7 text-[#fbb034] group-hover:text-black transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
               <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
               <circle cx="8.5" cy="7" r="4"></circle>
               <line x1="20" y1="8" x2="20" y2="14"></line>
               <line x1="23" y1="11" x2="17" y2="11"></line>
            </svg>
          </div>
          <span className="font-['Poppins',sans-serif] text-[14px] font-medium text-white group-hover:text-[#fbb034] transition-colors duration-300">Save Contact</span>
        </button>

      </div>
    </div>
  );
}
