import React, { useRef, useState } from 'react';
import TiltBox from './TiltBox';

// One framed box with a tab for each project. Switching tabs wipes the new picture in from the side
// while the old one shrinks back and dims behind it.
const WIPE_MS = 760;

const WorkShowcase = ({ projects }) => {
    const [index, setIndex] = useState(0);
    const [prev, setPrev] = useState(null); // { i, dir }
    const [dir, setDir] = useState('next');
    const timer = useRef(null);

    if (!projects || projects.length === 0) return null;

    const select = (i) => {
        if (i === index) return;
        const d = i > index ? 'next' : 'back';
        setDir(d);
        setPrev({ i: index, dir: d });
        setIndex(i);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setPrev(null), WIPE_MS + 40);
    };

    const current = projects[index];
    const tags = (current.tech_stack || '').split(',').map((t) => t.trim()).filter(Boolean);

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
        <section id="showcase" className="wrap py-24 md:py-32">
            <p className="eyebrow mb-4 !text-left">Work</p>
            <h2 className="text-4xl md:text-6xl font-semibold leading-tight max-w-3xl mb-10">Pick a project, see it.</h2>

            <TiltBox>
                <div className="flex justify-center mb-4">
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

            <div key={current.id} className="ws-info grid md:grid-cols-[1.3fr_1fr] gap-6 md:gap-12 mt-8 items-start">
                <div>
                    <p className="eyebrow mb-2 !text-left">{current.category}</p>
                    <h3 className="text-3xl md:text-4xl font-semibold leading-tight !text-left">{current.title}</h3>
                    <p className="mt-3 text-ink-soft text-lg leading-relaxed !text-left">{current.description}</p>
                </div>
                <div>
                    <div className="flex flex-wrap gap-2">
                        {tags.map((t) => (
                            <span key={t} className="px-3 py-1 rounded-full border border-line text-[11px] font-semibold text-ink-soft">{t}</span>
                        ))}
                    </div>
                    {current.live_link && current.live_link !== '#' && (
                        <a href={current.live_link} target="_blank" rel="noopener noreferrer" className="btn mt-6">
                            Open project
                        </a>
                    )}
                </div>
            </div>
        </section>
    );
};

export default WorkShowcase;
