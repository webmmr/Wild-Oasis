import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://ygzrmvlotsxybfcaztcf.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlnenJtdmxvdHN4eWJmY2F6dGNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIyNzg0MjAsImV4cCI6MjAwNzg1NDQyMH0.207xVZpOzN7L1su5lrfw3tDYB6B0A1R-cnky4BiWCA4";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
