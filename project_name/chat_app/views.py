from django.shortcuts import render,redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from .models import Message
from django.contrib.auth.forms import UserCreationForm

from django.http import JsonResponse
from .models import Message
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
@login_required
def send_message(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        receiver_username = data.get('receiver')
        content = data.get('message')

        if not receiver_username or not content:
            return JsonResponse({'error': 'Invalid data'}, status=400)

        try:
            receiver = User.objects.get(username=receiver_username)
            message = Message(sender=request.user, receiver=receiver, content=content)
            message.save()
            return JsonResponse({'success': True})
        except User.DoesNotExist:
            return JsonResponse({'error': 'User does not exist'}, status=404)

@login_required
def get_messages(request, username):
    try:
        other_user = User.objects.get(username=username)
        messages = Message.objects.filter(
            (models.Q(sender=request.user) & models.Q(receiver=other_user)) |
            (models.Q(sender=other_user) & models.Q(receiver=request.user))
        ).order_by('timestamp')

        return JsonResponse({
            'messages': [
                {
                    'sender': msg.sender.username,
                    'receiver': msg.receiver.username,
                    'content': msg.content,
                    'timestamp': msg.timestamp.isoformat(),
                }
                for msg in messages
            ]
        })
    except User.DoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=404)

def signup_view(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')  # Redirect to login page after signup
    else:
        form = UserCreationForm()
    return render(request, 'signup.html', {'form': form})

@login_required
def chat_view(request):
    users = User.objects.exclude(id=request.user.id)  # All users except the logged-in user
    return render(request, 'chat.html', {'users': users})

@login_required
def get_chat_messages(request, user_id):
    recipient = User.objects.get(id=user_id)
    messages = Message.objects.filter(
        sender=request.user, recipient=recipient
    ) | Message.objects.filter(
        sender=recipient, recipient=request.user
    ).order_by('timestamp')

    return render(request, 'chat.html', {
        'users': User.objects.exclude(id=request.user.id),
        'messages': messages,
    })