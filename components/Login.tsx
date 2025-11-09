import React, { useState } from 'react';
import { supabase } from '../services/supabase';

const Login: React.FC = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);

        try {
            if (isSignUp) {
                // Sign up a new user
                const { data, error } = await supabase.auth.signUp({ 
                    email, 
                    password,
                    options: {
                        data: {
                            name: name, // This metadata is used by the trigger
                            phone: phone,
                        }
                    }
                });
                if (error) throw error;
                if (data.user?.identities?.length === 0) {
                     setError("User with this email already exists.");
                } else {
                     setMessage('Success! Check your email for the confirmation link.');
                }
            } else {
                // Sign in an existing user
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
                // App.tsx will handle view change on successful sign-in
            }
        } catch (error: any) {
            setError(error.error_description || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[70vh]">
            <div className="w-full max-w-md p-8 space-y-6 bg-slate-800/50 rounded-lg border border-slate-700">
                <h2 className="text-2xl font-bold text-center text-white">{isSignUp ? 'Create an Account' : 'Log In'}</h2>
                <form className="space-y-4" onSubmit={handleAuth}>
                    {isSignUp && (
                        <>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-slate-400">Full Name</label>
                                <div className="mt-1">
                                    <input id="name" name="name" type="text" required value={name} onChange={(e) => setName(e.target.value)}
                                        className="appearance-none block w-full px-3 py-2 border border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm bg-slate-700 text-white"
                                    />
                                </div>
                            </div>
                             <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-slate-400">Phone Number (Optional)</label>
                                <div className="mt-1">
                                    <input id="phone" name="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                                        className="appearance-none block w-full px-3 py-2 border border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm bg-slate-700 text-white"
                                    />
                                </div>
                            </div>
                        </>
                    )}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-400">Email address</label>
                        <div className="mt-1">
                            <input id="email" name="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                                className="appearance-none block w-full px-3 py-2 border border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm bg-slate-700 text-white"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password"className="block text-sm font-medium text-slate-400">Password</label>
                        <div className="mt-1">
                            <input id="password" name="password" type="password" autoComplete="current-password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none block w-full px-3 py-2 border border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm bg-slate-700 text-white"
                            />
                        </div>
                    </div>

                    <div>
                        <button type="submit" disabled={loading}
                            className="w-full flex justify-center py-2 px-4 mt-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:bg-slate-500"
                        >
                            {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Log In')}
                        </button>
                    </div>
                </form>

                {error && <p className="text-sm text-red-400 text-center">{error}</p>}
                {message && <p className="text-sm text-green-400 text-center">{message}</p>}

                <div className="text-center">
                    <button onClick={() => { setIsSignUp(!isSignUp); setError(null); setMessage(null); }} className="font-medium text-cyan-400 hover:text-cyan-300">
                        {isSignUp ? 'Already have an account? Log In' : 'Need an account? Sign Up'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;