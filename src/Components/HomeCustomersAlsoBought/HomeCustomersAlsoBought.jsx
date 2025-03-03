// import React, { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { Heart, ShoppingCart, Check } from "lucide-react";
// import { useCart } from "../../Components/CartContext/CartContext";
// import { useAuth } from "../../Pages/AuthContextYoussef/AuthContextYoussef";

// // Custom Toast Component
// const Toast = ({ message, product, onClose, type }) => (
//   <div
//     className="fixed bottom-4 right-4 bg-white border border-indigo-500/20 shadow-lg rounded-lg p-3 sm:p-4 animate-slide-up"
//     style={{ animation: "slideUp 0.3s ease-out", zIndex: 1000 }}
//   >
//     <div className="flex items-center gap-2 sm:gap-3">
//       <div
//         className={`rounded-full p-1 sm:p-1.5 ${
//           type === "wishlist"
//             ? "bg-pink-600"
//             : "bg-gradient-to-r from-blue-700 to-indigo-900"
//         }`}
//       >
//         <Check className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//       </div>
//       <div className="flex flex-col">
//         <p className="text-xs sm:text-sm font-medium text-gray-900">
//           {type === "wishlist" ? "Added to Wishlist!" : "Added to Cart!"}
//         </p>
//         <p
//           className={`text-xs ${
//             type === "wishlist" ? "text-pink-600" : "text-indigo-600"
//           }`}
//         >
//           {product?.name}
//         </p>
//       </div>
//     </div>
//   </div>
// );

// export default function HomeCustomersAlsoBought() {
//   const navigate = useNavigate();
//   const { addToCart } = useCart();
//   const { user, userData, addToWishlist, removeFromWishlist, loading } =
//     useAuth();
//   const [products, setProducts] = useState([]);
//   const [toast, setToast] = useState(null);

//   useEffect(() => {
//     fetch("http://192.168.1.9:5000/products")
//       .then((response) => response.json())
//       .then((data) => {
//         const shuffled = [...data].sort(() => 0.5 - Math.random());
//         const randomProducts = shuffled.slice(0, 10);
//         setProducts(randomProducts);
//       })
//       .catch((error) => {
//         console.error("Error fetching products:", error);
//         setProducts([]);
//       });
//   }, []);

//   const handleProductClick = (product) => {
//     navigate(`/product/${product.id}`, { state: { product } });
//   };

//   const handleAddToCart = (e, product) => {
//     e.stopPropagation();
//     addToCart(product);
//     setToast({ message: "Product added to cart", product, type: "cart" });
//     setTimeout(() => setToast(null), 3000);
//   };

//   const isInWishlist = (productId) => {
//     return userData?.wishlist?.some((item) => item.id === productId) || false;
//   };

//   const toggleWishlist = (e, product) => {
//     e.stopPropagation();
//     if (!user) {
//       navigate("/login");
//       return;
//     }

//     if (isInWishlist(product.id)) {
//       removeFromWishlist(product.id);
//       setToast({
//         message: "Removed from wishlist",
//         product,
//         type: "wishlist-remove",
//       });
//     } else {
//       addToWishlist(product);
//       setToast({ message: "Added to wishlist", product, type: "wishlist" });
//     }
//     setTimeout(() => setToast(null), 3000);
//   };

//   if (loading) return null;

//   return (
//     <section className="py-2 px-2 sm:py-4 sm:px-6 md:px-8 lg:px-16">
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 sm:mb-4 md:mb-6">
//         <h2 className="text-lg sm:text-xl md:text-2xl font-semibold heading-font mb-1 sm:mb-0">
//           Customers Also Bought
//         </h2>
//         <Link
//           to="/shop"
//           className="text-[#004AAD] hover:underline text-xs sm:text-sm md:text-base font-medium backdrop-blur-sm"
//         >
//           Browse All Products →
//         </Link>
//       </div>

//       {/* Products container - optimized for extra small screens */}
//       <div className="w-full">
//         {/* Horizontal scroll container */}
//         <div className="w-full overflow-x-auto pb-2 sm:pb-4 no-scrollbar -mx-2 px-2">
//           <div className="flex gap-2 sm:gap-3 md:gap-4 min-w-max">
//             {products.map((product) => (
//               <div
//                 key={product.id}
//                 onClick={() => handleProductClick(product)}
//                 className="bg-white rounded-lg overflow-hidden shadow-md flex-shrink-0 w-[120px] sm:w-[200px] md:w-[220px] lg:w-[240px] group relative cursor-pointer"
//               >
//                 <div className="relative h-28 sm:h-48 md:h-52 lg:h-56">
//                   <img
//                     src={product.image1}
//                     alt={product.name}
//                     className="w-full h-full object-contain"
//                   />
//                   {product.discount && (
//                     <span className="absolute top-1 left-1 sm:top-2 sm:left-2 bg-red-500 text-white px-1 py-0.5 rounded-sm text-xs">
//                       Sale
//                     </span>
//                   )}
//                 </div>
//                 <div className="p-1.5 sm:p-3">
//                   <div className="text-xs font-semibold text-gray-600 mb-0.5 sm:mb-1 truncate">
//                     {product.category}
//                   </div>
//                   <h3 className="h-8 sm:h-12 text-gray-800 text-xs font-semibold mb-0.5 sm:mb-1 body-font line-clamp-2">
//                     {product.name}
//                   </h3>
//                   <div className="flex items-center">
//                     <p className="text-[#1B6392] font-bold heading-font text-xs sm:text-sm">
//                       ${product.price}
//                     </p>
//                   </div>
//                   <div className="flex gap-1 mt-1 sm:mt-2">
//                     <button
//                       className={`p-0.5 sm:p-1 rounded-md border transition-all duration-200 ${
//                         isInWishlist(product.id)
//                           ? "border-pink-200 bg-pink-50 hover:bg-pink-100"
//                           : "border-gray-200 hover:bg-gray-50"
//                       }`}
//                       onClick={(e) => toggleWishlist(e, product)}
//                       aria-label={
//                         isInWishlist(product.id)
//                           ? "Remove from wishlist"
//                           : "Add to wishlist"
//                       }
//                     >
//                       <Heart
//                         className={`w-3 h-3 sm:w-4 sm:h-4 transition-colors ${
//                           isInWishlist(product.id)
//                             ? "text-pink-600 fill-pink-600"
//                             : "text-gray-600"
//                         }`}
//                       />
//                     </button>
//                     <button
//                       onClick={(e) => handleAddToCart(e, product)}
//                       className="flex-1 bg-gradient-to-r from-blue-700 to-indigo-900 hover:from-[#1D267D] hover:to-[#004AAD] text-white font-bold py-0.5 sm:py-1 px-1 sm:px-2 rounded-md flex items-center justify-center gap-0.5 sm:gap-1 text-xs"
//                     >
//                       <ShoppingCart className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4" />
//                       <span className="hidden sm:inline">Add to Cart</span>
//                       <span className="sm:hidden">Add</span>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {toast && <Toast {...toast} onClose={() => setToast(null)} />}

//       <style jsx>{`
//         @keyframes slideUp {
//           from {
//             transform: translateY(100%);
//             opacity: 0;
//           }
//           to {
//             transform: translateY(0);
//             opacity: 1;
//           }
//         }
//         .animate-slide-up {
//           animation: slideUp 0.3s ease-out;
//         }
//         @keyframes heartBeat {
//           0% {
//             transform: scale(1);
//           }
//           14% {
//             transform: scale(1.3);
//           }
//           28% {
//             transform: scale(1);
//           }
//           42% {
//             transform: scale(1.3);
//           }
//           70% {
//             transform: scale(1);
//           }
//         }
//         .heart-beat {
//           animation: heartBeat 1s;
//         }
//         /* Hide scrollbar for Chrome, Safari and Opera */
//         .no-scrollbar::-webkit-scrollbar {
//           display: none;
//         }
//         /* Hide scrollbar for IE, Edge and Firefox */
//         .no-scrollbar {
//           -ms-overflow-style: none;  /* IE and Edge */
//           scrollbar-width: none;  /* Firefox */
//         }
//       `}</style>
//     </section>
//   );
// }




import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Heart, ShoppingCart, Check } from "lucide-react";
import { useCart } from "../../Components/CartContext/CartContext";
import { useAuth } from "../../Pages/AuthContextYoussef/AuthContextYoussef";

// Custom Toast Component
const Toast = ({ message, product, onClose, type }) => (
  <div
    className="fixed bottom-4 right-4 bg-white border border-indigo-500/20 shadow-lg rounded-lg p-3 animate-slide-up"
    style={{ animation: "slideUp 0.3s ease-out", zIndex: 1000 }}
  >
    <div className="flex items-center gap-2">
      <div
        className={`rounded-full p-1 ${
          type === "wishlist"
            ? "bg-pink-600"
            : "bg-gradient-to-r from-blue-700 to-indigo-900"
        }`}
      >
        <Check className="w-4 h-4 text-white" />
      </div>
      <div className="flex flex-col">
        <p className="text-xs font-medium text-gray-900">
          {type === "wishlist" ? "Added to Wishlist!" : "Added to Cart!"}
        </p>
        <p
          className={`text-xs ${
            type === "wishlist" ? "text-pink-600" : "text-indigo-600"
          }`}
        >
          {product?.name}
        </p>
      </div>
    </div>
  </div>
);

export default function HomeCustomersAlsoBought() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user, userData, addToWishlist, removeFromWishlist, loading } =
    useAuth();
  const [products, setProducts] = useState([]);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetch("http://192.168.1.9:5000/products")
      .then((response) => response.json())
      .then((data) => {
        const shuffled = [...data].sort(() => 0.5 - Math.random());
        const randomProducts = shuffled.slice(0, 10);
        setProducts(randomProducts);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setProducts([]);
      });
  }, []);

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product);
    setToast({ message: "Product added to cart", product, type: "cart" });
    setTimeout(() => setToast(null), 3000);
  };

  const isInWishlist = (productId) => {
    return userData?.wishlist?.some((item) => item.id === productId) || false;
  };

  const toggleWishlist = (e, product) => {
    e.stopPropagation();
    if (!user) {
      navigate("/login");
      return;
    }

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      setToast({
        message: "Removed from wishlist",
        product,
        type: "wishlist-remove",
      });
    } else {
      addToWishlist(product);
      setToast({ message: "Added to wishlist", product, type: "wishlist" });
    }
    setTimeout(() => setToast(null), 3000);
  };

  if (loading) return null;

  return (
    <section className="py-2 px-2 sm:py-4 sm:px-6 md:px-8 lg:px-16">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 sm:mb-4 md:mb-6">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold heading-font mb-1 sm:mb-0">
          Customers Also Bought
        </h2>
        <Link
          to="/shop"
          className="text-[#004AAD] hover:underline text-xs sm:text-sm md:text-base font-medium backdrop-blur-sm"
        >
          Browse All Products →
        </Link>
      </div>

      {/* Products container - consistent sizing for all screens */}
      <div className="w-full">
        {/* Horizontal scroll container */}
        <div className="w-full overflow-x-auto pb-2 sm:pb-4 no-scrollbar -mx-2 px-2">
          <div className="flex gap-3 md:gap-4 min-w-max">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => handleProductClick(product)}
                className="bg-white rounded-lg overflow-hidden shadow-md flex-shrink-0 w-[200px] md:w-[220px] lg:w-[240px] group relative cursor-pointer"
              >
                <div className="relative h-48 md:h-52 lg:h-56">
                  <img
                    src={product.image1}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                  {product.discount && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white px-1 py-0.5 rounded-sm text-xs">
                      Sale
                    </span>
                  )}
                </div>
                <div className="p-3">
                  <div className="text-xs font-semibold text-gray-600 mb-1 truncate">
                    {product.category}
                  </div>
                  <h3 className="h-12 text-gray-800 text-sm font-semibold mb-1 body-font line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center">
                    <p className="text-[#1B6392] font-bold heading-font text-sm">
                      ${product.price}
                    </p>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button
                      className={`p-1 rounded-md border transition-all duration-200 ${
                        isInWishlist(product.id)
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
                        className={`w-4 h-4 transition-colors ${
                          isInWishlist(product.id)
                            ? "text-pink-600 fill-pink-600"
                            : "text-gray-600"
                        }`}
                      />
                    </button>
                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      className="flex-1 bg-gradient-to-r from-blue-700 to-indigo-900 hover:from-[#1D267D] hover:to-[#004AAD] text-white font-bold py-1 px-2 rounded-md flex items-center justify-center gap-1 text-xs"
                    >
                      <ShoppingCart className="w-3 h-3 md:w-4 md:h-4" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <style jsx>{`
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
          0% {
            transform: scale(1);
          }
          14% {
            transform: scale(1.3);
          }
          28% {
            transform: scale(1);
          }
          42% {
            transform: scale(1.3);
          }
          70% {
            transform: scale(1);
          }
        }
        .heart-beat {
          animation: heartBeat 1s;
        }
        /* Hide scrollbar for Chrome, Safari and Opera */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        /* Hide scrollbar for IE, Edge and Firefox */
        .no-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </section>
  );
}