document.addEventListener('DOMContentLoaded', function() {
  // Находим все колонки футера
  const footerColumns = document.querySelectorAll('.footer-column');
  
  footerColumns.forEach(column => {
    const header = column.querySelector('h6');
    const content = column.querySelector('ul');
    
    // Создаем контейнер для заголовка и кнопки
    const headerContainer = document.createElement('div');
    headerContainer.style.cssText = `
      display: inline-flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
    `;
    
    // Переносим заголовок в контейнер
    headerContainer.appendChild(header.cloneNode(true));
    header.replaceWith(headerContainer);
    
    // Создаем кнопку-тоггл
    const toggleBtn = document.createElement('button');
    toggleBtn.innerHTML = '−';
    toggleBtn.style.cssText = `
      background: none;
      border: none;
      font-size: 1.1rem;
      cursor: pointer;
      padding: 0;
      line-height: 1;
      flex-shrink: 0;
      margin-top: -7px; /* Чуть поднимаем кнопку */
    `;
    
    // Добавляем кнопку в контейнер
    headerContainer.appendChild(toggleBtn);
    
    // Настройка анимации
    content.style.transition = 'max-height 0.3s ease, opacity 0.2s ease';
    content.style.overflow = 'hidden';
    content.style.maxHeight = content.scrollHeight + 'px';
    
    // Функция переключения
    function toggleContent() {
      if (content.style.maxHeight === '0px') {
        content.style.maxHeight = content.scrollHeight + 'px';
        content.style.opacity = '1';
        toggleBtn.innerHTML = '−';
      } else {
        content.style.maxHeight = '0';
        content.style.opacity = '0';
        toggleBtn.innerHTML = '+';
      }
    }
    
    // Для мобильных сразу сворачиваем
    if (window.innerWidth < 768) {
      content.style.maxHeight = '0';
      content.style.opacity = '0';
      toggleBtn.innerHTML = '+';
    }
    
    // Вешаем обработчики
    headerContainer.addEventListener('click', toggleContent);
  });
});