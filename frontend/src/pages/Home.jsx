import React from 'react';

const Home = ({ data }) => {
    if (!data) return null;

    return (
        <>
            {/* Hero Section */}
            <section id="home" className="min-h-[90vh] flex flex-col justify-center items-center text-center relative max-w-[1400px] mx-auto px-8 animate-enter">
                <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-white to-text-secondary font-heading font-bold tracking-tight text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-2">
                    Building the <br />
                    <span className="text-primary-accent">Digital Future</span>
                </h1>
                <p className="text-xl text-text-secondary font-normal mb-8 max-w-[600px] mx-auto">
                    {data.hero.subtitle}. Crafting exceptional digital experiences with code and creativity.
                </p>
                <div className="flex gap-4 mt-4">
                    <a href="#work" className="inline-flex items-center justify-center px-10 py-4 rounded-full font-semibold text-base transition-all duration-200 cursor-pointer font-heading bg-text-primary text-bg-dark hover:bg-primary-accent hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(185,255,0,0.2)]">{data.hero.cta_primary}</a>
                    <a href="#contact" className="inline-flex items-center justify-center px-10 py-4 rounded-full font-semibold text-base transition-all duration-200 cursor-pointer font-heading bg-transparent text-text-primary border border-glass-border hover:border-text-primary hover:bg-white/5">{data.hero.cta_secondary}</a>
                </div>
            </section>

            {/* Bento Grid Section (Work & Skills) */}
            <section id="work" className="py-16 min-h-[90vh] max-w-[1400px] mx-auto px-8">
                <h2 className="font-heading font-bold text-[2.5rem] mb-8 animate-enter">Selected Work</h2>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Main Project - Large */}
                    {data.projects[0] && (
                        <div className="col-span-1 md:col-span-8 bg-bg-card border border-glass-border rounded-3xl p-8 relative overflow-hidden transition-all duration-300 flex flex-col justify-between hover:border-glass-highlight hover:-translate-y-1 hover:shadow-2xl">
                            <div className="h-[250px] bg-gradient-to-tr from-[#111] to-[#222] rounded-2xl mb-6 overflow-hidden">
                                <img src={data.projects[0].image} alt={data.projects[0].title} className="w-full h-full object-cover" />
                            </div>
                            <div className="mt-auto">
                                <h3 className="font-heading font-bold text-2xl mb-2">{data.projects[0].title}</h3>
                                <p className="text-text-secondary text-[0.95rem] mb-6">{data.projects[0].description}</p>
                                <a href={data.projects[0].link || data.projects[0].live_link} className="font-heading text-sm text-text-primary border-b border-primary-accent pb-0.5">View Case Study &rarr;</a>
                            </div>
                        </div>
                    )}

                    {/* About/Bio Block - Medium */}
                    <div className="col-span-1 md:col-span-4 md:col-start-9 md:-ml-0 bg-bg-card border border-glass-border rounded-3xl p-8 relative overflow-hidden transition-all duration-300 flex flex-col justify-between hover:border-glass-highlight hover:-translate-y-1 hover:shadow-2xl" style={{ background: 'linear-gradient(135deg, rgba(20,20,20,0.8), rgba(112,0,255,0.1))' }} id="about">
                        <h3 className="font-heading font-bold text-2xl mb-2">About Me</h3>
                        <p className="text-text-secondary mt-4 leading-relaxed">
                            {data.about.description}
                        </p>
                    </div>

                    {/* Second Project - Medium */}
                    {data.projects[1] && (
                        <div className="col-span-1 md:col-span-6 bg-bg-card border border-glass-border rounded-3xl p-8 relative overflow-hidden transition-all duration-300 flex flex-col justify-between hover:border-glass-highlight hover:-translate-y-1 hover:shadow-2xl">
                            <div className="h-[200px] bg-gradient-to-tr from-[#1a1a1a] to-[#333] rounded-2xl mb-6 overflow-hidden">
                                <img src={data.projects[1].image} alt={data.projects[1].title} className="w-full h-full object-cover" />
                            </div>
                            <div className="mt-auto">
                                <h3 className="font-heading font-bold text-2xl mb-2">{data.projects[1].title}</h3>
                                <p className="text-text-secondary text-[0.95rem] mb-6">{data.projects[1].description}</p>
                                <a href={data.projects[1].link || data.projects[1].live_link} className="font-heading text-sm text-text-primary border-b border-primary-accent pb-0.5">View Project &rarr;</a>
                            </div>
                        </div>
                    )}

                    {/* Skills Block - Small/Medium */}
                    <div className="col-span-1 md:col-span-8 bg-bg-card border border-glass-border rounded-3xl p-8 relative overflow-hidden transition-all duration-300 flex flex-col justify-between hover:border-glass-highlight hover:-translate-y-1 hover:shadow-2xl">
                        <h3 className="font-heading font-bold text-2xl mb-6">Tech Stack</h3>
                        <div className="flex flex-wrap">
                            {data.skills.map((skill, index) => (
                                <div key={index} className="inline-block px-4 py-2 bg-white/5 border border-glass-border rounded-lg font-heading text-sm mr-2 mb-2 transition-colors duration-200 hover:bg-white/10 hover:border-primary-accent hover:text-primary-accent">
                                    <i className={skill.icon} style={{ marginRight: '8px' }}></i>
                                    {skill.name}
                                </div>
                            ))}
                            <div className="inline-block px-4 py-2 bg-white/5 border border-glass-border rounded-lg font-heading text-sm mr-2 mb-2 transition-colors duration-200 hover:bg-white/10 hover:border-primary-accent hover:text-primary-accent">React</div>
                            <div className="inline-block px-4 py-2 bg-white/5 border border-glass-border rounded-lg font-heading text-sm mr-2 mb-2 transition-colors duration-200 hover:bg-white/10 hover:border-primary-accent hover:text-primary-accent">Next.js</div>
                            <div className="inline-block px-4 py-2 bg-white/5 border border-glass-border rounded-lg font-heading text-sm mr-2 mb-2 transition-colors duration-200 hover:bg-white/10 hover:border-primary-accent hover:text-primary-accent">Tailwind</div>
                            <div className="inline-block px-4 py-2 bg-white/5 border border-glass-border rounded-lg font-heading text-sm mr-2 mb-2 transition-colors duration-200 hover:bg-white/10 hover:border-primary-accent hover:text-primary-accent">Node.js</div>
                        </div>
                    </div>

                    {/* Contact Callout - Small */}
                    <div className="col-span-1 md:col-span-4 bg-primary-accent border border-glass-border rounded-3xl p-8 relative overflow-hidden transition-all duration-300 flex flex-col justify-center items-center text-center hover:-translate-y-1 hover:shadow-2xl">
                        <div>
                            <h3 className="font-heading font-bold text-2xl text-black mb-2">Have an idea?</h3>
                            <a href="#contact" className="inline-flex items-center justify-center px-6 py-2 rounded-full font-semibold text-sm transition-all duration-200 cursor-pointer font-heading bg-black text-white mt-4 hover:bg-white/10 hover:text-black hover:border hover:border-black">Get in touch</a>
                        </div>
                    </div>

                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-32 max-w-[1400px] mx-auto px-8">
                <h2 className="font-heading font-bold text-[2.5rem] mb-8 text-center">Start a Project</h2>
                <div className="bg-bg-card border border-glass-border rounded-[2rem] p-12 max-w-[600px] mx-auto">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="mb-6">
                            <input type="text" placeholder="What's your name?" className="w-full bg-black/30 border border-glass-border rounded-xl p-4 font-body text-text-primary text-base transition-colors duration-200 focus:outline-none focus:border-primary-accent focus:bg-black/50" />
                        </div>
                        <div className="mb-6">
                            <input type="email" placeholder="Your email address" className="w-full bg-black/30 border border-glass-border rounded-xl p-4 font-body text-text-primary text-base transition-colors duration-200 focus:outline-none focus:border-primary-accent focus:bg-black/50" />
                        </div>
                        <div className="mb-6">
                            <textarea placeholder="Tell me about your project..." rows="5" className="w-full bg-black/30 border border-glass-border rounded-xl p-4 font-body text-text-primary text-base transition-colors duration-200 focus:outline-none focus:border-primary-accent focus:bg-black/50"></textarea>
                        </div>
                        <button type="submit" className="w-full inline-flex items-center justify-center px-10 py-4 rounded-full font-semibold text-base transition-all duration-200 cursor-pointer font-heading bg-text-primary text-bg-dark hover:bg-primary-accent hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(185,255,0,0.2)]">Send Message</button>
                    </form>
                </div>
            </section>

            <footer className="py-16 text-center text-text-secondary text-sm border-t border-glass-border mt-16">
                <p>&copy; 2024 Saad. Designed & Built with ❤️</p>
            </footer>
        </>
    );
};

export default Home;
