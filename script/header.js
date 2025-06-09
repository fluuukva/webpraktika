// fixed-header.js
document.addEventListener('DOMContentLoaded', function() {
  // Находим шапку
  const header = document.querySelector('.header-bar');
  
  // Сохраняем исходные стили перед изменением
  const originalStyles = {
    position: header.style.position,
    top: header.style.top,
    left: header.style.left,
    right: header.style.right,
    zIndex: header.style.zIndex,
    boxShadow: header.style.boxShadow,
    width: header.style.width
  };
  
  // Функция для фиксации шапки
  function fixHeader() {
    if (window.pageYOffset > 50) { // Начинаем фиксировать после 50px скролла
      // Применяем фиксированные стили
      header.style.position = 'fixed';
      header.style.top = '0';
      header.style.left = '0';
      header.style.right = '0';
      header.style.zIndex = '1030';
      header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
      header.style.width = '100%';
      
      // Добавляем класс для анимации
      header.classList.add('header-fixed');
      
      // Добавляем отступ для основного контента
      document.body.style.paddingTop = header.offsetHeight + 'px';
    } else {
      // Возвращаем исходные стили
      Object.keys(originalStyles).forEach(prop => {
        header.style[prop] = originalStyles[prop];
      });
      header.classList.remove('header-fixed');
      document.body.style.paddingTop = '0';
    }
  }
  
  // Обработчик скролла с троттлингом для оптимизации
  let isScrolling;
  window.addEventListener('scroll', function() {
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(fixHeader, 10);
  }, false);
  
  // Инициализация при загрузке
  fixHeader();
  
  // Обработчик изменения размера окна
  window.addEventListener('resize', function() {
    if (header.classList.contains('header-fixed')) {
      document.body.style.paddingTop = header.offsetHeight + 'px';
    }
  });
});