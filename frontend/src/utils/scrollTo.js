export const scrollToSection = (id, navigate, pathname) => {
    const targetId = id.replace('#', '');

    if (pathname === '/') {
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    } else {
        navigate('/');
        // Wait for navigation and mount
        setTimeout(() => {
            const element = document.getElementById(targetId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }, 150);
    }
};
