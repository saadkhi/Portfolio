import os
import logging
import sys
from flask import Flask, jsonify, request, send_from_directory, render_template_string, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_admin import Admin, AdminIndexView, expose
from flask_admin.base import MenuLink
from flask_admin.contrib.sqla import ModelView
from flask_admin.form.upload import FileUploadField
from flask_cors import CORS
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from dotenv import load_dotenv
import requests

# Ensure the local directory is in the path for Vercel
sys.path.append(os.path.abspath(os.path.dirname(__file__)))
from models import db, Profile, Project, Skill, SocialLink

# Configuration
BASE_DIR = os.path.abspath(os.path.dirname(__file__))

# Load environment variables from api/.env
load_dotenv(os.path.join(BASE_DIR, '.env'))

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'a-very-secret-key-12345')

# Admin Credentials
# Fallbacks included for ease of use during initial setup
ADMIN_USERNAME = os.environ.get("ADMIN_USERNAME", "saadkhi_uit").strip()
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "03353948753_gs150se").strip()

logger.info(f"DEBUG: ADMIN_USERNAME is {'SET (length: ' + str(len(ADMIN_USERNAME)) + ')' if ADMIN_USERNAME else 'NOT SET'}")
logger.info(f"DEBUG: ADMIN_PASSWORD is {'SET (length: ' + str(len(ADMIN_PASSWORD)) + ')' if ADMIN_PASSWORD else 'NOT SET'}")

# Handle Vercel Read-Only Filesystem
if os.environ.get('VERCEL'):
    db_path = '/tmp/portfolio.db'
    repo_db_path = os.path.join(BASE_DIR, 'portfolio.db')
    if os.path.exists(repo_db_path) and not os.path.exists(db_path):
        import shutil
        try:
            shutil.copy2(repo_db_path, db_path)
            logger.info("Copied initial database to /tmp")
        except Exception as e:
            logger.error(f"Failed to copy database: {e}")
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_path}'
    
    # Media root for Vercel
    UPLOAD_BASE_DIR = '/tmp/media'
else:
    db_path = os.path.join(BASE_DIR, 'portfolio.db')
    app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(BASE_DIR, 'portfolio.db')}"
    UPLOAD_BASE_DIR = os.path.join(BASE_DIR, 'media')

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Ensure Media Directories Exist
for subpath in ['resumes', 'projects', 'skills', 'social_icons', 'profile']:
    path = os.path.join(UPLOAD_BASE_DIR, subpath)
    if not os.path.exists(path):
        try:
            os.makedirs(path, exist_ok=True)
            logger.info(f"Created directory: {path}")
        except Exception as e:
            logger.error(f"Failed to create directory {path}: {e}")
app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'

# User model for session management
class User(UserMixin):
    def __init__(self, id):
        self.id = id

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

@login_manager.user_loader
def load_user(user_id):
    if user_id == ADMIN_USERNAME:
        return User(user_id)
    return None

# Custom Admin View with Security
class SecureModelView(ModelView):
    def is_accessible(self):
        return current_user.is_authenticated

    def _handle_view(self, name, **kwargs):
        if not self.is_accessible():
            return redirect(url_for('login', next=request.url))

class SecureAdminIndexView(AdminIndexView):
    def is_accessible(self):
        return current_user.is_authenticated

    def _handle_view(self, name, **kwargs):
        if not self.is_accessible():
            return redirect(url_for('login', next=request.url))

    @expose('/')
    def index(self):
        profiles = Profile.query.all()
        projects = Project.query.all()
        skills = Skill.query.all()
        social_links = SocialLink.query.all()
        return self.render('admin/index.html', 
                           profiles=profiles, 
                           projects=projects, 
                           skills=skills, 
                           social_links=social_links)

# Initialize Database
db.init_app(app)

# Create tables and handle migrations
with app.app_context():
    db.create_all()
    # Check if profile_pic column exists in Profile table
    try:
        from sqlalchemy import inspect, text
        inspector = inspect(db.engine)
        columns = [c['name'] for c in inspector.get_columns('profile')]
        if 'profile_pic' not in columns:
            with db.engine.connect() as conn:
                conn.execute(text('ALTER TABLE profile ADD COLUMN profile_pic VARCHAR(255)'))
                conn.commit()
                logger.info("Added profile_pic column to profile table")
    except Exception as e:
        logger.error(f"Migration error: {e}")

# Specialized ModelViews with FileUploadField
class ProfileModelView(SecureModelView):
    form_overrides = {
        'resume_file': FileUploadField,
        'profile_pic': FileUploadField
    }
    form_args = {
        'resume_file': {
            'label': 'Resume (PDF)',
            'base_path': os.path.join(UPLOAD_BASE_DIR, 'resumes'),
            'allow_overwrite': True
        },
        'profile_pic': {
            'label': 'Profile Picture',
            'base_path': os.path.join(UPLOAD_BASE_DIR, 'profile'),
            'allow_overwrite': True
        }
    }

class ProjectModelView(SecureModelView):
    form_overrides = {
        'image': FileUploadField,
        'video': FileUploadField
    }
    form_args = {
        'image': {
            'label': 'Project Image',
            'base_path': os.path.join(UPLOAD_BASE_DIR, 'projects'),
            'allow_overwrite': True
        },
        'video': {
            'label': 'Project Video',
            'base_path': os.path.join(UPLOAD_BASE_DIR, 'projects'),
            'allow_overwrite': True
        }
    }

class SkillModelView(SecureModelView):
    form_overrides = {
        'icon': FileUploadField
    }
    form_args = {
        'icon': {
            'label': 'Skill Icon',
            'base_path': os.path.join(UPLOAD_BASE_DIR, 'skills'),
            'allow_overwrite': True
        }
    }

class SocialLinkModelView(SecureModelView):
    form_overrides = {
        'icon_image': FileUploadField
    }
    form_args = {
        'icon_image': {
            'label': 'Icon Image',
            'base_path': os.path.join(UPLOAD_BASE_DIR, 'social_icons'),
            'allow_overwrite': True
        }
    }

# Initialize Admin with Security
admin = Admin(app, name='Portfolio Admin', template_mode='bootstrap3', index_view=SecureAdminIndexView(), base_template='admin/custom_base.html')
admin.add_view(ProfileModelView(Profile, db.session))
admin.add_view(ProjectModelView(Project, db.session))
admin.add_view(SkillModelView(Skill, db.session))
admin.add_view(SocialLinkModelView(SocialLink, db.session))

# logout Link
admin.add_link(MenuLink(name='Logout', category='', url='/logout'))

# Authentication Routes
@app.route('/login', methods=['GET', 'POST'])
def login():
    error_msg = None
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        if username == ADMIN_USERNAME and password == ADMIN_PASSWORD:
            user = User(username)
            login_user(user)
            return redirect(request.args.get('next') or url_for('admin.index'))
        
        logger.warning(f"Login failed for user '{username}'.")
        error_msg = "Invalid credentials"
        if not ADMIN_USERNAME or not ADMIN_PASSWORD:
            error_msg = "Server Error: Admin credentials not configured"

    return render_template_string('''
        <!DOCTYPE html>
        <html>
        <head>
            <title>Admin Login | Portfolio</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Space+Grotesk:wght@600&display=swap" rel="stylesheet">
            <style>
                :root {
                    --primary: #ff8a00;
                    --primary-hover: #ffa733;
                    --bg: #f8fafc;
                    --card-bg: #ffffff;
                    --text: #1e293b;
                    --text-muted: #64748b;
                    --border: #e2e8f0;
                }
                body {
                    font-family: 'Inter', sans-serif;
                    background-color: var(--bg);
                    color: var(--text);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                    margin: 0;
                }
                .login-card {
                    background: var(--card-bg);
                    border: 1px solid var(--border);
                    padding: 3rem;
                    border-radius: 2rem;
                    width: 100%;
                    max-width: 420px;
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02);
                }
                .header {
                    margin-bottom: 2.5rem;
                    text-align: center;
                }
                .header h1 {
                    font-size: 2.25rem;
                    font-weight: 700;
                    font-family: 'Space Grotesk', sans-serif;
                    margin: 0 0 0.5rem 0;
                    color: var(--primary);
                    letter-spacing: -1px;
                }
                .header p {
                    color: var(--text-muted);
                    font-size: 0.95rem;
                    margin: 0;
                }
                .form-group {
                    margin-bottom: 1.5rem;
                }
                .form-group label {
                    display: block;
                    font-size: 0.875rem;
                    font-weight: 500;
                    margin-bottom: 0.6rem;
                    color: var(--text-muted);
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }
                input {
                    width: 100%;
                    padding: 1rem 1.25rem;
                    background: #f8fafc;
                    border: 1px solid var(--border);
                    border-radius: 1rem;
                    color: var(--text);
                    font-size: 1rem;
                    transition: all 0.3s;
                    box-sizing: border-box;
                }
                input:focus {
                    outline: none;
                    border-color: var(--primary);
                    background: #ffffff;
                    box-shadow: 0 0 0 4px rgba(255, 138, 0, 0.1);
                }
                button {
                    width: 100%;
                    padding: 1rem;
                    background: var(--primary);
                    color: white;
                    border: none;
                    border-radius: 1rem;
                    font-size: 1.1rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    margin-top: 1.5rem;
                }
                button:hover {
                    background: #ffa733;
                    transform: translateY(-2px);
                    box-shadow: 0 10px 20px rgba(255, 138, 0, 0.2);
                }
                button:active {
                    transform: translateY(0);
                }
                .error {
                    background: #fef2f2;
                    border: 1px solid #fee2e2;
                    color: #ef4444;
                    padding: 1rem;
                    border-radius: 1rem;
                    font-size: 0.9rem;
                    margin-bottom: 2rem;
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <div class="login-card">
                <div class="header">
                    <h1>Admin Access</h1>
                    <p>Portfolio Dashboard Login</p>
                </div>
                
                {% if error %}
                <div class="error">
                    {{ error }}
                </div>
                {% endif %}
                
                <form method="post">
                    <div class="form-group">
                        <label>Username</label>
                        <input type="text" name="username" placeholder="admin" required autofocus>
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" name="password" placeholder="••••••••" required>
                    </div>
                    <button type="submit">Log In</button>
                </form>
            </div>
        </body>
        </html>
    ''', error=error_msg)

@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('login'))

# Serve Media Files
@app.route('/media/<path:filename>')
def serve_media(filename):
    # Search in multiple potential locations for compatibility
    search_dirs = [
        os.path.join(BASE_DIR, 'media'),
        '/tmp/media'
    ]
    
    # Files might be nested in subfolders like 'skills/icons/' due to legacy data
    # We strip any path parts and search for the basename in our standard subfolders
    base_name = os.path.basename(filename)
    
    # List of subfolders to check
    subfolders = ['', 'resumes', 'projects', 'skills', 'skills/icons', 'social_icons']
    
    for d in search_dirs:
        if not os.path.exists(d):
            continue
        for sub in subfolders:
            target_path = os.path.join(d, sub, base_name)
            if os.path.isfile(target_path):
                return send_from_directory(os.path.join(d, sub), base_name)

    return jsonify({"error": "Media file not found", "attempted": filename}), 404

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
            "image": f"/media/projects/{os.path.basename(p.image)}" if p.image and not p.image.startswith('http') and not p.image.startswith('/') else p.image,
            "video": f"/media/projects/{os.path.basename(p.video)}" if p.video and not p.video.startswith('http') and not p.video.startswith('/') else p.video,
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
            "resume_url": f"/media/resumes/{os.path.basename(profile.resume_file)}" if profile.resume_file and not str(profile.resume_file).startswith('/') else profile.resume_file,
            "profile_pic": f"/media/profile/{os.path.basename(profile.profile_pic)}" if profile.profile_pic and not str(profile.profile_pic).startswith('/') else profile.profile_pic
        },
        "about": {
            "title": "About Me",
            "description": profile.bio or "I'm a software engineer focused on building clean, scalable backends..."
        },
        "skills": [{
            "id": s.id,
            "name": s.name,
            "icon": f"/media/skills/{os.path.basename(s.icon)}" if s.icon and not s.icon.startswith('http') and not s.icon.startswith('fa') and not s.icon.startswith('/') else s.icon,
            "order": s.order
        } for s in skills],
        "social_links": [{
            "id": sl.id,
            "name": sl.name,
            "url": sl.url,
            "icon_class": sl.icon_class,
            "icon_image": f"/media/social_icons/{os.path.basename(sl.icon_image)}" if sl.icon_image and not sl.icon_image.startswith('/') else sl.icon_image
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
        "image": f"/media/projects/{os.path.basename(p.image)}" if p.image and not p.image.startswith('http') and not p.image.startswith('/') else p.image,
        "video": f"/media/projects/{os.path.basename(p.video)}" if p.video and not p.video.startswith('http') and not p.video.startswith('/') else p.video,
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
    port = int(os.environ.get('PORT', 8000))
    app.run(host='0.0.0.0', port=port, debug=True)
