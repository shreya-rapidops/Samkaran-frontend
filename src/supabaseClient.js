import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oxxyaxqvbnzpitqvlvgv.supabase.co'; // 🔁 replace
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94eHlheHF2Ym56cGl0cXZsdmd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxNjE0OTIsImV4cCI6MjA2MDczNzQ5Mn0.wsvj673uhbxXaiTaeuP8nrEbZasJEfVQ2rn33Wbki18'; // 🔁 replace
export const supabase = createClient(supabaseUrl, supabaseKey);
