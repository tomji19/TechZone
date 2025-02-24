import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, Zap } from "lucide-react";

const XboxSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState({});

  const slides = [
    {
      title: "THE BEST PLACE TO PLAY",
      heading: "Xbox Series X",
      description:
        "Save up to 50% on select Xbox games.\nGet 3 months of PC Game Pass for $2 USD.",
      color: "#4f46e5", // Indigo color from header
      buttonColor: "from-blue-600 to-indigo-600",
      price: "$299",
      consoleColor: "black",
      backgroundColor: "bg-blue-100", // Solid background color
      image: "/src/assets/Image22.png",
    },
    {
      title: "LIMITED EDITION",
      heading: "Xbox Series S",
      description:
        "Experience gaming in style.\nIncludes exclusive digital content package.",
      color: "#7c3aed", // Purple color from header
      buttonColor: "from-indigo-600 to-purple-700",
      price: "$329",
      consoleColor: "green",
      backgroundColor: "bg-indigo-100", // Solid background color
      image: "/src/assets/Image333.png",
    },
    {
      title: "SPECIAL BUNDLE",
      heading: "Xbox Elite Bundle",
      description:
        "Includes 2 controllers and 3 months of Xbox Game Pass Ultimate.\nFree shipping included.",
      color: "#db2777", // Pink color from header
      buttonColor: "from-purple-700 to-pink-600",
      price: "$349",
      consoleColor: "white",
      backgroundColor: "bg-purple-100", // Solid background color
      image: "/src/assets/Image44.png",
    },
  ];

  // Preload all images
  useEffect(() => {
    let loadedCount = 0;
    const totalImages = slides.length;
    const tempLoadedImages = {};

    slides.forEach((slide, index) => {
      const img = new Image();
      img.src = slide.image;
      img.onload = () => {
        loadedCount++;
        tempLoadedImages[index] = true;
        setLoadedImages(tempLoadedImages);
        if (loadedCount === totalImages) {
          setIsLoading(false);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setIsLoading(false);
        }
      };
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isLoading) {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [isLoading]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  if (isLoading) {
    return (
      <section className="relative overflow-hidden py-5 px-4 sm:px-8 md:px-16 font-sans">
        <div className="w-full min-h-[650px] sm:min-h-[700px] md:min-h-[500px] rounded-xl overflow-hidden shadow-xl bg-blue-100 flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600">Loading slider...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden py-5 px-4 sm:px-8 md:px-16 font-sans">
      {/* Font import in the head of your HTML document:
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
            */}
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap");
        .font-sans {
          font-family: "Inter", -apple-system, BlinkMacSystemFont, Segoe UI,
            Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
            Helvetica Neue, sans-serif;
        }
      `}</style>

      <div className="relative w-full min-h-[650px] sm:min-h-[700px] md:min-h-[500px] rounded-xl overflow-hidden shadow-xl bg-slate-50">
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              index === currentSlide ? "opacity-100 z-20" : "opacity-0 z-10"
            }`}
            style={{
              transform:
                index === currentSlide
                  ? "translateX(0)"
                  : index < currentSlide
                  ? "translateX(-100%)"
                  : "translateX(100%)",
            }}
          >
            {/* Solid Background */}
            <div className={`absolute inset-0 ${slide.backgroundColor}`}></div>

            {/* Main Content Container */}
            <div className="flex flex-col md:flex-row h-full w-full max-w-7xl mx-auto">
              {/* Left Side: Text Content */}
              <div className="w-full md:w-1/2 flex flex-col justify-center px-4 sm:px-6 md:px-8 py-8 md:py-0 text-center md:text-left z-10">
                <div className="flex items-center justify-center md:justify-start mb-3">
                  <Zap
                    className="w-4 h-4 mr-2"
                    style={{ color: slide.color }}
                  />
                  <span
                    className="text-xs sm:text-sm font-semibold tracking-widest uppercase"
                    style={{ color: slide.color }}
                  >
                    {slide.title}
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-2 mb-4 text-gray-800 tracking-tight">
                  {slide.heading}
                </h2>
                <p className="text-gray-600 text-sm sm:text-base whitespace-pre-line mb-6 max-w-md mx-auto md:mx-0 leading-relaxed">
                  {slide.description}
                </p>
                <div className="flex justify-center md:justify-start">
                  <button
                    className={`flex items-center gap-2 bg-gradient-to-r ${slide.buttonColor} text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-sm sm:text-base font-medium relative overflow-hidden group`}
                  >
                    <span className="relative z-10 tracking-wide uppercase text-sm">
                      SHOP NOW
                    </span>
                    <ChevronRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                    {/* Hover effect */}
                    <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                  </button>
                </div>
              </div>

              {/* Right Side: Image Container */}
              <div className="w-full md:w-1/2 relative flex items-center justify-center md:justify-end">
                {/* Simplified glow circle */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl opacity-20"
                  style={{ backgroundColor: slide.color }}
                ></div>

                {/* Image */}
                {loadedImages[index] && (
                  <div className="relative z-20 w-[40rem] h-[40rem] flex items-center justify-center px-4 sm:px-6 md:px-8">
                    <img
                      src={slide.image}
                      alt={slide.heading}
                      className="max-w-full md:max-w-[90%] lg:max-w-[80%] max-h-[300px] md:max-h-[400px] object-contain"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-30 p-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-30 p-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Dots navigation */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
          {slides.map((slide, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide
                  ? "w-8 sm:w-10 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md"
                  : "w-2 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default XboxSlider;
