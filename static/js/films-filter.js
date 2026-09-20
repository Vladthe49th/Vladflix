(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        var dropdown = document.getElementById('genreFilterDropdown');
        if (!dropdown) return;

        var btn = document.getElementById('genreFilterBtn');
        var menu = dropdown.querySelector('.filter-menu');
        if (!btn || !menu) return;

        btn.addEventListener('click', function (event) {
            event.stopPropagation();
            menu.classList.toggle('open');
        });

        document.addEventListener('click', function (event) {
            if (!dropdown.contains(event.target)) {
                menu.classList.remove('open');
            }
        });
    });
})();
