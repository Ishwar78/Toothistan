import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Grid2X2,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const clinicImages = [
  {
    title: "Reception",
    category: "Welcome to Toothistan",
    src: "/timing.JPG",
    alt: "Modern dental clinic reception",
    position: "center",
  },
  {
    title: "Treatment Suite",
    category: "Advanced Dental Care",
    src: "/machine.JPG",
    alt: "Modern dental treatment room",
    position: "center",
  },
  {
    title: "Sterilization",
    category: "Care in Every Detail",
    src: "/about2.JPG",
    alt: "Dental care equipment and clinical setup",
    position: "center",
  },
  {
    title: "Waiting Lounge",
    category: "Comfort Meets Care",
    src: "/waiting.JPG",
    alt: "Elegant and comfortable waiting lounge",
    position: "center",
  },
  {
    title: "Advanced Technology",
    category: "Precision Dentistry",
    src: "/about1.JPG",
    alt: "Modern dental technology",
    position: "center",
  },
];

const ClinicTourSection = () => {
  const [activeImage, setActiveImage] = useState(null);

  const closeLightbox = () => setActiveImage(null);

  const showPrevious = () => {
    setActiveImage((current) =>
      current === null
        ? null
        : (current - 1 + clinicImages.length) % clinicImages.length
    );
  };

  const showNext = () => {
    setActiveImage((current) =>
      current === null
        ? null
        : (current + 1) % clinicImages.length
    );
  };

  useEffect(() => {
    if (activeImage === null) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeImage]);

  const renderGalleryImage = (image, index, className = "") => (
    <motion.button
      key={image.title}
      type="button"
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      onClick={() => setActiveImage(index)}
      aria-label={`View ${image.title} image full screen`}
      className={`group relative block w-full overflow-hidden rounded-[17px] border border-[#d9aa52] bg-[#e9dfcf] text-left shadow-[0_8px_25px_rgba(87,59,23,0.07)] outline-none transition-shadow duration-300 hover:shadow-[0_15px_40px_rgba(87,59,23,0.18)] focus-visible:ring-4 focus-visible:ring-[#c48f32]/40 ${className}`}
    >
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        style={{ objectPosition: image.position }}
      />

      {/* Subtle image overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#21170e]/50 via-transparent to-black/5 opacity-70 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Zoom button */}
      <span className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-[#c48f32] text-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:bg-[#a87521] sm:h-12 sm:w-12">
        <Maximize2 size={19} strokeWidth={2.2} />
      </span>

      {/* Image caption */}
      <span className="absolute bottom-4 left-4 flex max-w-[calc(100%-32px)] items-center gap-3 rounded-xl border border-white/15 bg-[#30251b]/75 px-4 py-3 text-white shadow-lg backdrop-blur-md transition-all duration-300 group-hover:bg-[#30251b]/90 sm:bottom-5 sm:left-5 sm:px-5">
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold tracking-wide sm:text-base">
            {image.title}
          </span>
          <span className="mt-0.5 block truncate text-[10px] font-medium tracking-[0.08em] text-white/75 sm:text-xs">
            {image.category}
          </span>
        </span>
      </span>
    </motion.button>
  );

  return (
    <section
      id="clinic-tour"
      className="relative overflow-hidden bg-[#faf8f4] py-14 sm:py-16 lg:py-[76px]"
    >
      {/* Soft decorative background */}
      <div className="pointer-events-none absolute -left-36 top-40 h-80 w-80 rounded-full bg-[#d7ad61]/[0.07] blur-3xl" />
      <div className="pointer-events-none absolute -right-36 bottom-20 h-96 w-96 rounded-full bg-[#e9c98b]/[0.10] blur-3xl" />

      <div className="relative mx-auto max-w-[1536px] px-5 sm:px-8 lg:px-[34px]">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65 }}
          className="mb-8 text-center sm:mb-10"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-3 rounded-full border border-[#edcf96] bg-white/90 px-5 py-3 shadow-[0_4px_14px_rgba(91,61,19,0.07)] sm:px-7">
            <Grid2X2 size={19} className="text-[#b78027]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.23em] text-[#a56f1d] sm:text-sm">
              Clinic Gallery
            </span>
          </div>

          {/* Heading */}
          <h2 className="mt-5 font-display text-[42px] font-extrabold leading-[1.08] tracking-[-0.045em] text-[#2d2117] sm:text-6xl lg:text-[76px]">
            Inside Our{" "}
            <span className="text-[#c48f32]">Clinic</span>
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-[#65584d] sm:text-lg sm:leading-8">
            Explore the spaces, technology, and thoughtful details behind
            your smile.
          </p>
        </motion.div>

        {/* Premium Masonry-style Gallery */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:gap-[18px]">
          {/* First row: large reception + treatment room */}
          {renderGalleryImage(
            clinicImages[0],
            0,
            "h-[290px] sm:col-span-1 sm:h-[330px] lg:col-span-4 lg:h-[430px]"
          )}

          {renderGalleryImage(
            clinicImages[1],
            1,
            "h-[290px] sm:col-span-1 sm:h-[330px] lg:col-span-2 lg:h-[430px]"
          )}

          {/* Second row: three equal images */}
          {renderGalleryImage(
            clinicImages[2],
            2,
            "h-[270px] sm:col-span-1 sm:h-[300px] lg:col-span-2 lg:h-[305px]"
          )}

          {renderGalleryImage(
            clinicImages[3],
            3,
            "h-[270px] sm:col-span-1 sm:h-[300px] lg:col-span-2 lg:h-[305px]"
          )}

          {renderGalleryImage(
            clinicImages[4],
            4,
            "h-[270px] sm:col-span-2 sm:h-[320px] lg:col-span-2 lg:h-[305px]"
          )}
        </div>

        {/* Gallery Footer */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-7 flex items-center justify-center gap-2 text-center text-xs font-medium tracking-wide text-[#88745b] sm:mt-9 sm:text-sm"
        >
          <Maximize2 size={15} className="text-[#b78027]" />
          <span>Tap any image to explore our clinic up close</span>
        </motion.div>
      </div>

      {/* Fullscreen Image Lightbox */}
      <AnimatePresence>
        {activeImage !== null && (
          <motion.div
            key="clinic-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#17120d]/95 p-4 backdrop-blur-md sm:p-8"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Clinic image viewer"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Close image viewer"
              className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-[#c48f32] sm:right-8 sm:top-8 sm:h-12 sm:w-12"
            >
              <X size={23} />
            </button>

            {/* Previous */}
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showPrevious();
              }}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-[#c48f32] sm:left-7 sm:h-12 sm:w-12"
            >
              <ChevronLeft size={25} />
            </button>

            {/* Active Image */}
            <motion.div
              key={activeImage}
              initial={{ opacity: 0, scale: 0.94, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="relative flex max-h-[88vh] w-full max-w-6xl flex-col items-center"
              onClick={(event) => event.stopPropagation()}
            >
              <img
                src={clinicImages[activeImage].src}
                alt={clinicImages[activeImage].alt}
                className="max-h-[76vh] w-auto max-w-full rounded-xl border border-[#c48f32]/50 object-contain shadow-[0_20px_80px_rgba(0,0,0,0.4)] sm:rounded-2xl"
              />

              <div className="mt-5 text-center">
                <h3 className="text-xl font-semibold text-white sm:text-2xl">
                  {clinicImages[activeImage].title}
                </h3>
                <p className="mt-1 text-sm text-[#d9bc86]">
                  {clinicImages[activeImage].category}
                </p>
                <p className="mt-2 text-xs tracking-widest text-white/55">
                  {String(activeImage + 1).padStart(2, "0")} /{" "}
                  {String(clinicImages.length).padStart(2, "0")}
                </p>
              </div>
            </motion.div>

            {/* Next */}
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showNext();
              }}
              aria-label="Next image"
              className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-[#c48f32] sm:right-7 sm:h-12 sm:w-12"
            >
              <ChevronRight size={25} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ClinicTourSection;