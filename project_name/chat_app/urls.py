
from django.urls import path
from . import views
from django.contrib.auth import views as auth_views  # Import auth_views

urlpatterns = [
    path('signup/', views.signup_view, name='signup'),  # Signup URL
    path('', views.chat_view, name='chat_view'),
    path('chat/', views.chat_view, name='chat_view'),
    path('chat/<int:user_id>/', views.get_chat_messages, name='get_chat_messages'),
    path('login/', auth_views.LoginView.as_view(template_name='login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('send_message/', views.send_message, name='send_message'),
    path('get_messages/<str:username>/', views.get_messages, name='get_messages'),
]
