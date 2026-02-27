from rest_framework import serializers, viewsets
from django.http import JsonResponse
from .models import Project, Profile, Skill, SocialLink

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'

class SocialLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialLink
        fields = '__all__'

class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.all().order_by('-created_at')
    serializer_class = ProjectSerializer

def get_portfolio_data(request):
    featured_projects = Project.objects.filter(is_featured=True).order_by('-created_at')[:3]
    latest_projects = Project.objects.filter(is_featured=False).order_by('-created_at')[:6]
    
    # Get the singleton profile
    profile = Profile.objects.first()
    profile_data = ProfileSerializer(profile).data if profile else {
        "name": "Saad",
        "title": "Software Engineer",
        "bio": "I'm a software engineer focused on building clean, scalable backends...",
        "resume_file": None,
        "phone_number": "+92 300 1234567",
        "email": "saadalioffic@gmail.com",
        "location": "Karachi, Pakistan"
    }

    # Get skills from database
    skills = Skill.objects.all()
    skills_data = SkillSerializer(skills, many=True).data if skills.exists() else [
        {"name": "Python", "icon": "fab fa-python"},
        {"name": "Django", "icon": "fas fa-code"},
        {"name": "React", "icon": "fab fa-react"},
        {"name": "Tailwind CSS", "icon": "fab fa-css3-alt"},
        {"name": "PostgreSQL", "icon": "fas fa-database"}
    ]

    # Get social links
    social_links = SocialLink.objects.all()
    social_links_data = SocialLinkSerializer(social_links, many=True).data if social_links.exists() else [
        {"name": "GitHub", "url": "https://github.com/saadkhi", "icon_class": "fa-brands fa-github"},
        {"name": "LinkedIn", "url": "https://linkedin.com/in/saadkhi", "icon_class": "fa-brands fa-linkedin-in"},
        {"name": "Email", "url": "mailto:saadalioffic@gmail.com", "icon_class": "fa-solid fa-envelope"},
        {"name": "Twitter", "url": "https://x.com/saadkhi_?s=21", "icon_class": "fa-brands fa-x-twitter"},
        {"name": "Instagram", "url": "#", "icon_class": "fa-brands fa-instagram"}
    ]

    featured_serializer = ProjectSerializer(featured_projects, many=True)
    latest_serializer = ProjectSerializer(latest_projects, many=True)

    data = {
        "hero": {
            "name": profile_data.get("name", "Saad"),
            "title": profile_data.get("title", "Software Engineer"),
            "subtitle": "AI & Software Engineer",
            "cta_primary": "See My Work",
            "cta_secondary": "Get in Touch",
            "resume_url": profile_data.get("resume_file")
        },
        "about": {
            "title": "About Me",
            "description": profile_data.get("bio") or "I'm a software engineer focused on building clean, scalable backends and modern, intuitive interfaces. I specialize in the Python ecosystem, particularly Django and FastAPI, while crafting premium frontend experiences with React and Tailwind CSS."
        },
        "skills": skills_data,
        "social_links": social_links_data,
        "featured_projects": featured_serializer.data,
        "latest_projects": latest_serializer.data,
        "contact": {
            "email": profile_data.get("email") or "saadalioffic@gmail.com",
            "phone": profile_data.get("phone_number") or "+92 300 1234567",
            "location": profile_data.get("location") or "Karachi, Pakistan",
            "linkedin": "https://linkedin.com/in/saadkhi",
            "github": "https://github.com/saadkhi"
        }
    }
    return JsonResponse(data)
