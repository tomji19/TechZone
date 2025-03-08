import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Heart,
  ShoppingCart,
  ChevronLeft,
  Plus,
  Minus,
  Share2,
  X,
  Twitter,
  Facebook,
  Linkedin,
  Mail,
  Link as LinkIcon,
  CreditCard,
  WalletCards,
  Check,
} from "lucide-react";
import { useCart } from "../../Components/CartContext/CartContext";
import { useAuth } from "../../Pages/AuthContextYoussef/AuthContextYoussef";
import { Link } from "react-router-dom";
import HomeGridProductsSection from "./../HomeGridProductsSection/HomeGridProductsSection";

// Toast notification component
const Toast = ({ message, product, onClose, type }) => (
  <div
    className="fixed bottom-4 right-4 bg-white border border-indigo-500/20 shadow-lg rounded-lg p-4 z-50"
    style={{ animation: "slideUp 0.3s ease-out" }}
  >
    <div className="flex items-center gap-3">
      <div
        className={`rounded-full p-1.5 ${
          type === "wishlist"
            ? "bg-pink-600"
            : type === "error"
            ? "bg-red-600"
            : "bg-gradient-to-r from-blue-700 to-indigo-900"
        }`}
      >
        {type === "error" ? (
          <X className="w-5 h-5 text-white" />
        ) : (
          <ShoppingCart className="w-5 h-5 text-white" />
        )}
      </div>
      <div className="flex flex-col">
        <p className="text-sm font-medium text-gray-900">
          {type === "wishlist"
            ? "Added to Wishlist!"
            : type === "error"
            ? "Error"
            : "Added to Cart!"}
        </p>
        <p
          className={`text-xs ${
            type === "wishlist"
              ? "text-pink-600"
              : type === "error"
              ? "text-red-600"
              : "text-indigo-600"
          }`}
        >
          {message || product?.name}
        </p>
      </div>
    </div>
  </div>
);

// Image Modal component
const ImageModal = ({ image, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="relative max-w-4xl max-h-[90vh] bg-white rounded-xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md z-10 hover:bg-gray-100"
        >
          <X className="w-6 h-6 text-gray-800" />
        </button>
        <img
          src={image}
          alt="Product enlarged view"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

// Share Modal component
const ShareModal = ({ product, isOpen, onClose }) => {
  if (!isOpen) return null;

  const shareUrl = window.location.href;
  const shareTitle = product?.name || "Check out this product";

  const shareLinks = [
    {
      name: "Twitter",
      icon: <Twitter className="w-5 h-5" />,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        shareTitle
      )}&url=${encodeURIComponent(shareUrl)}`,
      color: "bg-[#1DA1F2] text-white",
    },
    {
      name: "Facebook",
      icon: <Facebook className="w-5 h-5" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl
      )}`,
      color: "bg-[#4267B2] text-white",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-5 h-5" />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        shareUrl
      )}`,
      color: "bg-[#0077B5] text-white",
    },
    {
      name: "Email",
      icon: <Mail className="w-5 h-5" />,
      url: `mailto:?subject=${encodeURIComponent(
        shareTitle
      )}&body=${encodeURIComponent(`Check out this product: ${shareUrl}`)}`,
      color: "bg-gray-700 text-white",
    },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="relative w-full max-w-md bg-white rounded-xl overflow-hidden shadow-xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">
              Share Product
            </h3>
            <button
              onClick={onClose}
              className="rounded-full p-1 hover:bg-gray-100"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            {shareLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${link.color} transition-all duration-300 hover:opacity-90`}
              >
                {link.icon}
                <span>{link.name}</span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button
              onClick={copyToClipboard}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-2 rounded-lg transition-colors duration-300 flex items-center gap-1"
            >
              <LinkIcon className="w-4 h-4" />
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductDetail = () => {
  const { id } = useParams(); // Get product ID from URL
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();
  const { user, userData, addToWishlist, removeFromWishlist } = useAuth();
  const [product, setProduct] = useState(null); // Always fetch fresh data
  const [selectedImage, setSelectedImage] = useState(null);
  const [toast, setToast] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Magnifier state and refs
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef(null);

  // Payment methods data
  const paymentMethods = [
    { name: "Visa", color: "#1A1F71", textColor: "white", icon: CreditCard },
    {
      name: "Mastercard",
      color: "#EB001B",
      textColor: "white",
      icon: CreditCard,
    },
    { name: "PayPal", color: "#003087", textColor: "white", icon: WalletCards },
    {
      name: "Apple Pay",
      color: "#000000",
      textColor: "white",
      icon: CreditCard,
    },
    {
      name: "Google Pay",
      color: "#4285F4",
      textColor: "white",
      icon: WalletCards,
    },
  ];

  // Fetch product data based on id
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/products/${id}`);
        if (!response.ok) {
          throw new Error("Product not found");
        }
        const data = await response.json();
        setProduct(data);
        setSelectedImage(data.image1);
      } catch (error) {
        console.error("Error fetching product:", error);
        navigate("/shop"); // Redirect if product not found
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, navigate]); // Always re-fetch when id changes

  // Fetch related products
  useEffect(() => {
    if (product) {
      fetch("http://localhost:5000/products")
        .then((response) => response.json())
        .then((data) => {
          let filtered = data.filter(
            (p) => p.category === product.category && p.id !== product.id
          );
          if (filtered.length < 5) {
            const otherProducts = data.filter(
              (p) => p.id !== product.id && !filtered.includes(p)
            );
            const shuffled = [...otherProducts].sort(() => 0.5 - Math.random());
            filtered = [...filtered, ...shuffled.slice(0, 5 - filtered.length)];
          }
          setRelatedProducts(filtered.slice(0, 10));
        })
        .catch((error) => {
          console.error("Error fetching related products:", error);
          setRelatedProducts([]);
        });
    }
  }, [product]);

  const handleAddToCart = () => {
    if (!product.stock || product.stock === "out of stock") {
      setToast({ message: "Product is out of stock", type: "error" });
      setTimeout(() => setToast(null), 3000);
      return;
    }
    addToCart({ ...product, quantity: 1 });
    setToast({
      message: `${product.name} added to cart`,
      product,
      type: "cart",
    });
    setTimeout(() => setToast(null), 3000);
  };

  const handleMouseEnter = () => setShowMagnifier(true);
  const handleMouseLeave = () => setShowMagnifier(false);
  const handleMouseMove = (e) => {
    if (imageContainerRef.current) {
      const { left, top, width, height } =
        imageContainerRef.current.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      setCursorPosition({ x, y });
      setMagnifierPosition({ x: e.clientX - left, y: e.clientY - top });
    }
  };

  const isInCart = cartItems.some((item) => item.id === product?.id);
  const isInWishlist = () =>
    userData?.wishlist?.some((item) => item.id === product?.id);

  const toggleWishlist = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (isInWishlist()) {
      removeFromWishlist(product.id);
      setToast({
        message: `${product.name} removed from wishlist`,
        product,
        type: "wishlist-remove",
      });
    } else {
      addToWishlist(product);
      setToast({
        message: `${product.name} added to wishlist`,
        product,
        type: "wishlist",
      });
    }
    setTimeout(() => setToast(null), 3000);
  };

  const getStockStatus = () => {
    if (!product) return "";
    if (typeof product.stock === "string") {
      return product.stock.toLowerCase() === "in stock"
        ? "In Stock"
        : "Out of Stock";
    }
    return product.stock > 0 ? "In Stock" : "Out of Stock";
  };

  const stockStatus = getStockStatus();
  const isOutOfStock = stockStatus === "Out of Stock";

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Shop", url: "/shop" },
    {
      name: product?.category || "Category",
      url: `/shop?category=${product?.category}`,
    },
    { name: product?.name || "Product", url: null },
  ];

  const handleRelatedProductClick = (product) => {
    navigate(`/product/${product.id}`);
    window.scrollTo(0, 0);
  };

  const handleAddToRelatedCart = (e, product) => {
    e.stopPropagation();
    addToCart(product);
    setToast({ message: "Product added to cart", product, type: "cart" });
    setTimeout(() => setToast(null), 3000);
  };

  const isInRelatedWishlist = (productId) =>
    userData?.wishlist?.some((item) => item.id === productId) || false;

  const toggleRelatedWishlist = (e, product) => {
    e.stopPropagation();
    if (!user) {
      navigate("/login");
      return;
    }
    if (isInRelatedWishlist(product.id)) {
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-center">
          <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-6"></div>
          <div className="h-6 w-48 bg-gray-200 rounded mx-auto mb-2"></div>
          <div className="h-4 w-32 bg-gray-200 rounded mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!product) return null; // Handled by navigate in useEffect

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="flex mb-6 text-sm">
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            {index > 0 && <span className="mx-2 text-gray-400">/</span>}
            {crumb.url ? (
              <a
                href={crumb.url}
                className="text-gray-600 hover:text-indigo-700 transition-colors duration-300"
              >
                {crumb.name}
              </a>
            ) : (
              <span className="text-indigo-600 font-medium">{crumb.name}</span>
            )}
          </React.Fragment>
        ))}
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="space-y-4">
          <div
            ref={imageContainerRef}
            className="relative w-full h-80 md:h-96 bg-white rounded-xl overflow-hidden mx-auto cursor-zoom-in shadow-md border border-gray-200"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            onClick={() => setModalOpen(true)}
          >
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-contain"
            />
            {showMagnifier && (
              <div
                className="absolute pointer-events-none border-2 border-[#3b3ccd] rounded-full overflow-hidden bg-white shadow-lg"
                style={{
                  width: "150px",
                  height: "150px",
                  left: magnifierPosition.x - 75,
                  top: magnifierPosition.y - 75,
                  backgroundImage: `url(${selectedImage})`,
                  backgroundPosition: `${cursorPosition.x}% ${cursorPosition.y}%`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "350%",
                  zIndex: 10,
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
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 hover:shadow-md ${
                    selectedImage === image
                      ? "border-[#3b3ccd] ring-2 ring-blue-100"
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
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">{product.category}</p>
              <span
                className={`px-2 py-1 text-xs rounded-full font-medium ${
                  isOutOfStock
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {stockStatus}
              </span>
            </div>
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
              {product.discount && (
                <span className="px-2 py-1 text-xs bg-red-100 text-red-600 rounded-full font-medium">
                  {Math.round((1 - product.price / product.discount) * 100)}%
                  OFF
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
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-white font-medium transition-all duration-300 ${
                  isOutOfStock
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-700 to-indigo-900 hover:shadow-md hover:from-blue-800 hover:to-indigo-950"
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                {isInCart ? "Added to Cart" : "Add to Cart"}
              </button>
              <button
                onClick={toggleWishlist}
                className={`sm:w-14 py-3 rounded-lg transition-all duration-300 flex items-center justify-center ${
                  isInWishlist()
                    ? "bg-pink-100 text-pink-600 border border-pink-300 hover:bg-pink-200"
                    : "border border-gray-300 text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Heart
                  className={`w-5 h-5 ${isInWishlist() ? "fill-pink-600" : ""}`}
                />
              </button>
              <button
                onClick={() => setShareModalOpen(true)}
                className="sm:w-14 py-3 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition-all duration-300 flex items-center justify-center"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="border-t pt-6 mt-6">
            <h3 className="text-lg font-semibold mb-4 text-indigo-900">
              Accepted Payment Methods
            </h3>
            <div className="flex flex-wrap gap-3">
              {paymentMethods.map((method, index) => {
                const IconComponent = method.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md shadow-sm"
                    style={{ backgroundColor: method.color }}
                  >
                    <IconComponent
                      className="w-4 h-4"
                      style={{ color: method.textColor }}
                    />
                    <span
                      className="text-xs font-medium"
                      style={{ color: method.textColor }}
                    >
                      {method.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Product Features */}
          {product.features && (
            <div className="border-t pt-6 mt-6">
              <h3 className="text-lg font-semibold mb-4 text-indigo-900">
                Product Features
              </h3>
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

      {/* Back Button */}
      <button
        onClick={() => navigate("/shop")}
        className="mt-10 flex items-center text-gray-600 hover:text-[#004AAD] transition-colors duration-300"
      >
        <ChevronLeft className="w-5 h-5" />
        Back to Shop
      </button>

      <ImageModal
        image={selectedImage}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
      <ShareModal
        product={product}
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
      />
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      {/* Customers Also Bought Section */}
      {relatedProducts.length > 0 && (
        <section className="mt-16 py-2 sm:py-4">
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
          <div className="w-full overflow-x-auto pb-2 sm:pb-4 no-scrollbar -mx-2 px-2">
            <div className="flex gap-3 md:gap-4 min-w-max">
              {relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  onClick={() => handleRelatedProductClick(relatedProduct)}
                  className="bg-white rounded-lg overflow-hidden shadow-md flex-shrink-0 w-[200px] md:w-[220px] lg:w-[240px] group relative cursor-pointer"
                >
                  <div className="relative h-48 md:h-52 lg:h-56">
                    <img
                      src={relatedProduct.image1}
                      alt={relatedProduct.name}
                      className="w-full h-full object-contain"
                    />
                    {relatedProduct.discount && (
                      <span className="absolute top-2 left-2 bg-red-500 text-white px-1 py-0.5 rounded-sm text-xs">
                        Sale
                      </span>
                    )}
                  </div>
                  <div className="p-3">
                    <div className="text-xs font-semibold text-gray-600 mb-1 truncate">
                      {relatedProduct.category}
                    </div>
                    <h3 className="h-12 text-gray-800 text-sm font-semibold mb-1 body-font line-clamp-2">
                      {relatedProduct.name}
                    </h3>
                    <div className="flex items-center">
                      <p className="text-[#1B6392] font-bold heading-font text-sm">
                        ${relatedProduct.price}
                      </p>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <button
                        className={`p-1 rounded-md border transition-all duration-200 ${
                          isInRelatedWishlist(relatedProduct.id)
                            ? "border-pink-200 bg-pink-50 hover:bg-pink-100"
                            : "border-gray-200 hover:bg-gray-50"
                        }`}
                        onClick={(e) =>
                          toggleRelatedWishlist(e, relatedProduct)
                        }
                        aria-label={
                          isInRelatedWishlist(relatedProduct.id)
                            ? "Remove from wishlist"
                            : "Add to wishlist"
                        }
                      >
                        <Heart
                          className={`w-4 h-4 transition-colors ${
                            isInRelatedWishlist(relatedProduct.id)
                              ? "text-pink-600 fill-pink-600"
                              : "text-gray-600"
                          }`}
                        />
                      </button>
                      <button
                        onClick={(e) =>
                          handleAddToRelatedCart(e, relatedProduct)
                        }
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
        </section>
      )}

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
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default ProductDetail;
