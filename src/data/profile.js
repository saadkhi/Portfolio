// Facts taken from the existing About page and resume. Edit here to change them everywhere.
export const journey = [
    { company: 'MERL Lab', role: 'RISC-V & AI Research Intern', period: 'Sep 2022 to Dec 2023' },
    { company: '360 Xpert Solutions', role: 'AI Engineer Intern', period: 'Jul 2024 to Aug 2025' },
    { company: 'Avennex Solutions', role: 'AI Engineer', period: 'Sep 2025' },
    { company: 'Convex Consulting', role: 'AI Engineer', period: 'Oct 2025 to present' },
];

// One card per role. Wording only describes the stack you already list, no figures.
export const roles = [
    {
        icon: 'fa-solid fa-code',
        title: 'Software Engineer',
        text: 'Clean, tested backends and APIs in Python, with architecture that stays easy to change.',
        tags: ['Python', 'REST APIs', 'Clean architecture'],
    },
    {
        icon: 'fa-solid fa-layer-group',
        title: 'Full-Stack Engineer',
        text: 'From database to interface: Django or FastAPI services with React frontends, shipped together.',
        tags: ['Django', 'FastAPI', 'React', 'MySQL'],
    },
    {
        icon: 'fa-solid fa-chart-column',
        title: 'Data Analyst',
        text: 'Turning raw tables into answers: SQL analysis, cleaning, and clear reporting for decisions.',
        tags: ['SQL', 'Python', 'Data pipelines'],
    },
    {
        icon: 'fa-solid fa-brain',
        title: 'AI Engineer',
        text: 'LLM applications, RAG chatbots and machine learning pipelines built for production use.',
        tags: ['LLMs', 'RAG', 'ML pipelines'],
    },
];

export const process = [
    { n: '01', title: 'Understand', text: 'We define the problem, the users and what success looks like.' },
    { n: '02', title: 'Design', text: 'Data model, API and interface are sketched before code is written.' },
    { n: '03', title: 'Build', text: 'Small, reviewed increments with tests, so you can see progress early.' },
    { n: '04', title: 'Ship', text: 'Deployed, monitored and documented so your team can own it.' },
];
