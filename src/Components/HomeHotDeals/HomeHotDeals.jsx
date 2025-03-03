import React from "react";
import deal1 from "../../assets/hotdeal1.png";
import deal2 from "../../assets/hotdeal2.png";
import { useNavigate } from "react-router-dom";

export default function HomeHotDeals() {
  const navigate = useNavigate();

  const handleClick = (productId) => {
    navigate(`/product/${productId}`); // Navigate to the correct product page
  };

  return (
    <section className="py-3 px-3 sm:py-4 sm:px-4 md:py-5 md:px-6 lg:px-16">
      <div className="flex flex-col space-y-3 sm:space-y-4 lg:space-y-0 lg:flex-row w-full lg:gap-4 xl:gap-6">
        
        {/* First Deal */}
        <div className="w-full lg:w-1/2 bg-gradient-to-br from-indigo-100 via-indigo-200 to-white border border-indigo-300 shadow-md rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            
            {/* Content */}
            <div className="p-4 sm:p-5 md:p-6 lg:p-8 flex flex-col justify-center md:w-1/2">
              <span className="px-2 py-0.5 sm:px-3 sm:py-1 text-xs sm:text-sm font-medium bg-blue-500 text-white rounded-full w-fit mb-2 sm:mb-3 md:mb-4">
                INTRODUCING
              </span>
              <h2 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2 max-w-full md:max-w-[17rem] break-words heading-font">
                Samsung Galaxy Buds 2 Pro
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 md:mb-6 max-w-full md:max-w-[20rem] break-words body-font">
                24-bit Hi-Fi sound, ANC, and ultimate comfort.
              </p>
              <button 
                onClick={() => handleClick("47")}
                className="w-full xs:w-auto xs:px-6 sm:w-[50%] py-2 sm:py-3 mt-2 sm:mt-3 bg-gradient-to-r from-[#004AAD] to-[#1D267D] text-white rounded-md shadow-md text-xs hover:from-[#1D267D] hover:to-[#004AAD] transition-all duration-300 transform hover:scale-105 text-center"
              >
                SHOP NOW →
              </button>
            </div>

            {/* Image */}
            <div className="md:w-1/2 h-40 xs:h-44 sm:h-48 md:h-auto flex justify-center items-center p-2 sm:p-3">
              <img
                src={deal1}
                className="w-36 h-36 xs:w-40 xs:h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 xl:w-72 xl:h-72 object-contain transition-transform duration-300 hover:scale-105"
                alt="Samsung Galaxy Buds 2 Pro"
              />
            </div>
          </div>
        </div>

        {/* Second Deal */}
        <div className="w-full lg:w-1/2 bg-gradient-to-br from-gray-900 via-indigo-950 to-amber-900 border border-indigo-800 shadow-2xl rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row relative">
            
            {/* Content */}
            <div className="p-4 sm:p-5 md:p-6 lg:p-8 flex flex-col justify-center md:w-1/2">
              <span className="px-2 py-0.5 sm:px-3 sm:py-1 text-xs sm:text-sm font-medium bg-yellow-400 text-black rounded-full w-fit mb-2 sm:mb-3 md:mb-4">
                INTRODUCING NEW
              </span>
              <h2 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2 max-w-full md:max-w-[17rem] break-words heading-font">
                Xiaomi 14 Ultra 12GB+256GB
              </h2>
              <p className="text-sm sm:text-base text-gray-400 mb-3 sm:mb-4 md:mb-6 max-w-full md:max-w-[20rem] break-words body-font">
                Pro-grade Leica camera, Snapdragon 8 Gen 3, and ultra-fast charging.
              </p>
              <button 
                onClick={() => handleClick("28")}
                className="w-full xs:w-auto xs:px-6 sm:w-[50%] py-2 sm:py-3 mt-2 sm:mt-3 bg-gradient-to-r from-[#004AAD] to-[#1D267D] text-white rounded-md shadow-md text-xs hover:from-[#1D267D] hover:to-[#004AAD] transition-all duration-300 transform hover:scale-105 text-center"
              >
                SHOP NOW →
              </button>
            </div>

            {/* Image */}
            <div className="md:w-1/2 h-40 xs:h-44 sm:h-48 md:h-auto flex justify-center items-center p-2 sm:p-3">
              <img
                src={deal2}
                className="w-36 h-36 xs:w-40 xs:h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 xl:w-72 xl:h-72 object-contain transition-transform duration-300 hover:scale-105"
                alt="Xiaomi 14 Ultra"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}