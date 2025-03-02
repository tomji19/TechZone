import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Heart, ShoppingCart, ChevronLeft, Plus, Minus } from "lucide-react";
import { useCart } from "../../Components/CartContext/CartContext";

const ProductDetail = () => {
  const { id } = useParams(); // Get product ID from URL
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();
  const [product, setProduct] = useState(location.state?.product || null);
  const [selectedImage, setSelectedImage] = useState(location.state?.product?.image1 || null);
  const [quantity, setQuantity] = useState(1);
  
  // Magnifier state and refs
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef(null);

  useEffect(() => {
    if (!product) {
      fetch(`http://localhost:5000/products/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Product not found");
          }
          return response.json();
        })
        .then((data) => {
          setProduct(data);
          setSelectedImage(data.image1);
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
          navigate("/shop"); // Redirect if product not found
        });
    }
  }, [id, navigate, product]);

  const handleQuantityChange = (action) => {
    if (action === "increase") {
      setQuantity((prev) => prev + 1);
    } else if (action === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleMouseEnter = () => {
    setShowMagnifier(true);
  };

  const handleMouseLeave = () => {
    setShowMagnifier(false);
  };

  const handleMouseMove = (e) => {
    if (imageContainerRef.current) {
      const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
      
      // Calculate cursor position relative to the image container
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      
      // Set cursor position (as percentage) for background image positioning
      setCursorPosition({ x, y });
      
      // Set magnifier position at cursor
      setMagnifierPosition({ 
        x: e.clientX - left, 
        y: e.clientY - top 
      });
    }
  };

  const isInCart = cartItems.some((item) => item.id === product?.id);

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h2 className="text-xl font-semibold text-gray-700">Loading product...</h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate("/shop")}
        className="flex items-center text-gray-600 hover:text-[#FA8232] mb-8 transition-colors duration-300"
      >
        <ChevronLeft className="w-5 h-5" />
        <span>Back to Shop</span>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="space-y-4">
          <div 
            ref={imageContainerRef}
            className="relative w-80 h-80 bg-white rounded-xl overflow-hidden mx-auto cursor-zoom-in"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
          >
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-contain"
            />
            
            {/* Magnifier glass */}
            {showMagnifier && (
              <div 
                className="absolute pointer-events-none border-2 border-[#3b3ccd] rounded-full overflow-hidden bg-white"
                style={{
                  width: "120px",
                  height: "120px",
                  left: magnifierPosition.x - 60,
                  top: magnifierPosition.y - 60,
                  backgroundImage: `url(${selectedImage})`,
                  backgroundPosition: `${cursorPosition.x}% ${cursorPosition.y}%`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "300%", // Zoom level
                  zIndex: 10
                }}
              />
            )}
          </div>

          <div className="grid grid-cols-4 gap-4">
            {[product.image1, product.image2, product.image3, product.image4]
              .filter(Boolean)
              .map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    selectedImage === image ? "border-[#3b3ccd]" : "border-gray-200"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm text-gray-500">{product.category}</p>
            <h1 className="text-2xl font-semibold text-gray-800">{product.name}</h1>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-[#1B6392]">${product.price}</span>
              {product.discount && (
                <span className="text-lg text-gray-500 line-through">${product.discount}</span>
              )}
            </div>
          </div>

          {product.description && (
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-600">{product.description}</p>
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => handleQuantityChange("decrease")}
                  className="p-2 hover:text-[#FA8232] transition-colors duration-300"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="w-12 text-center">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange("increase")}
                  className="p-2 hover:text-[#FA8232] transition-colors duration-300"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-gray-500">
                {product.stock > 0 ? `${product.stock} items available` : "Out of stock"}
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => addToCart({ ...product, quantity })}
                disabled={!product.stock}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-white transition-all duration-300 ${
                  product.stock ? "bg-[#FA8232] hover:bg-[#FA8232]/90" : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                {isInCart ? "Added to Cart" : "Add to Cart"}
              </button>
              <button className="p-3 rounded-lg border border-gray-300 hover:border-[#FA8232] hover:text-[#FA8232] transition-all duration-300">
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Product Features */}
          {product.features && (
            <div className="border-t pt-6 mt-6">
              <h3 className="text-lg font-semibold mb-4">Product Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 mt-2 mr-2 bg-[#FA8232] rounded-full" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;