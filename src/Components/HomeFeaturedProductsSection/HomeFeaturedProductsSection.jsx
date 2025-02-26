import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Check } from "lucide-react";
import { useCart } from "../../Components/CartContext/CartContext";
import airpod from "../../assets/airpod.png";
import { ShoppingBag, Zap, ArrowRight, Trophy, Star } from "lucide-react";

// Toast Component remains the same
const Toast = ({ message, product, onClose }) => (
  <div
    className="fixed bottom-4 right-4 bg-white border border-indigo-500/20 shadow-lg rounded-lg p-4 animate-slide-up"
    style={{
      animation: "slideUp 0.3s ease-out",
      zIndex: 1000,
    }}
  >
    <div className="flex items-center gap-3">
      <div className="bg-gradient-to-r from-blue-700 to-indigo-900 rounded-full p-1.5">
        <Check className="w-5 h-5 text-white" />
      </div>
      <div className="flex flex-col">
        <p className="text-sm font-medium text-gray-900">Added to Cart!</p>
        <p className="text-xs text-indigo-600">{product?.name}</p>
      </div>
    </div>
  </div>
);

export default function HomeFeaturedProductsSection() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [toast, setToast] = useState(null);
  const [wishlist, setWishlist] = useState([]);


  // Load wishlist from localStorage on component mount
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(savedWishlist);
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((response) => response.json())
      .then((data) => {
        const shuffled = [...data].sort(() => 0.5 - Math.random());
        const randomProducts = shuffled.slice(0, 8);
        setProducts(randomProducts);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((response) => response.json())
      .then((data) => {
        const shuffled = [...data].sort(() => 0.5 - Math.random());
        const randomProducts = shuffled.slice(0, 8);
        setProducts(randomProducts);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        const sampleData = [
          {
            id: "1",
            name: "Apple MacBook Air M3",
            price: 1199,
            image1:
              "https://m.media-amazon.com/images/I/61lAGP5afpL._AC_SX679_.jpg",
            category: "Laptops",
            brand: "Apple",
            rating: {
              score: 4.8,
              reviews: 1500,
            },
          },
        ];
        const randomSampleProducts = sampleData
          .sort(() => 0.5 - Math.random())
          .slice(0, 8);
        setProducts(randomSampleProducts);
      });
  }, []);

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product);

    // Show toast
    setToast({ message: "Product added to cart", product });

    // Hide toast after 3 seconds
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const toggleWishlist = (e, product) => {
    e.stopPropagation();
    const updatedWishlist = wishlist.some((item) => item.id === product.id)
      ? wishlist.filter((item) => item.id !== product.id) // Remove if already in wishlist
      : [...wishlist, product]; // Add if not in wishlist

    setWishlist(updatedWishlist);
  };

  return (
    <section className="py-5 px-4 sm:px-8 lg:px-16">
      <div className="min-h-screen">
        <div className="flex flex-col lg:flex-row lg:gap-7">
          {/* Promotional Banners */}
          <div className="hidden lg:flex flex-col w-[26%] h-full gap-6 sticky top-0">
            {/* Top Banner - Ramadan Nights Premium Gold & Black Theme */}
<div className="relative h-1/2 bg-gradient-to-br from-gray-900 to-black rounded-xl shadow-lg overflow-hidden flex flex-col items-center justify-center text-center group border border-amber-700/40 hover:border-amber-500/60 transition-colors duration-300">
  {/* Ramadan-inspired Pattern Background */}
  <div className="absolute inset-0">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="opacity-20">
      <defs>
        <pattern id="ramadanPattern" width="80" height="80" patternUnits="userSpaceOnUse">
          {/* Crescent moon shapes */}
          <path d="M20 20 A15 15 0 0 1 35 35 A10 10 0 0 0 20 20" fill="none" stroke="url(#premiumGoldGradient)" strokeWidth="0.6" />
          <path d="M60 60 A15 15 0 0 1 75 75 A10 10 0 0 0 60 60" fill="none" stroke="url(#premiumGoldGradient)" strokeWidth="0.6" />
          
          {/* Star shapes */}
          <path d="M50 15 L52 20 L57 20 L53 24 L55 29 L50 26 L45 29 L47 24 L43 20 L48 20 Z" fill="none" stroke="url(#premiumGoldGradient)" strokeWidth="0.5" />
          <path d="M15 50 L17 55 L22 55 L18 59 L20 64 L15 61 L10 64 L12 59 L8 55 L13 55 Z" fill="none" stroke="url(#premiumGoldGradient)" strokeWidth="0.5" />
          
          {/* Ornamental arabesque elements */}
          <path d="M40 40 Q50 35, 60 40 Q70 45, 80 40" fill="none" stroke="url(#premiumGoldGradient)" strokeWidth="0.5" />
          <path d="M0 40 Q10 35, 20 40 Q30 45, 40 40" fill="none" stroke="url(#premiumGoldGradient)" strokeWidth="0.5" />
        </pattern>
        <linearGradient id="premiumGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="50%" stopColor="#F0C75E" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#ramadanPattern)" />
    </svg>
    
    {/* Luxury glow effects */}
    <div className="absolute top-1/3 right-1/3 w-40 h-40 bg-amber-500 rounded-full filter blur-3xl opacity-15 group-hover:opacity-20 transition-opacity duration-300"></div>
    <div className="absolute bottom-1/3 left-1/3 w-40 h-40 bg-amber-400 rounded-full filter blur-3xl opacity-15 group-hover:opacity-20 transition-opacity duration-300"></div>
  </div>

  {/* Content */}
  <div className="p-6 flex flex-col items-center justify-center h-full text-center z-10">
    {/* Ramadan Special Badge */}
    <div className="bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full border border-amber-500/30 mb-3">
      <span className="text-xs font-semibold text-amber-300 flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
        </svg>
        RAMADAN SPECIAL
      </span>
    </div>

    {/* Product Info */}
    <div className="flex flex-col items-center justify-center flex-grow">
      <div className="relative mb-4">
        {/* Star-shaped glow behind product */}
        <div className="absolute inset-0 bg-amber-500/20 blur-2xl rounded-full transform scale-75 group-hover:bg-amber-500/30 transition-all duration-300"></div>
        <img
          src={airpod}
          alt="Wireless Earbuds"
          className="w-36 h-26 object-contain drop-shadow-lg relative z-10 transform group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 mb-2">
        Ramadan Nights Collection
      </h2>
      <p className="text-amber-100/80 text-sm mb-4 max-w-[200px]">
        Premium gifts for the blessed month
      </p>
      
      {/* Ornate price tag with accent */}
      <div className="relative bg-black/40 backdrop-blur-md border border-amber-500/30 px-4 py-2 rounded-lg mb-4 transform group-hover:scale-105 transition-transform duration-300">
        <div className="flex items-center gap-2">
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 text-xl">Up to 25%</span>
          <span className="text-amber-200 text-sm">OFF</span>
        </div>
      </div>
    </div>

    {/* Button - Gold gradient with lantern icon */}
    <button className="w-full py-3 bg-gradient-to-r from-amber-700 to-amber-500 hover:from-amber-600 hover:to-amber-400 text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-md group-hover:shadow-lg transform group-hover:translate-y-[-2px]">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
        <path d="M8 2h8l4 10H4L8 2Z"></path>
        <path d="M12 12v6"></path>
        <path d="M8 22v-2c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v2H8Z"></path>
      </svg>
      Explore Collection
    </button>
  </div>
</div>

            {/* Bottom Banner - Ultra Premium Gold & Black Theme (kept as is) */}
            <div className="relative h-1/2 bg-gradient-to-br from-gray-900 to-black rounded-xl shadow-lg overflow-hidden flex flex-col items-center justify-center text-center group border border-amber-700/40 hover:border-amber-500/60 transition-colors duration-300">
              {/* Premium Background Pattern */}
              <div className="absolute inset-0">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="opacity-20">
                  <defs>
                    <pattern id="luxuryDiamondPattern" width="60" height="60" patternUnits="userSpaceOnUse">
                      <path d="M30 10 L50 30 L30 50 L10 30 Z" fill="none" stroke="url(#premiumGoldGradient)" strokeWidth="0.6" />
                      <circle cx="30" cy="30" r="1.5" fill="url(#premiumGoldGradient)" />
                    </pattern>
                    <linearGradient id="premiumGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#D4AF37" />
                      <stop offset="50%" stopColor="#F0C75E" />
                      <stop offset="100%" stopColor="#D4AF37" />
                    </linearGradient>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#luxuryDiamondPattern)" />
                </svg>
                
                {/* Luxury glow effects */}
                <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-amber-500 rounded-full filter blur-3xl opacity-15 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-amber-400 rounded-full filter blur-3xl opacity-15 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>

              <div className="p-6 flex flex-col items-center justify-center h-full text-center z-10">
                {/* Top Section - Premium Badge */}
                <div className="bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full border border-amber-500/30 mb-3">
                  <span className="text-xs font-semibold text-amber-300 flex items-center gap-1">
                    ULTRA PREMIUM
                  </span>
                </div>
                
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 mb-2">
                  Ramadan Collection
                </h2>
                <p className="text-amber-100/80 text-sm mb-5 max-w-[220px]">
                  Limited edition flagship smartphones
                </p>

                {/* Middle - Diamond Shape with Price Inside */}
                <div className="relative mb-5 transform group-hover:scale-110 transition-transform duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-yellow-300/20 rounded-lg blur-xl"></div>
                  <div className="relative bg-black/40 backdrop-blur-md border border-amber-500/30 p-4 rounded-lg">
                    <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300">
                      40<span className="text-xl">%</span>
                    </div>
                    <div className="text-sm text-amber-200 font-medium mt-1">RAMADAN DISCOUNTS</div>
                  </div>
                </div>

                {/* Bottom Button - Premium Gold */}
                <button className="w-full py-3 bg-gradient-to-r from-amber-700 to-amber-500 hover:from-amber-600 hover:to-amber-400 text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-md group-hover:shadow-lg transform group-hover:translate-y-[-2px]">
                  Explore Collection
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold heading-font">
                Featured Products
              </h2>
              <a href="#" className="text-[#253fb2] hover:underline font-medium backdrop-blur-sm">
                Browse All Products →
              </a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleProductClick(product)}
                  className="bg-white rounded-lg overflow-hidden shadow-lg group relative cursor-pointer"
                >
                  <div className="relative h-64">
                    <img
                      src={product.image1}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                    {product.discount && (
                      <span className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-sm text-sm">
                        Sale
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="text-sm font-semibold text-gray-600 mb-1">
                      {product.category}
                    </div>
                    <h3 className="h-[3rem] text-gray-800 text-sm font-semibold mb-1 body-font line-clamp-3">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <p className="text-[#1B6392] font-bold heading-font">
                        ${product.price}
                      </p>
                    </div>
                    <div className="flex gap-1 mt-3">
                      <button
                        className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <Heart className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        onClick={(e) => handleAddToCart(e, product)}
                        className="flex-1 bg-gradient-to-r from-blue-700 to-indigo-900 text-white font-bold py-1.5 px-3 rounded-lg hover:from-[#1D267D] hover:to-[#004AAD] flex items-center justify-center gap-1 text-xs"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      {/* Add the animation styles */}
      <style>
        {`
          @keyframes slideUp {
            from {
              transform: translateY(100%);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          .animate-slide-up {
            animation: slideUp 0.3s ease-out;
          }
        `}
      </style>
    </section>
  );
}