// tooltips.js - Обновлённый скрипт для более полезных и визуально лёгких подсказок

document.addEventListener('DOMContentLoaded', function () {
    // Стили подсказок
    const style = document.createElement('style');
    style.textContent = `
        .custom-tooltip {
            position: absolute;
            z-index: 9999;
            padding: 4px 8px;
            background-color: rgba(255, 255, 255, 0.95);
            color: #333;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 12px;
            line-height: 1.3;
            max-width: 200px;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.2s ease, transform 0.2s ease;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
            transform: translateY(-5px);
        }
        .custom-tooltip.show {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    const tooltip = document.createElement('div');
    tooltip.className = 'custom-tooltip';
    document.body.appendChild(tooltip);

    function showTooltip(element, text) {
        if (!text) return;
        tooltip.textContent = text;
        tooltip.classList.add('show');

        const rect = element.getBoundingClientRect();
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

        tooltip.style.left = `${rect.left + scrollLeft + rect.width / 2 - tooltip.offsetWidth / 2}px`;
        tooltip.style.top = `${rect.bottom + scrollTop + 8}px`; // снизу, а не сверху
    }

    function hideTooltip() {
        tooltip.classList.remove('show');
    }

    // Подсказки для навигационных ссылок
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        const section = link.textContent.trim();
        link.addEventListener('mouseenter', () => showTooltip(link, `Открыть раздел: ${section}`));
        link.addEventListener('mouseleave', hideTooltip);
    });

    // Подсказки для карточек
    document.querySelectorAll('.service-card, .promo-card').forEach(card => {
        const title = card.querySelector('h4, h5')?.textContent.trim();
        card.addEventListener('mouseenter', () => showTooltip(card, title || 'Подробнее о предложении'));
        card.addEventListener('mouseleave', hideTooltip);
    });

    // Кнопки
    document.querySelectorAll('button, .btn').forEach(button => {
        const hint = button.getAttribute('data-tooltip') || button.textContent.trim();
        if (hint) {
            button.addEventListener('mouseenter', () => showTooltip(button, `Действие: ${hint}`));
            button.addEventListener('mouseleave', hideTooltip);
        }
    });

    // Иконки соцсетей
    document.querySelectorAll('.social-icons a').forEach(icon => {
        const alt = icon.querySelector('img')?.alt || '';
        const platform = alt.replace(/ icon/i, '').trim();
        if (platform) {
            icon.addEventListener('mouseenter', () => showTooltip(icon, `Перейти в ${platform}`));
            icon.addEventListener('mouseleave', hideTooltip);
        }
    });

    // Ссылки в футере
    document.querySelectorAll('footer a').forEach(link => {
        const text = link.textContent.trim();
        if (text) {
            link.addEventListener('mouseenter', () => showTooltip(link, `Открыть: ${text}`));
            link.addEventListener('mouseleave', hideTooltip);
        }
    });

    // Изображения галереи
    document.querySelectorAll('.service-item img').forEach(img => {
        if (img.alt) {
            img.addEventListener('mouseenter', () => showTooltip(img, img.alt));
            img.addEventListener('mouseleave', hideTooltip);
        }
    });

    // Инпуты и текстовые поля
    document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(input => {
        input.addEventListener('mouseenter', () => showTooltip(input, input.placeholder));
        input.addEventListener('mouseleave', hideTooltip);
    });

    // Иконки в особенностях
    document.querySelectorAll('.features-section i.bi').forEach(icon => {
        const parent = icon.closest('.feature-item') || icon.parentElement;
        const text = parent.textContent.trim();
        if (text) {
            icon.addEventListener('mouseenter', () => showTooltip(icon, text));
            icon.addEventListener('mouseleave', hideTooltip);
        }
    });
});
