import os
import logging
import sys
from flask import Flask, jsonify, request, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from flask_cors import CORS
from dotenv import load_dotenv
import requests

# Ensure the local directory is in the path for Vercel
sys.path.append(os.path.abspath(os.path.dirname(__file__)))
from models import db, Profile, Project, Skill, SocialLink

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Configuration
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'a-very-secret-key')

# Handle Vercel Read-Only Filesystem
if os.environ.get('VERCEL'):
    db_path = '/tmp/portfolio.db'
    repo_db_path = os.path.join(BASE_DIR, 'portfolio.db')
    # Copy initial DB from repo to /tmp if it doesn't exist in /tmp
    if os.path.exists(repo_db_path) and not os.path.exists(db_path):
        import shutil
        try:
            shutil.copy2(repo_db_path, db_path)
            logger.info("Copied initial database to /tmp")
        except Exception as e:
            logger.error(f"Failed to copy database: {e}")
else:
    db_path = os.path.join(BASE_DIR, 'portfolio.db')

app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_path}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'

# Initialize Database
db.init_app(app)

# Initialize Admin
admin = Admin(app, name='Portfolio Admin', template_mode='bootstrap3')

class BaseFileView(ModelView):
    """Custom view for models with file fields to show better in admin if needed"""
    pass

admin.add_view(ModelView(Profile, db.session))
admin.add_view(ModelView(Project, db.session))
admin.add_view(ModelView(Skill, db.session))
admin.add_view(ModelView(SocialLink, db.session))

# Serve Media Files
@app.route('/media/<path:filename>')
def serve_media(filename):
    return send_from_directory(os.path.join(BASE_DIR, 'media'), filename)

@app.route('/api/portfolio/', methods=['GET'])
@app.route('/api/portfolio', methods=['GET'])
def get_portfolio():
    profile = Profile.query.first()
    if not profile:
        return jsonify({"error": "Profile not found"}), 404

    projects = Project.query.order_by(Project.created_at.desc()).all()
    skills = Skill.query.order_by(Skill.order).all()
    social_links = SocialLink.query.order_by(SocialLink.order).all()

    featured_projects = []
    latest_projects = []
    
    for p in projects:
        p_dict = {
            "id": p.id,
            "title": p.title,
            "description": p.description,
            "tech_stack": p.tech_stack,
            "image": f"/media/{p.image}" if p.image and not p.image.startswith('http') and not p.image.startswith('/') else p.image,
            "video": f"/media/{p.video}" if p.video and not p.video.startswith('http') and not p.video.startswith('/') else p.video,
            "live_link": p.live_link,
            "category": p.category,
            "is_featured": p.is_featured
        }
        if p.is_featured:
            featured_projects.append(p_dict)
        else:
            latest_projects.append(p_dict)

    return jsonify({
        "hero": {
            "name": profile.name,
            "title": profile.title,
            "subtitle": "AI & Software Engineer",
            "cta_primary": "See My Work",
            "cta_secondary": "Get in Touch",
            "resume_url": f"/media/{profile.resume_file}" if profile.resume_file and not str(profile.resume_file).startswith('/') else profile.resume_file
        },
        "about": {
            "title": "About Me",
            "description": profile.bio or "I'm a software engineer focused on building clean, scalable backends..."
        },
        "skills": [{
            "id": s.id,
            "name": s.name,
            "icon": f"/media/{s.icon}" if s.icon and not s.icon.startswith('http') and not s.icon.startswith('fa') and not s.icon.startswith('/') else s.icon,
            "order": s.order
        } for s in skills],
        "social_links": [{
            "id": sl.id,
            "name": sl.name,
            "url": sl.url,
            "icon_class": sl.icon_class,
            "icon_image": f"/media/{sl.icon_image}" if sl.icon_image and not sl.icon_image.startswith('/') else sl.icon_image
        } for sl in social_links],
        "featured_projects": featured_projects[:3],
        "latest_projects": latest_projects[:6],
        "contact": {
            "email": profile.email or "saadalioffic@gmail.com",
            "phone": profile.phone_number or "",
            "location": profile.location or "Karachi, Pakistan",
            "linkedin": "https://linkedin.com/in/saadkhi",
            "github": "https://github.com/saadkhi"
        }
    })

@app.route('/api/projects/', methods=['GET'])
@app.route('/api/projects', methods=['GET'])
def get_projects():
    projects = Project.query.order_by(Project.created_at.desc()).all()
    return jsonify([{
        "id": p.id,
        "title": p.title,
        "description": p.description,
        "tech_stack": p.tech_stack,
        "image": f"/media/{p.image}" if p.image and not p.image.startswith('http') and not p.image.startswith('/') else p.image,
        "video": f"/media/{p.video}" if p.video and not p.video.startswith('http') and not p.video.startswith('/') else p.video,
        "live_link": p.live_link,
        "category": p.category,
        "is_featured": p.is_featured
    } for p in projects])

@app.route('/api/contact/', methods=['POST'])
@app.route('/api/contact', methods=['POST'])
def contact_form_submission():
    data = request.json
    google_script_url = os.environ.get('GOOGLE_SHEETS_SCRIPT_URL')
    
    if not google_script_url:
        logger.error("GOOGLE_SHEETS_SCRIPT_URL not configured.")
        return jsonify({'error': True, 'message': 'Service temporarily unavailable.'}), 500
    
    try:
        response = requests.post(google_script_url, json=data, timeout=10)
        return jsonify({
            'error': False,
            'message': 'Message sent successfully!'
        })
    except requests.exceptions.RequestException as e:
        logger.error(f"Error proxying to Google Sheets: {str(e)}")
        return jsonify({'error': True, 'message': 'Failed to forward message.'}), 503

@app.route('/health')
def health_check():
    return jsonify({"status": "ok"})

# Initialize Tables (Required for some serverless environments if not using migrations)
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
