import React, { useState, useEffect } from "react";
import classes from "../AuthContextYoussef/AuthContextYoussef.module.css";
import { supabase } from "../supabase/supabase";

// Sign up a user
export const signUp = async (email, password) => {
  const { user, error } = await supabase.auth.signUp({ email, password });
  return { user, error };
};

// Sign in a user
export const signIn = async (email, password) => {
  const { user, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { user, error };
};

// Sign out
export const signOut = async () => {
  await supabase.auth.signOut();
};

// Hook to manage authentication state
export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  return user;
};

// No need to return anything in this component
export default function AuthContextYoussef() {
  return null;
}
