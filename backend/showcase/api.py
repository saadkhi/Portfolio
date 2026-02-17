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
    projects = Project.objects.all().order_by('-created_at')[:3] # Get latest 3 for home
    project_data = ProjectSerializer(projects, many=True).data

    data = {
        "hero": {
            "title": "Hello, I'm Saad",
            "subtitle": "Python Django Developer",
            "cta_primary": "View Work",
            "cta_secondary": "Contact Me"
        },
        "about": {
            "title": "About Me",
            "description": "I am a passionate Python Django developer with a knack for building scalable, responsive, and interactive web applications."
        },
        "skills": [
            {"name": "Python", "icon": "fab fa-python"},
            {"name": "Django", "icon": "fab fa-js"},
            {"name": "HTML5/CSS3", "icon": "fab fa-html5"},
            {"name": "PostgreSQL", "icon": "fas fa-database"}
        ],
        "projects": project_data,
        "contact": {
            "email": "saad@example.com"
        }
    }
    return JsonResponse(data)
