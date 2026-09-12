document.addEventListener('DOMContentLoaded', () => {
    const page = document.querySelector('.player-page');
    const video = document.querySelector('#videoEl');

    if (!page || !video) {
        return;
    }

    const startProgress = parseFloat(
        page.dataset.startProgress || '0'
    );

    const progressUrl = page.dataset.progressUrl;

    function getCsrfToken() {
        const input = document.querySelector(
            '[name=csrfmiddlewaretoken]'
        );

        if (input && input.value) {
            return input.value;
        }

        const cookies = document.cookie.split(';');

        for (let cookie of cookies) {
            cookie = cookie.trim();
            if (cookie.startsWith('csrftoken=')) {
                return decodeURIComponent(
                    cookie.substring('csrftoken='.length)
                );
            }
        }
        return '';
    }

    const player = new Plyr(video, {
        controls: [
            'play-large',
            'play',
            'progress',
            'current-time',
            'duration',
            'mute',
            'volume',
            'download',
            'captions',
            'settings',
            'fullscreen',
        ],

        settings: [
            'speed'
        ],

        speed: {
            selected: 1,
            options: [
                0.5,
                0.75,
                1,
                1.25,
                1.5,
                2
            ]
        },

        seekTime: 10,

        keyboard: {
            focused: true,
            global: true
        },

        tooltips: {
            controls: true,
            seek: true
        }
    });

    let progressRestored = false;

    function restoreProgress() {
        if (progressRestored) {
            return;
        }
        if (!startProgress || startProgress <= 0) {
            progressRestored = true;
            return;
        }
        if (!player.duration || !isFinite(player.duration)) {
            return;
        }

        const position = Math.min(
            startProgress,
            Math.max(0, player.duration - 1)
        );

        try {
            player.currentTime = position;
            progressRestored = true;

            console.log(
                'Restored progress:',
                position,
                'seconds'
            );
        } catch (error) {
            console.error(
                'Failed to restore progress:',
                error
            );
        }
    }

    let isSeeking = false;
    let seekSaveTimer = null;

    player.on('seeking', () => {
        console.log('SEEKING:', player.currentTime);
        isSeeking = true;
        clearTimeout(seekSaveTimer);
    });

    player.on('seeked', () => {
        console.log('SEEKED:', player.currentTime);
        isSeeking = false;

        seekSaveTimer = setTimeout(() => {
            saveProgress();
        }, 500);
    });

    player.on('timeupdate', () => {
        console.log('TIME:', player.currentTime);
    });

    player.on('loadedmetadata', () => {
        restoreProgress();
    });

    player.on('ready', () => {
        restoreProgress();
    });

    let saveInProgress = false;

    async function saveProgress() {
        if (!progressUrl || isSeeking) {
            return;
        }

        const currentTime = player.currentTime;

        if (!currentTime || currentTime <= 1) {
            return;
        }

        if (saveInProgress) {
            return;
        }

        const csrfToken = getCsrfToken();

        if (!csrfToken) {
            console.error(
                'CSRF token was not found.'
            );
            return;
        }

        saveInProgress = true;

        try {
            const response = await fetch(
                progressUrl,
                {
                    method: 'POST',

                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrfToken
                    },

                    body: JSON.stringify({
                        progress: Math.floor(currentTime)
                    }),

                    credentials: 'same-origin'
                }
            );

            if (!response.ok) {
                console.error(
                    'Failed to save progress:',
                    response.status
                );

                return;
            }

            const data = await response.json();

            console.log(
                'Progress saved:',
                data.progress
            );
        } catch (error) {
            console.error(
                'Failed to save progress:',
                error
            );
        } finally {
            saveInProgress = false;
        }
    }

    setInterval(() => {
        if (!player.paused && !isSeeking) {
            saveProgress();
        }
    }, 10000);

    player.on('pause', () => {
        if (!isSeeking) {
            saveProgress();
        }
    });

    player.on('ended', () => {
        saveProgress();
    });

    const episodesToggle =
        document.querySelector('#episodesToggle');

    const episodesPanel =
        document.querySelector('#episodesPanel');

    const episodesClose =
        document.querySelector('#episodesClose');

    if (episodesToggle && episodesPanel) {
        episodesToggle.addEventListener('click', () => {
            episodesPanel.classList.toggle('open');
        });
    }

    if (episodesClose && episodesPanel) {
        episodesClose.addEventListener('click', () => {
            episodesPanel.classList.remove('open');
        });
    }

    document.addEventListener('click', (event) => {
        if (
            !episodesPanel ||
            !episodesPanel.classList.contains('open')
        ) {
            return;
        }

        if (
            !episodesPanel.contains(event.target) &&
            !episodesToggle?.contains(event.target)
        ) {
            episodesPanel.classList.remove('open');
        }
    });

    console.log('Plyr initialized');
});