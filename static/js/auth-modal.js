(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        var overlay = document.getElementById('authModalOverlay');
        if (!overlay) return;

        var box = overlay.querySelector('.auth-modal-box');
        var closeBtn = document.getElementById('authModalClose');
        var screens = overlay.querySelectorAll('.auth-modal-screen');
        var nextInputs = overlay.querySelectorAll('input[name="next"]');

        function showScreen(name) {
            screens.forEach(function (screen) {
                screen.classList.toggle('active', screen.getAttribute('data-screen') === name);
            });
        }

        function openModal(name) {
            var currentPath = window.location.pathname + window.location.search;
            nextInputs.forEach(function (input) {
                input.value = currentPath;
            });
            showScreen(name || 'login');
            overlay.hidden = false;
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            overlay.hidden = true;
            document.body.style.overflow = '';
        }

        document.querySelectorAll('[data-modal-open]').forEach(function (el) {
            el.addEventListener('click', function (event) {
                event.preventDefault();
                openModal(el.getAttribute('data-modal-open'));
            });
        });

        overlay.querySelectorAll('[data-modal-switch]').forEach(function (el) {
            el.addEventListener('click', function (event) {
                event.preventDefault();
                showScreen(el.getAttribute('data-modal-switch'));
            });
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }

        overlay.addEventListener('click', function (event) {
            if (event.target === overlay) {
                closeModal();
            }
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && !overlay.hidden) {
                closeModal();
            }
        });

        if (box) {
            box.addEventListener('click', function (event) {
                event.stopPropagation();
            });
        }

        if (overlay.dataset.openOnLoad) {
            openModal(overlay.dataset.openOnLoad);
        }
    });
})();
