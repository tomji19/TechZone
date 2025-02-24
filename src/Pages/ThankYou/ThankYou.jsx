import React, { useState } from "react";
import { Check, Clock } from "lucide-react";
import classes from "../ThankYou/ThankYou.module.css";
import { useNavigate } from "react-router-dom";

export default function ThankYou() {
  const [showHistory, setShowHistory] = useState(false);

  const orderDetails = {
    orderId: "ORD-2024-1234",
    date: "February 10, 2024",
    total: 304.97,
    status: "Processing",
  };

  const orderHistory = [
    {
      id: "ORD-2024-1234",
      date: "February 10, 2024",
      total: 304.97,
      status: "Processing",
    },
    {
      id: "ORD-2024-1189",
      date: "January 25, 2024",
      total: 159.99,
      status: "Delivered",
    },
    {
      id: "ORD-2024-1156",
      date: "January 15, 2024",
      total: 249.5,
      status: "Delivered",
    },
  ];

  const navigate = useNavigate();

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
                  {orderHistory.map((order) => (
                    <div key={order.id} className="border-b pb-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium">Order #{order.id}</p>
                          <p className="text-sm text-gray-600">{order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            ${order.total.toFixed(2)}
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
                  ))}
                </div>
              </div>
            )}

            <div className="text-center mt-8">
              <button className="bg-gray-900 hover:bg-gray-800 text-white py-2 px-6 rounded">
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
