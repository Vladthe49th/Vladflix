from django.urls import path
from . import views

app_name = 'core'

urlpatterns = [
    path('', views.index, name='index'),
    path('login/', views.user_login, name='login'),
    path('registration/', views.user_register, name='registration'),
    path('profile/', views.user_profile, name='profile'),
    path('logout/', views.user_logout, name='logout'),
    path('allFilms/', views.content_list, name='allFilms'),
    path('films/', views.films, name='films'),
]