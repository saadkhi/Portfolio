// Everything except the resume lives on the home page, so a section link either scrolls
// (already on the home page) or goes to /#section, and Home scrolls there once it has mounted.
export const scrollToSection = (id, navigate, pathname) => {
    const targetId = id.replace('#', '');

    if (pathname === '/') {
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            window.history.replaceState(null, '', `/#${targetId}`);
        }
    } else {
        navigate(`/#${targetId}`);
    }
};
