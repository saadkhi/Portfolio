import React from 'react';

const About = ({ data }) => {
    if (!data) return null;

    return (
        <main className="pt-32 pb-20 px-8">
            <div className="max-w-[1000px] mx-auto">
                {/* Hero Section */}
                <section className="mb-24 animate-fade-in text-center">
                    <span className="text-primary-accent uppercase tracking-[0.3em] text-xs font-bold mb-6 block">The Story Behind The Code</span>
                    <h1 className="text-5xl md:text-8xl font-bold leading-tight mb-8 tracking-tighter">
                        Crafting Digital <br /> Excellence.
                    </h1>
                    <p className="text-xl md:text-2xl text-text-secondary font-medium max-w-[800px] mx-auto leading-relaxed">
                        I'm a software engineer dedicated to building high-performance solutions that bridge the gap between complex backend logic and intuitive user experiences.
                    </p>
                </section>

                {/* About Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
                    <div className="glass-card p-8 md:p-12 space-y-6">
                        <h3 className="text-3xl font-bold">My Journey</h3>
                        <p className="text-text-secondary leading-relaxed text-lg">
                            {data.about.description}
                        </p>
                        <p className="text-text-secondary leading-relaxed text-lg">
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
                        </div>
                    </div>
                </div>

                {/* Toolkit/Expertise section */}
                <section className="mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-6xl font-bold mb-4">My Toolkit</h2>
                        <p className="text-text-secondary">The technologies I use to bring ideas to life.</p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                        {data.skills.map((skill, index) => (
                            <div key={index} className="glass-card p-8 flex flex-col items-center gap-4 group hover:bg-white/5 transition-all">
                                <div className="hidden md:flex w-16 h-16 rounded-2xl bg-white/5 items-center justify-center text-3xl group-hover:bg-primary-accent group-hover:text-black transition-all duration-300">
                                    {skill.icon && (skill.icon.startsWith('http') || skill.icon.startsWith('/media/')) ? (
                                        <img src={skill.icon} alt={skill.name} className="w-10 h-10 object-contain" />
                                    ) : (
                                        <i className={skill.icon}></i>
                                    )}
                                </div>
                                <span className="font-bold text-xs tracking-[0.2em] uppercase text-text-secondary group-hover:text-white">{skill.name}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Closing Statement */}
                <section className="text-center bg-white/5 border border-white/10 rounded-3xl p-12 md:p-20">
                    <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tight">Ready to build something extraordinary?</h2>
                    <div className="flex flex-wrap justify-center gap-6">
                        <a href="/#contact-form" className="btn-primary">Get in Touch</a>
                        <a href="/#contact" className="btn-secondary">Book a Call</a>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default About;
