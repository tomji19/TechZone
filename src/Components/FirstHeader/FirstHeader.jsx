import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../Components/CartContext/CartContext";
import { useAuth } from "../../Pages/AuthContextYoussef/AuthContextYoussef";
import {
  ShoppingCart,
  X,
  Plus,
  Minus,
  Zap,
  Search,
  User,
  LogOut,
} from "lucide-react";
import SearchBar from "../SearchBar/SearchBar";

export default function FirstHeader() {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    getTotalItems,
    getTotalPrice,
  } = useCart();
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const cartRef = useRef(null);
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target))
        setIsCartOpen(false);
      if (userMenuRef.current && !userMenuRef.current.contains(event.target))
        setShowUserMenu(false);
    };
    if (isCartOpen || showUserMenu)
      document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isCartOpen, setIsCartOpen, showUserMenu]);

  useEffect(() => {
    setIsCartOpen(false);
    setShowUserMenu(false);
  }, [location, setIsCartOpen]);

  const handleLogout = async () => {
    await signOut();
    setShowUserMenu(false);
    navigate("/");
  };

  const navigateToAccount = (e) => {
    e.preventDefault();
    setShowUserMenu(false);
    setTimeout(() => navigate("/account"), 10);
  };

  const navigateToOrders = (e) => {
    e.preventDefault();
    setShowUserMenu(false);
    setTimeout(() => navigate("/account?tab=orders"), 10);
  };

  const getUserDisplayName = () => {
    if (!user) return "";
    return (
      user.user_metadata?.display_name ||
      (user.email ? user.email.split("@")[0] : "User")
    );
  };

  if (loading) return null; // Wait for auth to load

  return (
    <header className="bg-white shadow-sm py-5 px-4 sm:px-8 md:px-16 relative z-50 max-sm:hidden ">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="w-full lg:w-auto flex items-center justify-center lg:justify-start">
          <Link to="/" className="flex items-center">
            <Zap className="h-7 w-7 text-[#4f46e5]" />
            <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
              TechZone
            </span>
          </Link>
        </div>
        <div className="w-4/5 lg:flex-1 lg:w-auto order-2 lg:order-none">
          <SearchBar />
        </div>
        <div className="w-full lg:w-auto flex items-center justify-center lg:justify-end gap-3 flex-shrink-0 order-2 lg:order-none">
          <div className="relative">
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="text-gray-800 flex items-center rounded-lg px-4 py-2 transition-all duration-300 bg-gradient-to-r from-transparent to-transparent hover:from-blue-50 hover:to-indigo-50 border-2 border-transparent hover:border-indigo-100"
            >
              <ShoppingCart className="h-5 w-5 mr-2 text-indigo-600" />
              <span>Cart</span>
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {getTotalItems()}
                </span>
              )}
            </button>
            {isCartOpen && (
              <div
                ref={cartRef}
                className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl z-50 border border-gray-100"
              >
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Shopping Cart
                    </h3>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  {cartItems.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">
                      Your cart is empty
                    </p>
                  ) : (
                    <>
                      <div className="max-h-96 overflow-y-auto">
                        {cartItems.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-4 py-4 border-b"
                          >
                            <img
                              src={item.image1}
                              alt={item.name}
                              className="w-16 h-16 object-contain rounded bg-gray-50 p-1"
                            />
                            <div className="flex-1">
                              <h4 className="text-sm font-medium text-gray-800">
                                {item.name}
                              </h4>
                              <p className="text-indigo-600 font-bold">
                                {item.price}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <button
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity - 1)
                                  }
                                  className="p-1 rounded-md border hover:bg-gray-50 transition-colors"
                                >
                                  <Minus className="w-3 h-3 text-gray-600" />
                                </button>
                                <span className="w-8 text-center text-sm">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity + 1)
                                  }
                                  className="p-1 rounded-md border hover:bg-gray-50 transition-colors"
                                >
                                  <Plus className="w-3 h-3 text-gray-600" />
                                </button>
                              </div>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 pt-4 border-t">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-semibold text-gray-800">
                            Total:
                          </span>
                          <span className="text-indigo-600 font-bold">
                            {getTotalPrice().toLocaleString()} EGP
                          </span>
                        </div>
                        <Link
                          to="/cart"
                          onClick={() => setIsCartOpen(false)}
                          className="block w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-2 rounded-md hover:from-blue-700 hover:to-indigo-700 transition-colors"
                        >
                          View Cart
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
          {user ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="text-gray-800 flex items-center rounded-lg px-4 py-2 transition-all duration-300 bg-gradient-to-r from-transparent to-transparent hover:from-blue-50 hover:to-indigo-50 border-2 border-transparent hover:border-indigo-100"
              >
                <User className="h-5 w-5 mr-2 text-indigo-600" />
                <span className="text-indigo-700 font-medium mr-1">
                  {getUserDisplayName()}
                </span>
              </button>
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-50 border border-gray-100">
                  <div className="p-2">
                    <button
                      onClick={navigateToAccount}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded-md"
                    >
                      My Account
                    </button>
                    <button
                      onClick={navigateToOrders}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded-md"
                    >
                      My Orders
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-md"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="text-gray-800 flex items-center rounded-lg px-4 py-2 transition-all duration-300 bg-gradient-to-r from-transparent to-transparent hover:from-blue-50 hover:to-indigo-50 border-2 border-transparent hover:border-indigo-100"
            >
              <User className="h-5 w-5 mr-2 text-indigo-600" />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
