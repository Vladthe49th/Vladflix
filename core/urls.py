from django.urls import path
from . import views

app_name = 'core'

urlpatterns = [
    path('', views.index, name='index'),
    path('main/', views.main, name='main'),
    path('login/', views.user_login, name='login'),
    path('register-agreement/', views.register_agreement, name='register_agreement'),
    path('register/', views.register, name='register'),
    path('account/', views.user_profile, name='account'),
    path('logout/', views.user_logout, name='logout'),
    path('films/', views.content_list, name='films'),

]