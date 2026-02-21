from rest_framework import serializers, viewsets
from django.http import JsonResponse
from .models import Project

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.all().order_by('-created_at')
    serializer_class = ProjectSerializer

def get_portfolio_data(request):
    featured_projects = Project.objects.filter(is_featured=True).order_by('-created_at')[:3]
    latest_projects = Project.objects.filter(is_featured=False).order_by('-created_at')[:6]
    
    featured_serializer = ProjectSerializer(featured_projects, many=True)
    latest_serializer = ProjectSerializer(latest_projects, many=True)

    data = {
        "hero": {
            "name": "Saad",
            "title": "I design and build high-performance software solutions.",
            "subtitle": "Python & Django Specialist",
            "cta_primary": "See My Work",
            "cta_secondary": "Get in Touch"
        },
        "about": {
            "title": "About Me",
            "description": "I'm a software engineer focused on building clean, scalable backends and modern, intuitive interfaces. I specialize in the Python ecosystem, particularly Django and FastAPI, while crafting premium frontend experiences with React and Tailwind CSS."
        },
        "skills": [
            {"name": "Python", "icon": "fab fa-python"},
            {"name": "Django", "icon": "fas fa-code"},
            {"name": "React", "icon": "fab fa-react"},
            {"name": "Tailwind CSS", "icon": "fab fa-css3-alt"},
            {"name": "PostgreSQL", "icon": "fas fa-database"}
        ],
        "featured_projects": featured_serializer.data,
        "latest_projects": latest_serializer.data,
        "contact": {
            "email": "saad@example.com",
            "linkedin": "https://linkedin.com/in/saad",
            "github": "https://github.com/saad"
        }
    }
    return JsonResponse(data)
