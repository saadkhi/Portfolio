import os
import json
import logging
from typing import Optional, List
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Portfolio API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Constants
DATA_FILE = os.path.join(os.path.dirname(__file__), "data.json")

# Models for Request Validation
class ContactForm(BaseModel):
    name: str
    email: EmailStr
    message: str
    purpose: str
    date: Optional[str] = ""

def load_data():
    try:
        with open(DATA_FILE, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        logger.error(f"Data file not found at {DATA_FILE}")
        return {}
    except json.JSONDecodeError:
        logger.error(f"Error decoding JSON from {DATA_FILE}")
        return {}

@app.get("/api/portfolio/")
@app.get("/api/portfolio")
async def get_portfolio():
    data = load_data()
    if not data:
        raise HTTPException(status_code=500, detail="Portfolio data unavailable")

    profile = data.get('profile', {})
    projects = data.get('projects', [])
    skills = data.get('skills', [])
    social_links = data.get('social_links', [])

    featured_projects = [p for p in projects if p.get('is_featured')][:3]
    latest_projects = [p for p in projects if not p.get('is_featured')][:6]

    return {
        "hero": {
            "name": profile.get("name", "Saad"),
            "title": profile.get("title", "Software Engineer"),
            "subtitle": "AI & Software Engineer",
            "cta_primary": "See My Work",
            "cta_secondary": "Get in Touch",
            "resume_url": profile.get("resume_file")
        },
        "about": {
            "title": "About Me",
            "description": profile.get("bio") or "I'm a software engineer focused on building clean, scalable backends..."
        },
        "skills": skills,
        "social_links": social_links,
        "featured_projects": featured_projects,
        "latest_projects": latest_projects,
        "contact": {
            "email": profile.get("email") or "saadalioffic@gmail.com",
            "phone": profile.get("phone_number") or "+92 300 1234567",
            "location": profile.get("location") or "Karachi, Pakistan",
            "linkedin": "https://linkedin.com/in/saadkhi",
            "github": "https://github.com/saadkhi"
        }
    }

@app.post("/api/contact/")
@app.post("/api/contact")
async def contact_form_submission(form_data: ContactForm):
    google_script_url = os.environ.get('GOOGLE_SHEETS_SCRIPT_URL')
    
    if not google_script_url:
        logger.error("GOOGLE_SHEETS_SCRIPT_URL not configured.")
        raise HTTPException(status_code=500, detail="Service temporarily unavailable.")
    
    try:
        proxy_data = {
            'email': form_data.email,
            'purpose': form_data.purpose,
            'message': form_data.message,
            'date': form_data.date
        }
        
        response = requests.post(google_script_url, json=proxy_data, timeout=10)
        
        return {
            'error': False,
            'message': 'Message sent successfully!'
        }

    except requests.exceptions.RequestException as e:
        logger.error(f"Error proxying to Google Sheets: {str(e)}")
        raise HTTPException(status_code=503, detail="Failed to forward message. Please try again later.")
    except Exception as e:
        logger.error(f"Unexpected error in contact submission: {str(e)}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred.")

@app.get("/health")
async def health_check():
    return {"status": "ok"}
