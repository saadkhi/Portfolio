import React, { useEffect, useRef, useState } from 'react';

// Pinned section: scrolling turns a wheel of project titles.
// The title nearest the centre grows, turns orange and shows its project on the right.
const STEP = 64; // px between titles on desktop

const TitleWheel = ({ projects }) => {
    const sectionRef = useRef(null);
    const wheelRef = useRef(null);
    const [progress, setProgress] = useState(0);
    const [reduced, setReduced] = useState(false);
    const count = projects.length;

    useEffect(() => {
        setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    }, []);

    useEffect(() => {
        if (count < 2) return undefined;
        let raf = 0;
        const update = () => {
            raf = 0;
            const el = sectionRef.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const scrollable = rect.height - window.innerHeight;
            const t = Math.min(1, Math.max(0, -rect.top / scrollable));
            setProgress(t * (count - 1));
        };
        const onScroll = () => {
            if (!raf) raf = requestAnimationFrame(update);
        };
        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            if (raf) cancelAnimationFrame(raf);
        };
    }, [count]);

    if (count === 0) return null;

    // Reduced motion or a single project: a plain list, nothing pinned.
    if (reduced || count < 2) {
        return (
            <section id="work" className="py-24 wrap">
                <p className="eyebrow mb-4">Selected work</p>
                <ul className="divide-y divide-line border-y border-line">
                    {projects.map((p) => (
                        <li key={p.id}>
                            <a href={p.live_link || '#'} target="_blank" rel="noopener noreferrer" className="flex items-baseline justify-between gap-6 py-6 hover:text-accent-deep transition-colors">
                                <span className="font-heading text-3xl md:text-5xl font-semibold">{p.title}</span>
                                <span className="text-sm text-ink-soft hidden sm:block">{p.category}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </section>
        );
    }

    const active = Math.round(progress);
    const current = projects[active];

    return (
        <section
            id="work"
            ref={sectionRef}
            style={{ height: `${Math.max(2, count) * 45 + 60}vh` }}
            className="relative"
        >
            <div className="sticky top-0 h-screen overflow-hidden flex items-center">
                <div className="wrap grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-center">
                    <div>
                        <p className="eyebrow mb-4">Selected work</p>
                        <div
                            ref={wheelRef}
                            className="relative h-[46vh] sm:h-[52vh]"
                            style={{
                                maskImage: 'linear-gradient(180deg, transparent 0%, #000 22%, #000 78%, transparent 100%)',
                                WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, #000 22%, #000 78%, transparent 100%)',
                            }}
                            aria-label="Project list"
                        >
                            {projects.map((p, i) => {
                                const d = i - progress;
                                const abs = Math.abs(d);
                                const y = d * STEP * 1.35;
                                const scale = Math.max(0.55, 1 - abs * 0.14);
                                const opacity = Math.max(0.12, 1 - abs * 0.32);
                                const isActive = i === active;
                                return (
                                    <div
                                        key={p.id}
                                        className="absolute left-0 right-0 top-1/2 origin-left"
                                        style={{
                                            transform: `translateY(calc(-50% + ${y}px)) scale(${scale})`,
                                            opacity,
                                            color: isActive ? 'var(--color-accent-deep)' : 'var(--color-ink)',
                                            transition: 'color 0.25s ease',
                                        }}
                                    >
                                        <h3 className="font-heading font-semibold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] whitespace-nowrap overflow-hidden text-ellipsis" title={p.title}>
                                            {p.title.replace(/\s*\(.*\)\s*$/, '')}
                                        </h3>
                                    </div>
                                );
                            })}
                        </div>
                        <p className="mt-6 text-sm font-semibold text-ink-soft tabular-nums">
                            <span className="text-accent-deep">{String(active + 1).padStart(2, '0')}</span> of {String(count).padStart(2, '0')}
                        </p>
                    </div>

                    <a
                        key={current.id}
                        href={current.live_link || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="card card-link group overflow-hidden page-in hidden lg:block"
                    >
                        <div className="aspect-[16/10] overflow-hidden bg-ink/5">
                            {current.image && (
                                <img src={current.image} alt={current.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                            )}
                        </div>
                        <div className="p-7">
                            <p className="eyebrow mb-2">{current.category}</p>
                            <p className="text-ink-soft leading-relaxed line-clamp-3">{current.description}</p>
                            <div className="mt-5 flex flex-wrap gap-2">
                                {(current.tech_stack || '').split(',').filter(Boolean).slice(0, 5).map((t, i) => (
                                    <span key={i} className="px-3 py-1 rounded-full border border-line text-[11px] font-semibold text-ink-soft">{t.trim()}</span>
                                ))}
                            </div>
                        </div>
                    </a>
                </div>

                <a href="#projects" className="absolute bottom-8 right-6 md:right-10 text-sm font-semibold link-draw">
                    All projects
                </a>
            </div>
        </section>
    );
};

export default TitleWheel;
