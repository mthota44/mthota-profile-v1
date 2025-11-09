import React from 'react';

const skills = {
    "Languages": ["Java", "Python", "JavaScript", "C"],
    "Frameworks": ["Spring Boot", "Spring Security", "Hibernate"],
    "Frontend": ["ReactJS", "Angular", "HTML", "CSS", "Bootstrap"],
    "Cloud & DevOps": ["AWS", "Docker", "Jenkins"],
    "Databases": ["MySQL", "PostgreSQL", "MongoDB"],
    "Tools": ["Git", "Maven", "JIRA", "Postman", "IntelliJ", "VS Code"],
    "Messaging": ["Kafka", "RabbitMQ", "WebSocket"],
    "Monitoring": ["OpenTelemetry", "Spring Cloud"]
};

const profileImage = "https://raw.githubusercontent.com/mthota44/my-profile-assets/refs/heads/main/mthota_mss.jpg";

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="text-center mb-12 animate-fade-in-up" style={{ animationDelay: '100ms'}}>
        <h2 className="text-3xl md:text-4xl font-bold text-white relative inline-block">
            {children}
            <span className="absolute -bottom-2.5 left-0 w-full h-1 bg-cyan-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
        </h2>
    </div>
);

const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);


const Home: React.FC = () => {
    const resumeUrl = "https://tgvhzimcckrtrxdfpdzw.supabase.co/storage/v1/object/public/portfolio-assets/manoj_javafullstack_mss.pdf";

    return (
        <div className="space-y-20 md:space-y-28 text-slate-300">
            {/* Hero Section */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
                <div className="md:col-span-2 space-y-4">
                    <span className="text-lg text-cyan-400 font-mono animate-fade-in-up" style={{ animationDelay: '100ms' }}>Hi, my name is</span>
                    <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight animate-fade-in-up" style={{ animationDelay: '200ms' }}>Thota Venkata Manoj Kumar.</h1>
                    <h2 className="text-3xl sm:text-5xl font-bold text-slate-400 tracking-tight animate-fade-in-up" style={{ animationDelay: '300ms' }}>I build things for the web.</h2>
                    <p className="text-slate-400 max-w-xl leading-relaxed pt-4 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                        I'm a Spring Boot Developer with 3+ years of expertise in microservices and cloud-native applications. I specialize in architecting scalable solutions and have a passion for delivering high-performance, user-centric products.
                    </p>
                    <div className="pt-6 animate-fade-in-up flex flex-wrap gap-4" style={{ animationDelay: '500ms' }}>
                        <a href="mailto:venkatamanojkumarthota@gmail.com" className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg transition-transform duration-200 hover:scale-105 shadow-lg shadow-cyan-500/30">
                            Get In Touch
                        </a>
                         <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-transparent hover:bg-cyan-500/10 border-2 border-cyan-500 text-cyan-400 font-bold py-3 px-6 rounded-lg transition-colors duration-200">
                            <DownloadIcon />
                            Download Resume
                        </a>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center animate-fade-in" style={{ animationDelay: '600ms' }}>
                    <div className="relative w-64 h-64 sm:w-72 sm:h-72 group">
                        <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                        <img src={profileImage} alt="Thota Venkata Manoj Kumar" className="relative w-full h-full object-cover rounded-full border-4 border-slate-800" />
                    </div>
                    <div className="mt-6 text-center">
                        <p className="text-xl font-bold text-white">Jr. Technical Associate</p>
                        <p className="text-md text-slate-400 mt-1">Miracle Software Systems</p>
                    </div>
                </div>
            </section>

            {/* Technical Skills Section */}
            <section id="skills">
                <SectionTitle>Technical Skills</SectionTitle>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Object.entries(skills).map(([category, items], index) => (
                        <div key={category} className="bg-slate-800/50 rounded-lg p-6 border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 transform hover:-translate-y-2 will-change-transform animate-fade-in-up" style={{ animationDelay: `${200 + index * 100}ms` }}>
                            <h3 className="text-lg font-semibold text-cyan-400 mb-4">{category}</h3>
                            <ul className="flex flex-wrap gap-2">
                                {items.map(skill => (
                                    <li key={skill} className="bg-slate-700 text-slate-300 text-xs font-medium px-2.5 py-1 rounded-full">{skill}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* Professional Experience Section */}
            <section id="experience">
                <SectionTitle>Professional Experience</SectionTitle>
                <div className="relative border-l-2 border-cyan-500/30 max-w-3xl mx-auto">
                    <div className="mb-12 ml-8 pl-4 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                        <div className="absolute -left-2.5 mt-1.5 w-5 h-5 bg-cyan-500 rounded-full border-4 border-slate-900"></div>
                        <h3 className="text-xl font-bold text-white">Spring Boot Developer</h3>
                        <p className="text-cyan-400 font-semibold">MIRACLE SOFTWARE SYSTEMS</p>
                        <time className="text-sm font-normal leading-none text-slate-500">Jul 2022 - Present</time>
                        <ul className="mt-4 list-disc list-inside text-slate-400 space-y-2">
                           <li>Architected enterprise Spring Boot microservices serving 10,000+ users, improving system performance by 40%.</li>
                           <li>Optimized MySQL performance via Hibernate ORM and advanced query techniques, reducing response times by 50%.</li>
                           <li>Led monolithic to microservices migration using Spring Cloud, Docker, and Kubernetes.</li>
                           <li>Implemented secure authentication using JWT/OAuth2, ensuring enterprise-grade security standards.</li>
                        </ul>
                    </div>
                    <div className="ml-8 pl-4 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                         <div className="absolute -left-2.5 mt-1.5 w-5 h-5 bg-cyan-500 rounded-full border-4 border-slate-900"></div>
                        <h3 className="text-xl font-bold text-white">Software Development Intern</h3>
                        <p className="text-cyan-400 font-semibold">MIRACLE SOFTWARE SYSTEMS</p>
                        <time className="text-sm font-normal leading-none text-slate-500">Jan 2021 - Jun 2022</time>
                        <ul className="mt-4 list-disc list-inside text-slate-400 space-y-2">
                            <li>Contributed to Spring Boot application development under senior developer guidance.</li>
                            <li>Built responsive web applications using Angular and ReactJS with seamless backend API integration.</li>
                            <li>Learned containerization with Docker and participated in CI/CD pipeline implementation.</li>
                        </ul>
                    </div>
                </div>
            </section>

             {/* Key Projects Section */}
            <section id="projects">
                <SectionTitle>Key Projects</SectionTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Project 1 */}
                    <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 transform hover:-translate-y-2 will-change-transform animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                        <h3 className="text-xl font-bold text-white">Resource Management Portal</h3>
                        <time className="text-sm text-slate-500">Jan 2024 - Present</time>
                        <p className="mt-4 text-slate-400">A comprehensive end-to-end recruitment application featuring role-based access control, workflow management, and enterprise-grade security.</p>
                        <ul className="mt-4 flex flex-wrap gap-2">
                           <li className="bg-slate-700 text-cyan-300 text-xs font-semibold px-2.5 py-1 rounded-full">Spring Boot</li>
                           <li className="bg-slate-700 text-cyan-300 text-xs font-semibold px-2.5 py-1 rounded-full">ReactJS</li>
                           <li className="bg-slate-700 text-cyan-300 text-xs font-semibold px-2.5 py-1 rounded-full">MySQL</li>
                           <li className="bg-slate-700 text-cyan-300 text-xs font-semibold px-2.5 py-1 rounded-full">Swagger</li>
                        </ul>
                    </div>
                    {/* Project 2 */}
                    <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 transform hover:-translate-y-2 will-change-transform animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                        <h3 className="text-xl font-bold text-white">Health Management Portal</h3>
                        <time className="text-sm text-slate-500">Jul 2022 - Dec 2024</time>
                        <p className="mt-4 text-slate-400">A patient-centric healthcare application with secure medical record management, appointment scheduling, and telemedicine capabilities.</p>
                         <ul className="mt-4 flex flex-wrap gap-2">
                           <li className="bg-slate-700 text-cyan-300 text-xs font-semibold px-2.5 py-1 rounded-full">Spring Boot</li>
                           <li className="bg-slate-700 text-cyan-300 text-xs font-semibold px-2.5 py-1 rounded-full">React</li>
                           <li className="bg-slate-700 text-cyan-300 text-xs font-semibold px-2.5 py-1 rounded-full">MySQL</li>
                           <li className="bg-slate-700 text-cyan-300 text-xs font-semibold px-2.5 py-1 rounded-full">Healthcare APIs</li>
                        </ul>
                    </div>
                </div>
            </section>
             
            {/* Education & Achievements */}
            <section id="education">
                 <SectionTitle>Education & Achievements</SectionTitle>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                        <h3 className="text-xl font-semibold text-white mb-4">Education</h3>
                        <div className="text-slate-400">
                            <p className="font-bold">Bachelor of Technology, ECE</p>
                            <p>Miracle Educational Society Group of Institutions</p>
                            <p className="text-sm text-slate-500">2018 - 2023 | CGPA: 7.26/10</p>
                        </div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                        <h3 className="text-xl font-semibold text-white mb-4">Achievements</h3>
                         <ul className="space-y-2 text-slate-400">
                            <li><span className="text-cyan-400 mr-2">✦</span>Best Employee Award Recipient, FY24</li>
                            <li><span className="text-cyan-400 mr-2">✦</span>Best Performer Award Recipient, FY23</li>
                        </ul>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;