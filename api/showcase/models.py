from django.db import models

class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    category = models.CharField(max_length=100, default='Web Development', help_text="e.g., 'Web Dev', 'AI', 'UI/UX'")
    tech_stack = models.CharField(max_length=255, help_text="Comma-separated technologies (e.g., 'SQL, FastAPI, Django')")
    image = models.ImageField(upload_to='projects/images/')
    video = models.FileField(upload_to='projects/videos/', blank=True, null=True, help_text="Optional video showcase")
    live_link = models.URLField(blank=True, null=True)
    is_featured = models.BooleanField(default=False, help_text="Show prominently on the home page")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Profile(models.Model):
    name = models.CharField(max_length=200, default='Saad')
    title = models.CharField(max_length=200, default='Software Engineer')
    bio = models.TextField(blank=True)
    resume_file = models.FileField(upload_to='resumes/', blank=True, null=True)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        verbose_name_plural = "Profile"

    def __str__(self):
        return self.name

class Skill(models.Model):
    name = models.CharField(max_length=100)
    icon = models.FileField(upload_to='skills/icons/', help_text="Upload a PNG/SVG icon")
    order = models.IntegerField(default=0, help_text="Order of appearance")

    class Meta:
        ordering = ['order', 'name']

    def __str__(self):
        return self.name

class SocialLink(models.Model):
    name = models.CharField(max_length=100, help_text="e.g., 'GitHub', 'LinkedIn', 'Twitter'")
    url = models.URLField()
    icon_class = models.CharField(max_length=100, blank=True, null=True, help_text="FontAwesome class (e.g., 'fa-brands fa-github').")
    icon_image = models.ImageField(upload_to='social_icons/', blank=True, null=True, help_text="Upload a custom image icon. Takes priority over icon class.")
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', 'name']

    def __str__(self):
        return self.name
