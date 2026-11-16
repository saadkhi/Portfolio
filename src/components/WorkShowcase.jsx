import React, { useEffect, useRef, useState } from 'react';
import { roleFilters } from '../data/profile';
import TiltBox from './TiltBox';
import Pop from './Pop';
import SectionHead from './SectionHead';

// One framed box with a tab for each project. Switching tabs wipes the new picture in from the side
// while the old one shrinks back and dims behind it.
const WIPE_MS = 760;

const WorkShowcase = ({ projects, role = 'all', onRole }) => {
    const [index, setIndex] = useState(0);
    const [prev, setPrev] = useState(null); // { i, dir }
    const [dir, setDir] = useState('next');
    const timer = useRef(null);

    // A new filter starts again from the first project
    useEffect(() => {
        setIndex(0);
        setPrev(null);
    }, [role]);

    const empty = !projects || projects.length === 0;

    const select = (i) => {
        if (i === index) return;
        const d = i > index ? 'next' : 'back';
        setDir(d);
        setPrev({ i: index, dir: d });
        setIndex(i);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setPrev(null), WIPE_MS + 40);
    };

    const current = empty ? null : projects[Math.min(index, projects.length - 1)];
    const tags = (current ? current.tech_stack || '' : '').split(',').map((t) => t.trim()).filter(Boolean);

    const shot = (p, cls) => (
        <div key={`${p.id}-${cls}`} className={`ws-shot ${cls}`}>
            {p.image ? (
                <img src={p.image} alt={p.title} draggable="false" />
            ) : (
                <div className="ws-empty">{p.title}</div>
            )}
        </div>
    );

    return (
        <section id="projects" className="wrap py-16 md:py-24">
            <SectionHead n="03" kicker="Work" title="Things I have built.">
                {onRole && (
                    <div className="flex flex-wrap gap-x-6 gap-y-2 mt-8" role="group" aria-label="Filter by role">
                        {roleFilters.map((r) => (
                            <button
                                key={r.id}
                                onClick={() => onRole(r.id)}
                                aria-pressed={role === r.id}
                                className={`label pb-1 border-b-2 transition-colors duration-200 ${role === r.id ? 'border-ink' : 'border-transparent opacity-55 hover:opacity-100'}`}
                            >
                                {r.label}
                            </button>
                        ))}
                    </div>
                )}
            </SectionHead>

            {empty ? (
                <p className="text-ink-soft text-xl italic">No projects in this category yet. More are on the way.</p>
            ) : (
            <>
            <TiltBox>
                <div className="flex justify-start mb-4">
                    <div role="tablist" aria-label="Projects" className="ws-tabs">
                        {projects.map((p, i) => (
                            <button
                                key={p.id}
                                role="tab"
                                aria-selected={i === index}
                                aria-controls="ws-stage"
                                onClick={() => select(i)}
                                className={`ws-tab ${i === index ? 'is-on' : ''}`}
                            >
                                {p.title.replace(/\s*\(.*\)\s*$/, '')}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="ws-frame">
                    <div id="ws-stage" role="tabpanel" className="ws-stage" data-dir={dir}>
                        {prev !== null && projects[prev.i] && shot(projects[prev.i], `is-out-${prev.dir}`)}
                        {shot(current, prev !== null ? `is-in-${dir}` : 'is-rest')}
                    </div>
                </div>
            </TiltBox>

            <Pop className="mt-8">
            <div key={current.id} className="ws-info grid md:grid-cols-[1.4fr_1fr] gap-6 md:gap-12 items-start border-t border-ink pt-6">
                <div>
                    <p className="label opacity-60 mb-3">{current.category}</p>
                    <h3 className="text-4xl md:text-5xl leading-tight">{current.title}</h3>
                    <p className="mt-4 text-xl leading-relaxed text-ink-soft">{current.description}</p>
                </div>
                <div>
                    <p className="label pb-2 border-b-2 border-ink">Built with</p>
                    <ul>
                        {tags.map((tag) => (
                            <li key={tag} className="py-2 border-b border-line text-lg">{tag}</li>
                        ))}
                    </ul>
                    {current.live_link && current.live_link !== '#' && (
                        <a href={current.live_link} target="_blank" rel="noopener noreferrer" className="btn mt-6">
                            Open project
                        </a>
                    )}
                </div>
            </div>
            </Pop>
            </>
            )}
        </section>
    );
};

export default WorkShowcase;
