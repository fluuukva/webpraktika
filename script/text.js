document.addEventListener('DOMContentLoaded', function() {
  const aboutText = document.querySelector('.py-5 .lead');
  const originalHTML = aboutText.innerHTML;
  
  // Функция для анимации текста
  function animateText(element) {
    const text = element.textContent;
    const words = text.split(/(\s+)/);
    
    // Очищаем и пересобираем содержимое
    element.innerHTML = '';
    
    words.forEach((word, index) => {
      if(word.trim() === '') {
        // Сохраняем пробелы как есть
        element.appendChild(document.createTextNode(word));
      } else {
        const span = document.createElement('span');
        span.textContent = word;
        
        // Устанавливаем начальные стили через JS
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.transition = `opacity 0.3s ease ${index * 0.05}s, transform 0.3s ease ${index * 0.05}s`;
        span.style.transform = 'translateY(10px)';
        
        element.appendChild(span);
        
        // Запускаем анимацию
        setTimeout(() => {
          span.style.opacity = '1';
          span.style.transform = 'translateY(0)';
        }, 50);
      }
    });
  }
  
  // Функция для сброса анимации
  function resetText(element) {
    element.innerHTML = originalHTML;
  }
  
  // Обработчики событий
  aboutText.addEventListener('mouseenter', () => animateText(aboutText));
  aboutText.addEventListener('mouseleave', () => resetText(aboutText));
  
  // Инициализация - сохраняем исходный текст
  resetText(aboutText);
});