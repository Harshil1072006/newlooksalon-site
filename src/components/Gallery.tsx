import { config } from "../config";

export default function Gallery() {
  if (!config.features.transformations || !config.transformations || config.transformations.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#0a0a0a] py-24 px-6 lg:px-16">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-12">
          <p className="font-['Jost',sans-serif] text-[#fbb034] text-[15px] font-medium tracking-widest uppercase mb-4">
            Our Work
          </p>
          <h2 className="font-['Poppins',sans-serif] font-bold text-white text-[38px] md:text-[46px] leading-[1.1]">
            The {config.name} Gallery
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {config.transformations.map((image: any, i: number) => (
            <div
              key={i}
              className="group relative overflow-hidden bg-zinc-900 aspect-[3/4] cursor-pointer"
            >
              <img
                src={image.after || image.before}
                alt={image.label}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="font-['Poppins',sans-serif] font-bold text-white text-[16px] border-b-2 border-[#fbb034] pb-1">
                  {image.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
