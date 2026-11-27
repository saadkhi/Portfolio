import Pop from './Pop';

// Opens a section like a newspaper section front: a double rule that draws across,
// a kicker with the section number, then the headline.
const SectionHead = ({ n, kicker, title, children, className = '' }) => (
    <Pop className={`mb-10 md:mb-14 ${className}`}>
        <div className="sec-rule" aria-hidden="true"></div>
        <div className="flex items-baseline justify-between gap-6 pt-3">
            <p className="label !text-current">{kicker}</p>
            <p className="label !text-current opacity-60">Section {n}</p>
        </div>
        <h2 className="mt-6 md:mt-8 text-[40px] sm:text-6xl lg:text-7xl max-w-4xl">{title}</h2>
        {children}
    </Pop>
);

export default SectionHead;
