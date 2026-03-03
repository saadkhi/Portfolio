from rest_framework import serializers

class ContactFormSerializer(serializers.Serializer):
    email = serializers.EmailField()
    purpose = serializers.ChoiceField(choices=[
        ('project', 'New Project'),
        ('collaboration', 'Collaboration'),
        ('inquiry', 'General Inquiry'),
        ('other', 'Something Else')
    ])
    message = serializers.CharField(max_length=2000)
    date = serializers.CharField(required=False)
