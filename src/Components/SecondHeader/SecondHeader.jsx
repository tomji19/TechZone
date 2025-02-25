import React, { useState, useEffect } from "react";
import { Menu, X, ShoppingBag, Zap } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function EyeCatchingHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Navigation categories with icons and colors
  const categories = [
    {
      name: "Shop All",
      path: "/shop",
      color: "#4f46e5",
      icon: <ShoppingBag className="mr-2" size={20} />,
    },
    {
      name: "Laptops",
      path: "/laptops",
      color: "#0891b2",
      icon: (
        <svg
          className="w-5 h-5 mr-2"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V15C20 16.1046 19.1046 17 18 17H6C4.89543 17 4 16.1046 4 15V6Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M8 20H16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M12 17V20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      name: "Gaming",
      path: "/gamingconsoles",
      color: "#7c3aed",
      icon: (
        <svg
          className="w-5 h-5 mr-2"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 12H10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M8 10V14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M15 13H15.01"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M18 11H18.01"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <rect
            x="2"
            y="6"
            width="20"
            height="12"
            rx="2"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      ),
    },
    {
      name: "Phones",
      path: "/smartphones",
      color: "#db2777",
      icon: (
        <svg
          className="w-5 h-5 mr-2"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="7"
            y="3"
            width="10"
            height="18"
            rx="2"
            stroke="currentColor"
            strokeWidth="2"
          />
          <line
            x1="7"
            y1="7"
            x2="17"
            y2="7"
            stroke="currentColor"
            strokeWidth="2"
          />
          <line
            x1="7"
            y1="17"
            x2="17"
            y2="17"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      ),
    },
    {
      name: "Wearables",
      path: "/wearablesaccessories",
      color: "#ea580c",
      icon: (
        <svg
          className="w-5 h-5 mr-2"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 7H15M9 7V6C9 4.89543 9.89543 4 11 4H13C14.1046 4 15 4.89543 15 6V7M9 7V16C9 17.1046 9.89543 18 11 18H13C14.1046 18 15 17.1046 15 16V7"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M5 10H7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M17 10H19"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M5 14H7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M17 14H19"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      name: "PC Parts",
      path: "/pccomponents",
      color: "#16a34a",
      icon: (
        <svg
          className="w-5 h-5 mr-2"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="6"
            y="6"
            width="12"
            height="12"
            rx="1"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path d="M6 10H18" stroke="currentColor" strokeWidth="2" />
          <path d="M10 6L10 18" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
    },
  ];

  // Add effect to handle screen resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="relative z-1 overflow-hidden px-4 sm:px-8 md:px-16">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 shadow-xl">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute left-0 top-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxkZWZzPgogICAgPHBhdHRlcm4gaWQ9ImhleGFnb25zIiB3aWR0aD0iNTAiIGhlaWdodD0iNDMuMyIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgcGF0dGVyblRyYW5zZm9ybT0icm90YXRlKDMwKSI+CiAgICAgIDxwYXRoIGQ9Ik0yNSAyOC41NjY1TDEyLjUgNDMuMyAwIDI4LjU2NjUgMTIuNSAxMy44MzMgMjUgMjguNTY2NXpNMzcuNSA0My4zTDI1IDI4LjU2NjUgMzcuNSAxMy44MzMgNTAgMjguNTY2NSAzNy41IDQzLjN6IiBzdHJva2U9IiNmZmYiIGZpbGw9Im5vbmUiIHN0cm9rZS13aWR0aD0iMS4yIi8+CiAgICA8L3BhdHRlcm4+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjaGV4YWdvbnMpIiAvPgo8L3N2Zz4K')]" />
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="container mx-auto relative z-10">
        <div className="hidden lg:flex items-center">
          {/* Brand Logo */}
          <div className="flex items-center mr-8">
            <Zap className="text-white h-7 w-7" />
            <span className="ml-2 text-white font-bold text-xl">TechZone</span>
          </div>

          {/* Navigation Links */}
          <nav className="flex">
            {categories.map((category, index) => (
              <NavLink
                key={index}
                to={category.path}
                className={({ isActive }) => `
                  relative group overflow-hidden py-5 px-4 text-white flex items-center transition-all duration-300
                  ${isActive ? "font-bold" : "font-medium"}
                `}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Icon */}
                <span className="transition-transform duration-300 group-hover:scale-110 flex items-center">
                  {category.icon}
                  <span>{category.name}</span>
                </span>

                {/* Hover Effect */}
                <span
                  className={`absolute bottom-0 left-0 w-full h-1 transform transition-all duration-300 ${
                    hoveredIndex === index
                      ? "translate-y-0"
                      : "translate-y-full"
                  }`}
                  style={{ backgroundColor: category.color }}
                />

                {/* Active Indicator */}
                {({ isActive }) =>
                  isActive && (
                    <span
                      className="absolute bottom-0 left-0 w-full h-1"
                      style={{ backgroundColor: category.color }}
                    />
                  )
                }

                {/* Animated Glow Effect on Hover */}
                {hoveredIndex === index && (
                  <span
                    className="absolute inset-0 opacity-20 rounded-full blur-xl transition-opacity duration-300"
                    style={{ backgroundColor: category.color }}
                  />
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Navigation Button */}
      <div className="lg:hidden flex justify-between items-center px-4 py-3 relative z-10">
        <div className="text-white font-bold text-xl flex items-center">
          <Zap className="mr-2" size={24} />
          <span>TechZone</span>
        </div>
        <button
          className="text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
          onClick={toggleMenu}
        />
      )}

      {/* Mobile Menu Slide-out */}
      <div
        className={`fixed top-0 right-0 w-4/5 max-w-sm h-full bg-gradient-to-b from-blue-700 to-indigo-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-4 py-3 bg-white/10 backdrop-blur-sm">
          <h2 className="text-white font-bold text-xl flex items-center">
            <Zap className="mr-2" size={20} />
            <span>TechZone</span>
          </h2>
          <button
            className="text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            onClick={toggleMenu}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="py-2">
          {categories.map((category, index) => (
            <NavLink
              key={index}
              to={category.path}
              className={({ isActive }) =>
                `text-white font-medium px-6 py-4 flex items-center transition-all duration-200
                ${isActive ? "bg-white/20 font-bold" : "hover:bg-white/10"}`
              }
              style={{
                borderLeft: ({ isActive }) =>
                  isActive
                    ? `4px solid ${category.color}`
                    : "4px solid transparent",
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              {category.icon}
              <span>{category.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
