import React from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Components/CartContext/CartContext";

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, setIsCartOpen } = useCart();

  // Calculate order summary
  const subtotal = cartItems.reduce((sum, item) => 
    sum + item.price * item.quantity, 0
  );

  const shipping = 35.0;
  const tax = subtotal * 0.14; // Egypt's VAT rate
  const total = subtotal + shipping + tax;

  const formatPrice = (price) => `${price.toLocaleString()} EGP`;

  // Handle quantity change
  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(itemId, newQuantity);
    }
  };

  // Handle checkout
  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate("/checkout");
  };

  return (
    <section className="py-5 px-16">
      <div>
        <div className="bg-[#1B6392] h-80 flex items-center justify-center">
          <h3 className="text-7xl font-bold text-white">Cart</h3>
        </div>

        <div className="max-w-7xl mx-auto py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-xl text-gray-600">Your cart is empty.</p>
                  <button
                    onClick={() => navigate("/shop")}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="border p-4 bg-white shadow-sm rounded-lg"
                  >
                    <div className="flex gap-4">
                      <img
                        src={item.image1}
                        alt={item.name}
                        className="w-40 h-40 object-contain rounded-md"
                      />
                      <div className="flex-grow">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="text-xl font-medium">{item.name}</h3>
                            <p className="text-lg font-semibold text-[#1B6392] mt-2">
                              {formatPrice(item.price)}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <X size={20} />
                          </button>
                        </div>
                        <div className="mt-4 flex items-center gap-4">
                          <label className="text-gray-600">Quantity:</label>
                          <select
                            value={item.quantity}
                            onChange={(e) =>
                              handleQuantityChange(
                                item.id,
                                parseInt(e.target.value)
                              )
                            }
                            className="border rounded-md p-1 text-sm"
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                              <option key={num} value={num}>
                                {num}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="lg:col-span-4">
              <div className="border bg-white shadow-sm p-6 rounded-lg sticky top-4">
                <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping estimate</span>
                    <span>{formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax estimate (14%)</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between font-semibold">
                      <span className="text-xl">Order total</span>
                      <span className="text-[#1B6392]">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>
                  {cartItems.length > 0 && (
                    <button
                      onClick={handleCheckout}
                      className="w-full bg-[#f97316] hover:bg-[#ea580c] text-white py-3 px-4 rounded-md mt-6 font-medium transition-colors"
                    >
                      Proceed to Checkout
                    </button>
                  )}
                  <button
                    onClick={() => navigate("/shop")}
                    className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-md mt-2 font-medium transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}