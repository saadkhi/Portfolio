import React, { useState, useEffect } from 'react';

const Arrow = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
);

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/projects/`)
            .then(response => response.json())
            .then(data => {
                setProjects(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching projects:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-screen text-ink-soft text-xs font-semibold uppercase tracking-[0.25em]">Loading projects</div>;
    }

    return (
        <main className="pt-36 md:pt-44 pb-24 md:pb-32 wrap min-h-screen">
            <header className="mb-14 md:mb-20 max-w-3xl">
                <p className="eyebrow mb-4">Projects</p>
                <h1 className="text-5xl sm:text-6xl md:text-8xl font-semibold leading-[1]">Things I have built.</h1>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {projects.map((project) => (
                    <a
                        key={project.id}
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
                                    onMouseOver={e => e.target.play()} onMouseOut={e => e.target.pause()}
                                />
                            ) : (
                                <img src={project.image} alt={project.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                            )}
                        </div>
                        <div className="p-7 md:p-9 flex-grow flex flex-col">
                            <p className="eyebrow mb-3">{project.category}</p>
                            <div className="flex items-start justify-between gap-4">
                                <h2 className="text-2xl md:text-3xl font-semibold leading-tight">{project.title}</h2>
                                <span className="w-10 h-10 rounded-full border border-line flex items-center justify-center shrink-0 transition-colors group-hover:bg-ink group-hover:text-white group-hover:border-ink">
                                    <Arrow />
                                </span>
                            </div>
                            <p className="mt-3 text-ink-soft leading-relaxed line-clamp-3">{project.description}</p>
                            <div className="mt-6 flex flex-wrap gap-2 mt-auto pt-6">
                                {(project.tech_stack || '').split(',').filter(Boolean).slice(0, 5).map((tech, i) => (
                                    <span key={i} className="px-3 py-1 rounded-full border border-line text-[11px] font-semibold text-ink-soft">{tech.trim()}</span>
                                ))}
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </main>
    );
};

export default Projects;
