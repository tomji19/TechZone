import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kwwiyhzraynijtrjegdm.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3d2l5aHpyYXluaWp0cmplZ2RtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4Mjk3ODAsImV4cCI6MjA0OTQwNTc4MH0.0-f9j3-GuOVeqjeBeFGihNsZQPQ1LQ6Zwn6NRLqAXKM";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
