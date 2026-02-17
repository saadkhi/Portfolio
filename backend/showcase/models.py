from django.db import models

class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    tech_stack = models.CharField(max_length=255, help_text="Comma-separated technologies (e.g., 'SQL, FastAPI, Django')")
    image = models.ImageField(upload_to='projects/images/')
    video = models.FileField(upload_to='projects/videos/', blank=True, null=True, help_text="Optional video showcase")
    live_link = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
