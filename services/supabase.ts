
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tgvhzimcckrtrxdfpdzw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRndmh6aW1jY2tydHJ4ZGZwZHp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2MjU2ODksImV4cCI6MjA3ODIwMTY4OX0.oTOV3SbW80X66qNXw7cz6_YLA4g34WEpyuxPzVnx-TQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
