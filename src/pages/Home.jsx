import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import myPic from '../assets/my_pic.png';
import { scrollToSection } from '../utils/scrollTo';
import { getCookie } from '../utils/csrf';
import WorkShowcase from '../components/WorkShowcase';
import TiltBox from '../components/TiltBox';
import Pop from '../components/Pop';
import SectionHead from '../components/SectionHead';
import { journey, roles, process, education, groupSkills, matchesRole, skillLabel, roleInSentence } from '../data/profile';

const values = [
    { icon: 'fa-solid fa-bolt', title: 'Efficiency', text: 'Optimizing every line of code for maximum performance.' },
    { icon: 'fa-solid fa-gem', title: 'Quality', text: 'Building durable systems with attention to every detail.' },
    { icon: 'fa-solid fa-users', title: 'Collaboration', text: 'Working closely with partners to turn vision into reality.' },
    { icon: 'fa-solid fa-brain', title: 'Innovation', text: 'Leveraging cutting-edge AI technologies to build forward-thinking solutions.' },
];

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

    const today = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    const stack = data.skills.slice(0, 6).map((sk) => skillLabel(sk.name)).join(', ');
    const intro = 'I am a Software Engineering graduate from NED University of Engineering and Technology, with hands-on experience in AI/ML, LLM-based applications and backend development. I have built RAG chatbots, machine learning pipelines and API-driven systems, with a focus on practical, production-ready solutions.';
    const inside = [
        ['01', 'Profile', '#about'],
        ['02', 'Disciplines', '#roles'],
        ['03', 'Work', '#projects'],
        ['04', 'Experience', '#experience'],
        ['05', 'Skills', '#skills'],
        ['06', 'Letters', '#contact-form'],
    ];

    return (
        <main>
            {/* Front page */}
            <section id="home" className="pt-12">
                <div className="wrap pb-16 md:pb-24">
                    {/* Masthead */}
                    <header className="pt-6 md:pt-10">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 pb-3">
                            <p className="label">{today}</p>
                            <p className="label opacity-60 hidden sm:block">Software / Full-stack / Data / AI</p>
                            <p className="label">{data.contact.location || 'Portfolio'}</p>
                        </div>
                        <div className="border-t border-ink"></div>
                        <p className="nameplate text-center text-[19vw] md:text-[150px] lg:text-[190px] py-3 md:py-5">{data.hero.name}</p>
                        <div className="sec-rule"></div>
                        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3 border-b border-ink">
                            <p className="label">Portfolio edition</p>
                            <p className="font-heading italic text-base hidden md:block">AI products, and the software around them</p>
                            <p className="label">Open to work</p>
                        </div>
                    </header>

                    <div className="grid lg:grid-cols-12 gap-x-10 gap-y-12 pt-10 md:pt-14">
                        {/* Lead story */}
                        <article className="lg:col-span-8">
                            <Pop>
                                <p className="label mb-5">Lead story</p>
                                <h1 className="text-[44px] sm:text-7xl lg:text-[92px]">
                                    I build AI products and the software around them.
                                </h1>
                                <p className="mt-6 font-heading italic text-2xl md:text-3xl leading-snug text-ink-soft max-w-3xl !font-bold">
                                    {data.hero.name} is an {roleInSentence(now.role)} at {now.company}, with software, full-stack and data work behind every project.
                                </p>
                                <p className="label mt-6 pt-4 border-t border-line">
                                    By {data.hero.name} <span className="opacity-50 mx-2">/</span> <span className="opacity-60">{now.role}, {now.company}</span>
                                </p>
                            </Pop>
                            <Pop delay={120} className="mt-8">
                                <div className="news-text cols-2 text-[19px] leading-[1.6]">
                                    {data.about.description ? (
                                        <>
                                            <p className="dropcap whitespace-pre-wrap">{data.about.description}</p>
                                            <p>{intro}</p>
                                        </>
                                    ) : (
                                        <p className="dropcap">{intro}</p>
                                    )}
                                </div>
                                <div className="mt-8 flex flex-wrap gap-3">
                                    <button onClick={() => handleNavClick('#projects')} className="btn">{data.hero.cta_primary}</button>
                                    <button onClick={copyEmail} className="btn-ghost">
                                        <i className={copied ? 'fa-solid fa-check' : 'fa-regular fa-copy'}></i>
                                        {copied ? 'Email copied' : 'Copy email'}
                                    </button>
                                </div>
                            </Pop>
                        </article>

                        {/* Side column */}
                        <aside className="lg:col-span-4 lg:border-l lg:border-line lg:pl-10">
                            <Pop delay={150}>
                                <figure>
                                    <div className="press-photo aspect-[4/5]">
                                        <img src={data.hero.profile_pic || myPic} alt={data.hero.name} className="w-full h-full object-cover" />
                                    </div>
                                    <figcaption className="mt-3 text-sm italic text-ink-soft">
                                        {data.hero.name}, {roleInSentence(now.role)} at {now.company}.
                                    </figcaption>
                                </figure>
                            </Pop>
                            <Pop delay={220} className="mt-10">
                                <p className="label pb-2 border-b-2 border-ink">In brief</p>
                                <dl className="text-[17px]">
                                    <div className="py-3 border-b border-line">
                                        <dt className="label opacity-60 mb-1">Now</dt>
                                        <dd>{now.role}, {now.company} ({now.period})</dd>
                                    </div>
                                    {stack && (
                                        <div className="py-3 border-b border-line">
                                            <dt className="label opacity-60 mb-1">Stack</dt>
                                            <dd>{stack}</dd>
                                        </div>
                                    )}
                                </dl>
                            </Pop>
                            <Pop delay={280} className="mt-10">
                                <p className="label pb-2 border-b-2 border-ink">Inside</p>
                                <ul>
                                    {inside.map(([n, name, id]) => (
                                        <li key={id}>
                                            <button
                                                onClick={() => handleNavClick(id)}
                                                className="group w-full flex items-baseline gap-4 py-2.5 border-b border-line text-left transition-[padding,background-color,color] duration-300 hover:bg-ink hover:text-paper hover:px-3"
                                            >
                                                <span className="label !text-current opacity-60 w-6">{n}</span>
                                                <span className="font-heading font-bold text-xl">{name}</span>
                                                <span className="ml-auto label !text-current opacity-0 group-hover:opacity-100 transition-opacity">Read</span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </Pop>
                        </aside>
                    </div>
                </div>
            </section>

            {/* 01 Profile */}
            <section id="about" className="wrap py-16 md:py-24">
                <SectionHead n="01" kicker="Profile" title={`Hi, I am ${firstName}.`} />
                <Pop className="news-text cols-3 text-[19px] leading-[1.6]">
                    <p className="dropcap">
                        I am deeply interested in Generative AI, intelligent automation, scalable SaaS products, and solving real-world problems through data and systems design. I enjoy clean architecture, continuous learning, and experimenting with new AI frameworks.
                    </p>
                    <p>
                        I like working in growth-oriented environments with strong engineering culture and clear impact. I dislike unnecessary complexity, poor code practices, and stagnation. I prefer building things that are efficient, meaningful, and built to last.
                    </p>
                </Pop>
                <div className="ruled-cols mt-14 grid sm:grid-cols-2 lg:grid-cols-4 border-y border-ink">
                    {values.map((v, i) => (
                        <Pop key={v.title} delay={i * 90} className="py-6 lg:px-6 lg:first:pl-0 lg:last:pr-0">
                            <p className="label opacity-60 mb-3">{String(i + 1).padStart(2, '0')}</p>
                            <h3 className="text-2xl">{v.title}</h3>
                            <p className="text-ink-soft mt-2 leading-snug">{v.text}</p>
                        </Pop>
                    ))}
                </div>
            </section>

            {/* 02 Disciplines */}
            <section id="roles" className="wrap py-16 md:py-24">
                <SectionHead n="02" kicker="Disciplines" title="Four disciplines, one engineer." />
                <div className="ruled-cols grid sm:grid-cols-2 lg:grid-cols-4">
                    {roles.map((r, i) => (
                        <Pop
                            as="button"
                            key={r.id}
                            delay={i * 90}
                            onClick={() => pickRole(r.id)}
                            className="group flex flex-col text-left py-6 lg:px-6 lg:first:pl-0 lg:last:pr-0"
                        >
                            <span className="label opacity-60 mb-3">{String(i + 1).padStart(2, '0')}</span>
                            <h3 className="text-3xl leading-tight mb-3">{r.title}</h3>
                            <p className="text-ink-soft leading-snug flex-grow">{r.text}</p>
                            <p className="mt-5 text-sm italic text-ink-soft">{r.tags.join(', ')}</p>
                            <span className="label mt-5 link-draw self-start pb-0.5">See the work</span>
                        </Pop>
                    ))}
                </div>
            </section>

            {/* 03 Work */}
            <WorkShowcase projects={gridProjects} role={role} onRole={setRole} />

            {/* 04 Experience */}
            <section id="experience" className="wrap py-16 md:py-24">
                <SectionHead n="04" kicker="Experience" title="Where I have worked." />
                <ol className="border-t border-ink">
                    {[...journey].reverse().map((j) => (
                        <Pop as="li" key={j.company} className="grid md:grid-cols-[1.2fr_1fr_0.8fr] gap-1 md:gap-8 py-5 border-b border-line transition-colors duration-300 hover:bg-cream">
                            <h3 className="text-2xl md:text-3xl">{j.company}</h3>
                            <p className="text-ink-soft md:pt-1.5 italic">{j.role}</p>
                            <p className="label opacity-70 md:pt-3 md:!text-right">{j.period}</p>
                        </Pop>
                    ))}
                    <Pop as="li" className="grid md:grid-cols-[1.2fr_1fr_0.8fr] gap-1 md:gap-8 py-5 border-b border-ink transition-colors duration-300 hover:bg-cream">
                        <h3 className="text-2xl md:text-3xl">{education.school}</h3>
                        <p className="text-ink-soft md:pt-1.5 italic">{education.degree}</p>
                        <p className="label opacity-70 md:pt-3 md:!text-right">Education</p>
                    </Pop>
                </ol>

                <Pop className="mt-16 md:mt-20 mb-6">
                    <p className="label mb-3">Method</p>
                    <h3 className="text-4xl md:text-5xl">How a project runs.</h3>
                </Pop>
                <div className="ruled-cols grid sm:grid-cols-2 lg:grid-cols-4 border-y border-ink">
                    {process.map((st, i) => (
                        <Pop key={st.n} delay={i * 90} className="py-6 lg:px-6 lg:first:pl-0 lg:last:pr-0">
                            <p className="font-heading text-5xl font-black mb-3">{st.n}</p>
                            <h3 className="text-2xl mb-2">{st.title}</h3>
                            <p className="text-ink-soft leading-snug">{st.text}</p>
                        </Pop>
                    ))}
                </div>
            </section>

            {/* 05 Skills */}
            <section id="skills" className="wrap py-16 md:py-24">
                <SectionHead n="05" kicker="Skills" title="What I work with." />
                <div className="grid lg:grid-cols-12 gap-x-10 gap-y-12">
                    <div className="lg:col-span-8 grid sm:grid-cols-2 gap-x-10 gap-y-8">
                        {skillGroupsList.map((g, i) => (
                            <Pop key={g.label} delay={(i % 2) * 90}>
                                <p className="label pb-2 border-b-2 border-ink">{g.label}</p>
                                <ul>
                                    {g.skills.map((skill) => (
                                        <li key={skill.id || skill.name} className="flex items-center gap-3 py-2.5 border-b border-line">
                                            <span className="w-6 h-6 flex items-center justify-center shrink-0 grayscale">
                                                {skill.icon && (skill.icon.startsWith('http') || skill.icon.startsWith('/media/')) ? (
                                                    <img src={skill.icon} alt="" className="w-5 h-5 object-contain" />
                                                ) : (
                                                    <i className={`${skill.icon} text-sm`}></i>
                                                )}
                                            </span>
                                            <span className="text-lg">{skillLabel(skill.name)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </Pop>
                        ))}
                    </div>
                    {/* Boxed notice */}
                    <Pop delay={140} className="lg:col-span-4 self-start border-4 border-double border-ink p-7 text-center">
                        <p className="label mb-4">Notice</p>
                        <h3 className="text-4xl leading-tight">Looking for an AI engineer?</h3>
                        <p className="mt-4 text-ink-soft italic !text-center">Send a message and we can scope it together.</p>
                        <div className="mt-7 flex flex-col gap-3">
                            <button onClick={() => handleNavClick('#contact-form')} className="btn w-full">Send a message</button>
                            {data.hero.resume_url && (
                                <a href={data.hero.resume_url} target="_blank" rel="noopener noreferrer" className="btn-ghost w-full">
                                    <i className="fa-solid fa-file-pdf"></i> Download resume
                                </a>
                            )}
                        </div>
                    </Pop>
                </div>
            </section>

            {/* 06 Letters */}
            <section id="contact-form" className="bg-ink text-paper py-16 md:py-24">
                <div className="wrap">
                    <SectionHead n="06" kicker="Letters" title="Let's talk." />
                    <div className="grid lg:grid-cols-12 gap-x-10 gap-y-12">
                        <Pop className="lg:col-span-5">
                            <p className="text-xl leading-relaxed text-paper/75 max-w-md">
                                New projects, collaborations, or a chat about AI and software. I reply as soon as I can.
                            </p>
                            <dl className="mt-8 border-t border-paper/30">
                                {contactRows.map((r) => (
                                    <div key={r.label} className="py-4 border-b border-paper/30">
                                        <dt className="label !text-paper/55 mb-1">{r.label}</dt>
                                        <dd className="font-heading font-bold text-2xl break-all">
                                            {r.href ? <a href={r.href} className="link-draw">{r.value}</a> : r.value}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                            <button onClick={copyEmail} className="label !text-paper mt-6 inline-flex items-center gap-2 link-draw pb-0.5">
                                <i className={copied ? 'fa-solid fa-check' : 'fa-regular fa-copy'}></i>
                                {copied ? 'Email copied' : 'Copy email address'}
                            </button>
                        </Pop>

                        <Pop delay={140} className="lg:col-span-7">
                            <TiltBox>
                                <form className="space-y-6 border border-paper/40 p-6 md:p-9" onSubmit={handleSubmit}>
                                    <p className="label !text-paper/55">Write to the editor</p>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="email" className="label !text-paper/55">Email</label>
                                            <input
                                                type="email"
                                                id="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="you@email.com"
                                                className="w-full bg-transparent border-0 border-b border-paper/50 px-0 py-3 text-xl text-paper placeholder:text-paper/35 focus:outline-none focus:border-paper transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="purpose" className="label !text-paper/55">Purpose</label>
                                            <select
                                                id="purpose"
                                                value={formData.purpose}
                                                onChange={handleChange}
                                                className="w-full bg-transparent border-0 border-b border-paper/50 px-0 py-3 text-xl text-paper focus:outline-none focus:border-paper transition-colors appearance-none"
                                            >
                                                <option value="" className="bg-ink">Select a purpose</option>
                                                <option value="project" className="bg-ink">New project</option>
                                                <option value="collaboration" className="bg-ink">Collaboration</option>
                                                <option value="inquiry" className="bg-ink">General inquiry</option>
                                                <option value="other" className="bg-ink">Something else</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="label !text-paper/55">Message</label>
                                        <textarea
                                            id="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Tell me about your project"
                                            rows="5"
                                            className="w-full bg-transparent border-0 border-b border-paper/50 px-0 py-3 text-xl text-paper placeholder:text-paper/35 focus:outline-none focus:border-paper transition-colors"
                                        ></textarea>
                                    </div>

                                    {status.message && (
                                        <div className={`p-4 text-base border ${status.type === 'success' ? 'border-green-300/60 text-green-200' : 'border-red-300/60 text-red-200'}`}>
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
                </div>
            </section>

            {/* Elsewhere */}
            {data.social_links && data.social_links.length > 0 && (
                <Pop as="section" className="wrap py-12 md:py-16">
                    <div className="flex flex-wrap items-center gap-x-8 gap-y-4 border-y border-ink py-5">
                        <p className="label">Elsewhere</p>
                        {data.social_links.map((link, index) => (
                            <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-heading font-bold text-xl link-draw">
                                {link.icon_image ? (
                                    <img src={link.icon_image} alt="" className="w-4 h-4 object-contain grayscale" />
                                ) : (
                                    <i className={`${link.icon_class || 'fa-solid fa-link'} text-sm`}></i>
                                )}
                                {link.name}
                            </a>
                        ))}
                    </div>
                </Pop>
            )}
        </main>
    );
};

export default Home;
