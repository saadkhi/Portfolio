from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
import requests
import os
import logging
from .serializers import ContactFormSerializer

logger = logging.getLogger(__name__)

@api_view(['POST'])
@permission_classes([AllowAny])
def contact_form_submission(request):
    """
    Handles contact form submissions, validates data, and proxies to Google Sheets.
    """
    serializer = ContactFormSerializer(data=request.data)
    if not serializer.is_valid():
        return Response({
            'error': True,
            'message': 'Invalid form data.',
            'details': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    data = serializer.validated_data
    google_script_url = os.environ.get('GOOGLE_SHEETS_SCRIPT_URL')
    
    if not google_script_url:
        logger.error("GOOGLE_SHEETS_SCRIPT_URL not configured.")
        return Response({
            'error': True,
            'message': 'Service temporarily unavailable.'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    try:
        # Proxy request to Google Sheets
        # We pass the original date if present, or let the serializer handle it
        proxy_data = {
            'email': data['email'],
            'purpose': data['purpose'],
            'message': data['message'],
            'date': data.get('date', '')
        }
        
        response = requests.post(google_script_url, json=proxy_data, timeout=10)
        
        # We return success if we reached Google Sheets, 
        # even if it redirects (often the case with Apps Script)
        return Response({
            'error': False,
            'message': 'Message sent successfully!'
        }, status=status.HTTP_200_OK)

    except requests.exceptions.RequestException as e:
        logger.error(f"Error proxying to Google Sheets: {str(e)}")
        return Response({
            'error': True,
            'message': 'Failed to forward message. Please try again later.'
        }, status=status.HTTP_503_SERVICE_UNAVAILABLE)
    except Exception as e:
        logger.error(f"Unexpected error in contact submission: {str(e)}")
        return Response({
            'error': True,
            'message': 'An unexpected error occurred.'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
