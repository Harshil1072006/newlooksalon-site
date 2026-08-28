import { config } from "../config";

export default function About() {
  return (
    <section id="about" className="bg-black py-24 px-6 lg:px-16 overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900">
              <img
                src="https://images.unsplash.com/photo-1562322140-8baeececf3df?w=720&h=900&fit=crop&auto=format"
                alt="New Look Salon interior"
                className="w-full h-full object-cover"
              />
              {/* Amber accent frame */}
              <div className="absolute bottom-[-16px] right-[-16px] w-full h-full border-2 border-[#fbb034] pointer-events-none" />
            </div>

            {/* Floating stat card */}
            {config.stats.length > 0 && (
              <div className="absolute bottom-10 left-[-24px] bg-[#fbb034] px-8 py-6 hidden lg:block">
                <p className="font-['Poppins',sans-serif] font-bold text-black text-[36px] leading-none">{config.stats[0].value}</p>
                <p className="font-['Jost',sans-serif] text-black text-[13px] mt-1 font-medium">{config.stats[0].label}</p>
              </div>
            )}
          </div>

          {/* Content side */}
          <div>
            <p className="font-['Jost',sans-serif] text-[#fbb034] text-[15px] font-medium tracking-widest uppercase mb-4">
              About {config.name}
            </p>
            <h2 className="font-['Poppins',sans-serif] font-bold text-white text-[38px] md:text-[44px] leading-[1.1] mb-6">
              Where Style Meets Precision
            </h2>
            <p className="font-['Poppins',sans-serif] font-normal text-[#9a9a9a] text-[16px] leading-[1.8] mb-6">
              {config.description}
            </p>
            <p className="font-['Poppins',sans-serif] font-normal text-[#9a9a9a] text-[16px] leading-[1.8] mb-10">
              We combine high-performance products with attentive, personalized service to deliver results that exceed expectations every single time. Step in looking good. Walk out looking exceptional.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
              {config.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-['Poppins',sans-serif] font-bold text-[#fbb034] text-[32px] leading-none mb-1">
                    {stat.value}
                  </p>
                  <p className="font-['Jost',sans-serif] text-white/50 text-[13px]">{stat.label}</p>
                </div>
              ))}
            </div>

            <a
              href="#services"
              className="inline-block border border-[#fbb034] text-[#fbb034] hover:bg-[#fbb034] hover:text-black transition-colors duration-200 px-10 py-[16px] font-['Poppins',sans-serif] font-bold text-[15px]"
            >
              Our Services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
