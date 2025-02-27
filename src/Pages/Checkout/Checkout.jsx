import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Components/CartContext/CartContext";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

// Replace with your Stripe Publishable Key
const stripePromise = loadStripe("your-publishable-key-here");

const CheckoutForm = ({ total, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    // Assume you have a backend endpoint to create a Payment Intent
    const response = await fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: Math.round(total * 100) }), // Amount in cents
    });
    const { clientSecret } = await response.json();

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: event.target.name.value, // You can collect this from the form
        },
      },
    });

    setProcessing(false);

    if (result.error) {
      setError(result.error.message);
    } else if (result.paymentIntent.status === "succeeded") {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": { color: "#aab7c4" },
            },
            invalid: { color: "#9e2146" },
          },
        }}
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full bg-[#f97316] hover:bg-[#ea580c] text-white py-3 px-4 rounded-md transition-colors disabled:opacity-50"
      >
        {processing ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, setIsCartOpen, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("stripe"); // "stripe" or "cod"

  // Calculate order summary from cart items
  const subtotal = cartItems.reduce((sum, item) => {
    const price =
      typeof item.price === "string"
        ? parseFloat(item.price.replace(/,/g, "").replace(" EGP", ""))
        : item.price;
    return sum + price * item.quantity;
  }, 0);

  const shipping = 35.0;
  const tax = subtotal * 0.14; // Egypt's VAT rate
  const total = subtotal + shipping + tax;

  const handleCashOnDelivery = () => {
    // Simulate placing a COD order (no payment processing needed)
    setIsCartOpen(false);
    clearCart(); // Clear cart after order is placed
    navigate("/thankyou", { state: { paymentMethod: "Cash on Delivery" } });
  };

  const handleStripeSuccess = () => {
    setIsCartOpen(false);
    clearCart(); // Clear cart after successful payment
    navigate("/thankyou", { state: { paymentMethod: "Stripe" } });
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
                        src={item.image1} // Adjusted to match CartContext
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-md"
                      />
                      <div className="flex-grow">
                        <h3 className="text-lg font-medium">{item.name}</h3>
                        <p className="text-gray-600">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-[#1B6392] font-semibold">
                          {typeof item.price === "string"
                            ? item.price
                            : `${item.price.toLocaleString()} EGP`}
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

              {/* Payment Options */}
              <div className="border bg-white shadow-sm p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-6">Payment Method</h2>
                <div className="space-y-4">
                  {/* Payment Method Toggle */}
                  <div className="flex gap-4 mb-4">
                    <button
                      onClick={() => setPaymentMethod("stripe")}
                      className={`py-2 px-4 rounded-md border ${
                        paymentMethod === "stripe"
                          ? "bg-[#1B6392] text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      Credit/Debit Card
                    </button>
                    <button
                      onClick={() => setPaymentMethod("cod")}
                      className={`py-2 px-4 rounded-md border ${
                        paymentMethod === "cod"
                          ? "bg-[#1B6392] text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      Cash on Delivery
                    </button>
                  </div>

                  {/* Stripe Payment */}
                  {paymentMethod === "stripe" && (
                    <Elements stripe={stripePromise}>
                      <CheckoutForm
                        total={total}
                        onSuccess={handleStripeSuccess}
                      />
                    </Elements>
                  )}

                  {/* Cash on Delivery */}
                  {paymentMethod === "cod" && (
                    <div>
                      <p className="text-gray-600 mb-4">
                        Pay with cash upon delivery. Please ensure you have the
                        exact amount ready.
                      </p>
                      <button
                        onClick={() => {
                          handleCashOnDelivery();
                          window.location.href = '/thankyou'; // Redirect to thank you page
                        }}
                        className="w-full bg-[#f97316] hover:bg-[#ea580c] text-white py-3 px-4 rounded-md transition-colors"
                      >
                        Place Order (Cash on Delivery)
                      </button>
                    </div>
                  )}
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
