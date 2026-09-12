document.addEventListener('DOMContentLoaded', () => {

    const page = document.querySelector('.player-page');
    const video = document.querySelector('#videoEl');

    if (!page || !video) {
        return;
    }


    // --------------------------------------------------
    // DATA FROM DJANGO
    // --------------------------------------------------

    const startProgress = parseFloat(
        page.dataset.startProgress || '0'
    );

    const progressUrl = page.dataset.progressUrl;


    // --------------------------------------------------
    // CSRF
    // --------------------------------------------------

    function getCsrfToken() {

        // First try the hidden Django input
        const input = document.querySelector(
            '[name=csrfmiddlewaretoken]'
        );

        if (input && input.value) {
            return input.value;
        }


        // Fallback: try cookie
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


    // --------------------------------------------------
    // PLYR
    // --------------------------------------------------

    const player = new Plyr(video, {

        controls: [
            'play-large',
            'play',
            'progress',
            'current-time',
            'duration',
            'mute',
            'volume',
            'settings',
            'fullscreen',
            'download'
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


    // --------------------------------------------------
    // RESTORE WATCH PROGRESS
    // --------------------------------------------------

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


        // Don't seek beyond the video
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


    player.on('loadedmetadata', () => {
        restoreProgress();
    });


    player.on('ready', () => {
        restoreProgress();
    });


    // --------------------------------------------------
    // SAVE WATCH PROGRESS
    // --------------------------------------------------

    let saveInProgress = false;


    async function saveProgress() {

        if (!progressUrl) {
            return;
        }


        const currentTime = player.currentTime;


        if (!currentTime || currentTime <= 0) {
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


    // --------------------------------------------------
    // SAVE EVERY 10 SECONDS
    // --------------------------------------------------

    setInterval(() => {

        if (!player.paused) {
            saveProgress();
        }

    }, 10000);


    // --------------------------------------------------
    // SAVE WHEN PAUSED
    // --------------------------------------------------

    player.on('pause', () => {
        saveProgress();
    });


    // --------------------------------------------------
    // SAVE WHEN VIDEO ENDS
    // --------------------------------------------------

    player.on('ended', () => {
        saveProgress();
    });


    // --------------------------------------------------
    // SAVE BEFORE LEAVING PAGE
    // --------------------------------------------------

    window.addEventListener('beforeunload', () => {
        saveProgress();
    });


    // --------------------------------------------------
    // EPISODES PANEL
    // --------------------------------------------------

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


    // Close episode panel when clicking outside
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