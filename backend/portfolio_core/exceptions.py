from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

def custom_exception_handler(exc, context):
    """
    Custom exception handler for Django REST Framework.
    Standardizes error responses across the API.
    """
    # Call REST framework's default exception handler first,
    # to get the standard error response.
    response = exception_handler(exc, context)

    if response is not None:
        # Standardize DRF error response (e.g., validation errors, 404, 403)
        # We wrap the existing detail into our standard format
        error_data = response.data
        
        # Determine a friendly message
        message = "A client error occurred."
        if isinstance(error_data, dict):
            if 'detail' in error_data:
                message = error_data.pop('detail')
            elif error_data:
                # If it's a validation error, we might have multiple fields
                message = "Invalid data provided."
        
        response.data = {
            'error': True,
            'message': message,
            'code': response.status_code,
            'details': error_data # This contains the field-specific errors if any
        }
    else:
        # Handle non-DRF exceptions (e.g. database errors, etc.)
        # These are usually 500 errors
        logger.error(f"Unhandled exception at {context['view'].__class__.__name__}: {str(exc)}", exc_info=True)
        response = Response({
            'error': True,
            'message': 'An unexpected error occurred. Please try again later.',
            'code': 500,
            'details': str(exc) if settings.DEBUG else None
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return response

