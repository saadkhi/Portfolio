import json
import os
from flask import Flask
from models import db, Profile, Project, Skill, SocialLink

app = Flask(__name__)
# Use the local SQLite database
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(BASE_DIR, 'portfolio.db')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

def export_to_json():
    with app.app_context():
        print("Fetching data from SQLite...")
        
        profile = Profile.query.first()
        projects = Project.query.all()
        skills = Skill.query.all()
        social_links = SocialLink.query.all()
        
        data = {
            "profile": {
                "name": profile.name,
                "title": profile.title,
                "bio": profile.bio,
                "resume_file": profile.resume_file,
                "email": profile.email,
                "location": profile.location,
                "phone_number": profile.phone_number,
                "profile_pic": profile.profile_pic
            } if profile else {},
            "projects": [
                {
                    "title": p.title,
                    "description": p.description,
                    "tech_stack": p.tech_stack,
                    "image": p.image,
                    "video": p.video,
                    "live_link": p.live_link,
                    "category": p.category,
                    "is_featured": 1 if p.is_featured else 0,
                    "created_at": p.created_at.strftime('%Y-%m-%d %H:%M:%S') if p.created_at else None
                } for p in projects
            ],
            "skills": [
                {
                    "name": s.name,
                    "icon": s.icon,
                    "order": s.order
                } for s in skills
            ],
            "social_links": [
                {
                    "name": sl.name,
                    "url": sl.url,
                    "icon_class": sl.icon_class,
                    "icon_image": sl.icon_image,
                    "order": sl.order
                } for sl in social_links
            ]
        }
        
        output_file = os.path.join(BASE_DIR, 'data.json')
        with open(output_file, 'w') as f:
            json.dump(data, f, indent=4)
            
        print(f"Successfully exported data to {output_file}")
        print("You can now commit this file and deploy to Vercel with Neon!")

if __name__ == '__main__':
    export_to_json()
