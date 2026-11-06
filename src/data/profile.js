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
        id: 'software',
        icon: 'fa-solid fa-code',
        title: 'Software Engineer',
        text: 'Clean, tested backends and APIs in Python, with architecture that stays easy to change.',
        tags: ['Python', 'REST APIs', 'Clean architecture'],
    },
    {
        id: 'fullstack',
        icon: 'fa-solid fa-layer-group',
        title: 'Full-Stack Engineer',
        text: 'From database to interface: Django or FastAPI services with React frontends, shipped together.',
        tags: ['Django', 'FastAPI', 'React', 'MySQL'],
    },
    {
        id: 'data',
        icon: 'fa-solid fa-chart-column',
        title: 'Data Analyst',
        text: 'Turning raw tables into answers: SQL analysis, cleaning, and clear reporting for decisions.',
        tags: ['SQL', 'Python', 'Data pipelines'],
    },
    {
        id: 'ai',
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

export const education = {
    school: 'NED University of Engineering and Technology',
    degree: 'Software Engineering',
};

// Role filter for projects. Matches on the project's category, stack and title.
const roleWords = {
    ai: ['ai', 'genai', 'ml', 'machine learning', 'llm', 'rag', 'computer vision', 'tensorflow', 'opencv', 'mediapipe', 'chatbot', 'nlp'],
    data: ['data', 'analytics', 'sql', 'dashboard', 'pandas', 'power bi', 'tableau', 'etl'],
    fullstack: ['web', 'react', 'django', 'fastapi', 'flask', 'node', 'next', 'full-stack', 'full stack', 'frontend', 'rest'],
    software: ['software', 'desktop', 'app', 'api', 'cli', 'tool', 'python', 'backend'],
};

export const roleFilters = [
    { id: 'all', label: 'All' },
    { id: 'software', label: 'Software' },
    { id: 'fullstack', label: 'Full-Stack' },
    { id: 'data', label: 'Data' },
    { id: 'ai', label: 'AI' },
];

export const matchesRole = (project, role) => {
    if (!role || role === 'all') return true;
    const text = `${project.category || ''} ${project.tech_stack || ''} ${project.title || ''}`.toLowerCase();
    return (roleWords[role] || []).some((w) => new RegExp(`(^|[^a-z])${w}([^a-z]|$)`).test(text));
};

// Group the flat skills list by kind so it scans like a recruiter's keyword list.
const skillGroups = [
    ['Languages', ['python', 'javascript', 'typescript', 'java', 'c++', 'c#', 'sql', 'html', 'css', 'rust', 'go']],
    ['Backend', ['django', 'fastapi', 'flask', 'node', 'express', 'mysql', 'postgres', 'postgresql', 'mongodb', 'redis', 'rest', 'api']],
    ['Frontend', ['react', 'next', 'vue', 'tailwind', 'vite', 'redux']],
    ['Data', ['pandas', 'numpy', 'power bi', 'tableau', 'excel', 'matplotlib', 'spark']],
    ['AI / ML', ['tensorflow', 'pytorch', 'keras', 'opencv', 'langchain', 'openai', 'llm', 'rag', 'mediapipe', 'scikit-learn', 'hugging face']],
    ['Tools', ['docker', 'git', 'github', 'linux', 'aws', 'vercel', 'kubernetes', 'ci/cd']],
];

export const groupSkills = (skills) => {
    const out = new Map();
    (skills || []).forEach((sk) => {
        const key = (sk.name || '').toLowerCase().trim();
        const hit = skillGroups.find(([, words]) => words.includes(key));
        const label = hit ? hit[0] : 'Other';
        if (!out.has(label)) out.set(label, []);
        out.get(label).push(sk);
    });
    const order = [...skillGroups.map(([l]) => l), 'Other'];
    return order.filter((l) => out.has(l)).map((l) => ({ label: l, skills: out.get(l) }));
};
