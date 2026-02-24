from django.contrib import admin
from .models import Project, Profile, Skill

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'is_featured', 'created_at')
    list_filter = ('is_featured', 'category')
    search_fields = ('title', 'tech_stack', 'category')

admin.site.register(Profile)
admin.site.register(Skill)
