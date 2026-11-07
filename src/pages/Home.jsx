import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import myPic from '../assets/my_pic.png';
import TitleWheel from '../components/TitleWheel';
import { scrollToSection } from '../utils/scrollTo';
import { getCookie } from '../utils/csrf';
import WorkShowcase from '../components/WorkShowcase';
import TiltBox from '../components/TiltBox';
import Pop from '../components/Pop';
import { journey, roles, process, education, groupSkills, roleFilters, matchesRole } from '../data/profile';

const values = [
    { icon: 'fa-solid fa-bolt', title: 'Efficiency', text: 'Optimizing every line of code for maximum performance.' },
    { icon: 'fa-solid fa-gem', title: 'Quality', text: 'Building durable systems with attention to every detail.' },
    { icon: 'fa-solid fa-users', title: 'Collaboration', text: 'Working closely with partners to turn vision into reality.' },
    { icon: 'fa-solid fa-brain', title: 'Innovation', text: 'Leveraging cutting-edge AI technologies to build forward-thinking solutions.' },
];

const Arrow = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
);

const Home = ({ data }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [formData, setFormData] = useState({ email: '', purpose: '', message: '' });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [copied, setCopied] = useState(false);
    const [role, setRole] = useState('all');
    const [apiProjects, setApiProjects] = useState(null);

    useEffect(() => {
        fetch('/api/projects/')
            .then((r) => r.json())
            .then((list) => Array.isArray(list) && setApiProjects(list))
            .catch(() => {});
    }, []);

    // Arriving from another page (or the old /projects and /about links) with a #section.
    useEffect(() => {
        if (!location.hash) return;
        const t = setTimeout(() => {
            const el = document.getElementById(location.hash.slice(1));
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 120);
        return () => clearTimeout(t);
    }, [location.hash]);

    if (!data) return null;

    const handleNavClick = (id) => {
        scrollToSection(id, navigate, location.pathname);
    };

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(data.contact.email);
        } catch (err) {
            const ta = document.createElement('textarea');
            ta.value = data.contact.email;
            document.body.appendChild(ta);
            ta.select();
            try { document.execCommand('copy'); } catch (e) { /* ignore */ }
            document.body.removeChild(ta);
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.purpose || !formData.message) {
            setStatus({ type: 'error', message: 'Please fill all the fields' });
            return;
        }

        setIsSubmitting(true);
        setStatus({ type: '', message: '' });

        const controller = new AbortController();

        try {
            const systemDate = new Date().toLocaleString();
            const response = await fetch(`/api/contact/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken'),
                },
                signal: controller.signal,
                body: JSON.stringify({
                    date: systemDate,
                    email: formData.email,
                    purpose: formData.purpose,
                    message: formData.message,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Submission failed');
            }

            setStatus({ type: 'success', message: result.message || 'Message sent successfully!' });
            setFormData({ email: '', purpose: '', message: '' });
        } catch (error) {
            if (error.name === 'AbortError') return;
            console.error('Submission error:', error);
            setStatus({
                type: 'error',
                message: error.message || 'Something went wrong! Please try again later.',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const allProjects = [...(data.featured_projects || []), ...(data.latest_projects || [])];
    const gridProjects = (apiProjects || allProjects).filter((p) => matchesRole(p, role));
    const pickRole = (id) => {
        setRole(id);
        handleNavClick('#projects');
    };
    const firstName = data.hero.name.split(' ')[0];
    const now = journey[journey.length - 1];
    const skillGroupsList = groupSkills(data.skills);
    const tel = (data.contact.phone || '').replace(/\s/g, '');

    const contactRows = [
        { label: 'Phone', value: data.contact.phone, href: tel ? `tel:${tel}` : null, icon: 'fa-solid fa-phone' },
        { label: 'Email', value: data.contact.email, href: `mailto:${data.contact.email}`, icon: 'fa-solid fa-envelope' },
        { label: 'Location', value: data.contact.location, href: null, icon: 'fa-solid fa-location-dot' },
    ].filter((r) => r.value);

    return (
        <main>
            {/* A. Hero */}
            <section id="home" className="bg-paper pt-14">
                <div className="wrap pb-16 md:pb-24">
                    {/* Meta row */}
                    <Pop className="grid grid-cols-2 md:grid-cols-12 gap-x-6 gap-y-2 py-4 border-b border-ink text-[12px] font-semibold uppercase tracking-[0.12em]">
                        <p className="md:col-span-3">Portfolio {new Date().getFullYear()}</p>
                        <p className="md:col-span-5 text-ink-soft">Software / Full-stack / Data / AI</p>
                        <p className="md:col-span-4 md:text-right text-ink-soft">Open to work{data.contact.location ? `, ${data.contact.location}` : ''}</p>
                    </Pop>

                    {/* Headline and index of roles */}
                    <div className="grid md:grid-cols-12 gap-x-6 gap-y-10 pt-12 md:pt-20">
                        <Pop className="md:col-span-9">
                            <h1 className="text-[44px] sm:text-7xl lg:text-[112px] tracking-[-0.055em]">
                                I build AI products and the software around them.
                            </h1>
                        </Pop>
                        <Pop delay={120} className="md:col-span-3 md:pt-3">
                            <p className="text-[12px] font-semibold uppercase tracking-[0.12em] pb-3 border-b border-ink">Index</p>
                            <ul>
                                {roles.map((r, i) => (
                                    <li key={r.id}>
                                        <button
                                            onClick={() => pickRole(r.id)}
                                            className="group w-full flex items-baseline gap-4 py-3 border-b border-line text-left text-lg font-semibold tracking-tight transition-colors hover:bg-ink hover:text-white hover:px-3"
                                        >
                                            <span className="text-[11px] text-ink-soft group-hover:text-white/70 w-5">{String(i + 1).padStart(2, '0')}</span>
                                            {r.title}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </Pop>
                    </div>

                    {/* Picture, statement, actions */}
                    <div className="grid md:grid-cols-12 gap-x-6 gap-y-10 mt-14 md:mt-24">
                        <Pop className="md:col-span-4">
                            <div className="aspect-[4/5] border border-ink overflow-hidden bg-cream">
                                <img
                                    src={data.hero.profile_pic || myPic}
                                    alt={data.hero.name}
                                    className="w-full h-full object-cover grayscale contrast-110"
                                />
                            </div>
                        </Pop>
                        <Pop delay={120} className="md:col-span-5 md:col-start-6 flex flex-col justify-between gap-10">
                            <p className="text-2xl md:text-3xl leading-[1.15] tracking-[-0.025em] font-medium">
                                {data.hero.name} is an {now.role.toLowerCase()} at {now.company}, with software, full-stack and data work behind every project.
                            </p>
                            <div>
                                <div className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-2 text-sm border-t border-ink pt-4 mb-8">
                                    <span className="font-semibold uppercase tracking-[0.1em] text-[12px]">Now</span>
                                    <span className="text-ink-soft">{now.role}, {now.company} ({now.period})</span>
                                    {data.skills.length > 0 && (
                                        <>
                                            <span className="font-semibold uppercase tracking-[0.1em] text-[12px]">Stack</span>
                                            <span className="text-ink-soft">{data.skills.slice(0, 6).map((s) => s.name.charAt(0) + s.name.slice(1).toLowerCase()).join(', ')}</span>
                                        </>
                                    )}
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    <button onClick={() => handleNavClick('#projects')} className="btn">{data.hero.cta_primary}</button>
                                    <button onClick={copyEmail} className="btn-ghost">
                                        <i className={copied ? 'fa-solid fa-check' : 'fa-regular fa-copy'}></i>
                                        {copied ? 'Email copied' : 'Copy email'}
                                    </button>
                                </div>
                            </div>
                        </Pop>
                    </div>
                </div>
            </section>

            {/* About */}
            <section id="about" className="wrap py-24 md:py-32">
                <div className="grid md:grid-cols-[0.6fr_1.4fr] gap-8 md:gap-16">
                    <Pop>
                        <p className="eyebrow mb-4 !text-left">01 / About</p>
                        <h2 className="text-4xl md:text-5xl font-semibold leading-tight">Hi, I am {firstName}.</h2>
                    </Pop>
                    <Pop delay={120} className="space-y-6 text-xl md:text-2xl text-ink-soft leading-relaxed !text-left">
                        <p className="whitespace-pre-wrap">{data.about.description}</p>
                        <p>
                            I am a Software Engineering graduate from NED University of Engineering and Technology, with hands-on experience in AI/ML, LLM-based applications and backend development. I have built RAG chatbots, machine learning pipelines and API-driven systems, with a focus on practical, production-ready solutions.
                        </p>
                        <p>
                            I am interested in Generative AI, intelligent automation, scalable SaaS products and solving real-world problems through data and systems design. I like clean architecture and growth-oriented teams with a strong engineering culture, and I dislike unnecessary complexity and poor code practices.
                        </p>
                    </Pop>
                </div>
                <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {values.map((v, i) => (
                        <Pop key={v.title} delay={i * 90} className="card p-7">
                            <div className="w-11 h-11 rounded-2xl bg-cream flex items-center justify-center text-accent-deep mb-5">
                                <i className={v.icon}></i>
                            </div>
                            <h3 className="font-semibold text-xl">{v.title}</h3>
                            <p className="text-ink-soft text-sm mt-2 leading-relaxed !text-left">{v.text}</p>
                        </Pop>
                    ))}
                </div>
            </section>

            {/* C. Pinned wheel of projects */}
            <TitleWheel projects={allProjects} />

            {/* D. Roles */}
            <section id="roles" className="wrap py-24 md:py-32">
                <Pop>
                    <p className="eyebrow mb-4 !text-left">02 / Disciplines</p>
                    <h2 className="text-4xl md:text-6xl font-semibold leading-tight max-w-3xl mb-12">Four disciplines, one engineer.</h2>
                </Pop>
                <TiltBox>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {roles.map((r, i) => (
                            <Pop
                                as="button"
                                key={r.id}
                                delay={i * 90}
                                onClick={() => pickRole(r.id)}
                                className="card card-link p-7 flex flex-col text-left"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-cream text-accent-deep flex items-center justify-center text-lg mb-6">
                                    <i className={r.icon}></i>
                                </div>
                                <h3 className="text-2xl font-semibold mb-3">{r.title}</h3>
                                <p className="text-ink-soft leading-relaxed flex-grow !text-left">{r.text}</p>
                                <div className="mt-6 flex flex-wrap gap-2">
                                    {r.tags.map((t) => (
                                        <span key={t} className="px-3 py-1 rounded-full border border-line text-[11px] font-semibold text-ink-soft">{t}</span>
                                    ))}
                                </div>
                                <span className="mt-6 text-sm font-semibold link-draw self-start">See {r.title.toLowerCase()} projects</span>
                            </Pop>
                        ))}
                    </div>
                </TiltBox>
            </section>

            {/* E. Work showcase: tabbed box */}
            <WorkShowcase projects={allProjects} />

            {/* All projects, filterable by role */}
            <section id="projects" className="wrap pb-24 md:pb-32">
                <Pop>
                    <p className="eyebrow mb-4 !text-left">04 / Projects</p>
                    <h2 className="text-4xl md:text-6xl font-semibold leading-tight max-w-3xl mb-10">Things I have built.</h2>
                    <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter by role">
                        {roleFilters.map((r) => (
                            <button
                                key={r.id}
                                onClick={() => setRole(r.id)}
                                aria-pressed={role === r.id}
                                className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97] ${role === r.id ? 'bg-ink text-white border-ink' : 'border-line text-ink-soft hover:border-ink/40'}`}
                            >
                                {r.label}
                            </button>
                        ))}
                    </div>
                </Pop>

                {gridProjects.length === 0 && (
                    <p className="text-ink-soft text-lg !text-left">No projects in this category yet. More are on the way.</p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {gridProjects.map((project, i) => (
                        <Pop
                            as="a"
                            key={project.id}
                            delay={(i % 2) * 110}
                            href={project.live_link || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="card card-link group flex flex-col overflow-hidden"
                        >
                            <div className="w-full aspect-video overflow-hidden bg-ink/5">
                                {project.video ? (
                                    <video
                                        src={project.video}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                        muted loop playsInline preload="none"
                                        onMouseOver={(e) => e.target.play()} onMouseOut={(e) => e.target.pause()}
                                    />
                                ) : (
                                    <img src={project.image} alt={project.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                                )}
                            </div>
                            <div className="p-7 md:p-9 flex-grow flex flex-col">
                                <p className="eyebrow mb-3 !text-left">{project.category}</p>
                                <div className="flex items-start justify-between gap-4">
                                    <h3 className="text-2xl md:text-3xl font-semibold leading-tight !text-left">{project.title}</h3>
                                    <span className="w-10 h-10 rounded-full border border-line flex items-center justify-center shrink-0 transition-colors group-hover:bg-ink group-hover:text-white group-hover:border-ink">
                                        <Arrow />
                                    </span>
                                </div>
                                <p className="mt-3 text-ink-soft leading-relaxed line-clamp-3 !text-left">{project.description}</p>
                                <div className="flex flex-wrap gap-2 mt-auto pt-6">
                                    {(project.tech_stack || '').split(',').filter(Boolean).slice(0, 5).map((tech, k) => (
                                        <span key={k} className="px-3 py-1 rounded-full border border-line text-[11px] font-semibold text-ink-soft">{tech.trim()}</span>
                                    ))}
                                </div>
                            </div>
                        </Pop>
                    ))}
                </div>
            </section>

            {/* F. Experience, education and process */}
            <section id="experience" className="bg-ink text-white py-24 md:py-32">
                <div className="wrap">
                    <Pop>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-accent mb-4 !text-left">05 / Experience</p>
                        <h2 className="text-4xl md:text-6xl font-semibold mb-12 !text-left">Where I have worked.</h2>
                    </Pop>
                    <ol className="border-t border-white/15">
                        {[...journey].reverse().map((j) => (
                            <Pop as="li" key={j.company} className="grid md:grid-cols-[1.2fr_1fr_0.8fr] gap-2 md:gap-8 py-6 border-b border-white/15 transition-colors hover:bg-white/[0.03]">
                                <h3 className="text-2xl md:text-3xl font-semibold">{j.company}</h3>
                                <p className="text-white/70 md:pt-1.5 !text-left">{j.role}</p>
                                <p className="text-white/45 text-sm md:pt-2 md:text-right">{j.period}</p>
                            </Pop>
                        ))}
                        <Pop as="li" className="grid md:grid-cols-[1.2fr_1fr_0.8fr] gap-2 md:gap-8 py-6 border-b border-white/15 transition-colors hover:bg-white/[0.03]">
                            <h3 className="text-2xl md:text-3xl font-semibold">{education.school}</h3>
                            <p className="text-white/70 md:pt-1.5 !text-left">{education.degree}</p>
                            <p className="text-white/45 text-sm md:pt-2 md:text-right">Education</p>
                        </Pop>
                    </ol>

                    <Pop as="h2" className="text-3xl md:text-5xl font-semibold mt-24 mb-10 !text-left">How a project runs.</Pop>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {process.map((st, i) => (
                            <Pop key={st.n} delay={i * 90} className="rounded-3xl border border-white/15 p-7">
                                <p className="text-primary-accent font-heading text-3xl font-semibold mb-5 !text-left">{st.n}</p>
                                <h3 className="text-xl font-semibold mb-2">{st.title}</h3>
                                <p className="text-white/60 leading-relaxed !text-left">{st.text}</p>
                            </Pop>
                        ))}
                    </div>
                </div>
            </section>

            {/* G. Skills, grouped */}
            <section id="skills" className="wrap py-24 md:py-32">
                <div className="grid lg:grid-cols-[1.6fr_1fr] gap-6">
                    <Pop className="card p-8 md:p-12">
                        <p className="eyebrow mb-3 !text-left">06 / Skills</p>
                        <h2 className="text-3xl md:text-5xl font-semibold mb-10">What I work with</h2>
                        <div className="space-y-8">
                            {skillGroupsList.map((g) => (
                                <div key={g.label}>
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-soft mb-3 !text-left">{g.label}</p>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {g.skills.map((skill) => (
                                            <div key={skill.id || skill.name} className="flex items-center gap-3 rounded-2xl border border-line px-4 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/30">
                                                <div className="w-9 h-9 rounded-xl bg-cream flex items-center justify-center shrink-0">
                                                    {skill.icon && (skill.icon.startsWith('http') || skill.icon.startsWith('/media/')) ? (
                                                        <img src={skill.icon} alt="" className="w-5 h-5 object-contain" />
                                                    ) : (
                                                        <i className={`${skill.icon} text-sm`}></i>
                                                    )}
                                                </div>
                                                <span className="text-sm font-semibold">{skill.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Pop>
                    <Pop delay={140} className="rounded-3xl p-8 md:p-12 bg-ink text-white flex flex-col justify-between gap-10">
                        <div>
                            <h3 className="text-3xl md:text-4xl font-semibold leading-tight !text-left">Looking for an AI engineer?</h3>
                            <p className="mt-4 text-white/65 !text-left">Send a message and we can scope it together.</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <button onClick={() => handleNavClick('#contact-form')} className="btn-light w-full">Send a message</button>
                            {data.hero.resume_url && (
                                <a
                                    href={data.hero.resume_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 w-full px-7 py-3 rounded-full font-semibold text-[15px] text-white border border-white/30 transition-all duration-200 hover:border-white hover:-translate-y-0.5 active:scale-[0.97]"
                                >
                                    <i className="fa-solid fa-file-pdf"></i> Download resume
                                </a>
                            )}
                        </div>
                    </Pop>
                </div>
            </section>

            {/* J. Contact */}
            <section id="contact-form" className="bg-ink text-white py-24 md:py-32">
                <div className="wrap grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
                    <Pop>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-accent mb-4 !text-left">07 / Contact</p>
                        <h2 className="text-5xl md:text-7xl font-semibold leading-[1.02] !text-left">Let's talk.</h2>
                        <p className="mt-6 text-lg text-white/65 max-w-md leading-relaxed !text-left">
                            New projects, collaborations, or a chat about AI and software. I reply as soon as I can.
                        </p>
                        <div className="mt-10 space-y-6">
                            {contactRows.map((r) => (
                                <div key={r.label} className="flex items-center gap-4">
                                    <div className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-primary-accent shrink-0">
                                        <i className={`${r.icon} text-sm`}></i>
                                    </div>
                                    <div>
                                        <p className="text-[11px] uppercase tracking-[0.2em] text-white/45 !text-left">{r.label}</p>
                                        {r.href ? (
                                            <a href={r.href} className="text-lg font-semibold hover:text-primary-accent transition-colors break-all">{r.value}</a>
                                        ) : (
                                            <p className="text-lg font-semibold !text-left">{r.value}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={copyEmail}
                            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white link-draw"
                        >
                            <i className={copied ? 'fa-solid fa-check' : 'fa-regular fa-copy'}></i>
                            {copied ? 'Email copied' : 'Copy email address'}
                        </button>
                    </Pop>

                    <Pop delay={140}>
                    <TiltBox>
                        <form className="space-y-5 rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8" onSubmit={handleSubmit}>
                            <div className="grid md:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="you@email.com"
                                        className="w-full bg-white/5 border border-white/15 rounded-2xl px-5 py-4 text-white placeholder:text-white/35 focus:outline-none focus:border-white/60 transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="purpose" className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">Purpose</label>
                                    <select
                                        id="purpose"
                                        value={formData.purpose}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/15 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-white/60 transition-colors appearance-none"
                                    >
                                        <option value="" className="bg-ink">Select a purpose</option>
                                        <option value="project" className="bg-ink">New project</option>
                                        <option value="collaboration" className="bg-ink">Collaboration</option>
                                        <option value="inquiry" className="bg-ink">General inquiry</option>
                                        <option value="other" className="bg-ink">Something else</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">Message</label>
                                <textarea
                                    id="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Tell me about your project"
                                    rows="5"
                                    className="w-full bg-white/5 border border-white/15 rounded-2xl px-5 py-4 text-white placeholder:text-white/35 focus:outline-none focus:border-white/60 transition-colors"
                                ></textarea>
                            </div>

                            {status.message && (
                                <div className={`p-4 rounded-2xl text-sm font-semibold ${status.type === 'success' ? 'bg-green-500/15 text-green-300' : 'bg-red-500/15 text-red-300'}`}>
                                    {status.message}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`btn-light w-full ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {isSubmitting ? 'Sending...' : 'Send message'}
                            </button>
                        </form>
                    </TiltBox>
                    </Pop>
                </div>
            </section>

            {/* Social */}
            {data.social_links && data.social_links.length > 0 && (
                <Pop as="section" className="wrap py-20 md:py-24">
                    <p className="eyebrow mb-6 !text-left">Find me online</p>
                    <div className="flex flex-wrap gap-3">
                        {data.social_links.map((link, index) => (
                            <a
                                key={index}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="card card-link inline-flex items-center gap-3 !rounded-full pl-3 pr-6 py-2.5"
                            >
                                <span className="w-9 h-9 rounded-full bg-cream flex items-center justify-center overflow-hidden">
                                    {link.icon_image ? (
                                        <img src={link.icon_image} alt="" className="w-5 h-5 object-contain" />
                                    ) : (
                                        <i className={`${link.icon_class || 'fa-solid fa-link'} text-sm`}></i>
                                    )}
                                </span>
                                <span className="text-sm font-semibold">{link.name}</span>
                            </a>
                        ))}
                    </div>
                </Pop>
            )}
        </main>
    );
};

export default Home;
