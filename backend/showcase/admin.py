from django.contrib import admin
from .models import Project, Profile, Skill, SocialLink

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'is_featured', 'created_at')
    list_filter = ('is_featured', 'category')
    search_fields = ('title', 'tech_stack', 'category')

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('name', 'title', 'email', 'phone_number', 'location')
    fields = ('name', 'title', 'bio', 'resume_file', 'phone_number', 'email', 'location')

admin.site.register(Skill)
admin.site.register(SocialLink)
