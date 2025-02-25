import { useState } from "react";
import {
  signUp,
  signIn,
  signOut,
} from "../AuthContextYoussef/AuthContextYoussef";

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

  const handleGoogleLogin = async () => {
    const { data, error } = await signInWithGoogle();
    if (error) {
      console.error("Google Sign-In failed:", error.message);
    } else {
      console.log("Google login successful:", data);
    }
  };

  return (
    <div className="p-4">
      <input
        className="border p-2 w-full"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border p-2 w-full mt-2"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white p-2 mt-2 w-full"
        onClick={handleSignUp}
      >
        Sign Up
      </button>
      <button
        className="bg-green-500 text-white p-2 mt-2 w-full"
        onClick={handleSignIn}
      >
        Sign In
      </button>
    </div>
  );
};

export default Auth;
