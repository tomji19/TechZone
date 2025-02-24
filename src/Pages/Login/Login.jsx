import React, { useState } from "react";
import classes from "../Login/Login.module.css";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const endpoint = isForgotPassword
      ? "https://reqres.in/api/register" // Mock endpoint for forgot password
      : isLogin
      ? "https://reqres.in/api/login" // Mock login endpoint
      : "https://reqres.in/api/register"; // Mock registration endpoint

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(
          isForgotPassword
            ? "Password reset instructions sent to your email."
            : isLogin
            ? "Login successful!"
            : "Registration successful!"
        );
      } else {
        setMessage(data.error || "Something went wrong.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <section className="py-5 px-16">
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">
              {isForgotPassword
                ? "Forgot Password"
                : isLogin
                ? "Login"
                : "Register"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {!isForgotPassword && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
              )}
              {!isForgotPassword && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
              )}
              {isForgotPassword && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Enter your email to reset password
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
              )}
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isForgotPassword
                  ? "Reset Password"
                  : isLogin
                  ? "Login"
                  : "Register"}
              </button>
            </form>
            {message && (
              <p className="mt-4 text-center text-sm text-green-600">
                {message}
              </p>
            )}
            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setIsForgotPassword(false);
                  setMessage("");
                }}
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                {isLogin
                  ? "Don't have an account? Register"
                  : "Already have an account? Login"}
              </button>
            </div>
            {isLogin && (
              <div className="mt-4 text-center">
                <button
                  onClick={() => {
                    setIsForgotPassword(true);
                    setIsLogin(false);
                    setMessage("");
                  }}
                  className="text-sm text-indigo-600 hover:text-indigo-500"
                >
                  Forgot Password?
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
