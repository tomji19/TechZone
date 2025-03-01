import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Check } from "lucide-react";
import { useCart } from "../../Components/CartContext/CartContext";
import airpod from "../../assets/airpod.png";
import { ShoppingBag, Zap, ArrowRight } from "lucide-react";


// Custom Toast Component
const Toast = ({ message, product, onClose, type }) => (
  <div
    className="fixed bottom-4 right-4 bg-white border border-indigo-500/20 shadow-lg rounded-lg p-4 animate-slide-up"
    style={{
      animation: "slideUp 0.3s ease-out",
      zIndex: 1000,
    }}
  >
    <div className="flex items-center gap-3">
      <div
        className={`rounded-full p-1.5 ${type === "wishlist"
          ? "bg-pink-600"
          : "bg-gradient-to-r from-blue-700 to-indigo-900"
          }`}
      >
        <Check className="w-5 h-5 text-white" />
      </div>
      <div className="flex flex-col">
        <p className="text-sm font-medium text-gray-900">
          {type === "wishlist" ? "Added to Wishlist!" : "Added to Cart!"}
        </p>
        <p
          className={`text-xs ${type === "wishlist" ? "text-pink-600" : "text-indigo-600"
            }`}
        >
          {product?.name}
        </p>
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
          {
            id: "2",
            name: "Samsung Galaxy S24 Ultra",
            price: 1299,
            image1: "/api/placeholder/300/300",
            category: "Smartphones",
            brand: "Samsung",
            rating: {
              score: 4.7,
              reviews: 930,
            },
          },
          {
            id: "3",
            name: "Sony WH-1000XM5 Wireless Headphones",
            price: 399,
            image1: "/api/placeholder/300/300",
            category: "Audio",
            brand: "Sony",
            rating: {
              score: 4.9,
              reviews: 1230,
            },
          },
          {
            id: "4",
            name: "Apple iPad Pro 12.9-inch",
            price: 1099,
            image1: "/api/placeholder/300/300",
            category: "Tablets",
            brand: "Apple",
            rating: {
              score: 4.8,
              reviews: 750,
            },
          },
          {
            id: "5",
            name: "Dell XPS 15 Laptop",
            price: 1799,
            image1: "/api/placeholder/300/300",
            category: "Laptops",
            brand: "Dell",
            rating: {
              score: 4.6,
              reviews: 520,
            },
          },
          {
            id: "6",
            name: "Apple AirPods Pro 2",
            price: 249,
            image1: "/api/placeholder/300/300",
            category: "Audio",
            brand: "Apple",
            rating: {
              score: 4.8,
              reviews: 3200,
            },
          },
          {
            id: "7",
            name: "LG C2 65-inch OLED TV",
            price: 1799,
            image1: "/api/placeholder/300/300",
            category: "TVs",
            brand: "LG",
            rating: {
              score: 4.9,
              reviews: 890,
            },
          },
          {
            id: "8",
            name: "Bose QuietComfort Ultra Headphones",
            price: 429,
            image1: "/api/placeholder/300/300",
            category: "Audio",
            brand: "Bose",
            rating: {
              score: 4.7,
              reviews: 650,
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
    setToast({ message: "Product added to cart", product, type: "cart" });

    // Hide toast after 3 seconds
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // Check if product is in wishlist
  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  // Toggle wishlist
  const toggleWishlist = (e, product) => {
    e.stopPropagation();

    if (isInWishlist(product.id)) {
      // Remove from wishlist
      const updatedWishlist = wishlist.filter((item) => item.id !== product.id);
      setWishlist(updatedWishlist);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

      // Show removal toast
      setToast({
        message: "Removed from wishlist",
        product,
        type: "wishlist-remove",
      });
    } else {
      // Add to wishlist
      const updatedWishlist = [...wishlist, product];
      setWishlist(updatedWishlist);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

      // Show addition toast
      setToast({ message: "Added to wishlist", product, type: "wishlist" });
    }

    // Hide toast after 3 seconds
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  return (
    <section className="py-5 px-4 sm:px-8 lg:px-16">
      <div className="min-h-screen">
        <div className="flex flex-col lg:flex-row lg:gap-7">
          {/* Promotional Banners */}
          <div className="hidden lg:flex flex-col w-[26%] h-full gap-6 sticky top-0">
            {/* Top Banner - With colors matched to background */}
            <div className="relative h-1/2 bg-[#e0e7ff] rounded-xl shadow-sm overflow-hidden flex flex-col items-center justify-center text-center group border border-indigo-100 hover:border-indigo-200 transition-colors duration-300 ">
              {/* Simplified Background Pattern */}
              <div className="absolute inset-0">
                <svg
                  width="100%"
                  height="100%"
                  xmlns="http://www.w3.org/2000/svg"
                  className="opacity-10"
                >
                  <defs>
                    <pattern
                      id="simplePattern"
                      width="60"
                      height="60"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M30 10 L50 30 L30 50 L10 30 Z"
                        fill="none"
                        stroke="#4F46E5"
                        strokeWidth="0.5"
                      />
                    </pattern>
                  </defs>
                  <rect
                    width="100%"
                    height="100%"
                    fill="url(#simplePattern)"
                  />
                </svg>

                {/* Subtle highlight - Updated to match background */}
                <div className="absolute top-1/3 right-1/3 w-40 h-40 bg-indigo-300 rounded-full filter blur-3xl opacity-10 group-hover:opacity-15 transition-opacity duration-300"></div>
              </div>

              {/* Content - Matching color scheme */}
              <div className="p-6 flex flex-col items-center justify-center h-full text-center z-10">
                {/* Ramadan Special Badge - Updated colors */}
                <div className="bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200 mb-3">
                  <span className="text-xs font-semibold text-indigo-700 flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1"
                    >
                      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                    </svg>
                    RAMADAN SPECIAL
                  </span>
                </div>

                {/* Product Info - Same structure */}
                <div className="flex flex-col items-center justify-center flex-grow">
                  <div className="relative mb-4">
                    {/* Simplified glow - Updated color */}
                    <div className="absolute inset-0 bg-indigo-300/20 blur-2xl rounded-full transform scale-75 group-hover:bg-indigo-300/30 transition-all duration-300"></div>
                    <img
                      src={airpod}
                      alt="Wireless Earbuds"
                      className="w-36 h-26 object-contain drop-shadow-lg relative z-10 transform group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2">
                    Ramadan Nights Collection
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 max-w-[200px]">
                    Premium gifts for the blessed month
                  </p>

                  {/* Ornate price tag - Updated colors */}
                  <div className="relative bg-white border border-indigo-200 px-4 py-2 rounded-lg mb-4 transform group-hover:scale-105 transition-transform duration-300 shadow-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-indigo-700 text-xl">
                        Up to 25%
                      </span>
                      <span className="text-indigo-600 text-sm">OFF</span>
                    </div>
                  </div>
                </div>

                {/* Button - Updated to match banner background theme */}
                <button onClick={() => navigate("/shop")} className="w-full py-3 bg-gradient-to-r from-blue-700 to-indigo-900 text-white font-bold px-3 rounded-lg hover:from-[#1D267D] hover:to-[#004AAD] text-sm  flex items-center justify-center gap-2 transition-all duration-300 shadow-sm group-hover:shadow-md transform group-hover:translate-y-[-2px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-1"
                  >
                    <path d="M8 2h8l4 10H4L8 2Z"></path>
                    <path d="M12 12v6"></path>
                    <path d="M8 22v-2c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v2H8Z"></path>
                  </svg>
                  Explore Collection
                </button>
              </div>
            </div>
            {/* Bottom Banner - Updated with indigo color scheme */}
            <div className="relative h-1/2 bg-[#e0e7ff] rounded-xl shadow-sm overflow-hidden flex flex-col items-center justify-center text-center group border border-indigo-100 hover:border-indigo-200 transition-colors duration-300">
              {/* Simplified Background Pattern */}
              <div className="absolute inset-0">
                <svg
                  width="100%"
                  height="100%"
                  xmlns="http://www.w3.org/2000/svg"
                  className="opacity-10"
                >
                  <defs>
                    <pattern
                      id="simpleDiamondPattern"
                      width="60"
                      height="60"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M30 10 L50 30 L30 50 L10 30 Z"
                        fill="none"
                        stroke="#4F46E5"
                        strokeWidth="0.5"
                      />
                      <circle
                        cx="30"
                        cy="30"
                        r="1.5"
                        fill="#4F46E5"
                      />
                    </pattern>
                  </defs>
                  <rect
                    width="100%"
                    height="100%"
                    fill="url(#simpleDiamondPattern)"
                  />
                </svg>

                {/* Subtle highlight - Updated to indigo */}
                <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-indigo-300 rounded-full filter blur-3xl opacity-10 group-hover:opacity-15 transition-opacity duration-300"></div>
                <div className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-indigo-300 rounded-full filter blur-3xl opacity-10 group-hover:opacity-15 transition-opacity duration-300"></div>
              </div>

              <div className="p-6 flex flex-col items-center justify-center h-full text-center z-10">
                {/* Top Section - Premium Badge - Updated to indigo */}
                <div className="bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200 mb-3">
                  <span className="text-xs font-semibold text-indigo-700 flex items-center gap-1">
                    ULTRA PREMIUM
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Ramadan Collection
                </h2>
                <p className="text-gray-600 text-sm mb-5 max-w-[220px]">
                  Limited edition flagship smartphones
                </p>

                {/* Middle - Diamond Shape with Price Inside - Updated to indigo */}
                <div className="relative mb-5 transform group-hover:scale-110 transition-transform duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-300/10 to-indigo-300/10 rounded-lg blur-xl"></div>
                  <div className="relative bg-white border border-indigo-200 p-4 rounded-lg shadow-sm">
                    <div className="text-4xl font-extrabold text-indigo-700">
                      40<span className="text-xl">%</span>
                    </div>
                    <div className="text-sm text-indigo-600 font-medium mt-1">
                      RAMADAN DISCOUNTS
                    </div>
                  </div>
                </div>

                {/* Bottom Button - Updated to indigo */}
                <button onClick={() => navigate("/shop")} className="w-full py-3 bg-gradient-to-r from-blue-700 to-indigo-900 text-white font-bold px-3 rounded-lg hover:from-[#1D267D] hover:to-[#004AAD] text-sm  flex items-center justify-center gap-2 transition-all duration-300 shadow-sm group-hover:shadow-md transform group-hover:translate-y-[-2px]">
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
              <div className="flex items-center gap-4">
                <a
                  href="http://localhost:5175/shop"
                  className="text-[#004AAD] hover:underline font-medium backdrop-blur-sm"
                >
                  Browse All Products →
                </a>
              </div>
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
                        className={`p-1.5 rounded-lg border transition-all duration-200 ${isInWishlist(product.id)
                          ? "border-pink-200 bg-pink-50 hover:bg-pink-100"
                          : "border-gray-200 hover:bg-gray-50"
                          }`}
                        onClick={(e) => toggleWishlist(e, product)}
                        aria-label={
                          isInWishlist(product.id)
                            ? "Remove from wishlist"
                            : "Add to wishlist"
                        }
                      >
                        <Heart
                          className={`w-4 h-4 transition-colors ${isInWishlist(product.id)
                            ? "text-pink-600 fill-pink-600"
                            : "text-gray-600"
                            }`}
                        />
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
          
          @keyframes heartBeat {
            0% { transform: scale(1); }
            14% { transform: scale(1.3); }
            28% { transform: scale(1); }
            42% { transform: scale(1.3); }
            70% { transform: scale(1); }
          }
          .heart-beat {
            animation: heartBeat 1s;
          }
        `}
      </style>
    </section>
  );
}
