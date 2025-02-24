import React, { useState } from "react";
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
} from "lucide-react";

export default function Account() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  // Sample data remains the same
  const userEmail = "user@example.com";
  const recentOrders = [
    { id: 3511, date: "2025-02-10", total: "$129.99", status: "Delivered" },
    { id: 2313, date: "2025-02-05", total: "$89.99", status: "In Transit" },
    { id: 7512, date: "2025-01-30", total: "$199.99", status: "Processing" },
  ];

  const favoriteItems = [
    { id: 1, name: "Wireless Headphones", price: "$79.99" },
    { id: 2, name: "Smart Watch", price: "$199.99" },
    { id: 3, name: "Bluetooth Speaker", price: "$129.99" },
  ];

  const addresses = [
    { id: 1, type: "Home", address: "123 Main St, City, State 12345" },
    { id: 2, type: "Work", address: "456 Office Ave, City, State 12345" },
  ];

  const cards = [
    { id: 1, type: "Visa", last4: "4567" },
    { id: 2, type: "Mastercard", last4: "8901" },
  ];

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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {favoriteItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 lg:p-4 border rounded-lg hover:border-[#FA8232] transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-sm lg:text-base">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500">{item.price}</p>
                      </div>
                      <Heart className="w-5 h-5 text-[#FA8232]" />
                    </div>
                  </div>
                ))}
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
    </section>
  );
}
