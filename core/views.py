from django.views.decorators.csrf import ensure_csrf_cookie
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, Http404
from django.views.decorators.http import require_POST
import json
from .forms import UserLoginForm, UserRegistrationForm, ProfileForm
from .models import Profile, Movie, Series
from .models import Content, Episode, WatchHistory

def index(request):
    return render(request, 'core/index.html')

def user_login(request):
    if request.user.is_authenticated:
        return redirect('core:index')

    if request.method == 'POST':
        form = UserLoginForm(request, data=request.POST)

        if form.is_valid():
            user = form.get_user()
            
            login(request, user)
            
            messages.success(request, f'Добро пожаловать, {user.username}!')
            return redirect('core:index') 
        else:
            messages.error(request, 'Неверное имя пользователя или пароль.')

    else:
        form = UserLoginForm()

    return render(request, 'core/login.html', {'form': form})

def register(request):
    if request.user.is_authenticated:
        return redirect('core:index')

    if request.method == 'POST':
        form = UserRegistrationForm(request.POST)
        if form.is_valid():
            user = form.save()

            login(request, user)
            
            messages.success(request, f'Аккаунт {user.username} успешно создан!')
            return redirect('core:index')
        else:
            messages.error(request, 'Пожалуйста, исправьте ошибки при регистрации.')
    else:
        form = UserRegistrationForm()

    return render(request, 'core/register.html', {'form': form})

@login_required
def user_logout(request):
    logout(request)
    messages.info(request, 'Вы успешно вышли из системы.')
    return redirect('core:index')

@login_required
def user_account(request):
    profile, created = Profile.objects.get_or_create(user=request.user)

    if request.method == 'POST':
        form = ProfileForm(request.POST, request.FILES, instance=profile)
        if form.is_valid():
            form.save()
            return redirect('core:account')
    else:
        form = ProfileForm(instance=profile)

    context = {
        'form': form,
    }
    return render(request, 'core/account.html', context)

def history(request):
    return render(request, 'core/history.html')

def news(request):
    return render(request, 'core/news.html')

def notification(request):
    return render(request, 'core/notification.html')

def register_agreement(request):
    return render(request, 'core/register_agreement.html')

def content_list(request):
    contents = (
        Content.objects
        .prefetch_related('genres')
        .select_related('movie', 'series')
        .all()
        .order_by('-release_year', '-id')
    )

    recommendations = contents[:5]
    detectives = contents.filter(genres__name__iexact='Detective')
    thrillers = contents.filter(genres__name__iexact='Thriller')
    sci_fi = contents.filter(genres__name__iexact='Sci-Fi').first()
    romance = contents.filter(genres__name__iexact='Romance').first()
    action = contents.filter(genres__name__iexact='Action').first()
    cartoons = contents.filter(genres__name__iexact='Cartoon').first()

    watch_history = None

    if request.user.is_authenticated:
        watch_history = (
            WatchHistory.objects
            .filter(user=request.user)
            .select_related('content')
            .order_by('-watched_at')
        )
    else:
        watch_history = []

    print(watch_history)

    context = {
        'contents': contents,
        'recommendations': recommendations,
        'detectives': detectives,
        'thrillers': thrillers,
        'sci_fi': sci_fi,
        'romance': romance,
        'action': action,
        'cartoons': cartoons,
        'watch_history': watch_history,
    }

    return render(request, 'core/films.html', context)
