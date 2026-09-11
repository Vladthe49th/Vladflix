from idlelib.history import History

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


def user_register(request):
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

    return render(request, 'core/registration.html', {'form': form})

@login_required
def user_logout(request):
    logout(request)
    messages.info(request, 'Вы успешно вышли из системы.')
    return redirect('core:index')

@login_required
def user_profile(request):
    profile, created = Profile.objects.get_or_create(user=request.user)

    if request.method == 'POST':
        form = ProfileForm(request.POST, request.FILES, instance=profile)
        if form.is_valid():
            form.save()
            return redirect('core:profile')
    else:
        form = ProfileForm(instance=profile)

    context = {
        'form': form,
    }
    return render(request, 'core/profile.html', context)

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

    context = {
        'contents': contents,
        'recommendations': recommendations,
        'detectives': detectives,
        'thrillers': thrillers,
    }
    
    return render(request, 'core/films.html', context)

def watch(request, content_id, episode_number=None):
    content = get_object_or_404(
        Content.objects.select_related('movie', 'series').prefetch_related('series__episodes'),
        pk=content_id,
    )

    episode = None
    episodes = None
    video_url = None

    if content.type == Content.ContentType.MOVIE:
        movie = getattr(content, 'movie', Movie)
        if not movie or not movie.video:
            raise Http404('Видео для этого фильма ещё не загружено.')
        video_url = movie.video.url

    elif content.type == Content.ContentType.SERIES:
        series = getattr(content, 'series', Series)
        if not series:
            raise Http404('Сериал не найден.')

        episodes = series.episodes.all()
        if not episodes.exists():
            raise Http404('Для этого сериала пока нет серий.')

        if episode_number is not None:
            episode = get_object_or_404(episodes, number=episode_number)
        else:
            episode = episodes.first()

        if not episode.video:
            raise Http404('Видео для этой серии ещё не загружено.')
        video_url = episode.video.url

    progress = 0
    if request.user.is_authenticated:
        history = WatchHistory.objects.filter(user=request.user, content=content).first()
        if history:
            progress = history.progress

    next_episode = None
    prev_episode = None
    if episodes is not None and episode is not None:
        next_episode = episodes.filter(number__gt=episode.number).order_by('number').first()
        prev_episode = episodes.filter(number__lt=episode.number).order_by('-number').first()

    context = {
        'content': content,
        'episode': episode,
        'episodes': episodes,
        'video_url': video_url,
        'progress': progress,
        'next_episode': next_episode,
        'prev_episode': prev_episode,
    }
    return render(request, 'core/watch.html', context)

@require_POST
def save_progress(request, content_id):
    if not request.user.is_authenticated:
        return JsonResponse({'ok': False, 'reason': 'not_authenticated'}, status=401)

    content = get_object_or_404(Content, pk=content_id)

    try:
        data = json.loads(request.body.decode('utf-8'))
        progress = int(data.get('progress', 0))
    except (ValueError, TypeError, json.JSONDecodeError):
        return JsonResponse({'ok': False, 'reason': 'bad_request'}, status=400)

    progress = max(0, progress)

    WatchHistory.objects.update_or_create(
        user=request.user,
        content=content,
        defaults={'progress': progress}
    )

    return JsonResponse({'ok': True, 'progress': progress})