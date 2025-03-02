import React, { createContext, useContext, useState, useEffect } from "react";
import classes from "./AuthContextYoussef.module.css";
import { supabase } from "../supabase/supabase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    wishlist: [],
    orders: [],
  });

  // Initialize from localStorage and Supabase on mount
  useEffect(() => {
    const initializeAuth = async () => {
      // Get user and session from Supabase
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

      if (user && !userError && sessionData?.session && !sessionError) {
        setUser(user);
        setToken(sessionData.session.access_token);
        // Load user data from localStorage if it exists
        const storedData = localStorage.getItem(`userData_${user.id}`);
        if (storedData) {
          setUserData(JSON.parse(storedData));
        }
      }
      setLoading(false);
    };

    initializeAuth();

    // Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session) {
          setUser(session.user);
          setToken(session.access_token);
          const storedData = localStorage.getItem(
            `userData_${session.user.id}`
          );
          if (storedData) {
            setUserData(JSON.parse(storedData));
          } else {
            setUserData({ wishlist: [], orders: [] });
          }
        } else {
          setUser(null);
          setToken(null);
          setUserData({ wishlist: [], orders: [] });
        }
        setLoading(false);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(`userData_${user.id}`, JSON.stringify(userData));
    }
  }, [userData, user]);

  const signUp = async (email, password, displayName) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: displayName,
          },
        },
      });
      if (error) throw error;
      setUser(data.user);
      setToken(data.session?.access_token);
      setUserData({ wishlist: [], orders: [] }); // Initialize empty data for new user
      return {
        user: data.user,
        token: data.session?.access_token,
        error: null,
      };
    } catch (error) {
      return { user: null, token: null, error };
    }
  };

  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      setUser(data.user);
      setToken(data.session.access_token);
      // Load existing data or initialize new
      const storedData = localStorage.getItem(`userData_${data.user.id}`);
      setUserData(
        storedData ? JSON.parse(storedData) : { wishlist: [], orders: [] }
      );
      return { user: data.user, token: data.session.access_token, error: null };
    } catch (error) {
      return { user: null, token: null, error };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      // Clear everything on logout
      if (user) {
        localStorage.removeItem(`userData_${user.id}`);
      }
      setUser(null);
      setToken(null);
      setUserData({ wishlist: [], orders: [] });
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Functions to manage wishlist
  const addToWishlist = (item) => {
    setUserData((prev) => ({
      ...prev,
      wishlist: [...prev.wishlist.filter((i) => i.id !== item.id), item],
    }));
  };

  const removeFromWishlist = (itemId) => {
    setUserData((prev) => ({
      ...prev,
      wishlist: prev.wishlist.filter((item) => item.id !== itemId),
    }));
  };

  // Functions to manage orders
  const addOrder = (order) => {
    setUserData((prev) => ({
      ...prev,
      orders: [
        ...prev.orders,
        { ...order, id: Date.now(), date: new Date().toISOString() },
      ],
    }));
  };

  const value = {
    user,
    token,
    loading,
    userData,
    signUp,
    signIn,
    signOut,
    addToWishlist,
    removeFromWishlist,
    addOrder,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default function AuthContextYoussef() {
  return null;
}
