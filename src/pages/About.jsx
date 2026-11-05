import React from 'react';
import { Link } from 'react-router-dom';

const journey = [
    { company: 'MERL Lab', role: 'RISC-V & AI Research Intern', period: 'Sep 2022 to Dec 2023' },
    { company: '360 Xpert Solutions', role: 'AI Engineer Intern', period: 'Jul 2024 to Aug 2025' },
    { company: 'Avennex Solutions', role: 'AI Engineer', period: 'Sep 2025' },
    { company: 'Convex Consulting', role: 'AI Engineer', period: 'Oct 2025 to present' },
];

const values = [
    { icon: 'fa-solid fa-bolt', title: 'Efficiency', text: 'Optimizing every line of code for maximum performance.' },
    { icon: 'fa-solid fa-gem', title: 'Quality', text: 'Building durable systems with attention to every detail.' },
    { icon: 'fa-solid fa-users', title: 'Collaboration', text: 'Working closely with partners to turn vision into reality.' },
    { icon: 'fa-solid fa-brain', title: 'Innovation', text: 'Leveraging cutting-edge AI technologies to build forward-thinking solutions.' },
];

const About = ({ data }) => {
    if (!data) return null;

    return (
        <main>
            {/* Dark opening chapter */}
            <section className="sunrise pt-40 md:pt-52 pb-32 md:pb-44">
                <div className="wrap">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/60 mb-5">About</p>
                    <h1 className="text-5xl sm:text-6xl md:text-8xl font-semibold leading-[1] text-white max-w-4xl">
                        Software engineer, focused on AI.
                    </h1>
                </div>
            </section>

            <section className="wrap py-20 md:py-28 grid md:grid-cols-[0.6fr_1.4fr] gap-10 md:gap-16">
                <p className="eyebrow">The story</p>
                <div className="space-y-6 text-xl md:text-2xl text-ink-soft leading-relaxed">
                    <p>
                        I'm Saad Ali, a Software Engineering graduate from NED University of Engineering and Technology, with hands-on experience in AI/ML, LLM-based applications, and backend development. I've worked on building RAG chatbots, machine learning pipelines, and API-driven systems with a strong focus on practical, production-ready solutions.
                    </p>
                    <p>
                        I'm deeply interested in Generative AI, intelligent automation, scalable SaaS products, and solving real-world problems through data and systems design. I enjoy clean architecture, continuous learning, and experimenting with new AI frameworks.
                    </p>
                    <p>
                        I like working in growth-oriented environments with strong engineering culture and clear impact. I dislike unnecessary complexity, poor code practices, and stagnation. I prefer building things that are efficient, meaningful, and built to last.
                    </p>
                </div>
            </section>

            <section className="wrap pb-20 md:pb-28">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="card p-8 md:p-12">
                        <h2 className="text-3xl md:text-4xl font-semibold mb-6">My goal</h2>
                        <p className="text-ink-soft leading-relaxed text-lg mb-5">{data.about.description}</p>
                        <p className="text-ink-soft leading-relaxed text-lg">
                            Over the years, I've honed my skills in the Python ecosystem and modern frontend frameworks. My approach is rooted in clean code, scalability, and a relentless focus on performance.
                        </p>
                    </div>
                    <div className="card p-8 md:p-12">
                        <h2 className="text-3xl md:text-4xl font-semibold mb-8">What I value</h2>
                        <div className="space-y-6">
                            {values.map((v) => (
                                <div key={v.title} className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-cream flex items-center justify-center text-accent-deep shrink-0">
                                        <i className={v.icon}></i>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">{v.title}</h3>
                                        <p className="text-ink-soft text-sm mt-0.5">{v.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Journey: dark chapter */}
            <section className="bg-ink text-white py-24 md:py-32">
                <div className="wrap">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-accent mb-4">Journey</p>
                    <h2 className="text-4xl md:text-6xl font-semibold mb-14">Where I have worked.</h2>
                    <ol className="border-t border-white/15">
                        {journey.map((j) => (
                            <li key={j.company} className="grid md:grid-cols-[1.2fr_1fr_0.8fr] gap-2 md:gap-8 py-7 border-b border-white/15 transition-colors hover:bg-white/[0.03]">
                                <h3 className="text-2xl md:text-3xl font-semibold">{j.company}</h3>
                                <p className="text-white/70 md:pt-1.5">{j.role}</p>
                                <p className="text-white/45 text-sm md:pt-2 md:text-right">{j.period}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            <section className="wrap py-24 md:py-32">
                <p className="eyebrow mb-4">Toolkit</p>
                <h2 className="text-4xl md:text-6xl font-semibold mb-12">Technologies I use.</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {data.skills.map((skill, index) => (
                        <div key={index} className="card p-6 flex flex-col items-center gap-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/30">
                            <div className="w-12 h-12 rounded-2xl bg-cream flex items-center justify-center text-2xl">
                                {skill.icon && (skill.icon.startsWith('http') || skill.icon.startsWith('/media/')) ? (
                                    <img src={skill.icon} alt="" className="w-7 h-7 object-contain" />
                                ) : (
                                    <i className={skill.icon}></i>
                                )}
                            </div>
                            <span className="text-sm font-semibold text-center">{skill.name}</span>
                        </div>
                    ))}
                </div>
                <div className="mt-14 flex flex-wrap gap-3">
                    <Link to="/projects" className="btn">See my projects</Link>
                    <Link to="/resume" className="btn-ghost">View resume</Link>
                </div>
            </section>
        </main>
    );
};

export default About;
