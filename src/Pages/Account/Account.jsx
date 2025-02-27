import React, { useState, useEffect } from "react";
import {
  Heart,
  MapPin,
  Settings,
  ShoppingBag,
  Lock,
  Mail,
  LogOut,
  CreditCard,
  Edit,
  Menu,
  Trash2,
} from "lucide-react";
import { useCart } from "../../Components/CartContext/CartContext"; // Import useCart

export default function Account() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [animateHeartIndex, setAnimateHeartIndex] = useState(null);

  // Access cart context
  const { addToCart } = useCart(); // Destructure addToCart from useCart

  // Fetch wishlist from localStorage on component mount
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setFavoriteItems(savedWishlist);
  }, []);

  const tabs = [
    {
      id: "Dashboard",
      label: "Dashboard",
      icon: <ShoppingBag className="w-5 h-5" />,
    },
    {
      id: "favorites",
      label: "Favorites",
      icon: <Heart className="w-5 h-5" />,
    },
    {
      id: "addresses",
      label: "Saved Addresses & Cards",
      icon: <MapPin className="w-5 h-5" />,
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  // Sample data
  const userEmail = "user@example.com";
  const recentOrders = [
    { id: 3511, date: "2025-02-10", total: "$129.99", status: "Delivered" },
    { id: 2313, date: "2025-02-05", total: "$89.99", status: "In Transit" },
    { id: 7512, date: "2025-01-30", total: "$199.99", status: "Processing" },
  ];

  const addresses = [
    { id: 1, type: "Home", address: "123 Main St, City, State 12345" },
    { id: 2, type: "Work", address: "456 Office Ave, City, State 12345" },
  ];

  const cards = [
    { id: 1, type: "Visa", last4: "4567" },
    { id: 2, type: "Mastercard", last4: "8901" },
  ];

  // Remove item from favorites
  const removeFromFavorites = (itemId) => {
    setAnimateHeartIndex(itemId);
    setTimeout(() => {
      const updatedFavorites = favoriteItems.filter(
        (item) => item.id !== itemId
      );
      setFavoriteItems(updatedFavorites);
      localStorage.setItem("wishlist", JSON.stringify(updatedFavorites));
      setAnimateHeartIndex(null);
    }, 500);
  };

  // Add item to cart
  const handleAddToCart = (item) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image1: item.image1,
      quantity: 1, // Default quantity when adding to cart
    });
  };

  return (
    <section className="py-5 px-4 sm:px-8 lg:px-16 bg-gray-50">
      <div className="mx-auto">
        <div className="bg-white shadow-sm">
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center justify-between p-4 border-b">
            <h1 className="text-xl font-semibold">My Account</h1>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div
            className={`lg:flex ${isMenuOpen ? "block" : "hidden"} lg:border-b`}
          >
            <div className="lg:flex lg:w-full">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center w-full lg:w-auto lg:flex-1 px-4 py-3 space-x-2 border-l-4 lg:border-l-0 lg:border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-[#FA8232] text-[#FA8232] bg-orange-50 lg:bg-transparent"
                      : "border-transparent text-gray-500 hover:text-[#FA8232] hover:bg-gray-50 lg:hover:bg-transparent"
                  }`}
                >
                  {tab.icon}
                  <span className="text-sm lg:text-base">{tab.label}</span>
                  {tab.id === "favorites" && favoriteItems.length > 0 && (
                    <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-[#FA8232] rounded-full">
                      {favoriteItems.length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-4 lg:p-6">
            {/* Dashboard Tab */}
            {activeTab === "Dashboard" && (
              <div className="space-y-4 lg:space-y-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <h2 className="text-xl lg:text-2xl font-semibold">
                    Welcome back, Youssef!
                  </h2>
                  <span className="text-sm text-gray-500">
                    Member since Jan 2024
                  </span>
                </div>

                {/* Email display */}
                <div className="bg-gray-50 p-3 lg:p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-5 h-5 text-[#FA8232]" />
                    <span className="text-sm lg:text-base">{userEmail}</span>
                  </div>
                </div>

                {/* Quick overview cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 lg:p-4 rounded-lg">
                    <h3 className="text-base lg:text-lg font-semibold mb-3">
                      Default Address
                    </h3>
                    {addresses[0] && (
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-5 h-5 text-[#FA8232]" />
                        <span className="text-sm lg:text-base">
                          {addresses[0].address}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="bg-gray-50 p-3 lg:p-4 rounded-lg">
                    <h3 className="text-base lg:text-lg font-semibold mb-3">
                      Default Card
                    </h3>
                    {cards[0] && (
                      <div className="flex items-center space-x-2">
                        <CreditCard className="w-5 h-5 text-[#FA8232]" />
                        <span className="text-sm lg:text-base">
                          {cards[0].type} ending in {cards[0].last4}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-gray-50 p-4 lg:p-6 rounded-lg">
                  <h3 className="text-base lg:text-lg font-semibold mb-3">
                    Recent Orders
                  </h3>
                  <div className="space-y-3">
                    {recentOrders.map((order) => (
                      <div
                        key={order.id}
                        className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-3 bg-white rounded-lg shadow-sm"
                      >
                        <div className="flex justify-between lg:block mb-2 lg:mb-0">
                          <span className="font-medium text-sm lg:text-base">
                            Order #{order.id}
                          </span>
                          <span className="lg:hidden font-medium">
                            {order.total}
                          </span>
                        </div>
                        <div className="flex justify-between items-center lg:text-right">
                          <span className="text-sm text-gray-500">
                            {order.date}
                          </span>
                          <div className="lg:ml-6">
                            <span className="hidden lg:block font-medium">
                              {order.total}
                            </span>
                            <span className="text-sm text-gray-500">
                              {order.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Favorites Tab */}
            {activeTab === "favorites" && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">
                    My Favorites{" "}
                    <span className="text-sm text-gray-500 font-normal">
                      ({favoriteItems.length}{" "}
                      item{favoriteItems.length !== 1 ? "s" : ""})
                    </span>
                  </h2>
                </div>

                {favoriteItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="bg-gray-100 p-4 rounded-full mb-4">
                      <Heart className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-700 mb-2">
                      Your wishlist is empty
                    </h3>
                    <p className="text-gray-500 max-w-md">
                      Click the heart icon on products you love to add them to
                      your favorites for easy access later.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {favoriteItems.map((item) => (
                      <div
                        key={item.id}
                        className={`p-4 border rounded-lg transition-all duration-300 ${
                          animateHeartIndex === item.id
                            ? "scale-90 opacity-0"
                            : "hover:border-[#FA8232] hover:shadow-md"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-20 h-20 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                            <img
                              src={item.image1 || "/api/placeholder/80/80"}
                              alt={item.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <div className="text-xs text-gray-500 mb-1">
                                {item.category || "Electronics"}
                              </div>
                              <button
                                onClick={() => removeFromFavorites(item.id)}
                                className="group transition-transform hover:scale-110"
                                aria-label="Remove from favorites"
                              >
                                <Heart className="w-5 h-5 text-[#FA8232] fill-[#FA8232] group-hover:fill-red-500 group-hover:text-red-500" />
                              </button>
                            </div>
                            <h3 className="font-medium text-sm line-clamp-2 mb-1">
                              {item.name}
                            </h3>
                            <div className="flex items-center justify-between mt-2">
                              <p className="font-bold text-[#FA8232]">
                                $
                                {typeof item.price === "number"
                                  ? item.price.toFixed(2)
                                  : item.price}
                              </p>
                              <button
                                onClick={() => handleAddToCart(item)} // Call handleAddToCart
                                className="bg-[#FA8232] text-white text-xs font-medium px-3 py-1.5 rounded-md hover:bg-[#E57122] transition-colors duration-200 flex items-center gap-1"
                              >
                                <ShoppingBag className="w-3.5 h-3.5" />
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === "addresses" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base lg:text-lg font-semibold mb-4">
                    Saved Addresses
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {addresses.map((address) => (
                      <div
                        key={address.id}
                        className="p-3 lg:p-4 border rounded-lg"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-5 h-5 text-[#FA8232]" />
                            <span className="font-medium text-sm lg:text-base">
                              {address.type}
                            </span>
                          </div>
                          <button className="p-1.5 hover:bg-gray-100 rounded-full">
                            <Edit className="w-4 h-4 text-[#FA8232]" />
                          </button>
                        </div>
                        <p className="text-sm text-gray-500">
                          {address.address}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-base lg:text-lg font-semibold mb-4">
                    Saved Cards
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {cards.map((card) => (
                      <div
                        key={card.id}
                        className="p-3 lg:p-4 border rounded-lg"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <CreditCard className="w-5 h-5 text-[#FA8232]" />
                            <span className="font-medium text-sm lg:text-base">
                              {card.type} ending in {card.last4}
                            </span>
                          </div>
                          <button className="p-1.5 hover:bg-gray-100 rounded-full">
                            <Edit className="w-4 h-4 text-[#FA8232]" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-3 lg:p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Lock className="w-5 h-5 text-[#FA8232]" />
                      <span className="text-sm lg:text-base">Password</span>
                    </div>
                    <button className="px-3 py-1.5 lg:px-4 lg:py-2 bg-[#FA8232] text-white text-sm rounded-lg hover:bg-[#E57122] transition-colors">
                      Change
                    </button>
                  </div>
                </div>

                <div className="p-3 lg:p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-[#FA8232]" />
                      <span className="text-sm lg:text-base">Email</span>
                    </div>
                    <button className="px-3 py-1.5 lg:px-4 lg:py-2 bg-[#FA8232] text-white text-sm rounded-lg hover:bg-[#E57122] transition-colors">
                      Update
                    </button>
                  </div>
                </div>

                <button className="p-3 lg:p-4 border rounded-lg hover:bg-[#FA8232] hover:text-white transition-colors group">
                  <div className="flex items-center space-x-3">
                    <LogOut className="w-5 h-5 group-hover:text-white text-[#FA8232]" />
                    <span className="text-sm lg:text-base">Logout</span>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
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
      `}</style>
    </section>
  );
}