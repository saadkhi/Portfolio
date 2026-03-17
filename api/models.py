from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Profile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    bio = db.Column(db.Text, nullable=True)
    resume_file = db.Column(db.String(255), nullable=True)
    email = db.Column(db.String(120), nullable=True)
    location = db.Column(db.String(200), nullable=True)
    phone_number = db.Column(db.String(20), nullable=True)
    profile_pic = db.Column(db.String(255), nullable=True)

    def __repr__(self):
        return f'<Profile {self.name}>'

class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    tech_stack = db.Column(db.String(500), nullable=False) # Comma separated
    image = db.Column(db.String(255), nullable=True)
    video = db.Column(db.String(255), nullable=True)
    live_link = db.Column(db.String(255), nullable=True)
    category = db.Column(db.String(100), nullable=True)
    is_featured = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<Project {self.title}>'

class Skill(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    icon = db.Column(db.String(255), nullable=True) # Static path or fontawesome class
    order = db.Column(db.Integer, default=0)

    def __repr__(self):
        return f'<Skill {self.name}>'

class SocialLink(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    url = db.Column(db.String(255), nullable=False)
    icon_class = db.Column(db.String(100), nullable=True)
    icon_image = db.Column(db.String(255), nullable=True)
    order = db.Column(db.Integer, default=0)

    def __repr__(self):
        return f'<SocialLink {self.name}>'
