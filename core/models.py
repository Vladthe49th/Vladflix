from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    display_name = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.display_name or self.user.username

class Genre(models.Model):
    name = models.CharField(max_length=40)

    def __str__(self):
        return self.name

class Content(models.Model):
    class ContentType(models.TextChoices):
        MOVIE = 'movie', 'Movie'
        SERIES = 'series', 'Series'

    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    poster = models.ImageField(upload_to='posters/', blank=True, null=True)
    release_year = models.PositiveIntegerField(blank=True, null=True)
    type = models.CharField(max_length=10, choices=ContentType.choices)
    genres = models.ManyToManyField(Genre, related_name='contents', blank=True)

    def __str__(self):
        return self.title

class Movie(models.Model):
    content = models.OneToOneField(
        Content,
        on_delete=models.CASCADE,
        primary_key=True,
        related_name='movie'
    )
    duration = models.PositiveIntegerField(help_text='Duration in minutes')
    video = models.FileField(upload_to='movies/', blank=True, null=True)

    def __str__(self):
        return self.content.title

class Series(models.Model):
    content = models.OneToOneField(
        Content,
        on_delete=models.CASCADE,
        primary_key=True,
        related_name='series'
    )

    def __str__(self):
        return self.content.title

class Episode(models.Model):
    series = models.ForeignKey(Series, on_delete=models.CASCADE, related_name='episodes')
    title = models.CharField(max_length=255)
    number = models.PositiveIntegerField()
    duration = models.PositiveIntegerField(help_text='Duration in minutes')
    video = models.FileField(upload_to='episodes/', blank=True, null=True)

    class Meta:
        unique_together = ['series', 'number']
        ordering = ['number']

    def __str__(self):
        return f'{self.series.content.title} — S01E{self.number:02d}: {self.title}'

class Favorite(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='favorites')
    content = models.OneToOneField(Content, on_delete=models.CASCADE, related_name='favorite_by')

    class Meta:
        unique_together = ['user', 'content']

    def __str__(self):
        return f'{self.user.username} → {self.content.title}'

class Rating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='ratings')
    content = models.ForeignKey(Content, on_delete=models.CASCADE, related_name='ratings')
    score = models.PositiveSmallIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(10)],
    )

    class Meta:
        unique_together = ['user', 'content']

    def __str__(self):
        return f'{self.user.username} rated {self.content.title}: {self.score}'

class WatchHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='watch_history')
    content = models.ForeignKey(Content, on_delete=models.CASCADE, related_name='watch_history')
    progress = models.PositiveIntegerField(default=0, help_text='Progress in seconds')
    watched_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['user', 'content']
        verbose_name_plural = 'Watch Histories'

    def __str__(self):
        return f'{self.user.username} watched {self.content.title}'
