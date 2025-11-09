import React, { useState, useEffect, createContext, useContext } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from './services/supabase';
import { AppView, AuthContextType } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import InterviewCommunity from './components/InterviewCommunity';
import AIInterviewer from './components/AIInterviewer';
import Contact from './components/Contact';
import Login from './components/Login';

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

const App: React.FC = () => {
    const [session, setSession] = useState<Session | null>(null);
    const [activeView, setActiveView] = useState<AppView>('Home');

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if (_event === 'SIGNED_IN') {
              setActiveView('Home');
            }
            if (_event === 'SIGNED_OUT') {
              setActiveView('Home');
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const renderView = () => {
        switch (activeView) {
            case 'Home':
                return <Home />;
            case 'Interview Community':
                return <InterviewCommunity />;
            case 'AI Interviewer':
                return <AIInterviewer />;
            case 'Contact':
                return <Contact />;
            case 'Login':
                return <Login />;
            default:
                return <Home />;
        }
    };

    return (
        <AuthContext.Provider value={{ session, setSession, activeView, setActiveView }}>
            <div className="min-h-screen flex flex-col font-sans bg-slate-900">
                <Header />
                <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                    {renderView()}
                </main>
                <Footer />
            </div>
        </AuthContext.Provider>
    );
};

export default App;