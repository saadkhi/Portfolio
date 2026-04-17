import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ConnectionBackground from '../components/ConnectionBackground';

const Resume = () => {
    const [resumeData, setResumeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchResume = async () => {
            try {
                const response = await fetch('/api/resume');
                if (!response.ok) throw new Error('Failed to fetch resume data');
                const data = await response.json();
                setResumeData(data);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchResume();
    }, []);

    const handleDownloadPDF = () => {
        window.print();
    };

    const handleDownloadWord = () => {
        window.location.href = '/api/resume/download';
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="w-12 h-12 border-2 border-primary-accent border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!resumeData) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white">
                <p>Failed to load resume data. Please check back later.</p>
            </div>
        );
    }

    const { header, summary, experiences, education, skills, projects, certifications } = resumeData;

    return (
        <div className="min-h-screen bg-black text-white selection:bg-primary-accent selection:text-black pt-32 pb-20 px-6 sm:px-10 lg:px-20 relative overflow-hidden">
            <style>
                {`
                @media print {
                    @page {
                        margin: 15mm;
                        size: A4;
                    }
                    body {
                        background: white !important;
                        color: black !important;
                    }
                    nav, .no-print, .connection-bg, footer {
                        display: none !important;
                    }
                    .print-container {
                        display: block !important;
                        position: static !important;
                        width: 100% !important;
                        padding: 0 !important;
                        margin: 0 !important;
                    }
                    .resume-content {
                        color: black !important;
                        background: white !important;
                        font-family: 'Arial', sans-serif !important;
                    }
                    .section-title {
                        color: black !important;
                        border-bottom: 1px solid #ccc !important;
                        text-transform: uppercase !important;
                        font-weight: bold !important;
                        margin-bottom: 8px !important;
                        margin-top: 16px !important;
                    }
                    .item-title {
                        font-weight: bold !important;
                    }
                    a {
                        text-decoration: none !important;
                        color: black !important;
                    }
                }
                `}
            </style>

            <div className="connection-bg absolute inset-0 opacity-20 pointer-events-none">
                <ConnectionBackground />
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Download Buttons (Top) */}
                <div className="no-print flex flex-wrap justify-end gap-4 mb-8">
                    <button
                        onClick={handleDownloadWord}
                        className="bg-primary-accent text-black px-6 py-2 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-white transition-all duration-300 flex items-center gap-2"
                    >
                        <i className="fa-solid fa-file-word"></i>
                        Download Word
                    </button>
                    <button
                        onClick={handleDownloadPDF}
                        className="bg-white/10 text-white px-6 py-2 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-white/20 transition-all duration-300 flex items-center gap-2 border border-white/20"
                    >
                        <i className="fa-solid fa-print"></i>
                        Print PDF
                    </button>
                </div>

                {/* On-Screen Resume Header */}
                <div className="resume-content space-y-12">
                    <header className="text-center md:text-left border-b border-white/10 pb-10">
                        <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tighter">
                            {header.name}<span className="text-primary-accent">.</span>
                        </h1>
                        <p className="text-xl text-white/70 mb-6 font-medium uppercase tracking-[0.2em]">
                            {header.title}
                        </p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-white/50">
                            {header.email && (
                                <a href={`mailto:${header.email}`} className="hover:text-primary-accent transition-colors flex items-center gap-2">
                                    <i className="fa-solid fa-envelope"></i> {header.email}
                                </a>
                            )}
                            {header.phone && (
                                <span className="flex items-center gap-2">
                                    <i className="fa-solid fa-phone"></i> {header.phone}
                                </span>
                            )}
                            {header.location && (
                                <span className="flex items-center gap-2">
                                    <i className="fa-solid fa-location-dot"></i> {header.location}
                                </span>
                            )}
                        </div>
                        <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-6">
                            <a href={header.github} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-primary-accent text-xl transition-all">
                                <i className="fa-brands fa-github"></i>
                            </a>
                            <a href={header.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-primary-accent text-xl transition-all">
                                <i className="fa-brands fa-linkedin"></i>
                            </a>
                            <a href={header.portfolio} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-primary-accent text-xl transition-all">
                                <i className="fa-solid fa-globe"></i>
                            </a>
                        </div>
                    </header>

                    {/* Summary */}
                    <section>
                        <h2 className="text-primary-accent text-xs font-bold uppercase tracking-[0.3em] mb-6 flex items-center gap-4">
                            <span>01</span> Professional Summary
                            <div className="h-[1px] flex-grow bg-white/10"></div>
                        </h2>
                        {summary ? (
                            <p className="text-lg text-white/80 leading-relaxed font-light italic">
                                "{summary}"
                            </p>
                        ) : (
                            <p className="text-sm text-white/30 italic">No summary added yet. Update your profile in the admin panel.</p>
                        )}
                    </section>

                    {/* Skills */}
                    <section>
                        <h2 className="text-primary-accent text-xs font-bold uppercase tracking-[0.3em] mb-8 flex items-center gap-4">
                            <span>02</span> Technical Skills
                            <div className="h-[1px] flex-grow bg-white/10"></div>
                        </h2>
                        {skills && skills.length > 0 ? (
                            <div className="flex flex-wrap gap-3">
                                {skills.map((skill, index) => (
                                    <span key={index} className="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium hover:border-primary-accent/50 transition-colors">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-white/30 italic">No skills added yet.</p>
                        )}
                    </section>

                    {/* Work Experience */}
                    <section>
                        <h2 className="text-primary-accent text-xs font-bold uppercase tracking-[0.3em] mb-10 flex items-center gap-4">
                            <span>03</span> Professional Experience
                            <div className="h-[1px] flex-grow bg-white/10"></div>
                        </h2>
                        {experiences && experiences.length > 0 ? (
                            <div className="space-y-12">
                                {experiences.map((exp, index) => (
                                    <div key={index} className="group relative">
                                        <div className="flex flex-col md:flex-row md:justify-between mb-4">
                                            <div>
                                                <h3 className="text-2xl font-bold group-hover:text-primary-accent transition-colors">{exp.title}</h3>
                                                <p className="text-white/60 font-medium italic">{exp.company} | {exp.location}</p>
                                            </div>
                                            <div className="text-white/40 text-sm font-mono mt-2 md:mt-0 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-lg h-fit">
                                                {exp.period}
                                            </div>
                                        </div>
                                        <div className="text-white/70 space-y-2 whitespace-pre-line leading-relaxed border-l-2 border-white/5 pl-6 group-hover:border-primary-accent/30 transition-all">
                                            {exp.description}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-white/30 italic">No work experience added yet.</p>
                        )}
                    </section>

                    {/* Projects (Complete Details) */}
                    <section>
                        <h2 className="text-primary-accent text-xs font-bold uppercase tracking-[0.3em] mb-10 flex items-center gap-4">
                            <span>04</span> Key Projects
                            <div className="h-[1px] flex-grow bg-white/10"></div>
                        </h2>
                        {projects && projects.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {projects.map((proj, index) => (
                                    <div key={index} className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all duration-300 group">
                                        <h3 className="text-xl font-bold mb-3 group-hover:text-primary-accent transition-colors">{proj.title}</h3>
                                        <p className="text-sm text-white/50 mb-4 line-clamp-3">{proj.description}</p>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {proj.tech_stack.split(',').map((tech, i) => (
                                                <span key={i} className="text-[10px] uppercase font-bold tracking-widest text-primary-accent bg-primary-accent/10 px-2 py-0.5 rounded">
                                                    {tech.trim()}
                                                </span>
                                            ))}
                                        </div>
                                        {proj.live_link && proj.live_link !== "#" && (
                                            <a href={proj.live_link} target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white flex items-center gap-2">
                                                View Project <i className="fa-solid fa-arrow-right text-[10px]"></i>
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-white/30 italic">No featured projects found.</p>
                        )}
                    </section>

                    {/* Education */}
                    <section>
                        <h2 className="text-primary-accent text-xs font-bold uppercase tracking-[0.3em] mb-10 flex items-center gap-4">
                            <span>05</span> Education
                            <div className="h-[1px] flex-grow bg-white/10"></div>
                        </h2>
                        {education && education.length > 0 ? (
                            <div className="space-y-8">
                                {education.map((edu, index) => (
                                    <div key={index} className="flex flex-col md:flex-row md:justify-between items-start">
                                        <div>
                                            <h3 className="text-xl font-bold">{edu.degree}</h3>
                                            <p className="text-white/60">{edu.university}</p>
                                            {edu.gpa && <p className="text-sm text-white/40 mt-1">GPA: {edu.gpa}</p>}
                                            {edu.courses && <p className="text-sm text-white/40 mt-1 italic">Relevant Courses: {edu.courses}</p>}
                                        </div>
                                        <div className="text-white/40 text-sm font-mono mt-2 md:mt-0 uppercase tracking-widest">
                                            {edu.year}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-white/30 italic">No education history added yet.</p>
                        )}
                    </section>

                    {/* Certifications */}
                    <section>
                        <h2 className="text-primary-accent text-xs font-bold uppercase tracking-[0.3em] mb-10 flex items-center gap-4">
                            <span>06</span> Certifications
                            <div className="h-[1px] flex-grow bg-white/10"></div>
                        </h2>
                        {certifications && certifications.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {certifications.map((cert, index) => (
                                    <div key={index} className="flex justify-between items-center bg-white/5 border border-white/10 p-4 rounded-xl">
                                        <div>
                                            <h3 className="font-bold text-sm">{cert.name}</h3>
                                            <p className="text-xs text-white/50">{cert.issuer}</p>
                                        </div>
                                        <span className="text-[10px] font-mono text-white/30">{cert.year}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-white/30 italic">No certifications added yet.</p>
                        )}
                    </section>
                </div>

                {/* Download Buttons (Bottom) */}
                <div className="no-print mt-20 flex flex-col items-center gap-6">
                    <p className="text-white/40 text-sm tracking-widest uppercase">End of Portfolio Resume</p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={handleDownloadWord}
                            className="bg-primary-accent text-black px-10 py-4 rounded-full font-bold text-sm uppercase tracking-[0.3em] hover:bg-white transition-all duration-300 flex items-center gap-3 shadow-2xl shadow-primary-accent/20"
                        >
                            <i className="fa-solid fa-file-word animate-pulse"></i>
                            Download Word (.docx)
                        </button>
                        <button
                            onClick={handleDownloadPDF}
                            className="bg-white/10 text-white px-10 py-4 rounded-full font-bold text-sm uppercase tracking-[0.3em] hover:bg-white/20 transition-all duration-300 flex items-center gap-3 border border-white/20"
                        >
                            <i className="fa-solid fa-print"></i>
                            Print to PDF
                        </button>
                    </div>
                    <button
                        onClick={() => navigate('/')}
                        className="text-white/60 hover:text-white text-xs uppercase tracking-widest transition-colors"
                    >
                        Back to Home
                    </button>
                </div>
            </div>

            {/* Hidden Print-Only ATS Layout */}
            <div className="hidden print-container print:block text-black bg-white" style={{ fontFamily: 'Arial, sans-serif' }}>
                {/* This section is styled by the @media print CSS block above */}
                <div className="resume-print-content p-0 m-0">
                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-bold mb-1 uppercase tracking-tight">{header.name}</h1>
                        <p className="text-sm mb-2">{header.location} | {header.phone} | {header.email}</p>
                        <p className="text-xs italic">GitHub: {header.github.split('/').pop()} | LinkedIn: {header.linkedin.split('/').pop()}</p>
                    </div>

                    <div className="mb-4">
                        <h2 className="section-title text-sm border-b font-bold mb-2 pb-1 uppercase">Professional Summary</h2>
                        <p className="text-xs leading-normal">{summary}</p>
                    </div>

                    <div className="mb-4">
                        <h2 className="section-title text-sm border-b font-bold mb-2 pb-1 uppercase">Technical Skills</h2>
                        <p className="text-xs leading-normal">{skills.join(', ')}</p>
                    </div>

                    <div className="mb-4">
                        <h2 className="section-title text-sm border-b font-bold mb-2 pb-1 uppercase">Work Experience</h2>
                        {experiences.map((exp, i) => (
                            <div key={i} className="mb-3">
                                <div className="flex justify-between font-bold text-xs uppercase">
                                    <span>{exp.title} - {exp.company}</span>
                                    <span>{exp.period}</span>
                                </div>
                                <div className="text-[10px] italic mb-1">{exp.location}</div>
                                <ul className="list-disc ml-4 text-[10px] leading-snug">
                                    {exp.description.split('\n').map((bullet, bi) => (
                                        <li key={bi}>{bullet.replace(/^[•*-]\s*/, '')}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="mb-4">
                        <h2 className="section-title text-sm border-b font-bold mb-2 pb-1 uppercase">Education</h2>
                        {education.map((edu, i) => (
                            <div key={i} className="mb-2">
                                <div className="flex justify-between font-bold text-xs uppercase">
                                    <span>{edu.degree} - {edu.university}</span>
                                    <span>{edu.year}</span>
                                </div>
                                {edu.gpa && <p className="text-[10px]">GPA: {edu.gpa}</p>}
                                {edu.courses && <p className="text-[10px] italic">Relevant Coursework: {edu.courses}</p>}
                            </div>
                        ))}
                    </div>

                    <div className="mb-4">
                        <h2 className="section-title text-sm border-b font-bold mb-2 pb-1 uppercase">Featured Projects</h2>
                        {projects.map((proj, i) => (
                            <div key={i} className="mb-2">
                                <div className="font-bold text-xs uppercase">{proj.title}</div>
                                <div className="text-[10px] mb-1 leading-snug">{proj.description}</div>
                                <div className="text-[10px] font-bold">Tech: {proj.tech_stack}</div>
                            </div>
                        ))}
                    </div>

                    <div className="mb-2">
                        <h2 className="section-title text-sm border-b font-bold mb-2 pb-1 uppercase">Certifications</h2>
                        <ul className="list-none text-[10px] leading-snug">
                            {certifications.map((cert, i) => (
                                <li key={i}>{cert.name} ({cert.issuer}) - {cert.year}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Resume;
