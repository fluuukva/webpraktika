$(document).ready(function() {
  // 1. Настройки анимации
  const settings = {
    maxDistance: 100,    // Максимальное смещение (px)
    minOpacity: 0.3,     // Минимальная прозрачность
    blurRadius: 5,       // Максимальное размытие
    scrollOffset: 0.2    // Зона появления (20% от высоты окна)
  };

  // 2. Инициализация элементов
  const $animatable = $("section:not(.end-slider), .service-item, .service-card, .promo-card, .feature-item, .footer-column");
  
  $animatable.each(function() {
    const $el = $(this);
    $el.data('original-opacity', parseFloat($el.css('opacity')) || 1);
    $el.css({
      'transition': 'all 0.6s ease-out',
      'will-change': 'transform, opacity, filter'
    });
  });

  // 3. Функция плавного появления
  function updateAnimations() {
    const windowHeight = $(window).height();
    const scrollTop = $(window).scrollTop();
    const scrollBottom = scrollTop + windowHeight;
    
    $animatable.each(function() {
      const $el = $(this);
      const elHeight = $el.outerHeight();
      const elTop = $el.offset().top;
      const elBottom = elTop + elHeight;
      
      // Расстояние до верха/низа окна
      const distToTop = Math.max(0, scrollBottom - elTop);
      const distToBottom = Math.max(0, elBottom - scrollTop);
      
      // Нормализованная видимость (0-1)
      const visibility = Math.min(1, 
        Math.min(distToTop, distToBottom) / (windowHeight * settings.scrollOffset)
      );
      
      // Рассчитываем эффекты
      const opacity = settings.minOpacity + 
        (1 - settings.minOpacity) * visibility;
      
      const translateY = settings.maxDistance * (1 - visibility);
      
      const blur = settings.blurRadius * (1 - visibility);
      
      // Применяем стили
      $el.css({
        'opacity': opacity,
        'transform': `translateY(${translateY}px)`,
        'filter': `blur(${blur}px)`
      });
    });
  }

  // 4. Оптимизированный обработчик
  let animationFrame;
  function handleScroll() {
    if (animationFrame) cancelAnimationFrame(animationFrame);
    animationFrame = requestAnimationFrame(updateAnimations);
  }

  // 5. Запуск
  $(window)
    .on('scroll resize', handleScroll)
    .trigger('scroll');

  // 6. Плавный скролл
  $("html, body").css("scrollBehavior", "smooth");
});