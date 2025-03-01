import { useState } from "react";
import { signUp, signIn } from "../AuthContextYoussef/AuthContextYoussef";
import { FcGoogle } from "react-icons/fc";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    const { user, error } = await signUp(email, password);
    if (error) alert(error.message);
    else alert("Check your email for confirmation!");
  };

  const handleSignIn = async () => {
    const { user, error } = await signIn(email, password);
    if (error) alert(error.message);
    else alert("Logged in successfully!");
  };

  return (
    <div className="flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Welcome Back!</h2>

        {/* Input Fields */}
        <div className="space-y-4">
          <input
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col gap-3">
          <button
            className="w-full bg-gradient-to-r from-blue-700 to-indigo-900 text-white font-semibold py-3 rounded-lg hover:from-[#1D267D] hover:to-[#004AAD] transition duration-300 shadow-md"
            onClick={handleSignIn}
          >
            Sign In
          </button>
          <button
            className="w-full bg-white border border-indigo-500 text-indigo-700 font-semibold py-3 rounded-lg hover:bg-indigo-50 transition duration-300 shadow-sm"
            onClick={handleSignUp}
          >
            Sign Up
          </button>

          {/* Google Sign-In */}
          <button className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-800 py-3 rounded-lg hover:bg-gray-200 transition duration-300 shadow-sm">
            <FcGoogle size={20} />
            Sign in with Google
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-4">
          Don't have an account? <span className="text-indigo-600 font-medium cursor-pointer">Sign up</span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
