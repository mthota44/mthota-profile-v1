import { Session } from '@supabase/supabase-js';

export interface Profile {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export interface InterviewExperience {
  id: string;
  company_name: string;
  role: string;
  experience: string;
  created_at: string;
  user_id: string;
  profiles: Profile | null;
}

export type AppView = 'Home' | 'Interview Community' | 'AI Interviewer' | 'Contact' | 'Login';

export interface AuthContextType {
  session: Session | null;
  setSession: (session: Session | null) => void;
  activeView: AppView;
  setActiveView: (view: AppView) => void;
}