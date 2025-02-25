import React from "react";
import card1 from "../../assets/airpod.png";
import card3 from "../../assets/console1.png";
import card4 from "../../assets/smartphone.png";
import card5 from "../../assets/laptop.png";
import card6 from "../../assets/case.png";

export default function CategoryCards() {
  const categories = [
    { isPromo: true },
    { title: "Laptops", image: card5 },
    { title: "Gaming", image: card3 },
    { title: "Smartphones", image: card4 },
    { title: "Wearables", image: card1 },
    { title: "Pc Parts", image: card6 },
  ];

  return (
    <section className="py-3 px-4 sm:py-4 sm:px-6 md:py-5 md:px-8 lg:px-16">
      <div className="relative w-full">
        <div className="flex items-center justify-center">
          <div className="w-full relative">
            <h1 className="mb-8 sm:mb-12 md:mb-16 lg:mb-20 text-3xl sm:text-4xl md:text-5xl text-center font-semibold heading-font">
              Categories
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-12 justify-items-center">
              {categories.map((item, index) => (
                <div
                  key={index}
                  className={`relative w-full max-w-[14.28rem] ${
                    item.isPromo
                      ? "flex flex-col justify-center"
                      : "h-[15rem] rounded-lg border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0)] bg-[#ffffff42] transition-all duration-300 flex flex-col items-center justify-center group cursor-pointer"
                  }`}
                >
                  {item.isPromo ? (
                    <div className="w-56 h-56 flex flex-col items-center justify-center rounded-lg border-black border-2">
                      <div className="text-[0.7rem] font-medium text-black bg-black/10 px-3 py-1 rounded-full backdrop-blur-sm">
                        Limited Time Offer
                      </div>
                      <div className="mt-4 text-4xl font-extrabold text-black text-center">
                        20% OFF
                      </div>
                      <div className="mt-2 text-sm font-semibold text-black text-center">
                        On selected items
                      </div>
                      <a
                        href="#"
                        className="mt-4 px-6 py-2 bg-black/10 hover:bg-black/20 text-black rounded-md text-sm font-medium transition-all duration-200"
                      >
                        Shop Now
                      </a>
                    </div>
                  ) : (
                    <>
                      <div className="sm:absolute sm:-top-8 md:-top-3 transform transition-transform duration-300 group-hover:-translate-y-2 xs:mb-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-28 h-28 sm:w-32 sm:h-32 md:w-[12rem] md:h-[12rem] object-contain"
                        />
                      </div>
                      <span className="absolute bottom-4 sm:bottom-6 text-lg sm:text-xl font-bold text-gray-800 body-font xs:pb-4">
                        {item.title}
                      </span>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
