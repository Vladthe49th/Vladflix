from django.urls import path
from . import views

app_name = 'core'

urlpatterns = [
    path('', views.index, name='index'),
    path('main/', views.main, name='main'),
    path('login/', views.user_login, name='login'),
    path('register/', views.user_register, name='register'),
    path('profile/', views.user_profile, name='profile'),
    path('logout/', views.user_logout, name='logout'),
    path('films/', views.content_list, name='films'),
    path('account/', views.account, name='account'),
    path('history/', views.history, name='history'),
    path('news/', views.news, name='news'),
    path('notification/', views.notification, name='notification'),
    path('register-agreement/', views.register_agreement, name='register_agreement'),
]