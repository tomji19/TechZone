import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Zap } from "lucide-react";

// Base64 encoded SVG background pattern
const backgroundSvg = `
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="hexagonPattern" width="50" height="86.6" patternUnits="userSpaceOnUse">
      <path d="M25,0 L50,14.4 L50,43.2 L25,57.6 L0,43.2 L0,14.4 Z" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="0.5" 
            stroke-opacity="0.1"/>
      <path d="M25,28.8 L50,43.2 L50,72 L25,86.4 L0,72 L0,43.2 Z" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="0.5" 
            stroke-opacity="0.1"/>
    </pattern>
    <linearGradient id="premiumGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1E1B4B;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#312E81;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1E1B4B;stop-opacity:1" />
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
      <feColorMatrix type="matrix"
        values="1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 15 -7"/>
    </filter>
  </defs>
  <rect width="100" height="100" fill="url(#premiumGradient)"/>
  <rect width="100" height="100" fill="url(#hexagonPattern)"/>
  <circle cx="10" cy="10" r="1" fill="#fff" filter="url(#glow)" opacity="0.15" />
  <circle cx="90" cy="90" r="1" fill="#fff" filter="url(#glow)" opacity="0.15" />
  <circle cx="90" cy="10" r="1" fill="#fff" filter="url(#glow)" opacity="0.15" />
  <circle cx="10" cy="90" r="1" fill="#fff" filter="url(#glow)" opacity="0.15" />
</svg>
`;

const HomePromotionSection = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFirstProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/products");
        if (!response.ok) throw new Error("Failed to fetch products");
        const products = await response.json();
        if (products.length > 0) {
          setProduct(products[0]);
        } else {
          setError("No products found");
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);

        // Set fallback product data for development
        setProduct({
          id: "1",
          name: "MacBook Pro M3",
          price: 1499,
          originalPrice: 1699,
          description:
            "Experience the power of Apple's latest M3 chip with exceptional performance and battery life.",
          image1: "/api/placeholder/800/600",
        });
      }
    };

    fetchFirstProduct();
  }, []);

  const handleShopNow = () => {
    if (product) {
      navigate(`/product/${product.id}`, { state: { product } });
    }
  };

  if (loading) {
    return (
      <section className="py-5 px-4 md:px-16">
        <div className="w-full bg-gradient-to-br from-indigo-950 via-indigo-900 to-indigo-950 p-4 md:p-6 relative rounded-xl overflow-hidden">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-pulse text-white">Loading product...</div>
          </div>
        </div>
      </section>
    );
  }

  if (error && !product) {
    return (
      <section className="py-5 px-4 md:px-16">
        <div className="w-full bg-gradient-to-br from-indigo-950 via-indigo-900 to-indigo-950 p-4 md:p-6 relative rounded-xl overflow-hidden">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-white">Error: {error}</div>
          </div>
        </div>
      </section>
    );
  }

  if (!product) return null;

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  return (
    <section className="py-5 px-4 md:px-16">
      <div className="w-full p-4 md:p-8 relative rounded-xl overflow-hidden bg-gradient-to-br from-indigo-950 via-indigo-900 ">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div 
            className="absolute top-0 left-0 w-full h-full bg-repeat"
            style={{
              opacity: 0.8
            }}
          />
          {/* Gradient overlay */}
          <div className="absolute bg-gradient-to-br from-indigo-950/50 via-transparent to-indigo-950/50" />
        </div>

        {/* Main Container */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-8 relative">
          {/* Left Content */}
          <div className="lg:max-w-xl z-10">
            {/* Special Tag */}
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm w-fit px-4 py-2 rounded-full mb-6">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-white text-sm font-medium">
                {hasDiscount ? "LIMITED TIME OFFER" : "FEATURED PRODUCT"}
              </span>
            </div>

            {/* Product Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              {product.name}
            </h1>

            {/* Product Description */}
            <p className="text-white/80 text-base md:text-lg mb-8 max-w-lg">
              {product.description ||
                "Experience our high-quality product. Perfect for all your needs."}
            </p>

            {/* CTA Button */}
            <button
              onClick={handleShopNow}
              className="group bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg flex items-center gap-2 transition-all duration-300 backdrop-blur-sm"
            >
              Shop Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right Content - Image with Price Tag */}
          <div className="relative flex-1 min-h-[300px] lg:min-h-[400px]">
            {/* Floating Price Tag */}
            <div className="absolute top-4 right-4 z-20 bg-white/10 backdrop-blur-md rounded-2xl p-4 text-white border border-white/20">
              <div className="flex flex-col items-end">
                {hasDiscount && (
                  <span className="text-sm line-through text-white/60 mb-1">
                    ${product.originalPrice}
                  </span>
                )}
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">${product.price}</span>
                </div>
              </div>
            </div>

            {/* Product Image Container */}
            <div className="relative h-full rounded-xl overflow-hidden group">
              <div className="absolute inset-0 " />
              <img
                src={product.image1 || "/api/placeholder/800/600"}
                alt={product.name}
                className="relative z-10 w-full h-full object-contain p-6 product-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePromotionSection;