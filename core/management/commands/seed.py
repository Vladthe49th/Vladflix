from django.core.management.base import BaseCommand
from core.models import Content, Genre, Movie, Series, Episode


class Command(BaseCommand):
    def handle(self, *args, **options):

        self.stdout.write('Starting seed...\n')

        # =========================================================
        # GENRES
        # =========================================================

        genre_names = [
            'Action',
            'Adventure',
            'Comedy',
            'Drama',
            'Horror',
            'Sci-Fi',
            'Thriller',
            'Fantasy',
            'Crime',
            'Animation',
        ]

        genres = {}

        for name in genre_names:
            genre, _ = Genre.objects.get_or_create(name=name)
            genres[name] = genre

        # =========================================================
        # MOVIES
        # =========================================================

        movies = [
            {
                'title': 'Interstellar',
                'description': 'A group of astronauts travels through a wormhole in search of a new home for humanity.',
                'release_year': 2014,
                'duration': 169,
                'genres': ['Sci-Fi', 'Drama', 'Adventure'],
                'poster': 'posters/interstellar.jpg',
                'video': 'movies/interstellar.mp4',
            },
            {
                'title': 'The Dark Knight',
                'description': 'Batman faces a criminal mastermind who plunges Gotham into chaos.',
                'release_year': 2008,
                'duration': 152,
                'genres': ['Action', 'Crime', 'Drama', 'Thriller'],
                'poster': 'posters/dark_knight.jpg',
                'video': 'movies/dark_knight.mp4',
            },
            {
                'title': 'Inception',
                'description': 'A skilled thief enters the dreams of others to steal valuable secrets.',
                'release_year': 2010,
                'duration': 148,
                'genres': ['Action', 'Sci-Fi', 'Thriller'],
                'poster': 'posters/inception.jpg',
                'video': 'movies/inception.mp4',
            },
            {
                'title': 'Spider-Man: Into the Spider-Verse',
                'description': 'A teenager becomes Spider-Man and discovers that there are other Spider-People.',
                'release_year': 2018,
                'duration': 117,
                'genres': ['Action', 'Adventure', 'Animation'],
                'poster': 'posters/spider_verse.jpg',
                'video': 'movies/spider_verse.mp4',
            },
            {
                'title': 'The Conjuring',
                'description': 'Paranormal investigators help a family experiencing disturbing supernatural events.',
                'release_year': 2013,
                'duration': 112,
                'genres': ['Horror', 'Thriller'],
                'poster': 'posters/conjuring.jpg',
                'video': 'movies/conjuring.mp4',
            },
        ]

        for data in movies:

            content, _ = Content.objects.update_or_create(
                title=data['title'],
                defaults={
                    'description': data['description'],
                    'poster': data['poster'],
                    'release_year': data['release_year'],
                    'type': Content.ContentType.MOVIE,
                }
            )

            content.genres.set(
                genres[name]
                for name in data['genres']
            )

            Movie.objects.update_or_create(
                content=content,
                defaults={
                    'duration': data['duration'],
                    'video': data['video'],
                }
            )

            self.stdout.write(
                self.style.SUCCESS(
                    f'✓ Movie: {content.title}'
                )
            )

        # =========================================================
        # SERIES
        # =========================================================

        series_data = [
            {
                'title': 'Breaking Bad',
                'description': 'A chemistry teacher turns to producing methamphetamine after receiving a terminal diagnosis.',
                'release_year': 2008,
                'genres': ['Crime', 'Drama', 'Thriller'],
                'poster': 'posters/breaking_bad.jpg',

                'episodes': [
                    {
                        'title': 'Pilot',
                        'number': 1,
                        'duration': 58,
                        'video': 'episodes/breaking_bad_01.mp4',
                    },
                    {
                        'title': 'Cat in the Bag',
                        'number': 2,
                        'duration': 48,
                        'video': 'episodes/breaking_bad_02.mp4',
                    },
                    {
                        'title': 'And the Bag’s in the River',
                        'number': 3,
                        'duration': 48,
                        'video': 'episodes/breaking_bad_03.mp4',
                    },
                ],
            },

            {
                'title': 'Stranger Things',
                'description': 'A group of friends discovers mysterious supernatural events in their small town.',
                'release_year': 2016,
                'genres': ['Drama', 'Horror', 'Sci-Fi', 'Adventure'],
                'poster': 'posters/stranger_things.jpg',

                'episodes': [
                    {
                        'title': 'The Vanishing of Will Byers',
                        'number': 1,
                        'duration': 49,
                        'video': 'episodes/stranger_things_01.mp4',
                    },
                    {
                        'title': 'The Weirdo on Maple Street',
                        'number': 2,
                        'duration': 56,
                        'video': 'episodes/stranger_things_02.mp4',
                    },
                    {
                        'title': 'Holly, Jolly',
                        'number': 3,
                        'duration': 52,
                        'video': 'episodes/stranger_things_03.mp4',
                    },
                ],
            },
        ]

        # =========================================================
        # SERIES + EPISODES
        # =========================================================

        for data in series_data:

            content, _ = Content.objects.update_or_create(
                title=data['title'],
                defaults={
                    'description': data['description'],
                    'poster': data['poster'],
                    'release_year': data['release_year'],
                    'type': Content.ContentType.SERIES,
                }
            )

            content.genres.set(
                genres[name]
                for name in data['genres']
            )

            series, _ = Series.objects.get_or_create(
                content=content
            )

            for episode_data in data['episodes']:

                Episode.objects.update_or_create(
                    series=series,
                    number=episode_data['number'],
                    defaults={
                        'title': episode_data['title'],
                        'duration': episode_data['duration'],
                        'video': episode_data['video'],
                    }
                )

                self.stdout.write(
                    f'  ✓ Episode: '
                    f'{content.title} '
                    f'S01E{episode_data["number"]:02d}'
                )

            self.stdout.write(
                self.style.SUCCESS(
                    f'✓ Series: {content.title}'
                )
            )

        self.stdout.write(
            self.style.SUCCESS('\nSeed completed!')
        )