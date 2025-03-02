import React from "react";
import logowhite from "../../assets/logowhite.png";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


export default function Footer() {
  const navigate = useNavigate();


  return (
    <footer className="relative py-10 px-16 bg-gradient-to-r from-blue-800 via-indigo-900 to-purple-950 shadow-xl text-gray-200">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-0 top-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxkZWZzPgogICAgPHBhdHRlcm4gaWQ9ImhleGFnb25zIiB3aWR0aD0iNTAiIGhlaWdodD0iNDMuMyIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgcGF0dGVyblRyYW5zZm9ybT0icm90YXRlKDMwKSI+CiAgICAgIDxwYXRoIGQ9Ik0yNSAyOC41NjY1TDEyLjUgNDMuMyAwIDI4LjU2NjUgMTIuNSAxMy44MzMgMjUgMjguNTY2NXpNMzcuNSA0My4zTDI1IDI4LjU2NjUgMzcuNSAxMy44MzMgNTAgMjguNTY2NSAzNy41IDQzLjN6IiBzdHJva2U9IiNmZmYiIGZpbGw9Im5vbmUiIHN0cm9rZS13aWR0aD0iMS4yIi8+CiAgICA8L3BhdHRlcm4+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjaGV4YWdvbnMpIiAvPgo8L3N2Zz4K')]" />
      </div>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div className="flex flex-col items-start z-10">
          <div className="flex items-center mb-4">
            <Zap className="text-white h-7 w-7" />
            <span className="ml-2 text-white font-bold text-3xl">TechZone</span>
          </div>
          <p className="text-md text-gray-300">Customer Support:</p>
          <p className="text-lg font-normal text-white">01270545289</p>
          <a
            href="https://www.youssefashour.com"
            className="text-yellow-400 font-normal hover:underline text-lg cursor-pointer"
            target="_blank"
          >
            https://www.youssefashour.com
          </a>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4">
            <Facebook className="w-7 h-7 text-gray-300 hover:text-white transition cursor-pointer" />
            <Instagram className="w-7 h-7 text-gray-300 hover:text-white transition cursor-pointer" />
            <Twitter className="w-7 h-7 text-gray-300 hover:text-white transition cursor-pointer" />
          </div>
        </div>

        {/* Categories */}
        <div className="z-10">
          <h3 className="text-white text-xl font-semibold mb-4">
            Top Categories
          </h3>
          <ul className="space-y-2 text-md text-gray-300">
            <li> <Link to="/laptops">Laptops</Link></li>
            <li><Link to="/gamingconsoles">Gaming</Link></li>
            <li><Link to="/smartphones">Phones</Link></li>
            <li className="text-yellow-400"> <Link to="/wearablesaccessories">Wearables</Link></li>
            <li> <Link to="/pccomponents">PC Parts</Link></li>
          </ul>
          <a className="text-yellow-400 text-md mt-2 inline-block">
            <Link to="/shop"> Browse All Products → </Link>
            
          </a>
        </div>

        {/* Quick Links */}
        <div className="z-10">
          <h3 className="text-white text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-md text-gray-300">
            <li> <Link to="/cart">Shopping Cart</Link> </li>
            <li> <Link to="/account">Wishlist</Link> </li>
            <li> <Link>Customer Help</Link> </li>
            <li> <Link>About Us</Link> </li>
          </ul>
        </div>

        {/* Popular Tags */}
        <div>
          <h3 className="text-white text-xl font-semibold mb-4">
            Popular Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              "Game",
              "iPhone",
              "Asus Laptop",
              "Macbook",
              "SSD",
              "Graphics Card",
              "Power Bank",
              "Speaker",
              "Samsung",
            ].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs bg-black text-gray-200 rounded-lg"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white-700 mt-6 pt-4 text-center text-md text-gray-300">
        Youssef & Mayar © 2024. Design by Besmeallahe Masha2allah Team
      </div>
    </footer>
  );
}
