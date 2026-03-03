from django.test import TestCase, override_settings
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from .models import Project, Profile, Skill, SocialLink
import unittest
from unittest.mock import patch

class PortfolioAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = reverse('api_portfolio')

    def test_get_portfolio_data_empty(self):
        """Test returning default data when DB is empty."""
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('hero', response.data)
        self.assertEqual(response.data['hero']['name'], 'Saad')

    def test_get_portfolio_data_with_content(self):
        """Test returning actual data when DB has content."""
        Profile.objects.create(name='Test User', title='Testing Engineer', bio='Testing bio')
        Project.objects.create(title='Test Project', description='Test Desc', is_featured=True)
        
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['hero']['name'], 'Test User')
        self.assertEqual(len(response.data['featured_projects']), 1)

    @override_settings(DEBUG=True)
    @patch('showcase.api.Project.objects.filter')
    def test_get_portfolio_data_error(self, mock_filter):
        """Test standard error response on unhandled exception."""
        mock_filter.side_effect = Exception("Database is down!")
        
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertEqual(response.data['error'], True)
        self.assertEqual(response.data['message'], 'An unexpected error occurred. Please try again later.')
        self.assertIn('Database is down!', str(response.data.get('details', '')))

class ContactAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = reverse('contact_api')

    def test_contact_invalid_data(self):
        """Test validation error format."""
        response = self.client.post(self.url, data={}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], True)
        self.assertEqual(response.data['message'], 'Invalid form data.')
        self.assertIn('email', response.data['details'])
