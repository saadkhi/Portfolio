import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import myPic from '../assets/my_pic.png';
import TitleWheel from '../components/TitleWheel';
import { scrollToSection } from '../utils/scrollTo';
import { getCookie } from '../utils/csrf';

const Home = ({ data }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [formData, setFormData] = useState({ email: '', purpose: '', message: '' });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!data) return null;

    const handleNavClick = (id) => {
        scrollToSection(id, navigate, location.pathname);
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
    const firstName = data.hero.name.split(' ')[0];
    const tel = (data.contact.phone || '').replace(/\s/g, '');

    const contactRows = [
        { label: 'Phone', value: data.contact.phone, href: tel ? `tel:${tel}` : null, icon: 'fa-solid fa-phone' },
        { label: 'Email', value: data.contact.email, href: `mailto:${data.contact.email}`, icon: 'fa-solid fa-envelope' },
        { label: 'Location', value: data.contact.location, href: null, icon: 'fa-solid fa-location-dot' },
    ].filter((r) => r.value);

    return (
        <main>
            {/* Hero: dark to orange to cream */}
            <section id="home" className="sunrise relative min-h-screen flex items-center overflow-hidden">
                <div className="wrap grid md:grid-cols-[1.15fr_0.85fr] items-center gap-10 pt-32 pb-28">
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/60 mb-6 !text-left">
                            {data.hero.subtitle}
                        </p>
                        <h1 className="text-[44px] sm:text-6xl lg:text-7xl xl:text-[84px] font-semibold leading-[1.02] text-white">
                            {data.hero.name} builds AI products that work.
                        </h1>
                        <p className="mt-7 text-lg md:text-xl text-white/75 max-w-xl leading-relaxed !text-left">
                            {data.hero.title}. Open to new roles and freelance projects, from RAG chatbots to full backends.
                        </p>
                        <div className="mt-10 flex flex-wrap gap-3">
                            <Link to="/projects" className="btn-light w-full sm:w-auto">{data.hero.cta_primary}</Link>
                            <button
                                onClick={() => handleNavClick('#contact')}
                                className="inline-flex items-center justify-center px-7 py-3 rounded-full font-semibold text-[15px] text-white border border-white/35 transition-all duration-200 hover:bg-white/10 hover:border-white hover:-translate-y-0.5 active:scale-[0.97] w-full sm:w-auto"
                            >
                                Book a session
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-center md:justify-end">
                        <div className="relative w-[240px] sm:w-[300px] md:w-[360px] aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/20 shadow-[0_30px_80px_rgba(0,0,0,0.45)] group">
                            <img
                                src={data.hero.profile_pic || myPic}
                                alt={data.hero.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Intro */}
            <section id="intro" className="wrap py-24 md:py-32 grid md:grid-cols-[0.6fr_1.4fr] gap-8 md:gap-16">
                <div>
                    <p className="eyebrow mb-4 !text-left">Hello</p>
                    <h2 className="text-4xl md:text-5xl font-semibold leading-tight">Hi, I'm {firstName}.</h2>
                </div>
                <p className="text-xl md:text-2xl text-ink-soft leading-relaxed whitespace-pre-wrap !text-left">
                    {data.about.description}
                </p>
            </section>

            {/* Pinned wheel of projects */}
            <TitleWheel projects={allProjects} />

            {/* Expertise */}
            <section className="wrap py-24 md:py-32">
                <div className="grid lg:grid-cols-[1.6fr_1fr] gap-6">
                    <div className="card p-8 md:p-12">
                        <p className="eyebrow mb-3 !text-left">Toolkit</p>
                        <h2 className="text-3xl md:text-5xl font-semibold mb-10">What I work with</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {data.skills.map((skill, index) => (
                                <div key={index} className="flex items-center gap-3 rounded-2xl border border-line px-4 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/30">
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
                    <div className="rounded-3xl p-8 md:p-12 bg-ink text-white flex flex-col justify-between gap-10">
                        <div>
                            <h3 className="text-3xl md:text-4xl font-semibold leading-tight !text-left">Looking for an AI engineer?</h3>
                            <p className="mt-4 text-white/65 !text-left">Send a message or book a call and we can scope it together.</p>
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
                    </div>
                </div>
            </section>

            {/* Booking */}
            <section id="contact" className="wrap pb-24 md:pb-32">
                <div className="card overflow-hidden">
                    <div className="grid md:grid-cols-2">
                        <div className="p-8 md:p-14 flex flex-col justify-center border-b md:border-b-0 md:border-r border-line">
                            <p className="eyebrow mb-4 !text-left">60 minute session</p>
                            <h2 className="text-4xl md:text-5xl font-semibold leading-tight !text-left">Book a call about your idea.</h2>
                            <p className="mt-6 text-ink-soft text-lg leading-relaxed !text-left">
                                Bring a full design or a rough idea. We will go through your goals and tech stack, and what it takes to build it.
                            </p>
                            <p className="mt-8 text-sm text-ink-soft border-l-2 border-primary-accent pl-4 !text-left">
                                Sessions are for serious business inquiries. Incomplete or vague bookings are cancelled.
                            </p>
                        </div>
                        <div className="bg-cream min-h-[600px] md:min-h-[900px] relative">
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

            {/* Contact form: a dark chapter */}
            <section id="contact-form" className="bg-ink text-white py-24 md:py-32">
                <div className="wrap grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-accent mb-4 !text-left">Contact</p>
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
                    </div>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="grid md:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@email.com"
                                    className="w-full bg-white/5 border border-white/15 rounded-2xl px-5 py-4 text-white placeholder:text-white/35 focus:outline-none focus:border-primary-accent transition-colors"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="purpose" className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">Purpose</label>
                                <select
                                    id="purpose"
                                    value={formData.purpose}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/15 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary-accent transition-colors appearance-none"
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
                                className="w-full bg-white/5 border border-white/15 rounded-2xl px-5 py-4 text-white placeholder:text-white/35 focus:outline-none focus:border-primary-accent transition-colors"
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
                </div>
            </section>

            {/* Social */}
            {data.social_links && data.social_links.length > 0 && (
                <section className="wrap py-20 md:py-24">
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
                </section>
            )}
        </main>
    );
};

export default Home;
