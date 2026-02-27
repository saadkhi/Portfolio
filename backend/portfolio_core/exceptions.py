from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status
import logging

logger = logging.getLogger(__name__)

def custom_exception_handler(exc, context):
    # Call REST framework's default exception handler first,
    # to get the standard error response.
    response = exception_handler(exc, context)

    if response is not None:
        # Standardize DRF error response
        response.data = {
            'error': True,
            'message': response.data.get('detail', 'A server error occurred.'),
            'code': response.status_code,
            'details': response.data
        }
    else:
        # Handle non-DRF exceptions (e.g. database errors, etc.)
        logger.error(f"Unhandled exception: {str(exc)}", exc_info=True)
        response = Response({
            'error': True,
            'message': 'An unexpected error occurred. Please try again later.',
            'code': 500
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return response
