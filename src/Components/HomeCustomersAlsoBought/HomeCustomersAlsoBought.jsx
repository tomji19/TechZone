import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Check } from "lucide-react";
import { useCart } from "../../Components/CartContext/CartContext";

// Custom Toast Component
const Toast = ({ message, product, onClose }) => (
  <div 
    className="fixed bottom-4 right-4 bg-white border border-indigo-500/20 shadow-lg rounded-lg p-4 animate-slide-up"
    style={{
      animation: 'slideUp 0.3s ease-out',
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

export default function HomeCustomersAlsoBought() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then(response => response.json())
      .then(data => {
        const shuffled = [...data].sort(() => 0.5 - Math.random());
        const randomProducts = shuffled.slice(0, 10);
        setProducts(randomProducts);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setProducts([]);
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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold heading-font">
          Customers Also Bought
        </h2>
        <a href="#" className="text-orange-500 hover:underline body-font">
          Browse All Products →
        </a>
      </div>

      <div className="min-h-screen">
        <div className="flex flex-col lg:flex-row lg:gap-3 items-stretch">
          <div className="w-full">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6 lg:gap-4">
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
                        className="flex-1 bg-gradient-to-r from-blue-700 to-indigo-900 hover:from-[#1D267D] hover:to-[#004AAD] text-white font-bold py-1.5 px-3 rounded-lg hover:bg-orange-600 flex items-center justify-center gap-1 text-xs"
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