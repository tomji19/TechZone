import React, { useState } from "react";
import { Check, Clock } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Pages/AuthContextYoussef/AuthContextYoussef";

export default function ThankYou() {
  const [showHistory, setShowHistory] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { userData } = useAuth();

  // Get the latest order (assumes last order in array is the most recent)
  const latestOrder =
    userData.orders.length > 0
      ? userData.orders[userData.orders.length - 1]
      : null;

  // Get payment method from location.state if available
  const paymentMethod =
    location.state?.paymentMethod ||
    (latestOrder ? latestOrder.paymentMethod : "Unknown");

  // Use latest order details if available, otherwise fallback to static placeholder
  const orderDetails = latestOrder
    ? {
        orderId: latestOrder.id,
        date: new Date(latestOrder.date).toLocaleString(),
        total: latestOrder.total,
        status: latestOrder.status,
      }
    : {
        orderId: "ORD-2024-1234",
        date: "February 10, 2024",
        total: 304.97,
        status: "Processing",
      };

  return (
    <>
      <section className="py-5 px-16">
        <div className="">
          <div className="bg-slate-800 h-80 flex items-center justify-center">
            <h3 className="text-7xl font-bold text-white">Thank You!</h3>
          </div>

          <div className="max-w-3xl mx-auto py-8">
            <div className="text-center mb-8">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-3xl font-semibold mb-2">Order Confirmed</h2>
              <p className="text-gray-600">Order #{orderDetails.orderId}</p>
              <p className="text-gray-600 mb-2">
                Payment Method: {paymentMethod}
              </p>
              <p className="text-gray-600 mb-6">
                We'll send you shipping confirmation when your order ships
              </p>

              <button
                onClick={() => setShowHistory(!showHistory)}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded"
              >
                {showHistory ? "Hide Order History" : "View Order History"}
              </button>
            </div>

            {showHistory && (
              <div className="border bg-white shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-4">Order History</h3>
                <div className="space-y-4">
                  {userData.orders.length === 0 ? (
                    <p className="text-gray-500 text-center">
                      No order history available
                    </p>
                  ) : (
                    userData.orders.map((order) => (
                      <div key={order.id} className="border-b pb-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium">Order #{order.id}</p>
                            <p className="text-sm text-gray-600">
                              {new Date(order.date).toLocaleString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">
                              {order.total.toLocaleString()} EGP
                            </p>
                            <p className="text-sm">
                              <span
                                className={`inline-flex items-center gap-1 ${
                                  order.status === "Delivered"
                                    ? "text-green-600"
                                    : "text-blue-600"
                                }`}
                              >
                                {order.status === "Delivered" ? (
                                  <Check size={14} />
                                ) : (
                                  <Clock size={14} />
                                )}
                                {order.status}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            <div className="text-center mt-8">
              <button
                onClick={() => navigate("/shop")}
                className="bg-gray-900 hover:bg-gray-800 text-white py-2 px-6 rounded"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
