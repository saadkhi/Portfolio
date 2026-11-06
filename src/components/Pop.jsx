import React, { useEffect, useRef, useState } from 'react';

// Pops up as it scrolls into view from below, and pops back down when you scroll up past it.
// Once it has gone off the top it stays shown, so only the upward scroll reverses it.
// One shared scroll listener checks every Pop against its real position, so fast jumps are handled too.
const registry = new Set();
let bound = false;

// Scroll events already arrive about once per frame, so this runs straight from them.
const check = () => {
    const vh = window.innerHeight;
    registry.forEach((fn) => fn(vh));
};

const bind = () => {
    if (bound) return;
    bound = true;
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
};

const Pop = ({ as: Tag = 'div', delay = 0, className = '', style, children, ...rest }) => {
    const ref = useRef(null);
    const [on, setOn] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return undefined;
        const fn = (vh) => {
            const r = el.getBoundingClientRect();
            const showAt = vh * 0.92; // top edge has come up past here
            if (r.top < showAt) setOn(true); // on screen, or already scrolled past
            else if (r.top >= vh) setOn(false); // still (or again) below the screen
        };
        registry.add(fn);
        bind();
        fn(window.innerHeight);
        return () => {
            registry.delete(fn);
        };
    }, []);

    return (
        <Tag
            ref={ref}
            className={`pop ${on ? 'is-in' : ''} ${className}`}
            style={{ ...style, '--pop-d': `${delay}ms` }}
            {...rest}
        >
            {children}
        </Tag>
    );
};

export default Pop;
