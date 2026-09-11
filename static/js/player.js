(function () {
    'use strict';

    const page = document.querySelector('.player-page');
    if (!page) return;

    const video = document.getElementById('videoEl');
    const shell = document.getElementById('playerShell');
    const loading = document.getElementById('playerLoading');

    const topbar = document.getElementById('playerTopbar');
    const controls = document.getElementById('playerControls');
    const centerBtn = document.getElementById('centerPlayBtn');
    const centerIconPlay = document.getElementById('centerIconPlay');
    const centerIconPause = document.getElementById('centerIconPause');

    const playBtn = document.getElementById('playBtn');
    const playIcon = document.getElementById('playIcon');
    const pauseIcon = document.getElementById('pauseIcon');

    const rewindBtn = document.getElementById('rewindBtn');
    const forwardBtn = document.getElementById('forwardBtn');

    const muteBtn = document.getElementById('muteBtn');
    const volIconOn = document.getElementById('volIconOn');
    const volIconOff = document.getElementById('volIconOff');
    const volumeSlider = document.getElementById('volumeSlider');

    const progressBar = document.getElementById('progressBar');
    const progressPlayed = document.getElementById('progressPlayed');
    const progressBuffered = document.getElementById('progressBuffered');
    const progressHandle = document.getElementById('progressHandle');
    const timeCurrent = document.getElementById('timeCurrent');
    const timeDuration = document.getElementById('timeDuration');

    const speedBtn = document.getElementById('speedBtn');
    const speedMenu = document.getElementById('speedMenu');

    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const fsIconEnter = document.getElementById('fsIconEnter');
    const fsIconExit = document.getElementById('fsIconExit');

    const episodesToggle = document.getElementById('episodesToggle');
    const episodesPanel = document.getElementById('episodesPanel');
    const episodesClose = document.getElementById('episodesClose');

    const contentId = page.dataset.contentId;
    const startProgress = parseFloat(page.dataset.startProgress || '0');
    const progressUrl = page.dataset.progressUrl;

    function getCsrfToken() {
        const match = document.cookie.match(/csrftoken=([^;]+)/);
        return match ? match[1] : '';
    }

    function formatTime(seconds) {
        if (!isFinite(seconds) || seconds < 0) seconds = 0;
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60);
        if (h > 0) {
            return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
        }
        return `${m}:${String(s).padStart(2, '0')}`;
    }

    // ---------- PLAY / PAUSE ----------
    function updatePlayState() {
        const paused = video.paused;
        playIcon.style.display = paused ? 'block' : 'none';
        pauseIcon.style.display = paused ? 'none' : 'block';
        centerIconPlay.style.display = paused ? 'block' : 'none';
        centerIconPause.style.display = paused ? 'none' : 'block';
    }

    function togglePlay() {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    }

    playBtn.addEventListener('click', togglePlay);
    centerBtn.addEventListener('click', togglePlay);
    video.addEventListener('click', togglePlay);
    video.addEventListener('play', updatePlayState);
    video.addEventListener('pause', updatePlayState);

    // ---------- SEEK / SKIP ----------
    rewindBtn.addEventListener('click', () => {
        video.currentTime = Math.max(0, video.currentTime - 10);
    });

    forwardBtn.addEventListener('click', () => {
        video.currentTime = Math.min(video.duration || Infinity, video.currentTime + 10);
    });

    // ---------- VOLUME ----------
    function updateVolumeUI() {
        const muted = video.muted || video.volume === 0;
        volIconOn.style.display = muted ? 'none' : 'block';
        volIconOff.style.display = muted ? 'block' : 'none';
        volumeSlider.value = muted ? 0 : video.volume;
    }

    muteBtn.addEventListener('click', () => {
        video.muted = !video.muted;
        if (!video.muted && video.volume === 0) video.volume = 1;
        updateVolumeUI();
    });

    volumeSlider.addEventListener('input', () => {
        video.volume = parseFloat(volumeSlider.value);
        video.muted = video.volume === 0;
        updateVolumeUI();
    });

    // ---------- PROGRESS BAR ----------
    let isScrubbing = false;

    function updateProgressUI() {
        const duration = video.duration || 0;
        const current = video.currentTime || 0;
        const pct = duration ? (current / duration) * 100 : 0;

        progressPlayed.style.width = pct + '%';
        progressHandle.style.left = pct + '%';
        timeCurrent.textContent = formatTime(current);
        timeDuration.textContent = formatTime(duration);

        if (video.buffered.length) {
            const bufferedEnd = video.buffered.end(video.buffered.length - 1);
            const bufferedPct = duration ? (bufferedEnd / duration) * 100 : 0;
            progressBuffered.style.width = bufferedPct + '%';
        }
    }

    function seekFromClientX(clientX) {
        const rect = progressBar.getBoundingClientRect();
        let ratio = (clientX - rect.left) / rect.width;
        ratio = Math.min(1, Math.max(0, ratio));
        if (video.duration) {
            video.currentTime = ratio * video.duration;
        }
        updateProgressUI();
    }

    progressBar.addEventListener('pointerdown', (e) => {
        isScrubbing = true;
        seekFromClientX(e.clientX);
    });

    window.addEventListener('pointermove', (e) => {
        if (isScrubbing) seekFromClientX(e.clientX);
    });

    window.addEventListener('pointerup', () => {
        isScrubbing = false;
    });

    video.addEventListener('timeupdate', () => {
        if (!isScrubbing) updateProgressUI();
    });
    video.addEventListener('progress', updateProgressUI);
    video.addEventListener('loadedmetadata', () => {
        updateProgressUI();
        loading.classList.remove('visible');
        if (startProgress > 0 && startProgress < (video.duration - 5)) {
            video.currentTime = startProgress;
        }
    });

    video.addEventListener('waiting', () => loading.classList.add('visible'));
    video.addEventListener('playing', () => loading.classList.remove('visible'));

    // ---------- PLAYBACK SPEED ----------
    speedBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        speedMenu.classList.toggle('visible');
    });

    speedMenu.querySelectorAll('button').forEach((btn) => {
        btn.addEventListener('click', () => {
            const rate = parseFloat(btn.dataset.speed);
            video.playbackRate = rate;
            speedBtn.textContent = rate + 'x';
            speedMenu.querySelectorAll('button').forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');
            speedMenu.classList.remove('visible');
        });
    });

    document.addEventListener('click', (e) => {
        if (!speedMenu.contains(e.target) && e.target !== speedBtn) {
            speedMenu.classList.remove('visible');
        }
    });

    // ---------- FULLSCREEN ----------
    function updateFullscreenIcon() {
        const isFs = !!document.fullscreenElement;
        fsIconEnter.style.display = isFs ? 'none' : 'block';
        fsIconExit.style.display = isFs ? 'block' : 'none';
    }

    fullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            shell.requestFullscreen().catch(() => {});
        } else {
            document.exitFullscreen().catch(() => {});
        }
    });

    document.addEventListener('fullscreenchange', updateFullscreenIcon);

    // ---------- EPISODES PANEL ----------
    if (episodesToggle && episodesPanel) {
        episodesToggle.addEventListener('click', () => episodesPanel.classList.add('open'));
        episodesClose.addEventListener('click', () => episodesPanel.classList.remove('open'));
    }

    // ---------- AUTO-HIDE CONTROLS ----------
    let hideTimer = null;

    function showControls() {
        topbar.classList.remove('hidden');
        controls.classList.remove('hidden');
        shell.classList.remove('controls-hidden');
        centerBtn.classList.add('visible');
        clearTimeout(hideTimer);
        if (!video.paused) {
            hideTimer = setTimeout(hideControls, 3000);
        }
    }

    function hideControls() {
        if (video.paused) return;
        topbar.classList.add('hidden');
        controls.classList.add('hidden');
        shell.classList.add('controls-hidden');
        centerBtn.classList.remove('visible');
        speedMenu.classList.remove('visible');
    }

    shell.addEventListener('mousemove', showControls);
    shell.addEventListener('mouseleave', () => {
        if (!video.paused) hideControls();
    });
    video.addEventListener('play', showControls);
    video.addEventListener('pause', () => {
        clearTimeout(hideTimer);
        showControls();
    });

    // ---------- KEYBOARD SHORTCUTS ----------
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT') return;
        switch (e.code) {
            case 'Space':
            case 'KeyK':
                e.preventDefault();
                togglePlay();
                break;
            case 'ArrowLeft':
                video.currentTime = Math.max(0, video.currentTime - 5);
                break;
            case 'ArrowRight':
                video.currentTime = Math.min(video.duration || Infinity, video.currentTime + 5);
                break;
            case 'ArrowUp':
                e.preventDefault();
                video.volume = Math.min(1, video.volume + 0.05);
                updateVolumeUI();
                break;
            case 'ArrowDown':
                e.preventDefault();
                video.volume = Math.max(0, video.volume - 0.05);
                updateVolumeUI();
                break;
            case 'KeyM':
                video.muted = !video.muted;
                updateVolumeUI();
                break;
            case 'KeyF':
                fullscreenBtn.click();
                break;
        }
        showControls();
    });

    // ---------- SAVE PROGRESS (server side) ----------
    function saveProgress() {
        if (!progressUrl || !video.currentTime) return;
        const payload = JSON.stringify({ progress: Math.floor(video.currentTime) });

        if (navigator.sendBeacon) {
            const blob = new Blob([payload], { type: 'application/json' });
            navigator.sendBeacon(progressUrl, blob);
        } else {
            fetch(progressUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCsrfToken(),
                },
                body: payload,
                keepalive: true,
            }).catch(() => {});
        }
    }

    setInterval(() => {
        if (!video.paused) saveProgress();
    }, 10000);

    video.addEventListener('pause', saveProgress);
    window.addEventListener('beforeunload', saveProgress);

    // ---------- INIT ----------
    updatePlayState();
    updateVolumeUI();
    updateProgressUI();
    loading.classList.add('visible');
})();