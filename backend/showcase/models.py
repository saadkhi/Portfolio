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
