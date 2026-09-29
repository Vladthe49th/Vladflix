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
            'Mystery',
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
            {
                'title': 'The Matrix',
                'description': 'A computer hacker discovers that reality is not what it seems.',
                'release_year': 1999,
                'duration': 136,
                'genres': ['Action', 'Sci-Fi', 'Thriller'],
                'poster': 'posters/matrix.jpg',
                'video': 'movies/matrix.mp4',
            },
            {
                'title': 'Gladiator',
                'description': 'A betrayed Roman general seeks revenge after being forced into slavery.',
                'release_year': 2000,
                'duration': 155,
                'genres': ['Action', 'Adventure', 'Drama'],
                'poster': 'posters/gladiator.jpg',
                'video': 'movies/gladiator.mp4',
            },
            {
                'title': 'Dune',
                'description': 'A young nobleman must protect his family and fulfill his destiny on a dangerous desert planet.',
                'release_year': 2021,
                'duration': 155,
                'genres': ['Sci-Fi', 'Adventure', 'Drama'],
                'poster': 'posters/dune.jpg',
                'video': 'movies/dune.mp4',
            },
            {
                'title': 'Parasite',
                'description': 'A struggling family gradually becomes involved with a wealthy household.',
                'release_year': 2019,
                'duration': 132,
                'genres': ['Drama', 'Thriller', 'Comedy'],
                'poster': 'posters/parasite.jpg',
                'video': 'movies/parasite.mp4',
            },
            {
                'title': 'Mad Max: Fury Road',
                'description': 'A group of survivors attempts to escape across a dangerous wasteland.',
                'release_year': 2015,
                'duration': 120,
                'genres': ['Action', 'Adventure', 'Sci-Fi'],
                'poster': 'posters/mad_max.jpg',
                'video': 'movies/mad_max.mp4',
            },
            {
                'title': 'John Wick',
                'description': 'A retired assassin returns to his violent past after a personal tragedy.',
                'release_year': 2014,
                'duration': 101,
                'genres': ['Action', 'Crime', 'Thriller'],
                'poster': 'posters/john_wick.jpg',
                'video': 'movies/john_wick.mp4',
            },
            {
                'title': 'The Shawshank Redemption',
                'description': 'A banker imprisoned for murder forms an unlikely friendship and hopes for freedom.',
                'release_year': 1994,
                'duration': 142,
                'genres': ['Drama', 'Crime'],
                'poster': 'posters/shawshank.jpg',
                'video': 'movies/shawshank.mp4',
            },
            {
                'title': 'Get Out',
                'description': 'A young man visits his girlfriend’s family and discovers something deeply disturbing.',
                'release_year': 2017,
                'duration': 104,
                'genres': ['Horror', 'Thriller', 'Mystery'],
                'poster': 'posters/get_out.jpg',
                'video': 'movies/get_out.mp4',
            },
            {
                'title': 'Whiplash',
                'description': 'A young drummer pushes himself to the limit under an abusive instructor.',
                'release_year': 2014,
                'duration': 106,
                'genres': ['Drama'],
                'poster': 'posters/whiplash.jpg',
                'video': 'movies/whiplash.mp4',
            },
            {
                'title': 'The Lord of the Rings: The Fellowship of the Ring',
                'description': 'A young hobbit begins a dangerous journey to destroy a powerful ring.',
                'release_year': 2001,
                'duration': 178,
                'genres': ['Fantasy', 'Adventure', 'Drama'],
                'poster': 'posters/lotr_fellowship.jpg',
                'video': 'movies/lotr_fellowship.mp4',
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

            # =========================================================
            # NEW SERIES
            # =========================================================

            {
                'title': 'The Last of Us',
                'description': 'A smuggler and a young girl travel across a post-apocalyptic United States.',
                'release_year': 2023,
                'genres': ['Drama', 'Horror', 'Adventure'],
                'poster': 'posters/the_last_of_us.jpg',

                'episodes': [
                    {
                        'title': 'When You’re Lost in the Darkness',
                        'number': 1,
                        'duration': 81,
                        'video': 'episodes/the_last_of_us_01.mp4',
                    },
                    {
                        'title': 'Infected',
                        'number': 2,
                        'duration': 53,
                        'video': 'episodes/the_last_of_us_02.mp4',
                    },
                    {
                        'title': 'Long, Long Time',
                        'number': 3,
                        'duration': 75,
                        'video': 'episodes/the_last_of_us_03.mp4',
                    },
                ],
            },

            {
                'title': 'The Boys',
                'description': 'A group of vigilantes attempts to expose corrupt superheroes and the corporation behind them.',
                'release_year': 2019,
                'genres': ['Action', 'Comedy', 'Crime', 'Drama'],
                'poster': 'posters/the_boys.jpg',

                'episodes': [
                    {
                        'title': 'The Name of the Game',
                        'number': 1,
                        'duration': 61,
                        'video': 'episodes/the_boys_01.mp4',
                    },
                    {
                        'title': 'Cherry',
                        'number': 2,
                        'duration': 60,
                        'video': 'episodes/the_boys_02.mp4',
                    },
                    {
                        'title': 'Get Some',
                        'number': 3,
                        'duration': 60,
                        'video': 'episodes/the_boys_03.mp4',
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