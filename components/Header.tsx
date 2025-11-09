import React from 'react';
import { supabase } from '../services/supabase';
import { useAuth } from '../App';
import { AppView } from '../types';

const Header: React.FC = () => {
    const { session, activeView, setActiveView } = useAuth();

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    const navItems: AppView[] = ['Home', 'Interview Community', 'AI Interviewer', 'Contact'];

    return (
        <header className="bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <span 
                            className="text-2xl font-bold text-white cursor-pointer transition-all duration-300 hover:text-cyan-400 hover:drop-shadow-[0_0_5px_theme(colors.cyan.400)]"
                            onClick={() => setActiveView('Home')}
                        >
                            mthota
                        </span>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navItems.map((item) => (
                                <button
                                    key={item}
                                    onClick={() => setActiveView(item)}
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                                        activeView === item
                                            ? 'bg-cyan-500 text-white'
                                            : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                                    }`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        {session ? (
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                            >
                                Logout
                            </button>
                        ) : (
                            <button
                                onClick={() => setActiveView('Login')}
                                className="bg-slate-800 hover:bg-slate-700 text-cyan-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 border border-cyan-400"
                            >
                                Login
                            </button>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;