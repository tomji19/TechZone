import React from "react";
import { ArrowRight } from "lucide-react";
import deal1 from "../../assets/hotdeal1.png";
import deal2 from "../../assets/hotdeal2.png";

export default function HomeHotDeals() {
  return (
    <section className="py-4 px-4 sm:py-5 sm:px-6 lg:px-16">
      <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row w-full gap-4">
        {/* First Deal */}
        <div className="w-full lg:w-1/2 bg-gradient-to-br from-blue-800 to-[#41075c] rounded-xl shadow-md overflow-hidden">
          <div className="flex flex-col lg:flex-row relative">
            {/* Minimal Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxkZWZzPgogICAgPHBhdHRlcm4gaWQ9ImRvdHMiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgIDxjaXJjbGUgY3g9IjIiIGN5PSIyIiByPSIxIiBmaWxsPSIjZmZmIiAvPgogICAgPC9wYXR0ZXJuPgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2RvdHMpIiAvPgo8L3N2Zz4K')]" />
            </div>

            {/* Content */}
            <div className="p-6 lg:p-8 flex flex-col justify-center lg:w-1/2 relative z-10">
              <span className="px-3 py-1 text-xs font-medium bg-white/10 text-white rounded-full w-fit mb-4 backdrop-blur-sm">
                NEW ARRIVAL
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-3xl font-bold text-white mb-2 max-w-[17rem] break-words">
                Apple HomePod Mini
              </h2>
              <p className="text-white/70 mb-6 max-w-[20rem] break-words text-sm">
                Jam-packed with innovation, HomePod mini delivers unexpectedly
                powerful sound.
              </p>
              <button className="bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-lg w-fit flex items-center gap-2 transition-all duration-200 text-sm">
                Shop Now
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Image */}
            <div className="lg:w-1/2 h-48 sm:h-64 lg:h-auto flex justify-center items-center p-6">
              <img
                src={deal1}
                className="w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 object-contain drop-shadow-lg transform transition-transform duration-300 hover:scale-105"
                alt="Apple Homepod Mini"
              />
            </div>
          </div>
        </div>

        {/* Second Deal */}
        <div className="w-full lg:w-1/2 bg-gradient-to-br from-indigo-900 to-[#3e005a] rounded-xl shadow-md overflow-hidden">
          <div className="flex flex-col lg:flex-row relative">
            {/* Minimal Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxkZWZzPgogICAgPHBhdHRlcm4gaWQ9ImRvdHMiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgIDxjaXJjbGUgY3g9IjIiIGN5PSIyIiByPSIxIiBmaWxsPSIjZmZmIiAvPgogICAgPC9wYXR0ZXJuPgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2RvdHMpIiAvPgo8L3N2Zz4K')]" />
            </div>

            {/* Content */}
            <div className="p-6 lg:p-8 flex flex-col justify-center lg:w-1/2 relative z-10">
              <span className="px-3 py-1 text-xs font-medium bg-white/10 text-white rounded-full w-fit mb-4 backdrop-blur-sm">
                EXCLUSIVE OFFER
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-3xl font-bold text-white mb-2 max-w-[17rem] break-words">
                Xiaomi Mi 11 Ultra
              </h2>
              <p className="text-white/70 mb-6 max-w-[20rem] break-words text-sm">
                12GB+256GB | Revolutionary camera system with pro-grade
                features.
              </p>
              <button className="bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-lg w-fit flex items-center gap-2 transition-all duration-200 text-sm">
                Shop Now
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Image */}
            <div className="lg:w-1/2 h-48 sm:h-64 lg:h-auto flex justify-center items-center p-6">
              <img
                src={deal2}
                className="w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 object-contain drop-shadow-lg transform transition-transform duration-300 hover:scale-105"
                alt="Xiaomi Mi 11 Ultra"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
