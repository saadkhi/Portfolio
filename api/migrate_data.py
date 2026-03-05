import json
import os
from datetime import datetime
from flask import Flask
from models import db, Profile, Project, Skill, SocialLink

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///portfolio.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

DATA_FILE = 'data.json'

def migrate_data():
    if not os.path.exists(DATA_FILE):
        print(f"Data file {DATA_FILE} not found.")
        return

    with open(DATA_FILE, 'r') as f:
        data = json.load(f)

    with app.app_context():
        db.create_all()

        # Migrate Profile
        profile_data = data.get('profile', {})
        if profile_data:
            profile = Profile(
                name=profile_data.get('name'),
                title=profile_data.get('title'),
                bio=profile_data.get('bio'),
                resume_file=profile_data.get('resume_file'),
                email=profile_data.get('email'),
                location=profile_data.get('location'),
                phone_number=profile_data.get('phone_number')
            )
            db.session.add(profile)

        # Migrate Projects
        for p_data in data.get('projects', []):
            project = Project(
                title=p_data.get('title'),
                description=p_data.get('description'),
                tech_stack=p_data.get('tech_stack'),
                image=p_data.get('image'),
                video=p_data.get('video'),
                live_link=p_data.get('live_link'),
                category=p_data.get('category'),
                is_featured=bool(p_data.get('is_featured')),
                created_at=datetime.strptime(p_data.get('created_at').split('.')[0], '%Y-%m-%d %H:%M:%S') if p_data.get('created_at') else datetime.utcnow()
            )
            db.session.add(project)

        # Migrate Skills
        for s_data in data.get('skills', []):
            skill = Skill(
                name=s_data.get('name'),
                icon=s_data.get('icon'),
                order=s_data.get('order', 0)
            )
            db.session.add(skill)

        # Migrate Social Links
        for sl_data in data.get('social_links', []):
            social_link = SocialLink(
                name=sl_data.get('name'),
                url=sl_data.get('url'),
                icon_class=sl_data.get('icon_class'),
                icon_image=sl_data.get('icon_image'),
                order=sl_data.get('order', 0)
            )
            db.session.add(social_link)

        db.session.commit()
        print("Data migration completed successfully!")

if __name__ == '__main__':
    migrate_data()
