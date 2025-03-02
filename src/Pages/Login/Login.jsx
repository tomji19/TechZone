import { useState } from "react";
import { useAuth } from "../AuthContextYoussef/AuthContextYoussef";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const { signUp, signIn, loading: authLoading } = useAuth(); // Get loading state too
  const [isSigningUp, setIsSigningUp] = useState(true);
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    password: "",
    repassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async () => {
    if (formData.password !== formData.repassword) {
      alert("Passwords don't match!");
      return;
    }

    if (!formData.displayName.trim()) {
      alert("Display name cannot be empty");
      return;
    }

    setIsLoading(true);
    try {
      const { user, token, error } = await signUp(
        formData.email,
        formData.password,
        formData.displayName
      );

      if (error) {
        alert(error.message);
      } else {
        // Token is automatically stored in context, no need to handle it here
        alert("Account created successfully!");
        navigate("/");
      }
    } catch (error) {
      alert("An error occurred during signup");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      const { user, token, error } = await signIn(
        formData.email,
        formData.password
      );
      if (error) {
        alert(error.message);
      } else {
        // Token and user data are handled by context
        navigate("/");
      }
    } catch (error) {
      alert("An error occurred during sign in");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleForm = () => {
    setIsSigningUp(!isSigningUp);
  };

  // Show loading state while auth is initializing
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          {isSigningUp ? "Create an Account" : "Welcome Back!"}
        </h2>

        {/* Input Fields */}
        <div className="space-y-4">
          {isSigningUp && (
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition"
              type="text"
              name="displayName"
              placeholder="Enter your display name"
              value={formData.displayName}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          )}
          <input
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
          <input
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
          {isSigningUp && (
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition"
              type="password"
              name="repassword"
              placeholder="Confirm your password"
              value={formData.repassword}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col gap-3">
          <button
            className="w-full bg-gradient-to-r from-blue-700 to-indigo-900 text-white font-semibold py-3 rounded-lg hover:from-[#1D267D] hover:to-[#004AAD] transition duration-300 shadow-md disabled:opacity-50"
            onClick={isSigningUp ? handleSignUp : handleSignIn}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : isSigningUp ? "Sign Up" : "Sign In"}
          </button>

          {!isSigningUp && (
            <button
              className="w-full bg-white border border-indigo-500 text-indigo-700 font-semibold py-3 rounded-lg hover:bg-indigo-50 transition duration-300 shadow-sm disabled:opacity-50"
              onClick={() => setIsSigningUp(true)}
              disabled={isLoading}
            >
              Create Account
            </button>
          )}

          {/* Google Sign-In */}
          <button
            className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-800 py-3 rounded-lg hover:bg-gray-200 transition duration-300 shadow-sm disabled:opacity-50"
            disabled={isLoading}
          >
            <FcGoogle size={20} />
            Sign in with Google
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-4">
          {isSigningUp ? "Already have an account?" : "New to our platform?"}{" "}
          <span
            className="text-indigo-600 font-medium cursor-pointer hover:underline"
            onClick={toggleForm}
          >
            {isSigningUp ? "Sign in" : "Create account"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
