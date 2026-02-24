import React from 'react';
import myPic from '../assets/my_pic.png';

const Home = ({ data }) => {
    if (!data) return null;

    return (
        <main className="pt-20">
            {/* Hero Section */}
            <section
                id="home"
                className="min-h-[90vh] flex items-center relative px-8 overflow-hidden"
            >
                {/* Background Glow Name */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 select-none opacity-[0.03]">
                    <h1 className="text-[20vw] font-bold leading-none uppercase tracking-tighter">
                        {data.hero.name}
                    </h1>
                </div>

                <div className="max-w-[1200px] mx-auto w-full grid md:grid-cols-2 items-center">

                    {/* LEFT SIDE — TEXT */}
                    <div className="animate-fade-in text-center md:text-left">
                        <h2 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-8 tracking-tighter">
                            Saad Ather Ali
                        </h2>

                        <p className="text-lg md:text-xl text-text-secondary font-medium mb-12 max-w-[1000px]">
                            Making AI products to make life easier since 2024. <br></br>
                            {/* AI Engineer @ Convex Consulting LLC. <br></br> */}
                            Open to new opportunities and freelance projects, <br></br>
                            <a href="#contact" className="text-primary-accent hover:underline">let's connect!</a>
                        </p>

                        <div className="flex flex-wrap justify-center md:justify-start gap-6">
                            <a href="#work" className="btn-primary">
                                {data.hero.cta_primary}
                            </a>
                            <a href="#contact" className="btn-secondary">
                                Book a Session
                            </a>
                            <a href="#contact-form" className="btn-secondary">
                                {data.hero.cta_secondary}
                            </a>
                        </div>
                    </div>

                    {/* RIGHT SIDE — IMAGE */}
                    <div className="flex justify-center md:justify-end">
                        <div className="relative w-[280px] md:w-[400px] aspect-square rounded-2xl overflow-hidden">
                            <img
                                src={myPic}
                                alt="Saad Ather Ali"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                </div>
            </section>

            {/* Featured Projects Section */}
            <section id="work" className=" px-8 max-w-[1400px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div className="max-w-[1800px]">
                        {/* <span className="text-primary-accent uppercase tracking-widest text-xs font-bold mb-4 block">Selected Projects</span> */}
                        <h2 className="text-4xl md:text-6xl font-bold py-6">Hi, I'm Saad</h2>
                        <p className="text-lg md:text-xl text-text-secondary font-medium">
                            I am technologist who is passionate about building AI products. I transform raw data into intelligent models and bridge the gap between AI and real-world problems by creating seamless and efficient software.
                            <h3 className='text-2xl md:text-4xl font-semibold py-4 mt-6'> What I bring to the company</h3>
                            <p className='text-lg md:text-xl text-text-secondary font-medium mb-6'>If you hire me, I bring a strong problem-solving mindset, hands-on experience with AI/ML and backend systems, and the ability to turn an idea into working, production-ready solutions. Beyond technical skills, I bring ownership, continuous learning, and a focus on building scalable, reliable systems that create real business impact.</p>
                            <h3 className='text-2xl md:text-4xl font-semibold py-4'> Why I am a good fit for this role</h3>
                            <p className='text-lg md:text-xl text-text-secondary font-medium mb-6'>I am a quick learner, adaptable, and passionate about AI. I am confident that I can quickly get up to speed with your team and contribute meaningfully to your projects.</p>
                        </p>
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
            <section className=" px-8 max-w-[1400px] mx-auto">
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

            {/* Contact / Booking Section */}
            <section id="contact" className="py-32 px-8">
                <div className="max-w-[1400px] mx-auto glass-card overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {/* Left Side: Info */}
                        <div className="p-8 md:p-16 md:py-24 border-b md:border-b-0 md:border-r border-glass-border flex flex-col justify-center">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary-accent shadow-[0_0_15px_rgba(255,138,0,0.3)] bg-gray-800">
                                    <img src={`https://ui-avatars.com/api/?name=${data.hero.name}&background=111&color=fff`} alt="Saad" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg leading-tight">{data.hero.name}</h4>
                                    <span className="text-text-secondary text-xs uppercase tracking-widest font-bold">Available for Projects</span>
                                </div>
                            </div>

                            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter leading-tight">
                                Let's Chat About <br /> Your Next Big Idea.
                            </h2>

                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8 w-fit">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-accent"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                <span className="text-xs font-bold uppercase tracking-widest">60 Minute Session</span>
                            </div>

                            <p className="text-text-secondary text-lg mb-12 leading-relaxed">
                                Whether you have a fully-fledged design or just a rough idea, I'm here to help you bring it to life. Let's discuss your business goals, tech stack, and how we can build something exceptional.
                            </p>

                            <div className="p-6 bg-red-500/5 border border-red-500/10 rounded-2xl mt-auto">
                                <p className="text-sm text-red-200/60 leading-relaxed italic">
                                    ⚠️ Please note: These sessions are for serious business inquiries only. Incomplete or vague bookings will be automatically canceled.
                                </p>
                            </div>
                        </div>

                        {/* Right Side: TidyCal Embed */}
                        <div className="bg-white/5 min-h-[950px] relative">
                            {/* We use an iframe for TidyCal to ensure it loads correctly in React */}
                            <iframe
                                src="https://tidycal.com/saadalioffic/initial-discovery-session?embed=1"
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                title="Schedule a meeting"
                                className="absolute inset-0"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section id="contact-form" className="py-24 px-8 max-w-[800px] mx-auto">
                <div className="glass-card p-8 md:p-12">
                    <div className="text-center mb-12">
                        <span className="text-primary-accent uppercase tracking-widest text-xs font-bold mb-4 block">Quick Connect</span>
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Let's stay in touch.</h2>
                        <p className="text-text-secondary">Drop your details below and I'll get back to you as soon as possible.</p>
                    </div>

                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-text-secondary ml-1">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="your@email.com"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary-accent transition-colors"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="purpose" className="text-xs font-bold uppercase tracking-widest text-text-secondary ml-1">Purpose</label>
                                <select
                                    id="purpose"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary-accent transition-colors appearance-none"
                                >
                                    <option value="" className="bg-bg-dark">Select a purpose</option>
                                    <option value="project" className="bg-bg-dark">New Project</option>
                                    <option value="collaboration" className="bg-bg-dark">Collaboration</option>
                                    <option value="inquiry" className="bg-bg-dark">General Inquiry</option>
                                    <option value="other" className="bg-bg-dark">Something Else</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit" className="btn-primary w-full shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                            Connect Now
                        </button>
                    </form>
                </div>
            </section>

            {/* Social Media Section */}
            <section className=" px-8 mb-20">
                <h1 className="py-10 text-3xl md:text-5xl font-bold mb-4 text-center">Let's Connect.</h1>
                <div className="max-w-[1400px] mx-auto">
                    <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                        <a href="https://github.com/saadkhi" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-3">
                            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl group-hover:bg-primary-accent group-hover:text-black group-hover:scale-110 transition-all duration-300">
                                <i className="fa-brands fa-github"></i>
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary group-hover:text-primary-accent transition-colors">GitHub</span>
                        </a>
                        <a href="https://www.linkedin.com/in/saadkhi/" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-3">
                            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl group-hover:bg-[#0077b5] group-hover:text-white group-hover:scale-110 transition-all duration-300">
                                <i className="fa-brands fa-linkedin-in"></i>
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary group-hover:text-white transition-colors">LinkedIn</span>
                        </a>
                        <a href={`mailto:saadalioffic@gmail.com`} className="group flex flex-col items-center gap-3">
                            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl group-hover:bg-primary-accent group-hover:text-black group-hover:scale-110 transition-all duration-300">
                                <i className="fa-solid fa-envelope"></i>
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary group-hover:text-primary-accent transition-colors">Email</span>
                        </a>
                        <a href="https://x.com/saadkhi_?s=21" className="group flex flex-col items-center gap-3">
                            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl group-hover:bg-[#1DA1F2] group-hover:text-white group-hover:scale-110 transition-all duration-300">
                                <i className="fa-brands fa-x-twitter"></i>
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary group-hover:text-[#1DA1F2] transition-colors">Twitter</span>
                        </a>
                        <a href="#" className="group flex flex-col items-center gap-3">
                            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl group-hover:bg-[#E4405F] group-hover:text-white group-hover:scale-110 transition-all duration-300">
                                <i className="fa-brands fa-instagram"></i>
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary group-hover:text-[#E4405F] transition-colors">Instagram</span>
                        </a>
                    </div>
                </div>
            </section>

            <footer className="py-20 px-8 border-t border-glass-border">
                <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 items-center text-center md:text-left gap-10">

                    {/* Column 1 */}
                    <div className="flex justify-center md:justify-start">
                        <div className="text-2xl font-bold">
                            Saad.
                        </div>
                    </div>

                    {/* Column 2 */}
                    <div className="flex justify-center gap-8">
                        <a
                            href="https://github.com/saadkhi"
                            className="text-text-secondary hover:text-white transition-colors uppercase tracking-widest text-xs font-bold"
                        >
                            Github
                        </a>
                        <a
                            href="https://www.linkedin.com/in/saadkhi/"
                            className="text-text-secondary hover:text-white transition-colors uppercase tracking-widest text-xs font-bold"
                        >
                            LinkedIn
                        </a>
                        <a
                            href="mailto:saadalioffic@gmail.com"
                            className="text-text-secondary hover:text-white transition-colors uppercase tracking-widest text-xs font-bold"
                        >
                            Email
                        </a>
                    </div>

                    {/* Column 3 */}
                    <div className="flex justify-center md:justify-end">
                        <p className="text-text-secondary text-xs uppercase tracking-widest font-bold opacity-30">
                            © 2024 All Rights Reserved
                        </p>
                    </div>

                </div>
            </footer>
        </main>
    );
};

export default Home;
