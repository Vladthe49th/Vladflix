from django.views.decorators.csrf import ensure_csrf_cookie
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, Http404
from django.views.decorators.http import require_POST
from django.utils.http import url_has_allowed_host_and_scheme
import json
from .forms import UserLoginForm, UserRegistrationForm, ProfileForm
from .models import Profile, Movie, Series
from .models import Content, Episode, WatchHistory, Genre, News

def index(request):
    return render(request, 'core/index.html')

def custom_404(request, exception=None):
    return render(request, 'core/404.html', status=404)

def _safe_next_url(request, next_url):
    if next_url and url_has_allowed_host_and_scheme(
        url=next_url,
        allowed_hosts={request.get_host()},
        require_https=request.is_secure(),
    ):
        return next_url
    return ''

def user_login(request):
    if request.user.is_authenticated:
        return redirect('core:index')

    next_url = _safe_next_url(request, request.POST.get('next') or request.GET.get('next'))

    if request.method == 'POST':
        form = UserLoginForm(request, data=request.POST)

        if form.is_valid():
            user = form.get_user()

            login(request, user)

            messages.success(request, f'Добро пожаловать, {user.username}!')
            return redirect(next_url or 'core:index')
        else:
            messages.error(request, 'Неверное имя пользователя или пароль.')

    else:
        form = UserLoginForm()

    return render(request, 'core/login.html', {'form': form, 'next': next_url})

def register(request):
    if request.user.is_authenticated:
        return redirect('core:index')

    next_url = _safe_next_url(request, request.POST.get('next') or request.GET.get('next'))

    if request.method == 'POST':
        form = UserRegistrationForm(request.POST)
        if form.is_valid():
            user = form.save()

            login(request, user)

            messages.success(request, f'Аккаунт {user.username} успешно создан!')
            return redirect(next_url or 'core:index')
        else:
            messages.error(request, 'Пожалуйста, исправьте ошибки при регистрации.')
    else:
        form = UserRegistrationForm()

    return render(request, 'core/register.html', {'form': form, 'next': next_url})

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

@login_required
def history(request):
    watch_history = (
        WatchHistory.objects
        .filter(user=request.user)
        .select_related('content')
        .order_by('-watched_at')
    )
    return render(request, 'core/history.html', {'watch_history': watch_history})

def news(request):
    news_list = News.objects.all()
    return render(request, 'core/news.html', {'news_list': news_list})

def notification(request):
    return render(request, 'core/notification.html')

def register_agreement(request):
    return render(request, 'core/register_agreement.html')

GENRE_SECTION_LIMIT = 5

def content_list(request):
    contents = (
        Content.objects
        .prefetch_related('genres')
        .select_related('movie', 'series')
        .all()
        .order_by('-release_year', '-id')
    )

    genres = Genre.objects.order_by('name')

    selected_genre = None
    genre_id = request.GET.get('genre')

    if genre_id:
        selected_genre = genres.filter(pk=genre_id).first()

    # =========================================================
    # WATCH HISTORY
    # =========================================================

    if request.user.is_authenticated:
        watch_history = (
            WatchHistory.objects
            .filter(user=request.user)
            .select_related('content')
            .order_by('-watched_at')
        )
    else:
        watch_history = []

    # =========================================================
    # FILTERED BY GENRE
    # =========================================================

    filtered_contents = None

    if selected_genre:
        filtered_contents = (
            contents
            .filter(genres=selected_genre)
            .distinct()
        )

    # =========================================================
    # MAIN PAGE
    # =========================================================

    genre_sections = []
    recommendations = []

    if not selected_genre:

        # -----------------------------------------------------
        # RECOMMENDATIONS
        # -----------------------------------------------------

        recommendations = list(contents[:5])

        # Запоминаем фильмы/сериалы, которые уже показали
        used_content_ids = {
            content.pk
            for content in recommendations
        }

        # -----------------------------------------------------
        # GENRE SECTIONS
        # -----------------------------------------------------

        for genre in genres:

            # Получаем контент этого жанра,
            # который ещё нигде не показывался
            items = list(
                contents
                .filter(genres=genre)
                .exclude(pk__in=used_content_ids)
                .distinct()
            )

            if not items:
                continue

            # Показываем максимум 5
            visible_items = items[:GENRE_SECTION_LIMIT]

            # Запоминаем показанный контент
            used_content_ids.update(
                item.pk
                for item in visible_items
            )

            genre_sections.append({
                'genre': genre,
                'items': visible_items,
                'has_more': len(items) > GENRE_SECTION_LIMIT,
            })

    # =========================================================
    # CONTEXT
    # =========================================================

    context = {
        'contents': contents,
        'genres': genres,
        'selected_genre': selected_genre,
        'filtered_contents': filtered_contents,
        'watch_history': watch_history,
        'recommendations': recommendations,
        'genre_sections': genre_sections,
    }

    return render(request, 'core/films.html', context)

@login_required
def watch_content(request, pk):
    content = get_object_or_404(
        Content.objects.select_related('movie', 'series'),
        pk=pk,
    )

    if content.type == Content.ContentType.SERIES:
        first_episode = content.series.episodes.first()
        if not first_episode:
            raise Http404
        return redirect('core:watch_episode', pk=content.pk, number=first_episode.number)

    movie = getattr(content, 'movie', None)
    if movie is None:
        raise Http404

    watch_history, _ = WatchHistory.objects.get_or_create(user=request.user, content=content)

    context = {
        'content': content,
        'video_url': movie.video.url if movie.video else '',
        'progress': watch_history.progress,
        'episode': None,
        'episodes': None,
        'prev_episode': None,
        'next_episode': None,
    }
    return render(request, 'core/watch.html', context)

@login_required
def watch_episode(request, pk, number):
    content = get_object_or_404(
        Content.objects.select_related('series'),
        pk=pk,
        type=Content.ContentType.SERIES,
    )
    episodes = list(content.series.episodes.all())

    print('SERIES:', content.title)
    print('EPISODES:', episodes)
    print('COUNT:', len(episodes))

    episode = get_object_or_404(Episode, series=content.series, number=number)

    index_in_list = episodes.index(episode)
    prev_episode = episodes[index_in_list - 1] if index_in_list > 0 else None
    next_episode = episodes[index_in_list + 1] if index_in_list < len(episodes) - 1 else None

    watch_history, _ = WatchHistory.objects.get_or_create(user=request.user, content=content)

    context = {
        'content': content,
        'video_url': episode.video.url if episode.video else '',
        'progress': watch_history.progress,
        'episode': episode,
        'episodes': episodes,
        'prev_episode': prev_episode,
        'next_episode': next_episode,
    }
    return render(request, 'core/watch.html', context)

@login_required
@require_POST
def save_progress(request, pk):
    content = get_object_or_404(Content, pk=pk)

    try:
        data = json.loads(request.body)
        progress = int(data.get('progress', 0))
    except (ValueError, TypeError, json.JSONDecodeError):
        return JsonResponse({'error': 'invalid progress value'}, status=400)

    watch_history, _ = WatchHistory.objects.update_or_create(
        user=request.user,
        content=content,
        defaults={'progress': max(0, progress)},
    )

    return JsonResponse({'progress': watch_history.progress})
