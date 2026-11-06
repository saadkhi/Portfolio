import React, { useEffect, useRef } from 'react';

// A box that arrives tilted back and slightly small, then lies flat as it scrolls into view.
// Progress is read from the box's own position, so it also runs in reverse when scrolling up.
const TiltBox = ({ children, className = '', from = { rotate: 24, scale: 0.86, y: 40 } }) => {
    const wrapRef = useRef(null);
    const boxRef = useRef(null);

    useEffect(() => {
        const wrap = wrapRef.current;
        const box = boxRef.current;
        if (!wrap || !box) return undefined;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

        let raf = 0;
        const update = () => {
            raf = 0;
            const r = wrap.getBoundingClientRect();
            const vh = window.innerHeight;
            // 0 when the top edge is at the bottom of the screen, 1 when it reaches 35% from the top.
            const t = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.65)));
            const e = 1 - Math.pow(1 - t, 3); // ease out
            const rot = from.rotate * (1 - e);
            const sc = from.scale + (1 - from.scale) * e;
            const y = from.y * (1 - e);
            box.style.transform = `translate3d(0, ${y}px, 0) rotateX(${rot}deg) scale(${sc})`;
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
    }, [from.rotate, from.scale, from.y]);

    return (
        <div ref={wrapRef} className={className} style={{ perspective: '1400px' }}>
            <div ref={boxRef} style={{ transformOrigin: '50% 0', willChange: 'transform' }}>
                {children}
            </div>
        </div>
    );
};

export default TiltBox;
