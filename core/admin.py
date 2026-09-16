from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User
from .models import *

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'id', 'display_name')
    search_fields = ('user__id', 'user__username', 'user__email')

admin.site.unregister(User)

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    # Указываем имя метода 'get_display_name' вместо прямого обращения к полю
    list_display = ('id', 'username', 'email', 'get_display_name', 'is_staff')

    # Метод для получения display_name из связанной модели Profile
    @admin.display(description='Отображаемое имя')
    def get_display_name(self, obj):
        if hasattr(obj, 'profile'):
            return obj.profile.display_name
        return '-'


class MovieInline(admin.StackedInline):
    model = Movie
    can_delete = False
    verbose_name_plural = 'Данные фильма'

class SeriesInline(admin.StackedInline):
    model = Series
    can_delete = False
    verbose_name_plural = 'Данные сериала'

@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)

@admin.register(Content)
class ContentAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'release_year', 'type')
    search_fields = ('title',)
    list_filter = ('type', 'genres')
    filter_horizontal = ('genres',)  
    inlines = [MovieInline, SeriesInline]

@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    list_display = ('get_title', 'duration')

    @admin.display(description='Название фильма', ordering='content__title')
    def get_title(self, obj):
        return obj.content.title

@admin.register(Series)
class SeriesAdmin(admin.ModelAdmin):
    list_display = ('get_title',)

    @admin.display(description='Название сериала', ordering='content__title')
    def get_title(self, obj):
        return obj.content.title

@admin.register(Episode)
class EpisodeAdmin(admin.ModelAdmin):
    list_display = ('title', 'series', 'number', 'duration')
    search_fields = ('title', 'series__content__title')
    list_filter = ('series',)

@admin.register(Favorite)
class FavoriteAdmin(admin.ModelAdmin):
    list_display = ('user', 'content')

@admin.register(Rating)
class RatingAdmin(admin.ModelAdmin):
    list_display = ('user', 'content', 'score')
    list_filter = ('score',)

@admin.register(WatchHistory)
class WatchHistoryAdmin(admin.ModelAdmin):
    list_display = ('user', 'content', 'progress', 'watched_at')

@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ('title', 'published_at')
    search_fields = ('title',)
    ordering = ('-published_at',)