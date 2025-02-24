import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Components/CartContext/CartContext";

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, setIsCartOpen } = useCart();

  // Calculate order summary from cart items
  const subtotal = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(/,/g, "").replace(" EGP", ""));
    return sum + price * item.quantity;
  }, 0);

  const shipping = 35.0;
  const tax = subtotal * 0.14; // Egypt's VAT rate
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = () => {
    // Here you could add order processing logic
    setIsCartOpen(false);
    navigate("/thankyou");
  };

  if (cartItems.length === 0) {
    return (
      <div className="py-5 px-16 text-center">
        <div className="bg-[#1B6392] h-80 flex items-center justify-center">
          <h3 className="text-7xl font-bold text-white">Checkout</h3>
        </div>
        <div className="max-w-7xl mx-auto py-8">
          <p className="text-xl text-gray-600">Your cart is empty.</p>
          <button
            onClick={() => navigate("/shop")}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="py-5 px-16">
      <div className="">
        <div className="bg-[#1B6392] h-80 flex items-center justify-center">
          <h3 className="text-7xl font-bold text-white">Checkout</h3>
        </div>

        <div className="max-w-7xl mx-auto py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              {/* Cart Items Summary */}
              <div className="border bg-white shadow-sm p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-6">Order Items</h2>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 border-b pb-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-md"
                      />
                      <div className="flex-grow">
                        <h3 className="text-lg font-medium">{item.name}</h3>
                        <p className="text-gray-600">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-[#1B6392] font-semibold">
                          {item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="border bg-white shadow-sm p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-6">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      className="mt-1 block w-full border p-2 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <input
                      type="tel"
                      className="mt-1 block w-full border p-2 rounded-md"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="border bg-white shadow-sm p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-6">
                  Shipping Address
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full border p-2 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full border p-2 rounded-md"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full border p-2 rounded-md"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Apartment, suite, etc.
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full border p-2 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      City
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full border p-2 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      State
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full border p-2 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full border p-2 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Country
                    </label>
                    <select className="mt-1 block w-full border p-2 rounded-md">
                      <option>Egypt</option>
                      <option>United Arab Emirates</option>
                      <option>Saudi Arabia</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="border bg-white shadow-sm p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-6">Payment</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Card Number
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full border p-2 rounded-md"
                      placeholder="0000 0000 0000 0000"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Expiration Date
                      </label>
                      <input
                        type="text"
                        className="mt-1 block w-full border p-2 rounded-md"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        CVV
                      </label>
                      <input
                        type="text"
                        className="mt-1 block w-full border p-2 rounded-md"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4">
              <div className="border bg-white shadow-sm p-6 rounded-lg sticky top-4">
                <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>{subtotal.toLocaleString()} EGP</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping estimate</span>
                    <span>{shipping.toLocaleString()} EGP</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax estimate (14%)</span>
                    <span>{tax.toLocaleString()} EGP</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-semibold">
                      <span className="mb-3 text-xl">Order total</span>
                      <span className="text-[#1B6392]">
                        {total.toLocaleString()} EGP
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handlePlaceOrder}
                    className="w-full bg-[#f97316] hover:bg-[#ea580c] text-white py-3 px-4 rounded-md transition-colors"
                  >
                    Place Order
                  </button>
                  <button
                    onClick={() => navigate("/shop")}
                    className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-md transition-colors"
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
