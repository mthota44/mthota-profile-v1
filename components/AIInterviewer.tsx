import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat, Type } from '@google/genai';
import { useAuth } from '../App';

type InterviewMode = 'setup' | 'practice_topic_selection' | 'practice_session' | 'interview_session' | 'interview_feedback';

interface Message {
    sender: 'user' | 'ai';
    text: string;
}

interface Feedback {
    rating: number;
    summary: string;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
    <div className="flex justify-center">
        {[...Array(5)].map((_, i) => (
            <svg
                key={i}
                className={`w-8 h-8 ${i < rating ? 'text-yellow-400' : 'text-slate-600'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ))}
    </div>
);


const AIInterviewer: React.FC = () => {
    const { session, setActiveView } = useAuth();

    const [mode, setMode] = useState<InterviewMode>('setup');
    const [domain, setDomain] = useState('');
    const [experience, setExperience] = useState('');
    const [topics, setTopics] = useState<string[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<Feedback | null>(null);

    const chatRef = useRef<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleStartPractice = async () => {
        if (!domain.trim() || !experience.trim()) {
            setError("Please enter both domain and experience.");
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: `Based on a job role of "${domain}" with ${experience} of experience, generate a list of 5-7 key technical and behavioral topics that are essential to prepare for an interview.`,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            topics: {
                                type: Type.ARRAY,
                                items: { type: Type.STRING }
                            }
                        }
                    },
                },
            });

            const result = JSON.parse(response.text);
            setTopics(result.topics);
            setMode('practice_topic_selection');

        } catch (err: any) {
            setError(err.message || "Failed to fetch topics.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSelectTopic = async (topic: string) => {
        setIsLoading(true);
        setError(null);
        setMessages([]);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const systemInstruction = `You are an AI assistant conducting a practice session on the topic of "${topic}" for a candidate with ${experience} of experience in "${domain}". Your goal is to help the candidate learn.
1. Start with a basic conceptual question.
2. Ask questions one by one, progressing from basic to advanced.
3. If the user's answer is correct, acknowledge it and move to a slightly more difficult question.
4. If the user's answer is incorrect or incomplete, provide a clear, concise explanation of the correct concept, and then ask a new, related question to check their understanding. Act as a teacher.
5. Maintain a professional, encouraging, and helpful tone. Start now by asking your first question.`;
            
            const newChat = ai.chats.create({
                model: 'gemini-2.5-flash',
                config: { systemInstruction },
            });
            chatRef.current = newChat;
            
            const response = await newChat.sendMessage({ message: "Start the practice session." });
            setMessages([{ sender: 'ai', text: response.text }]);
            setMode('practice_session');
        } catch (err: any) {
            setError(err.message || "Failed to start the practice session.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleStartInterview = async () => {
        if (!domain.trim() || !experience.trim()) {
            setError("Please enter both domain and experience.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setMessages([]);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const systemInstruction = `You are a professional AI interviewer conducting a technical and behavioral interview for a "${domain}" position, targeting a candidate with ${experience} of experience.
1. Introduce yourself briefly and state the role you are interviewing for.
2. Ask a mix of relevant technical and behavioral questions.
3. Keep your questions concise and relevant to the role and experience level.
4. Engage in a natural, conversational flow.
Begin the interview now.`;

            const newChat = ai.chats.create({
                model: 'gemini-2.5-flash',
                config: { systemInstruction },
            });
            chatRef.current = newChat;
            
            const response = await newChat.sendMessage({ message: "Start the interview." });
            
            setMessages([{ sender: 'ai', text: response.text }]);
            setMode('interview_session');
        } catch (err: any) {
            setError(err.message || "Failed to start the interview session.");
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput.trim() || isLoading || !chatRef.current) return;

        const newUserMessage: Message = { sender: 'user', text: userInput };
        setMessages(prev => [...prev, newUserMessage]);
        setUserInput('');
        setIsLoading(true);

        try {
            const response = await chatRef.current.sendMessage({ message: userInput });
            const aiResponse: Message = { sender: 'ai', text: response.text };
            setMessages(prev => [...prev, aiResponse]);
        } catch (err: any) {
            setError(err.message || "Failed to get a response from the AI.");
            const errorResponse: Message = { sender: 'ai', text: "Sorry, I encountered an error. Please try again." };
            setMessages(prev => [...prev, errorResponse]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEndInterview = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const history = await chatRef.current?.getHistory();
            if(!history) throw new Error("Could not retrieve conversation history.");

            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                 model: "gemini-2.5-flash",
                 contents: [
                     ...history,
                     { role: 'user', parts: [{ text: "The interview is now over. Please analyze my performance based on our conversation and provide feedback." }] }
                 ],
                 config: {
                     responseMimeType: "application/json",
                     responseSchema: {
                         type: Type.OBJECT,
                         properties: {
                             rating: { type: Type.INTEGER, description: "A rating from 1 to 5, where 1 is poor and 5 is excellent." },
                             summary: { type: Type.STRING, description: "A constructive summary of the candidate's performance, highlighting strengths and areas for improvement." }
                         }
                     }
                 }
            });
            
            const feedbackJson = JSON.parse(response.text);
            setFeedback(feedbackJson);
            setMode('interview_feedback');
        } catch (err: any) {
            setError(err.message || "Failed to generate feedback.");
        }
        setIsLoading(false);
    };

    const handleReset = () => {
        setMode('setup');
        setDomain('');
        setExperience('');
        setMessages([]);
        setFeedback(null);
        setError(null);
        setTopics([]);
    };

    if (!session) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
                 <h1 className="text-4xl font-bold text-white">AI Interviewer</h1>
                <p className="mt-4 text-lg text-slate-400">Please log in to access this feature.</p>
                <button
                    onClick={() => setActiveView('Login')}
                    className="mt-8 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg transition-transform duration-200 hover:scale-105"
                >
                    Go to Login
                </button>
            </div>
        );
    }
    
    const renderChatInterface = (title: string, showEndButton: boolean) => (
         <div className="flex flex-col h-[80vh] max-w-3xl mx-auto bg-slate-800/50 rounded-lg border border-slate-700 shadow-xl">
            <div className="p-4 border-b border-slate-700 flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">{title}</h2>
                {showEndButton && <button onClick={handleEndInterview} disabled={isLoading} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors disabled:bg-slate-600">End Interview</button>}
                 {mode === 'practice_session' && <button onClick={handleReset} className="bg-slate-600 hover:bg-slate-500 text-white px-3 py-1 rounded-md text-sm font-medium">Change Topic</button>}
            </div>
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-md p-3 rounded-lg ${msg.sender === 'user' ? 'bg-cyan-600 text-white' : 'bg-slate-700 text-slate-300'}`}>
                            <p className="whitespace-pre-wrap">{msg.text}</p>
                        </div>
                    </div>
                ))}
                {isLoading && <div className="flex justify-start"><div className="bg-slate-700 text-slate-300 p-3 rounded-lg">AI is thinking...</div></div>}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-slate-700">
                <form onSubmit={handleSendMessage} className="flex gap-4">
                    <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder="Your answer..." className="flex-1 bg-slate-700 border-slate-600 rounded-md p-2 text-white focus:ring-cyan-500 focus:border-cyan-500" disabled={isLoading}/>
                    <button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:bg-slate-600" disabled={isLoading || !userInput.trim()}>Send</button>
                </form>
            </div>
        </div>
    );
    
    switch (mode) {
        case 'setup':
            return (
                <div className="flex flex-col items-center justify-center min-h-[70vh]">
                    <div className="text-center w-full max-w-lg">
                        <h1 className="text-4xl font-bold text-white">AI Interviewer</h1>
                        <p className="mt-2 text-lg text-slate-400">Practice your interview skills with an AI-powered interviewer.</p>
                        <div className="mt-8 space-y-4 text-left">
                            <div>
                                <label htmlFor="domain" className="block text-sm font-medium text-slate-400">Your Domain / Role</label>
                                <input id="domain" type="text" value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="e.g., Senior Java Developer" className="mt-1 w-full bg-slate-700 border-slate-600 rounded-md p-3 text-white"/>
                            </div>
                            <div>
                                <label htmlFor="experience" className="block text-sm font-medium text-slate-400">Years of Experience</label>
                                <input id="experience" type="text" value={experience} onChange={(e) => setExperience(e.target.value)} placeholder="e.g., 3 Years" className="mt-1 w-full bg-slate-700 border-slate-600 rounded-md p-3 text-white"/>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button onClick={handleStartPractice} className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 rounded-lg transition-colors disabled:bg-slate-600" disabled={isLoading}>{isLoading ? 'Loading...' : 'Start Practice'}</button>
                                <button onClick={handleStartInterview} className="w-full bg-slate-600 hover:bg-slate-500 text-white font-bold py-3 rounded-lg transition-colors disabled:bg-slate-600" disabled={isLoading}>{isLoading ? 'Loading...' : 'Start Interview'}</button>
                            </div>
                            {error && <p className="text-red-400 mt-2 text-center">{error}</p>}
                        </div>
                    </div>
                </div>
            );
        case 'practice_topic_selection':
             return (
                 <div className="max-w-2xl mx-auto text-center">
                     <h2 className="text-3xl font-bold text-white">Select a Topic</h2>
                     <p className="mt-2 text-slate-400">Choose a topic to practice for your {domain} interview.</p>
                     {isLoading ? <p className="mt-8">Loading topics...</p> : (
                         <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                             {topics.map(topic => (
                                 <button key={topic} onClick={() => handleSelectTopic(topic)} className="bg-slate-800 hover:bg-slate-700 border border-slate-600 text-cyan-400 font-semibold p-4 rounded-lg text-left transition-colors">
                                     {topic}
                                 </button>
                             ))}
                         </div>
                     )}
                      <button onClick={handleReset} className="mt-8 text-slate-400 hover:text-white">Back to setup</button>
                 </div>
             );
        case 'practice_session':
            return renderChatInterface('Practice Session', false);
        case 'interview_session':
            return renderChatInterface(`Interview for: ${domain}`, true);
        case 'interview_feedback':
            return (
                <div className="max-w-2xl mx-auto text-center p-8 bg-slate-800/50 rounded-lg border border-slate-700">
                    <h2 className="text-3xl font-bold text-white">Interview Feedback</h2>
                    {isLoading ? <p>Generating feedback...</p> : feedback && (
                       <div className="mt-6 space-y-6">
                           <div>
                               <h3 className="text-xl font-semibold text-slate-300">Your Rating</h3>
                               <div className="mt-2">
                                   <StarRating rating={feedback.rating} />
                               </div>
                           </div>
                           <div>
                               <h3 className="text-xl font-semibold text-slate-300">Performance Summary</h3>
                               <p className="mt-2 text-slate-400 text-left whitespace-pre-wrap">{feedback.summary}</p>
                           </div>
                           <button onClick={handleReset} className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg transition-transform duration-200 hover:scale-105">
                               Try Another Interview
                           </button>
                       </div>
                    )}
                    {error && <p className="text-red-400 mt-4">{error}</p>}
                </div>
            );
        default:
            return null;
    }
};

export default AIInterviewer;
