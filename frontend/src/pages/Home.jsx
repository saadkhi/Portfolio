import React from 'react';

const Home = ({ data }) => {
    if (!data) return null;

    return (
        <main className="pt-20">
            {/* Hero Section */}
            <section id="home" className="min-h-[90vh] flex flex-col justify-center items-center text-center relative px-8 overflow-hidden">
                {/* Background "Glow" name like reem.dev */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 select-none opacity-[0.03]">
                    <h1 className="text-[20vw] font-bold leading-none uppercase tracking-tighter">
                        {data.hero.name}
                    </h1>
                </div>

                <div className="max-w-[1000px] animate-fade-in">
                    <h2 className="text-5xl md:text-8xl font-bold leading-[1.1] mb-8 tracking-tighter">
                        {data.hero.title}
                    </h2>
                    <p className="text-xl md:text-2xl text-text-secondary font-medium mb-12 max-w-[700px] mx-auto">
                        {data.about.description}
                    </p>
                    <div className="flex flex-wrap justify-center gap-6">
                        <a href="#work" className="btn-primary">{data.hero.cta_primary}</a>
                        <a href="#contact" className="btn-secondary">{data.hero.cta_secondary}</a>
                    </div>
                </div>
            </section>

            {/* Featured Projects Section */}
            <section id="work" className="py-32 px-8 max-w-[1400px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div className="max-w-[600px]">
                        <span className="text-primary-accent uppercase tracking-widest text-xs font-bold mb-4 block">Selected Projects</span>
                        <h2 className="text-4xl md:text-6xl font-bold">Bringing ideas to life through code.</h2>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-full border border-glass-border flex items-center justify-center text-text-secondary hover:text-white hover:border-white transition-all cursor-pointer">&larr;</div>
                        <div className="w-12 h-12 rounded-full border border-glass-border flex items-center justify-center text-text-secondary hover:text-white hover:border-white transition-all cursor-pointer">&rarr;</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {data.featured_projects && data.featured_projects.map((project, index) => (
                        <div key={project.id} className={`glass-card group flex flex-col overflow-hidden ${index === 0 ? 'md:col-span-2' : ''}`}>
                            <div className={`w-full ${index === 0 ? 'aspect-[21/9]' : 'aspect-video'} overflow-hidden relative`}>
                                {project.video ? (
                                    <video
                                        src={project.video}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        autoPlay muted loop playsInline
                                    />
                                ) : (
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </div>
                            <div className="p-8 md:p-12 relative">
                                <span className="text-xs font-bold uppercase tracking-widest text-primary-accent mb-4 block">{project.category}</span>
                                <div className="flex justify-between items-start gap-4">
                                    <h3 className="text-3xl md:text-4xl font-bold mb-4">{project.title}</h3>
                                    <a href={project.live_link} className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:bg-primary-accent transition-colors">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                                    </a>
                                </div>
                                <p className="text-text-secondary text-lg mb-8 max-w-[600px]">{project.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tech_stack.split(',').map((tech, i) => (
                                        <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-wider">{tech.trim()}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Bento Grid / Tech Stack */}
            <section className="py-32 px-8 max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="glass-card p-12 col-span-1 md:col-span-2 flex flex-col justify-center">
                        <h3 className="text-4xl font-bold mb-8">My Expertise</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                            {data.skills.map((skill, index) => (
                                <div key={index} className="flex items-center gap-4 group">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-primary-accent group-hover:text-black transition-all">
                                        <i className={skill.icon}></i>
                                    </div>
                                    <span className="font-bold text-sm tracking-widest uppercase">{skill.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="glass-card p-12 bg-gradient-to-br from-primary-accent/20 to-transparent flex flex-col justify-between">
                        <h3 className="text-3xl font-bold">Have a project in mind?</h3>
                        <p className="text-text-secondary my-8">Let's build something extraordinary together.</p>
                        <a href="#contact" className="btn-primary w-full">Start a Conversation</a>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-32 px-8 bg-[#050505]">
                <div className="max-w-[800px] mx-auto text-center">
                    <span className="text-primary-accent uppercase tracking-widest text-xs font-bold mb-4 block">Get In Touch</span>
                    <h2 className="text-5xl md:text-7xl font-bold mb-16">Let's get results.</h2>

                    <form className="text-left space-y-8" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest opacity-50 ml-4">Full Name</label>
                                <input type="text" placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 focus:outline-none focus:border-primary-accent transition-colors" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest opacity-50 ml-4">Email Address</label>
                                <input type="email" placeholder="john@example.com" className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 focus:outline-none focus:border-primary-accent transition-colors" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest opacity-50 ml-4">Project Details</label>
                            <textarea placeholder="Tell me what you're looking for..." rows="6" className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 focus:outline-none focus:border-primary-accent transition-colors"></textarea>
                        </div>
                        <button type="submit" className="btn-primary w-full md:w-auto px-12">Submit Request</button>
                    </form>
                </div>
            </section>

            <footer className="py-20 px-8 border-t border-glass-border">
                <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-2xl font-bold">Saad.</div>
                    <div className="flex gap-8">
                        <a href={data.contact.github} className="text-text-secondary hover:text-white transition-colors uppercase tracking-widest text-xs font-bold">Github</a>
                        <a href={data.contact.linkedin} className="text-text-secondary hover:text-white transition-colors uppercase tracking-widest text-xs font-bold">LinkedIn</a>
                        <a href={`mailto:${data.contact.email}`} className="text-text-secondary hover:text-white transition-colors uppercase tracking-widest text-xs font-bold">Email</a>
                    </div>
                    <p className="text-text-secondary text-xs uppercase tracking-widest font-bold opacity-30">© 2024 All Rights Reserved</p>
                </div>
            </footer>
        </main>
    );
};

export default Home;
