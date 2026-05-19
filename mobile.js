document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // 1. ИНИЦИАЛИЗАЦИЯ И ПОИСК ЭЛЕМЕНТОВ ШАПКИ
    // ==========================================================================
    const menuToggleBtn = document.getElementById('menuToggleBtn');
    const siteNav = document.getElementById('siteNav');
    const searchToggleBtn = document.getElementById('searchToggleBtn');
    const searchDropdown = document.getElementById('searchDropdown');
    const toast = document.getElementById('toast');

    // ==========================================================================
    // 2. ЛОГИКА ВЫПАДАЮЩИХ ПАНЕЛЕЙ (МЕНЮ И ПОИСК)
    // ==========================================================================
    
    // Переключение мобильного меню навигации
    if (menuToggleBtn && siteNav) {
        menuToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            siteNav.classList.toggle('hidden');
            
            // Если открываем меню, скрываем панель поиска, чтобы не мешала
            if (!siteNav.classList.contains('hidden') && searchDropdown) {
                searchDropdown.classList.add('hidden');
            }
        });
    }

    // Переключение выпадающей панели быстрого поиска
    if (searchToggleBtn && searchDropdown) {
        searchToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            searchDropdown.classList.toggle('hidden');
            
            // Если открываем поиск, скрываем меню навигации
            if (!searchDropdown.classList.contains('hidden') && siteNav) {
                siteNav.classList.add('hidden');
                // Автоматически ставим фокус в инпут для удобства ввода
                const input = searchDropdown.querySelector('.search-input');
                if (input) input.focus();
            }
        });
    }

    // Клик за пределами шапки автоматически закрывает меню и поиск
    document.addEventListener('click', (e) => {
        if (siteNav && !siteNav.classList.contains('hidden') && !siteNav.contains(e.target) && e.target !== menuToggleBtn) {
            siteNav.classList.add('hidden');
        }
        if (searchDropdown && !searchDropdown.classList.contains('hidden') && !searchDropdown.contains(e.target) && e.target !== searchToggleBtn) {
            searchDropdown.classList.add('hidden');
        }
    });

    // ==========================================================================
    // 3. АВТОМАТИЧЕСКАЯ ПОДСВЕТКА АКТИВНОЙ ССЫЛКИ
    // ==========================================================================
    const currentUrl = window.location.pathname;
    const navLinks = document.querySelectorAll('.site-nav a, .chip-row a');

    navLinks.forEach(link => {
        // Убираем старый класс активности со всех ссылок
        link.classList.remove('active');
        
        const hrefAttr = link.getAttribute('href');
        if (!hrefAttr) return;

        // Нормализуем пути для точного сравнения (убираем относительные переходы вроде ../)
        const cleanHref = hrefAttr.replace(/\.\.\//g, '');
        
        // Проверяем, содержит ли текущий URL имя файла из ссылки
        if (currentUrl.includes(cleanHref) && cleanHref !== '') {
            link.classList.add('active');
        } else if (currentUrl.endsWith('/') && (cleanHref === 'index.html' || cleanHref === '')) {
            // Если открыт корень сайта, подсвечиваем "Главную"
            if (link.textContent.trim() === 'Главная') {
                link.classList.add('active');
            }
        }
    });

    // ==========================================================================
    // 4. КОМПОНЕНТ УВЕДОМЛЕНИЙ (TOAST)
    // ==========================================================================
    window.showToast = function(message, duration = 3000) {
        if (!toast) return;
        
        toast.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, duration);
    };

    // Автоматическая оптимизация картинок на лету (из твоего оригинального кода)
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy'; // Ленивая загрузка для экономии мобильного трафика
        if (!img.alt) {
            const fileName = img.src.split('/').pop().split('.')[0];
            img.alt = decodeURIComponent(fileName) || 'Изображение вики';
        }
    });
});