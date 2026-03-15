import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { scrollToSection } from '../utils/scrollTo';

const About = ({ data }) => {
    const navigate = useNavigate();
    const location = useLocation();

    if (!data) return null;

    const handleNavClick = (id) => {
        scrollToSection(id, navigate, location.pathname);
    };

    return (
        <main className="pt-32 pb-20 px-8">
            <div className="max-w-[1000px] mx-auto">
                {/* Hero Section */}
                <section className="animate-fade-in">
                    <span className="text-primary-accent uppercase tracking-[0.3em] text-xs font-bold block text-center py-2 md:py-0">The Story Behind The Code</span>
                    {/* <h1 className="text-5xl md:text-8xl font-bold leading-tight mb-8 tracking-tighter">
                        Crafting Digital <br /> Excellence.
                    </h1> */}
                    <h1 className='text-4xl sm:text-5xl md:text-8xl font-bold leading-tight mb-8 tracking-tighter text-center'>About Me</h1>
                    <p className="text-base md:text-xl text-text-secondary font-medium max-w-[1000px] mx-auto leading-relaxed text-justify px-4 md:px-0">
                        I’m Saad Ali, a Software Engineering graduate from NED University of Engineering and Technology in Software Engineering major, with hands-on experience in AI/ML, LLM-based applications, and backend development. I’ve worked on building RAG chatbots, machine learning pipelines, and API-driven systems with a strong focus on practical, production-ready solutions.
                        <br></br>
                        <br></br>
                        I’m deeply interested in Generative AI, intelligent automation, scalable SaaS products, and solving real-world problems through data and systems design. I enjoy clean architecture, continuous learning, and experimenting with new AI frameworks.
                        <br></br>
                        <br></br>
                        I like working in growth-oriented environments with strong engineering culture and clear impact. I dislike unnecessary complexity, poor code practices, and stagnation — I prefer building things that are efficient, meaningful, and scalable.
                    </p>


                    {/* About Content Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-8">
                        <div className="glass-card p-6 md:p-12 space-y-6">
                            <h3 className="text-2xl md:text-3xl font-bold">My Goal</h3>
                            <p className="text-text-secondary leading-relaxed text-base md:text-lg">
                                {data.about.description}
                            </p>
                            <p className="text-text-secondary leading-relaxed text-base md:text-lg">
                                Over the years, I've honed my skills in the Python ecosystem and modern frontend frameworks. My approach is rooted in clean code, scalability, and a relentless focus on performance.
                            </p>
                        </div>

                        <div className="glass-card p-8 md:p-12 bg-gradient-to-br from-primary-accent/10 to-transparent flex flex-col justify-center">
                            <h3 className="text-3xl font-bold mb-8 text-center md:text-left">What I Value</h3>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary-accent flex-shrink-0">
                                        <i className="fa-solid fa-bolt"></i>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">Efficiency</h4>
                                        <p className="text-text-secondary text-sm">Optimizing every line of code for maximum performance.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary-accent flex-shrink-0">
                                        <i className="fa-solid fa-gem"></i>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">Quality</h4>
                                        <p className="text-text-secondary text-sm">Building durable systems with attention to every detail.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary-accent flex-shrink-0">
                                        <i className="fa-solid fa-users"></i>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">Collaboration</h4>
                                        <p className="text-text-secondary text-sm">Working closely with partners to turn vision into reality.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary-accent flex-shrink-0">
                                        <i className="fa-solid fa-brain"></i>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">Innovation</h4>
                                        <p className="text-text-secondary text-sm">
                                            Leveraging cutting-edge AI technologies to build forward-thinking solutions.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="relative bg-white/5 border border-white/20 rounded-3xl p-8 md:p-20">

                    <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 tracking-tight">
                        My Journey
                    </h2>

                    <div className="relative max-w-5xl mx-auto">

                        {/* Desktop Horizontal Line */}
                        <div className="hidden md:block absolute top-3 left-0 w-full h-[3px] bg-white/20"></div>

                        {/* Mobile Vertical Line (LEFT SIDE) */}
                        <div className="md:hidden absolute left-3 top-0 w-[3px] h-full bg-white/20"></div>

                        <div className="relative grid md:grid-cols-4 gap-16">

                            {/* Landmark 1 */}
                            <div className="relative flex md:block items-start gap-6 md:gap-0">

                                {/* Dot */}
                                <div className="relative z-10 w-6 h-6 bg-primary-accent rounded-full shadow-lg 
                        md:mx-auto md:mb-6 flex-shrink-0">
                                </div>

                                {/* Text */}
                                <div className="md:text-center">
                                    <h3 className="text-xl font-semibold">MERL LAB</h3>
                                    <p className="text-sm text-text-secondary mt-2">
                                        RISC-V & AI Research Intern
                                    </p>
                                    <p className="text-sm text-text-secondary">
                                        Sep 2022 — Dec 2023
                                    </p>
                                </div>

                            </div>

                            {/* Landmark 2 */}
                            <div className="relative flex md:block items-start gap-6 md:gap-0">
                                <div className="relative z-10 w-6 h-6 bg-primary-accent rounded-full shadow-lg md:mx-auto md:mb-6 flex-shrink-0"></div>
                                <div className="md:text-center">
                                    <h3 className="text-xl font-semibold">360 Xpert Solutions</h3>
                                    <p className="text-sm text-text-secondary mt-2">
                                        AI Engineer Intern
                                    </p>
                                    <p className="text-sm text-text-secondary">
                                        July 2024 — Aug 2025
                                    </p>
                                </div>
                            </div>

                            {/* Landmark 3 */}
                            <div className="relative flex md:block items-start gap-6 md:gap-0">
                                <div className="relative z-10 w-6 h-6 bg-primary-accent rounded-full shadow-lg md:mx-auto md:mb-6 flex-shrink-0"></div>
                                <div className="md:text-center">
                                    <h3 className="text-xl font-semibold">Avennex Solutions</h3>
                                    <p className="text-sm text-text-secondary mt-2">
                                        AI Engineer
                                    </p>
                                    <p className="text-sm text-text-secondary">
                                        Sep 2025 — Sep 2025
                                    </p>
                                </div>
                            </div>

                            {/* Landmark 4 */}
                            <div className="relative flex md:block items-start gap-6 md:gap-0">
                                <div className="relative z-10 w-6 h-6 bg-primary-accent rounded-full shadow-lg md:mx-auto md:mb-6 flex-shrink-0"></div>
                                <div className="md:text-center">
                                    <h3 className="text-xl font-semibold">Convex Consulting</h3>
                                    <p className="text-sm text-text-secondary mt-2">
                                        AI Engineer
                                    </p>
                                    <p className="text-sm text-text-secondary">
                                        Oct 2025 — Present
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>

                </section>

                {/* Toolkit/Expertise section */}
                <section className="py-12 md:py-8">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-3xl md:text-6xl font-bold mb-4">My Toolkit</h2>
                        <p className="text-text-secondary text-sm md:text-base px-6">The technologies I use to bring ideas to life.</p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 md:gap-6">
                        {data.skills.map((skill, index) => (
                            <div key={index} className="glass-card p-6 md:p-8 flex flex-col items-center gap-4 group hover:bg-white/5 transition-all">
                                <div className="flex w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/5 items-center justify-center text-2xl md:text-3xl group-hover:bg-primary-accent group-hover:text-black transition-all duration-300">
                                    {skill.icon && (skill.icon.startsWith('http') || skill.icon.startsWith('/media/')) ? (
                                        <img src={skill.icon} alt={skill.name} className="w-8 h-8 md:w-10 md:h-10 object-contain" />
                                    ) : (
                                        <i className={skill.icon}></i>
                                    )}
                                </div>
                                <span className="font-bold text-[10px] tracking-[0.2em] uppercase text-text-secondary group-hover:text-white text-center">{skill.name}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Closing Statement */}
                <section className="text-center bg-white/5 border border-white/20 rounded-3xl p-8 md:p-20 py-12 md:py-8">
                    <h2 className="text-2xl md:text-5xl font-bold mb-8 tracking-tight px-4">Ready to build something extraordinary?</h2>
                    <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 md:gap-6 px-4 md:px-0">
                        <a href="/projects" className="btn-primary w-full sm:w-auto">
                            {data.hero.cta_primary}
                        </a>
                        <button onClick={() => handleNavClick("#contact")} className="btn-secondary w-full sm:w-auto">
                            Book a Session
                        </button>
                        <button onClick={() => handleNavClick("#contact-form")} className="btn-secondary w-full sm:w-auto">
                            {data.hero.cta_secondary}
                        </button>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default About;
