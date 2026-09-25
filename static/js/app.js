(function () {
    'use strict';

    var STORAGE_KEY = 'cinemate_lang';
    var DEFAULT_LANG = 'en';
    var SUPPORTED = ['en', 'uk', 'pl'];

    var translations = {
        en: {
            common: {
                footerPhone: "Questions? Call 1-844-505-2993",
                footer: {
                    faq: "FAQ",
                    helpCenter: "Help Center",
                    account: "Account",
                    mediaCenter: "Media Center",
                    investorRelations: "Investor Relations",
                    jobs: "Jobs",
                    netflixShop: "Netflix Shop",
                    redeemGiftCards: "Redeem Gift Cards",
                    buyGiftCards: "Buy Gift Cards",
                    waysToWatch: "Ways to Watch",
                    termsOfUse: "Terms of Use",
                    privacy: "Privacy",
                    cookiePreferences: "Cookie Preferences",
                    corporateInfo: "Corporate Information",
                    contactUs: "Contact Us",
                    speedTest: "Speed Test",
                    legalNotices: "Legal Notices",
                    onlyOnNetflix: "Only on Netflix",
                    doNotSell: "Do Not Sell or Share My Personal Information",
                    adChoices: "Ad Choices"
                },
                lang: { en: "English", uk: "Українська", pl: "Polski" },
                alt: {
                    search: "Search",
                    notifications: "Notifications",
                    showPassword: "Show password",
                    arrow: "Arrow",
                    language: "Language",
                    profile: "Profile"
                },
                userMenu: {
                    watchHistory: "Watch history",
                    news: "News",
                    manageAccount: "Manage account",
                    signOut: "Sign out"
                }
            },
            main: {
                title: "Home | Cinemate",
                signIn: "Sign In",
                hero: {
                    title: "Unlimited movies, TV shows, and more",
                    subtitle: "Watch anywhere and anytime.",
                    description: "Ready to watch? Let's find your preferences!"
                },
                getStarted: "Get Started",
                feature1: { title: "Enjoy on your TV", desc: "Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more." },
                feature2: { title: "Watch everywhere", desc: "Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV." },
                feature3: { title: "Create profiles for kids", desc: "Send kids on adventures with their favorite characters in a space made just for them—free." },
                feature4: { title: "Download your shows to watch offline", desc: "Watch on a plane, train, or submarine..." },
                cta: { title: "Let's find your preferences!" }
            },
            films: {
                title: "Catalog | Cinemate",
                hero: { title: "New top content here" },
                continueWatching: "Continue watching",
                filterByGenres: "Filter by genres",
                allGenres: "All genres",
                noContinueWatching: "You haven't started watching anything yet.",
                noGenreResults: "No content found for this genre yet.",
                more: "More",
                recommendations: "Recommendations for you",
                topDetectives: "Top detectives of this year",
                topThrillers: "Top trillers of this year",
                sciPop: "Sci-pop films",
                romantic: "Romantic films",
                action: "Action films",
                cartoons: "Cartoons"
            },
            news: {
                title: "News | Cinemate",
                hero: { title: "News tailored to your interests" },
                interesting: "You might find this interesting",
                headline: "The director of John Wick4 announced the 5th film",
                excerpt: "Lorem ipsum dolor sit amet consectetur. Ut tempus nibh ultrices lobortis lacus turpis diam. Nulla tristique sagittis amet a sem pellentesque lorem",
                empty: "No news yet. Check back later!"
            },
            history: {
                title: "Watch History | Cinemate",
                hero: { title: "Your watching history" },
                lastViewed: "Last viewed",
                empty: "You haven't watched anything yet."
            },
            account: {
                title: "Account | Cinemate",
                hero: { title: "Your account details" },
                username: "Username",
                firstName: "First name",
                surname: "Surname",
                email: "E-mail",
                phoneNumber: "Phone number",
                editDetails: "Edit your personal details",
                save: "Save",
                cancel: "Cancel",
                avatar: "Avatar"
            },
            notification: {
                title: "Notifications | Cinemate",
                hero: { title: "Your special notifications" },
                latest: "The latest",
                textSeries: "New series of Stranger things already at our website!",
                textSequel: "New sequel to Stranger things already at our website!"
            },
            login: {
                title: "Log In | Cinemate",
                heading: "Log in",
                errorMessage: "Wrong e-mail or password. Please try again later or use another data",
                emailLabel: "E-mail",
                emailPlaceholder: "Enter your email",
                passwordLabel: "Password",
                passwordPlaceholder: "Enter your password",
                submit: "Log in",
                forgotPassword: "Forget your password?",
                noAccount: "Don't have an account? Sign up"
            },
            register: {
                title: "Sign Up | Cinemate",
                heading: "Create an account",
                usernameLabel: "Username",
                emailLabel: "E-mail",
                emailPlaceholder: "Enter your email",
                passwordLabel: "Password",
                passwordPlaceholder: "Enter your password",
                password2Label: "Confirm password",
                submit: "Sign up",
                haveAccount: "Already have an account? ",
                logIn: "Log in"
            },
            registerAgreement: {
                title: "Sign Up | Cinemate",
                heading: "Create an account",
                google: "Continue with Google",
                facebook: "Continue with Facebook",
                email: "Continue with E-mail",
                newsletter: "I do not wish to receive news and promotions from Cinemate by email.",
                terms: "By continuing, you agree to IllustrationStock Company's Terms of Use and Privacy Policy.",
                haveAccount: "Already have an account?"
            },
            notFound: {
                title: "Page Not Found | Cinemate",
                hero: {
                    title: "Oh... 404. That's an error. This page has not been found",
                    description: "That's all that we know. The page you are looking may have been moved, deleted or possibly never existed."
                }
            }
        },
        uk: {
            common: {
                footerPhone: "Питання? Телефонуйте 1-844-505-2993",
                footer: {
                    faq: "Часті запитання",
                    helpCenter: "Центр підтримки",
                    account: "Обліковий запис",
                    mediaCenter: "Медіацентр",
                    investorRelations: "Відносини з інвесторами",
                    jobs: "Вакансії",
                    netflixShop: "Магазин Netflix",
                    redeemGiftCards: "Активувати подарункову картку",
                    buyGiftCards: "Придбати подарункову картку",
                    waysToWatch: "Способи перегляду",
                    termsOfUse: "Умови використання",
                    privacy: "Конфіденційність",
                    cookiePreferences: "Налаштування файлів cookie",
                    corporateInfo: "Інформація про компанію",
                    contactUs: "Зв'язатися з нами",
                    speedTest: "Тест швидкості",
                    legalNotices: "Правові повідомлення",
                    onlyOnNetflix: "Тільки на Netflix",
                    doNotSell: "Не продавати та не передавати мої особисті дані",
                    adChoices: "Реклама"
                },
                lang: { en: "English", uk: "Українська", pl: "Polski" },
                alt: {
                    search: "Пошук",
                    notifications: "Сповіщення",
                    showPassword: "Показати пароль",
                    arrow: "Стрілка",
                    language: "Мова",
                    profile: "Профіль"
                },
                userMenu: {
                    watchHistory: "Історія перегляду",
                    news: "Новини",
                    manageAccount: "Керування акаунтом",
                    signOut: "Вийти"
                }
            },
            main: {
                title: "Головна | Cinemate",
                signIn: "Увійти",
                hero: {
                    title: "Необмежена кількість фільмів, серіалів та іншого",
                    subtitle: "Дивіться будь-де і будь-коли.",
                    description: "Готові дивитися? Знайдімо те, що вам до смаку!"
                },
                getStarted: "Почати",
                feature1: { title: "Насолоджуйтесь на своєму телевізорі", desc: "Дивіться на Smart TV, Playstation, Xbox, Chromecast, Apple TV, Blu-ray програвачах та інших пристроях." },
                feature2: { title: "Дивіться будь-де", desc: "Необмежений перегляд фільмів і серіалів на телефоні, планшеті, ноутбуці та телевізорі." },
                feature3: { title: "Створюйте профілі для дітей", desc: "Відправляйте дітей у пригоди з улюбленими персонажами у просторі, створеному спеціально для них — безкоштовно." },
                feature4: { title: "Завантажуйте серіали для перегляду офлайн", desc: "Дивіться в літаку, потязі чи підводному човні..." },
                cta: { title: "Знайдімо те, що вам до смаку!" }
            },
            films: {
                title: "Каталог | Cinemate",
                hero: { title: "Новий топовий контент тут" },
                continueWatching: "Продовжити перегляд",
                filterByGenres: "Фільтр за жанрами",
                allGenres: "Усі жанри",
                noContinueWatching: "Ви ще нічого не почали дивитися.",
                noGenreResults: "У цьому жанрі поки немає контенту.",
                more: "Більше",
                recommendations: "Рекомендації для вас",
                topDetectives: "Найкращі детективи цього року",
                topThrillers: "Найкращі трилери цього року",
                sciPop: "Науково-популярні фільми",
                romantic: "Романтичні фільми",
                action: "Бойовики",
                cartoons: "Мультфільми"
            },
            news: {
                title: "Новини | Cinemate",
                hero: { title: "Новини під ваші інтереси" },
                interesting: "Це може бути вам цікаво",
                headline: "Режисер John Wick4 анонсував 5-й фільм",
                excerpt: "Lorem ipsum dolor sit amet consectetur. Ut tempus nibh ultrices lobortis lacus turpis diam. Nulla tristique sagittis amet a sem pellentesque lorem",
                empty: "Новин поки немає. Загляньте пізніше!"
            },
            history: {
                title: "Історія перегляду | Cinemate",
                hero: { title: "Ваша історія перегляду" },
                lastViewed: "Останнє переглянуте",
                empty: "Ви ще нічого не дивилися."
            },
            account: {
                title: "Обліковий запис | Cinemate",
                hero: { title: "Деталі вашого облікового запису" },
                username: "Ім'я користувача",
                firstName: "Ім'я",
                surname: "Прізвище",
                email: "E-mail",
                phoneNumber: "Номер телефону",
                editDetails: "Редагувати особисті дані",
                save: "Зберегти",
                cancel: "Скасувати",
                avatar: "Аватар"
            },
            notification: {
                title: "Сповіщення | Cinemate",
                hero: { title: "Ваші особливі сповіщення" },
                latest: "Останні",
                textSeries: "Новий сезон Stranger Things уже на нашому сайті!",
                textSequel: "Нове продовження Stranger Things уже на нашому сайті!"
            },
            login: {
                title: "Вхід | Cinemate",
                heading: "Увійти",
                errorMessage: "Невірний e-mail або пароль. Спробуйте пізніше або використайте інші дані",
                emailLabel: "E-mail",
                emailPlaceholder: "Введіть вашу електронну адресу",
                passwordLabel: "Пароль",
                passwordPlaceholder: "Введіть ваш пароль",
                submit: "Увійти",
                forgotPassword: "Забули пароль?",
                noAccount: "Немає облікового запису? Зареєструватися"
            },
            register: {
                title: "Реєстрація | Cinemate",
                heading: "Створити обліковий запис",
                usernameLabel: "Ім'я користувача",
                emailLabel: "E-mail",
                emailPlaceholder: "Введіть вашу електронну адресу",
                passwordLabel: "Пароль",
                passwordPlaceholder: "Введіть ваш пароль",
                password2Label: "Підтвердіть пароль",
                submit: "Зареєструватися",
                haveAccount: "Вже маєте обліковий запис? ",
                logIn: "Увійти"
            },
            registerAgreement: {
                title: "Реєстрація | Cinemate",
                heading: "Створити обліковий запис",
                google: "Продовжити через Google",
                facebook: "Продовжити через Facebook",
                email: "Продовжити через E-mail",
                newsletter: "Я не хочу отримувати новини та акції від Cinemate на email.",
                terms: "Продовжуючи, ви погоджуєтеся з Умовами використання та Політикою конфіденційності компанії IllustrationStock.",
                haveAccount: "Вже маєте обліковий запис?"
            },
            notFound: {
                title: "Сторінку не знайдено | Cinemate",
                hero: {
                    title: "Ой... 404. Це помилка. Цю сторінку не знайдено",
                    description: "Це все, що нам відомо. Можливо, сторінку, яку ви шукаєте, було переміщено, видалено або вона ніколи не існувала."
                }
            }
        },
        pl: {
            common: {
                footerPhone: "Masz pytania? Zadzwoń 1-844-505-2993",
                footer: {
                    faq: "FAQ",
                    helpCenter: "Centrum pomocy",
                    account: "Konto",
                    mediaCenter: "Centrum prasowe",
                    investorRelations: "Relacje inwestorskie",
                    jobs: "Praca",
                    netflixShop: "Sklep Netflix",
                    redeemGiftCards: "Zrealizuj kartę podarunkową",
                    buyGiftCards: "Kup kartę podarunkową",
                    waysToWatch: "Sposoby oglądania",
                    termsOfUse: "Warunki korzystania",
                    privacy: "Prywatność",
                    cookiePreferences: "Ustawienia plików cookie",
                    corporateInfo: "Informacje o firmie",
                    contactUs: "Kontakt",
                    speedTest: "Test prędkości",
                    legalNotices: "Informacje prawne",
                    onlyOnNetflix: "Tylko na Netflix",
                    doNotSell: "Nie sprzedawaj ani nie udostępniaj moich danych osobowych",
                    adChoices: "Opcje reklam"
                },
                lang: { en: "English", uk: "Українська", pl: "Polski" },
                alt: {
                    search: "Szukaj",
                    notifications: "Powiadomienia",
                    showPassword: "Pokaż hasło",
                    arrow: "Strzałka",
                    language: "Język",
                    profile: "Profil"
                },
                userMenu: {
                    watchHistory: "Historia oglądania",
                    news: "Wiadomości",
                    manageAccount: "Zarządzaj kontem",
                    signOut: "Wyloguj się"
                }
            },
            main: {
                title: "Strona główna | Cinemate",
                signIn: "Zaloguj się",
                hero: {
                    title: "Nieograniczona liczba filmów, seriali i nie tylko",
                    subtitle: "Oglądaj gdziekolwiek i kiedykolwiek.",
                    description: "Gotowy do oglądania? Znajdźmy coś dla Ciebie!"
                },
                getStarted: "Zacznij teraz",
                feature1: { title: "Ciesz się na swoim telewizorze", desc: "Oglądaj na Smart TV, Playstation, Xbox, Chromecast, Apple TV, odtwarzaczach Blu-ray i innych." },
                feature2: { title: "Oglądaj wszędzie", desc: "Nieograniczone filmy i seriale na telefonie, tablecie, laptopie i telewizorze." },
                feature3: { title: "Twórz profile dla dzieci", desc: "Wyślij dzieci na przygody z ulubionymi postaciami w przestrzeni stworzonej specjalnie dla nich — za darmo." },
                feature4: { title: "Pobieraj treści, by oglądać offline", desc: "Oglądaj w samolocie, pociągu lub okręcie podwodnym..." },
                cta: { title: "Znajdźmy coś dla Ciebie!" }
            },
            films: {
                title: "Katalog | Cinemate",
                hero: { title: "Nowe, najlepsze treści tutaj" },
                continueWatching: "Kontynuuj oglądanie",
                filterByGenres: "Filtruj według gatunków",
                allGenres: "Wszystkie gatunki",
                noContinueWatching: "Nie zacząłeś jeszcze niczego oglądać.",
                noGenreResults: "Brak treści w tym gatunku.",
                more: "Więcej",
                recommendations: "Rekomendacje dla Ciebie",
                topDetectives: "Najlepsze kryminały tego roku",
                topThrillers: "Najlepsze thrillery tego roku",
                sciPop: "Filmy popularnonaukowe",
                romantic: "Filmy romantyczne",
                action: "Filmy akcji",
                cartoons: "Bajki"
            },
            news: {
                title: "Wiadomości | Cinemate",
                hero: { title: "Wiadomości dopasowane do Twoich zainteresowań" },
                interesting: "To może Cię zainteresować",
                headline: "Reżyser John Wick4 zapowiedział 5. część",
                excerpt: "Lorem ipsum dolor sit amet consectetur. Ut tempus nibh ultrices lobortis lacus turpis diam. Nulla tristique sagittis amet a sem pellentesque lorem",
                empty: "Brak wiadomości. Zajrzyj później!"
            },
            history: {
                title: "Historia oglądania | Cinemate",
                hero: { title: "Twoja historia oglądania" },
                lastViewed: "Ostatnio oglądane",
                empty: "Nie obejrzałeś jeszcze niczego."
            },
            account: {
                title: "Konto | Cinemate",
                hero: { title: "Szczegóły Twojego konta" },
                username: "Nazwa użytkownika",
                firstName: "Imię",
                surname: "Nazwisko",
                email: "E-mail",
                phoneNumber: "Numer telefonu",
                editDetails: "Edytuj dane osobowe",
                save: "Zapisz",
                cancel: "Anuluj",
                avatar: "Awatar"
            },
            notification: {
                title: "Powiadomienia | Cinemate",
                hero: { title: "Twoje specjalne powiadomienia" },
                latest: "Najnowsze",
                textSeries: "Nowy sezon Stranger Things już na naszej stronie!",
                textSequel: "Nowa kontynuacja Stranger Things już na naszej stronie!"
            },
            login: {
                title: "Logowanie | Cinemate",
                heading: "Zaloguj się",
                errorMessage: "Nieprawidłowy e-mail lub hasło. Spróbuj ponownie później lub użyj innych danych",
                emailLabel: "E-mail",
                emailPlaceholder: "Wpisz swój e-mail",
                passwordLabel: "Hasło",
                passwordPlaceholder: "Wpisz swoje hasło",
                submit: "Zaloguj się",
                forgotPassword: "Zapomniałeś hasła?",
                noAccount: "Nie masz konta? Zarejestruj się"
            },
            register: {
                title: "Rejestracja | Cinemate",
                heading: "Utwórz konto",
                usernameLabel: "Nazwa użytkownika",
                emailLabel: "E-mail",
                emailPlaceholder: "Wpisz swój e-mail",
                passwordLabel: "Hasło",
                passwordPlaceholder: "Wpisz swoje hasło",
                password2Label: "Potwierdź hasło",
                submit: "Zarejestruj się",
                haveAccount: "Masz już konto? ",
                logIn: "Zaloguj się"
            },
            registerAgreement: {
                title: "Rejestracja | Cinemate",
                heading: "Utwórz konto",
                google: "Kontynuuj przez Google",
                facebook: "Kontynuuj przez Facebook",
                email: "Kontynuuj przez e-mail",
                newsletter: "Nie chcę otrzymywać wiadomości i promocji od Cinemate e-mailem.",
                terms: "Kontynuując, akceptujesz Warunki korzystania i Politykę prywatności firmy IllustrationStock.",
                haveAccount: "Masz już konto?"
            },
            notFound: {
                title: "Nie znaleziono strony | Cinemate",
                hero: {
                    title: "Ups... 404. To błąd. Nie znaleziono tej strony",
                    description: "To wszystko, co wiemy. Strona, której szukasz, mogła zostać przeniesiona, usunięta lub nigdy nie istniała."
                }
            }
        }
    };

    function getByPath(obj, path) {
        return path.split('.').reduce(function (acc, part) {
            return acc && typeof acc === 'object' ? acc[part] : undefined;
        }, obj);
    }

    function t(key, lang) {
        var value = getByPath(translations[lang], key);
        if (value === undefined) value = getByPath(translations[DEFAULT_LANG], key);
        return value === undefined ? key : value;
    }

    function getLang() {
        try {
            var stored = localStorage.getItem(STORAGE_KEY);
            if (stored && SUPPORTED.indexOf(stored) !== -1) return stored;
        } catch (e) { /* localStorage unavailable */ }
        return DEFAULT_LANG;
    }

    function applyTranslations(lang) {
        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            var value = t(el.getAttribute('data-i18n'), lang);
            if (el.tagName === 'TITLE') {
                document.title = value;
            } else {
                el.textContent = value;
            }
        });

        document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
            el.getAttribute('data-i18n-attr').split(',').forEach(function (pair) {
                var parts = pair.split(':');
                var attr = parts[0].trim();
                var key = parts[1].trim();
                if (attr && key) el.setAttribute(attr, t(key, lang));
            });
        });
    }

    function updateSwitchers(lang) {
        document.querySelectorAll('.lang-switcher').forEach(function (switcher) {
            var current = switcher.querySelector('.lang-switcher-current');
            if (current) current.textContent = t('common.lang.' + lang, lang);
            switcher.querySelectorAll('.lang-switcher-menu li').forEach(function (li) {
                li.classList.toggle('active', li.getAttribute('data-lang') === lang);
            });
        });
    }

    function setLang(lang) {
        if (SUPPORTED.indexOf(lang) === -1) lang = DEFAULT_LANG;
        try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* localStorage unavailable */ }
        document.documentElement.setAttribute('lang', lang);
        applyTranslations(lang);
        updateSwitchers(lang);
    }

    function closeUserMenu() {
        var dropdown = document.getElementById('userMenuDropdown');
        var btn = document.getElementById('userMenuBtn');
        if (dropdown) dropdown.classList.remove('open');
        if (btn) btn.setAttribute('aria-expanded', 'false');
    }

    function closeLangMenus() {
        document.querySelectorAll('.lang-switcher-menu.open').forEach(function (menu) {
            menu.classList.remove('open');
            var switcher = menu.closest('.lang-switcher');
            var btn = switcher ? switcher.querySelector('.lang-switcher-btn') : null;
            if (btn) btn.setAttribute('aria-expanded', 'false');
        });
    }

    function initSwitchers() {
        document.querySelectorAll('.lang-switcher').forEach(function (switcher) {
            var btn = switcher.querySelector('.lang-switcher-btn');
            var menu = switcher.querySelector('.lang-switcher-menu');
            if (!btn || !menu) return;

            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                var willOpen = !menu.classList.contains('open');
                closeLangMenus();
                closeUserMenu();
                if (willOpen) {
                    menu.classList.add('open');
                }
                btn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
            });

            menu.querySelectorAll('li').forEach(function (li) {
                li.addEventListener('click', function () {
                    setLang(li.getAttribute('data-lang'));
                    menu.classList.remove('open');
                    btn.setAttribute('aria-expanded', 'false');
                });
            });
        });

        document.addEventListener('click', function () {
            document.querySelectorAll('.lang-switcher-menu.open').forEach(function (menu) {
                menu.classList.remove('open');
            });
        });
    }

    function initRouting() {
        document.querySelectorAll('[data-href]').forEach(function (el) {
            el.addEventListener('click', function () {
                window.location.href = el.getAttribute('data-href');
            });
        });
    }

    function initUserMenu() {
        var btn = document.getElementById('userMenuBtn');
        var dropdown = document.getElementById('userMenuDropdown');
        if (!btn || !dropdown) return;

        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            var willOpen = !dropdown.classList.contains('open');
            closeLangMenus();
            closeUserMenu();
            if (willOpen) {
                dropdown.classList.add('open');
            }
            btn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
        });

        document.addEventListener('click', function (e) {
            if (!dropdown.contains(e.target) && e.target !== btn) {
                dropdown.classList.remove('open');
                btn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        var lang = getLang();
        document.documentElement.setAttribute('lang', lang);
        applyTranslations(lang);
        initSwitchers();
        updateSwitchers(lang);
        initRouting();
        initUserMenu();
    });
})();
