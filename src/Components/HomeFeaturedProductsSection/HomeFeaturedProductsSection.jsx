import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Check } from "lucide-react";
import { useCart } from "../../Components/CartContext/CartContext";
import airpod from "../../assets/airpod.png";
import { ShoppingBag, Zap, ArrowRight } from "lucide-react";

// Custom Toast Component
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

// Rest of the component remains the same
export default function HomeFeaturedProductsSection() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [toast, setToast] = useState(null);

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

  return (
    <section className="py-5 px-4 sm:px-8 lg:px-16">
      <div className="min-h-screen">
        <div className="flex flex-col lg:flex-row lg:gap-7">
          {/* Promotional Banner */}
          <div className="hidden lg:flex flex-col w-[26%] h-full gap-6 sticky top-0">
  {/* Top Banner - Centered Content */}
  <div className="relative h-1/2 bg-gradient-to-br from-blue-800 to-[#41075c] rounded-xl shadow-md overflow-hidden flex flex-col items-center justify-center text-center">
    {/* Minimal Background Pattern */}
    <div className="absolute inset-0 opacity-5">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxkZWZzPgogICAgPHBhdHRlcm4gaWQ9ImRvdHMiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgIDxjaXJjbGUgY3g9IjIiIGN5PSIyIiByPSIxIiBmaWxsPSIjZmZmIiAvPgogICAgPC9wYXR0ZXJuPgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2RvdHMpIiAvPgo8L3N2Zz4K')]" />
    </div>

    {/* Content */}
    <div className="p-6 flex flex-col items-center justify-center h-full text-center">
      {/* Label */}
      <div className="bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
        <span className="text-xs font-medium text-white">Best Seller</span>
      </div>

      {/* Product Info */}
      <div className="flex flex-col items-center justify-center flex-grow py-6">
        <img src={airpod} alt="Wireless Earbuds" className="w-36 h-36 object-contain mb-4 drop-shadow-md" />
        <h2 className="text-xl font-semibold text-white mb-2">True Wireless Earbuds</h2>
        <p className="text-white/70 text-sm mb-4">Immersive sound, all-day comfort</p>
        <span className="font-bold text-white text-xl">2499 EGP</span>
      </div>

      {/* Button */}
      <button className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all duration-200">
        <ShoppingBag className="w-4 h-4" />
        Buy Now
      </button>
    </div>
  </div>

  {/* Bottom Banner - Centered Content */}
  <div className="relative h-1/2 bg-indigo-900 rounded-xl shadow-md overflow-hidden flex flex-col items-center justify-center text-center">
    <div className="p-6 flex flex-col items-center justify-center h-full text-center">
      {/* Top Section */}
      <Zap className="text-indigo-200 h-6 w-6 mb-3" />
      <h2 className="text-2xl font-bold text-white mb-3">Summer Sale</h2>
      <p className="text-indigo-200 text-sm mb-4">Get exclusive deals on all smartphones</p>

      {/* Middle - Large Sale Number */}
      <div className="text-5xl font-extrabold text-white mb-2">37%</div>
      <div className="text-lg text-indigo-200 font-medium">OFF</div>

      {/* Bottom Button */}
      <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all duration-200">
        Shop Collection
        <ArrowRight className="w-4 h-4" />
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
              <a href="#" className="text-[#004AAD] hover:underline body-font">
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
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
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
