from django.http import JsonResponse
from django.conf import settings

def get_portfolio_data(request):
    data = {
        "hero": {
            "title": "Hello, I'm Saad",
            "subtitle": "Python Django Developer",
            "cta_primary": "View Work",
            "cta_secondary": "Contact Me"
        },
        "about": {
            "title": "About Me",
            "description": "I am a passionate Python Django developer with a knack for building scalable, responsive, and interactive web applications. I love turning complex problems into elegant solutions."
        },
        "skills": [
            {"name": "Python", "icon": "fab fa-python"},
            {"name": "Django", "icon": "fab fa-js"}, # Note: Icon class from original template seems to have been fa-js for Django? Keeping as is for fidelity.
            {"name": "HTML5/CSS3", "icon": "fab fa-html5"},
            {"name": "PostgreSQL", "icon": "fas fa-database"}
        ],
        "projects": [
            {
                "title": "E-Commerce Platform",
                "description": "A full-featured e-commerce site built with Django and Stripe.",
                "link": "#"
            },
            {
                "title": "Task Manager",
                "description": "Real-time task management app using Django Channels.",
                "link": "#"
            }
        ],
        "contact": {
            "email": "saad@example.com" # Placeholder
        }
    }
    return JsonResponse(data)
