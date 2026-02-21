import React, { useState, useEffect } from 'react';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/projects/')
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
        return <div className="flex justify-center items-center h-screen text-white uppercase tracking-[0.2em] animate-pulse">Loading Collection...</div>;
    }

    return (
        <main className="pt-32 pb-32 px-8 max-w-[1400px] mx-auto min-h-screen">
            <header className="mb-20">
                <span className="text-primary-accent uppercase tracking-widest text-xs font-bold mb-4 block animate-fade-in">Archive</span>
                <h1 className="text-5xl md:text-8xl font-bold tracking-tighter animate-fade-in">All Projects.</h1>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                    <div key={project.id} className="glass-card group flex flex-col overflow-hidden animate-fade-in">
                        <div className="w-full aspect-video overflow-hidden">
                            {project.video ? (
                                <video
                                    src={project.video}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    muted loop playsInline onMouseOver={e => e.target.play()} onMouseOut={e => e.target.pause()}
                                />
                            ) : (
                                <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            )}
                        </div>
                        <div className="p-8 flex-grow flex flex-col justify-between">
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-primary-accent mb-2 block">{project.category}</span>
                                <h2 className="text-2xl font-bold mb-4 tracking-tight">{project.title}</h2>
                                <p className="text-text-secondary text-sm mb-6 line-clamp-3">{project.description}</p>
                            </div>
                            <div className="flex justify-between items-center mt-auto">
                                <div className="flex flex-wrap gap-1">
                                    {project.tech_stack.split(',').slice(0, 3).map((tech, i) => (
                                        <span key={i} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[9px] font-bold uppercase tracking-wider">{tech.trim()}</span>
                                    ))}
                                </div>
                                <a href={project.live_link} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-glass-border flex items-center justify-center hover:bg-white hover:text-black transition-all">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default Projects;
