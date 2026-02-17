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
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'white' }}>Loading Projects...</div>;
    }

    return (
        <div className="py-32 max-w-[1400px] mx-auto px-8">
            <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-white to-text-secondary font-heading font-bold tracking-tight text-4xl md:text-5xl lg:text-6xl text-center mb-16">All Projects</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-16">
                {projects.map((project) => (
                    <div key={project.id} className="bg-bg-card border border-glass-border rounded-3xl overflow-hidden transition-all duration-300 flex flex-col hover:border-glass-highlight hover:-translate-y-1 hover:shadow-2xl">
                        <div className="w-full h-[300px] bg-[#111] overflow-hidden">
                            {project.video ? (
                                <video
                                    src={project.video}
                                    controls
                                    className="w-full h-full object-cover"
                                    poster={project.image}
                                />
                            ) : (
                                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                            )}
                        </div>
                        <div className="p-8 flex-grow flex flex-col">
                            <div className="flex justify-between items-start mb-4">
                                <h2 className="font-heading font-bold text-[1.8rem] m-0">{project.title}</h2>
                                <a href={project.live_link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-4 py-2 rounded-full font-semibold text-xs transition-all duration-200 cursor-pointer font-heading bg-transparent text-text-primary border border-glass-border hover:border-text-primary hover:bg-white/5">View Live</a>
                            </div>
                            <p className="text-text-secondary text-sm mb-4 font-heading"><span className="text-primary-accent">Tech Stack:</span> {project.tech_stack}</p>
                            <p className="text-text-secondary leading-relaxed">{project.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Projects;
