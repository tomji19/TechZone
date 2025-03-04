import React from "react";
import deal1 from "../../assets/hotdeal1.png";
import deal2 from "../../assets/hotdeal2.png";
import { useNavigate } from "react-router-dom";

export default function HomeHotDeals() {
  const navigate = useNavigate();

  const handleClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <section className="py-3 px-3 sm:py-4 sm:px-4 md:py-5 md:px-6 lg:px-12 xl:px-16">
      <div className="flex flex-col space-y-3 sm:space-y-4 lg:space-y-0 lg:flex-row w-full lg:gap-6 xl:gap-6">
        {/* First Deal */}
        <div className="w-full lg:w-1/2 bg-gradient-to-br from-indigo-100 via-indigo-200 to-white border border-indigo-300 shadow-md rounded-lg overflow-hidden">
          <div className="flex flex-row lg:flex-col xl:flex-row">
            {/* Content */}
            <div className="p-4 sm:p-5 md:p-6 lg:p-8 flex flex-col justify-center w-2/3 xs:w-3/5 sm:w-3/5 md:w-1/2 lg:w-full xl:w-1/2">
              <span className="px-2 py-0.5 text-xs font-medium bg-blue-500 text-white rounded-full w-fit mb-2 sm:mb-3 md:mb-4 xl:px-3 xl:py-1 xl:text-sm">
                INTRODUCING
              </span>
              <h2 className="text-lg xs:text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl font-bold text-gray-900 mb-1 sm:mb-2 lg:mb-3 max-w-full lg:max-w-[80%] xl:max-w-[17rem] break-words heading-font">
                Samsung Galaxy Buds 2 Pro
              </h2>
              <p className="text-xs xs:text-sm sm:text-sm md:text-base lg:text-lg xl:text-base text-gray-600 mb-3 sm:mb-4 lg:mb-6 xl:mb-6 max-w-full lg:max-w-[80%] xl:max-w-[20rem] break-words body-font">
                24-bit Hi-Fi sound, ANC, and ultimate comfort.
              </p>
              <button
                onClick={() => handleClick("47")}
                className="w-full max-w-[12rem] py-2 sm:py-2.5 md:py-3 mt-1 sm:mt-2 xl:w-[50%] xl:py-3 bg-gradient-to-r from-[#004AAD] to-[#1D267D] text-white rounded-md shadow-md text-xs lg:text-sm xl:text-xs hover:from-[#1D267D] hover:to-[#004AAD] transition-all duration-300 transform hover:scale-105 text-center"
              >
                SHOP NOW →
              </button>
            </div>

            {/* Image */}
            <div className="w-1/3 xs:w-2/5 sm:w-2/5 md:w-1/2 lg:w-full xl:w-1/2 flex justify-center items-center p-3 sm:p-4 lg:p-6 xl:p-3">
              <img
                src={deal1}
                className="w-full max-w-24 xs:max-w-28 sm:max-w-36 md:max-w-48 lg:max-w-64 xl:w-72 xl:h-72 object-contain transition-transform duration-300 hover:scale-105"
                alt="Samsung Galaxy Buds 2 Pro"
              />
            </div>
          </div>
        </div>

        {/* Second Deal */}
        <div className="w-full lg:w-1/2 bg-gradient-to-br from-gray-900 via-indigo-950 to-amber-900 border border-indigo-800 shadow-2xl rounded-lg overflow-hidden">
          <div className="flex flex-row lg:flex-col xl:flex-row relative">
            {/* Content */}
            <div className="p-4 sm:p-5 md:p-6 lg:p-8 flex flex-col justify-center w-2/3 xs:w-3/5 sm:w-3/5 md:w-1/2 lg:w-full xl:w-1/2">
              <span className="px-2 py-0.5 text-xs font-medium bg-yellow-400 text-black rounded-full w-fit mb-2 sm:mb-3 md:mb-4 xl:px-3 xl:py-1 xl:text-sm">
                INTRODUCING NEW
              </span>
              <h2 className="text-lg xs:text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl font-bold text-white mb-1 sm:mb-2 lg:mb-3 max-w-full lg:max-w-[80%] xl:max-w-[17rem] break-words heading-font">
                Xiaomi 14 Ultra 12GB+256GB
              </h2>
              <p className="text-xs xs:text-sm sm:text-sm md:text-base lg:text-lg xl:text-base text-gray-400 mb-3 sm:mb-4 lg:mb-6 xl:mb-6 max-w-full lg:max-w-[80%] xl:max-w-[20rem] break-words body-font">
                Pro-grade Leica camera, Snapdragon 8 Gen 3, and ultra-fast
                charging.
              </p>
              <button
                onClick={() => handleClick("28")}
                className="w-full max-w-[12rem] py-2 sm:py-2.5 md:py-3 mt-1 sm:mt-2 xl:w-[50%] xl:py-3 bg-gradient-to-r from-[#004AAD] to-[#1D267D] text-white rounded-md shadow-md text-xs lg:text-sm xl:text-xs hover:from-[#1D267D] hover:to-[#004AAD] transition-all duration-300 transform hover:scale-105 text-center"
              >
                SHOP NOW →
              </button>
            </div>

            {/* Image */}
            <div className="w-1/3 xs:w-2/5 sm:w-2/5 md:w-1/2 lg:w-full xl:w-1/2 flex justify-center items-center p-3 sm:p-4 lg:p-6 xl:p-3">
              <img
                src={deal2}
                className="w-full max-w-24 xs:max-w-28 sm:max-w-36 md:max-w-48 lg:max-w-64 xl:w-72 xl:h-72 object-contain transition-transform duration-300 hover:scale-105"
                alt="Xiaomi 14 Ultra"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
