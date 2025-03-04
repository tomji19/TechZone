import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Components/CartContext/CartContext";
import { useAuth } from "../../Pages/AuthContextYoussef/AuthContextYoussef";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  ShoppingBag,
  CreditCard,
  Truck,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

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

    const response = await fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: Math.round(total * 100) }),
    });
    const { clientSecret } = await response.json();

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: { name: event.target.name?.value || "Anonymous" },
      },
    });

    setProcessing(false);

    if (result.error) {
      setError(result.error.message);
    } else if (result.paymentIntent.status === "succeeded") {
      onSuccess({
        card: {
          type: "Card", // Simplified; in reality, you'd get this from Stripe
          last4: "XXXX", // Placeholder; Stripe doesn’t return last4 here directly
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": { color: "#aab7c4" },
                iconColor: "#4338ca",
              },
              invalid: { color: "#9e2146" },
            },
          }}
        />
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white py-4 px-6 rounded-lg mt-4 font-medium transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {processing ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, setIsCartOpen, clearCart } = useCart();
  const { addOrder, addAddress } = useAuth(); // Added addAddress
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const subtotal = cartItems.reduce((sum, item) => {
    const price =
      typeof item.price === "string"
        ? parseFloat(item.price.replace(/,/g, "").replace(" EGP", ""))
        : item.price;
    return sum + price * item.quantity;
  }, 0);

  const shipping = 35.0;
  const tax = subtotal * 0.14;
  const total = subtotal + shipping + tax;

  const formatPrice = (price) => `${price.toLocaleString()} EGP`;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const storeOrder = (cardDetails = null) => {
    const address = {
      type: "Shipping",
      address: `${formData.address}${
        formData.apartment ? ", " + formData.apartment : ""
      }, ${formData.city}, ${formData.state} ${formData.zip}, ${
        formData.country
      }`,
    };
    const order = {
      items: [...cartItems],
      subtotal,
      shipping,
      tax,
      total,
      paymentMethod,
      status: "Processing",
      address, // Include address in order
    };
    addOrder(order);
    addAddress(address); // Save address separately
    if (cardDetails) {
      // Normally you'd save card details here, but Stripe handles it server-side
      // For now, we’ll skip card storage client-side
    }
    clearCart();
  };

  const handleCashOnDelivery = () => {
    storeOrder();
    setIsCartOpen(false);
    navigate("/thankyou", { state: { paymentMethod: "Cash on Delivery" } });
  };

  const handleStripeSuccess = (cardDetails) => {
    storeOrder(cardDetails);
    setIsCartOpen(false);
    navigate("/thankyou", { state: { paymentMethod: "Stripe" } });
  };

  if (cartItems.length === 0) {
    return (
      <div className="py-5 px-4 md:px-8 lg:px-16 bg-gray-50 text-center">
        <div className="max-w-7xl mx-auto pt-16 pb-32">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag size={40} className="text-indigo-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              Your cart is empty
            </h2>
            <p className="text-gray-500 max-w-md mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <button
              onClick={() => navigate("/shop")}
              className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white py-3 px-8 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Browse Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-5 px-4 md:px-8 lg:px-16 bg-gray-50">
      <div className="">
        <div className="max-w-7xl mx-auto mb-12 pt-12">
          <div className="flex flex-col items-start">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-1 bg-indigo-600 rounded"></div>
              <span className="text-indigo-600 font-medium uppercase tracking-wider text-sm">
                Secure Checkout
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
              Complete Your Order
            </h1>
            <p className="text-gray-500 mt-4 max-w-2xl">
              Please fill in your details to complete your purchase.
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-8 mb-6 md:mb-0">
              <div
                className={`flex items-center ${
                  currentStep >= 1 ? "text-indigo-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                    currentStep >= 1
                      ? "bg-indigo-100 text-indigo-600"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <ShoppingBag size={16} />
                </div>
                <span
                  className={`font-medium ${
                    currentStep >= 1 ? "text-gray-800" : "text-gray-400"
                  }`}
                >
                  Cart
                </span>
              </div>
              <div className="w-8 h-px bg-gray-200 hidden md:block"></div>
              <div
                className={`flex items-center ${
                  currentStep >= 2 ? "text-indigo-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                    currentStep >= 2
                      ? "bg-indigo-100 text-indigo-600"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <Truck size={16} />
                </div>
                <span
                  className={`font-medium ${
                    currentStep >= 2 ? "text-gray-800" : "text-gray-400"
                  }`}
                >
                  Shipping
                </span>
              </div>
              <div className="w-8 h-px bg-gray-200 hidden md:block"></div>
              <div
                className={`flex items-center ${
                  currentStep >= 3 ? "text-indigo-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                    currentStep >= 3
                      ? "bg-indigo-100 text-indigo-600"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <CreditCard size={16} />
                </div>
                <span
                  className={`font-medium ${
                    currentStep >= 3 ? "text-gray-800" : "text-gray-400"
                  }`}
                >
                  Payment
                </span>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              <span className="font-medium text-indigo-600">
                {cartItems.length}
              </span>{" "}
              items in your cart
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              <div className="border border-gray-100 bg-white shadow-sm p-6 rounded-xl">
                <div className="flex items-center space-x-3 mb-6">
                  <ShoppingBag size={20} className="text-indigo-600" />
                  <h2 className="text-xl font-semibold text-gray-800">
                    Order Items
                  </h2>
                </div>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                    >
                      <div className="bg-gray-50 p-2 rounded-lg">
                        <img
                          src={item.image1}
                          alt={item.name}
                          className="w-20 h-20 object-contain rounded-md"
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-base font-medium text-gray-800">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-indigo-700 font-semibold mt-1">
                          {typeof item.price === "string"
                            ? item.price
                            : formatPrice(item.price)}
                        </p>
                      </div>
                      <div className="text-right font-medium text-gray-800">
                        {typeof item.price === "string"
                          ? `${(
                              parseFloat(
                                item.price.replace(/,/g, "").replace(" EGP", "")
                              ) * item.quantity
                            ).toLocaleString()} EGP`
                          : formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border border-gray-100 bg-white shadow-sm p-6 rounded-xl">
                <div className="flex items-center space-x-3 mb-6">
                  <Phone size={20} className="text-indigo-600" />
                  <h2 className="text-xl font-semibold text-gray-800">
                    Contact Information
                  </h2>
                </div>
                <div className="space-y-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Mail size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email address"
                      className="block w-full pl-10 border border-gray-200 rounded-lg py-3 px-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Phone size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Phone number"
                      className="block w-full pl-10 border border-gray-200 rounded-lg py-3 px-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>
              <div className="border border-gray-100 bg-white shadow-sm p-6 rounded-xl">
                <div className="flex items-center space-x-3 mb-6">
                  <MapPin size={20} className="text-indigo-600" />
                  <h2 className="text-xl font-semibold text-gray-800">
                    Shipping Address
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="First Name"
                      className="block w-full border border-gray-200 rounded-lg py-3 px-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Last Name"
                      className="block w-full border border-gray-200 rounded-lg py-3 px-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Address"
                      className="block w-full border border-gray-200 rounded-lg py-3 px-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <input
                      type="text"
                      name="apartment"
                      value={formData.apartment}
                      onChange={handleInputChange}
                      placeholder="Apartment, suite, etc. (optional)"
                      className="block w-full border border-gray-200 rounded-lg py-3 px-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="City"
                      className="block w-full border border-gray-200 rounded-lg py-3 px-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="State/Province"
                      className="block w-full border border-gray-200 rounded-lg py-3 px-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="zip"
                      value={formData.zip}
                      onChange={handleInputChange}
                      placeholder="ZIP/Postal Code"
                      className="block w-full border border-gray-200 rounded-lg py-3 px-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="block w-full border border-gray-200 rounded-lg py-3 px-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                    >
                      <option value="" disabled>
                        Select Country
                      </option>
                      <option>Egypt</option>
                      <option>United Arab Emirates</option>
                      <option>Saudi Arabia</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="border border-gray-100 bg-white shadow-sm p-6 rounded-xl">
                <div className="flex items-center space-x-3 mb-6">
                  <CreditCard size={20} className="text-indigo-600" />
                  <h2 className="text-xl font-semibold text-gray-800">
                    Payment Method
                  </h2>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-4 mb-6">
                    <button
                      onClick={() => setPaymentMethod("stripe")}
                      className={`flex-1 py-3 px-4 rounded-lg border transition-all duration-200 flex items-center justify-center gap-2 ${
                        paymentMethod === "stripe"
                          ? "bg-indigo-50 border-indigo-200 text-indigo-700 shadow-sm"
                          : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <CreditCard size={18} />
                      <span>Credit/Debit Card</span>
                    </button>
                    <button
                      onClick={() => setPaymentMethod("cod")}
                      className={`flex-1 py-3 px-4 rounded-lg border transition-all duration-200 flex items-center justify-center gap-2 ${
                        paymentMethod === "cod"
                          ? "bg-indigo-50 border-indigo-200 text-indigo-700 shadow-sm"
                          : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <Truck size={18} />
                      <span>Cash on Delivery</span>
                    </button>
                  </div>
                  {paymentMethod === "stripe" && (
                    <Elements stripe={stripePromise}>
                      <CheckoutForm
                        total={total}
                        onSuccess={handleStripeSuccess}
                      />
                    </Elements>
                  )}
                  {paymentMethod === "cod" && (
                    <div>
                      <div className="p-4 bg-indigo-50 text-indigo-800 rounded-lg border border-indigo-100 mb-4">
                        <p className="text-sm">
                          You will pay with cash upon delivery.
                        </p>
                      </div>
                      <button
                        onClick={handleCashOnDelivery}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white py-4 px-6 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                      >
                        Place Order (Cash on Delivery)
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="lg:col-span-4">
              <div className="border border-gray-100 bg-white shadow-sm p-6 rounded-xl sticky top-4">
                <h2 className="text-xl font-semibold text-gray-800 pb-6 border-b border-gray-100">
                  Order Summary
                </h2>
                <div className="py-6 space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium text-gray-800">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-medium text-gray-800">
                      {formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (14%)</span>
                    <span className="font-medium text-gray-800">
                      {formatPrice(tax)}
                    </span>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-800">
                      Total
                    </span>
                    <div className="text-right">
                      <span className="block text-2xl font-bold text-indigo-700">
                        {formatPrice(total)}
                      </span>
                      <span className="text-xs text-gray-500">
                        Including VAT
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-4 text-sm">
                    <span className="text-gray-600 flex items-center">
                      <Truck size={16} className="mr-2" />
                      Estimated delivery
                    </span>
                    <span className="font-medium text-gray-800">
                      3-5 business days
                    </span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <p className="text-xs text-gray-500 mb-2">Order details</p>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">
                        Items ({cartItems.length})
                      </span>
                      <span className="font-medium">
                        {formatPrice(subtotal)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Additional fees</span>
                      <span className="font-medium">
                        {formatPrice(shipping + tax)}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => navigate("/cart")}
                  className="w-full flex items-center justify-center gap-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-lg mt-6 font-medium transition-colors"
                >
                  <ShoppingBag size={16} />
                  <span>Back to Cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
