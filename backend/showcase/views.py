from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import requests
import os

@csrf_exempt
def contact_form_submission(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            google_script_url = os.environ.get('GOOGLE_SHEETS_SCRIPT_URL')
            
            if not google_script_url:
                return JsonResponse({'error': 'Google Script URL not configured'}, status=500)
            
            # Proxy request to Google Sheets
            response = requests.post(google_script_url, json=data)
            
            # Since the original script might return redirections or specific responses, 
            # and the previous frontend used no-cors, we'll return a simple success.
            return JsonResponse({'status': 'success', 'message': 'Message sent successfully!'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    
    return JsonResponse({'error': 'Invalid method'}, status=405)
