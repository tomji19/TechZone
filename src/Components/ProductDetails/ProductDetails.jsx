import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, ChevronLeft, Plus, Minus } from "lucide-react";
import { useCart } from "../../Components/CartContext/CartContext";

const ProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state || {};
  const [selectedImage, setSelectedImage] = useState(product?.image1);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, cartItems } = useCart();
  const isInCart = cartItems.some((item) => item.id === product?.id);

  const handleQuantityChange = (action) => {
    if (action === "increase") {
      setQuantity((prev) => prev + 1);
    } else if (action === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Product Not Found
          </h2>
          <button
            onClick={() => navigate("/shop")}
            className="text-white bg-[#FA8232] hover:bg-[#FA8232]/90 px-6 py-2 rounded-lg transition-colors duration-300"
          >
            Return to Shop
          </button>
        </div>
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
          <div className="aspect-square bg-white rounded-xl overflow-hidden">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[product.image1, product.image2, product.image3, product.image4]
              .filter(Boolean)
              .map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    selectedImage === image
                      ? "border-[#FA8232]"
                      : "border-gray-200"
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
            <h1 className="text-2xl font-semibold text-gray-800">
              {product.name}
            </h1>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-[#1B6392]">
                ${product.price}
              </span>
              {product.discount && (
                <span className="text-lg text-gray-500 line-through">
                  ${product.discount}
                </span>
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
                {product.stock > 0
                  ? `${product.stock} items available`
                  : "Out of stock"}
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => addToCart({ ...product, quantity })}
                disabled={!product.stock}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-white transition-all duration-300 ${
                  product.stock
                    ? "bg-[#FA8232] hover:bg-[#FA8232]/90"
                    : "bg-gray-400 cursor-not-allowed"
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
