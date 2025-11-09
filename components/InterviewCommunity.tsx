import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../services/supabase';
import { useAuth } from '../App';
import { InterviewExperience } from '../types';

const InterviewExperienceForm: React.FC<{onSuccess: () => void}> = ({onSuccess}) => {
    const { session } = useAuth();
    const [role, setRole] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [experience, setExperience] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!session) {
            setError("You must be logged in to post.");
            return;
        }
        setLoading(true);
        setError(null);

        const { error } = await supabase.from('interview_experiences').insert({
            role,
            company_name: companyName,
            experience,
            user_id: session.user.id
        });

        setLoading(false);
        if (error) {
            setError(error.message);
        } else {
            setRole('');
            setCompanyName('');
            setExperience('');
            onSuccess();
        }
    };
    
    return (
        <form onSubmit={handleSubmit} className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 space-y-4 mb-12">
            <h3 className="text-xl font-bold text-white">Share Your Experience</h3>
            <div>
                <label htmlFor="role" className="block text-sm font-medium text-slate-400">Role</label>
                <input type="text" id="role" value={role} onChange={e => setRole(e.target.value)} required className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm p-2 text-white" />
            </div>
            <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-slate-400">Company Name</label>
                <input type="text" id="companyName" value={companyName} onChange={e => setCompanyName(e.target.value)} required className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm p-2 text-white" />
            </div>
            <div>
                <label htmlFor="experience" className="block text-sm font-medium text-slate-400">Your Experience</label>
                <textarea id="experience" value={experience} onChange={e => setExperience(e.target.value)} required rows={4} className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm p-2 text-white"></textarea>
            </div>
             {error && <p className="text-red-400 text-sm">{error}</p>}
            <button type="submit" disabled={loading} className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:bg-slate-600">
                {loading ? 'Submitting...' : 'Submit Experience'}
            </button>
        </form>
    )
}

const InterviewCommunity: React.FC = () => {
    const { session, setActiveView } = useAuth();
    const [experiences, setExperiences] = useState<InterviewExperience[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchExperiences = useCallback(async () => {
        setLoading(true);
        setError(null);
        // This query now works because of the explicit foreign key in the new SQL schema.
        const { data, error } = await supabase
            .from('interview_experiences')
            .select('*, profiles(name)') // Join with profiles table
            .order('created_at', { ascending: false });
        
        if (error) {
            setError(error.message);
            console.error("Error fetching experiences:", error);
        } else {
            setExperiences(data as any[] as InterviewExperience[]);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchExperiences();
    }, [fetchExperiences]);

    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-white">Interview Community</h1>
                <p className="mt-2 text-lg text-slate-400">Share your interview experience and learn from others.</p>
            </div>
            
            {session ? (
               <InterviewExperienceForm onSuccess={fetchExperiences} />
            ) : (
                <div className="text-center mb-12 p-6 bg-slate-800/30 rounded-lg border border-slate-700">
                     <p className="text-slate-300 mb-4">You must be logged in to share your experience.</p>
                     <button onClick={() => setActiveView('Login')} className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg transition-transform duration-200 hover:scale-105">
                        Log In or Sign Up
                    </button>
                </div>
            )}
            
            <div className="space-y-6">
                {loading && <p className="text-center">Loading experiences...</p>}
                {error && <p className="text-center text-red-400">Error: {error}</p>}
                {!loading && experiences.length === 0 && !error && <p className="text-center text-slate-500">No experiences shared yet. Be the first!</p>}

                {experiences.map(exp => (
                    <div key={exp.id} className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-bold text-cyan-400">{exp.role}</h3>
                                <p className="text-slate-300">at <span className="font-semibold">{exp.company_name}</span></p>
                                <p className="text-sm text-slate-500">by {exp.profiles?.name || 'Anonymous'}</p>
                            </div>
                            <p className="text-sm text-slate-500">{new Date(exp.created_at).toLocaleDateString()}</p>
                        </div>
                        <p className="mt-4 text-slate-400 whitespace-pre-wrap">{exp.experience}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InterviewCommunity;