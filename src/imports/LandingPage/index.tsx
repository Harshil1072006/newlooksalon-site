import svgPaths from "./svg-tw7ettk8qf";
import imgRectangle1 from "./43ea96a5ec62bb14cf7ef726d48cca0c6edb5fff.png";
import imgImage2 from "./46fe9c0a350ac22f0aefa37429c9a5a5efe9457f.png";
import imgChoppersLogoWhitePng12 from "./67a28a686458020b92f3c6822baa8a07a3535137.png";
type ComponentProps = {
  className?: string;
  property1?: "Group 1" | "Group 2" | "Variant3";
};

function Component({ className, property1 = "Group 1" }: ComponentProps) {
  if (property1 === "Variant3") {
    return (
      <div className={className || "bg-[#ffd600] relative"} data-name="Property 1=Variant3">
        <div className="content-stretch flex items-start px-[53px] py-[18px] relative size-full">
          <p className="[word-break:break-word] font-['Poppins:Bold',sans-serif] leading-[1.065] not-italic relative shrink-0 text-[15px] text-black whitespace-nowrap">Book Now</p>
        </div>
      </div>
    );
  }
  if (property1 === "Group 2") {
    return (
      <button className={className || "bg-black cursor-pointer relative"} data-name="Property 1=Group 2">
        <div className="content-stretch flex items-start px-[53px] py-[18px] relative size-full">
          <p className="[word-break:break-word] font-['Poppins:Bold',sans-serif] leading-[1.065] not-italic relative shrink-0 text-[15px] text-left text-white whitespace-nowrap">Book Now</p>
        </div>
      </button>
    );
  }
  return (
    <div className={className || "bg-[#fbb034] relative"} data-name="Property 1=Group 1">
      <div className="content-stretch flex items-start px-[53px] py-[18px] relative size-full">
        <p className="[word-break:break-word] font-['Poppins:Bold',sans-serif] leading-[1.065] not-italic relative shrink-0 text-[15px] text-black whitespace-nowrap">Book Now</p>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-0 top-0">
      <p className="[word-break:break-word] absolute font-['Poppins:Bold',sans-serif] h-[16px] leading-[1.065] left-0 not-italic text-[15px] text-white top-0 w-[90px]">All Services</p>
      <div className="absolute border border-solid border-white h-[53px] left-0 top-0 w-[182px]" />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute h-[28px] left-0 top-0 w-[87px]">
      <div className="absolute inset-[0_-1.15%_0_0]">
        <svg className="block size-full" fill="none" height="28" preserveAspectRatio="none" viewBox="0 0 88 28" width="88">
          <g id="Group 136">
            <g id="Saloon">
              <mask fill="black" height="13" id="path-1-outside-1_0_6" maskUnits="userSpaceOnUse" width="42" x="46" y="8">
                <rect fill="white" height="13" width="42" x="46" y="8" />
                <path d={svgPaths.p17cd7e40} />
                <path d={svgPaths.p122ecc80} />
                <path d={svgPaths.p115c1300} />
                <path d={svgPaths.p31d99f70} />
                <path d={svgPaths.p3e8a8100} />
              </mask>
              <path d={svgPaths.p17cd7e40} fill="white" />
              <path d={svgPaths.p122ecc80} fill="white" />
              <path d={svgPaths.p115c1300} fill="white" />
              <path d={svgPaths.p31d99f70} fill="white" />
              <path d={svgPaths.p3e8a8100} fill="white" />
              <path d={svgPaths.p17cd7e40} mask="url(#path-1-outside-1_0_6)" stroke="#BDBDBD" strokeWidth="2" />
              <path d={svgPaths.p122ecc80} mask="url(#path-1-outside-1_0_6)" stroke="#BDBDBD" strokeWidth="2" />
              <path d={svgPaths.p115c1300} mask="url(#path-1-outside-1_0_6)" stroke="#BDBDBD" strokeWidth="2" />
              <path d={svgPaths.p31d99f70} mask="url(#path-1-outside-1_0_6)" stroke="#BDBDBD" strokeWidth="2" />
              <path d={svgPaths.p3e8a8100} mask="url(#path-1-outside-1_0_6)" stroke="#BDBDBD" strokeWidth="2" />
            </g>
            <g clipPath="url(#clip0_0_6)" id="Logo">
              <path d={svgPaths.pa505700} fill="white" id="Vector" />
              <path d={svgPaths.p2e919e80} fill="white" id="Vector_2" />
            </g>
          </g>
          <defs>
            <clipPath id="clip0_0_6">
              <rect fill="white" height="28" width="42" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="contents relative size-full" data-name="landing page">
      <div className="absolute h-[831px] left-0 top-0 w-[1440px]">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute bg-black inset-0" />
          <img alt="" className="absolute max-w-none object-cover opacity-30 size-full" src={imgRectangle1} />
        </div>
      </div>
      <p className="[word-break:break-word] absolute font-['Poppins:Bold',sans-serif] h-[16px] leading-[1.065] left-0 not-italic text-[#fbb034] text-[15px] top-0 w-[47px]">Home</p>
      <p className="[word-break:break-word] absolute font-['Poppins:Bold',sans-serif] h-[16px] leading-[1.065] left-0 not-italic text-[15px] text-white top-0 w-[71px]">About Us</p>
      <p className="[word-break:break-word] absolute font-['Poppins:Bold',sans-serif] h-[16px] leading-[1.065] left-0 not-italic text-[15px] text-white top-0 w-[66px]">Services</p>
      <p className="[word-break:break-word] absolute font-['Poppins:Bold',sans-serif] h-[16px] leading-[1.065] left-0 not-italic text-[15px] text-white top-0 w-[63px]">Contact</p>
      <div className="[word-break:break-word] absolute font-['Poppins:Bold',sans-serif] leading-[0] left-0 not-italic text-[48px] text-white top-0 whitespace-nowrap">
        <p className="leading-[0.945] mb-0 whitespace-pre">{`Best Hair Salon For A `}</p>
        <p className="leading-[0.945] whitespace-pre">Professional Look</p>
      </div>
      <p className="[word-break:break-word] absolute font-['Jost:Regular',sans-serif] font-normal leading-[1.065] left-0 text-[#fbb034] text-[16px] top-0 whitespace-nowrap">Welcome To Choppers</p>
      <Component className="absolute bg-[#fbb034] left-0 top-0" />
      <Group />
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] leading-[1.065] left-0 not-italic text-[#9a9a9a] text-[21px] top-0 w-[389px]">Choppers offers high performance customized facials to provide you with visible results.</p>
      <div className="absolute h-[625px] left-0 top-0 w-[720px]" data-name="image 2">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage2} />
      </div>
      <Component className="absolute bg-[#fbb034] left-0 top-0" />
      <div className="absolute h-[42px] left-0 top-0 w-[47px]" data-name="Choppers Logo White png (1) 2">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <img alt="" className="absolute max-w-none object-cover size-full" src={imgChoppersLogoWhitePng12} />
          <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(90deg, rgba(76, 79, 91, 0.1) 0%, rgba(76, 79, 91, 0.1) 100%), linear-gradient(90deg, rgba(70, 73, 85, 0.4) 0%, rgba(70, 73, 85, 0.4) 100%)" }} />
        </div>
      </div>
      <Group1 />
    </div>
  );
}