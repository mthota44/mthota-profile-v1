
import React from 'react';

const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

const PhoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
);

const Contact: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh]">
            <div className="text-center w-full max-w-2xl">
                <h1 className="text-4xl font-bold text-white">Get In Touch</h1>
                <p className="mt-4 text-lg text-slate-400">
                    I'm currently open to new opportunities and collaborations. Whether you have a question or just want to say hi, feel free to reach out. My inbox is always open!
                </p>
                <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-6">
                    <a href="mailto:venkatamanojkumarthota@gmail.com" className="flex items-center bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                        <MailIcon />
                        venkatamanojkumarthota@gmail.com
                    </a>
                    <a href="tel:628-102-4750" className="flex items-center bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                        <PhoneIcon />
                        628-102-4750
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Contact;
