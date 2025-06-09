document.addEventListener('DOMContentLoaded', function() {
  // ===== 1. СОЗДАЕМ ВСЕ НЕОБХОДИМЫЕ ЭЛЕМЕНТЫ =====
  
  // Добавляем стили в head
  const style = document.createElement('style');
  style.textContent = `
    /* Основные стили модального окна */
    .consultation-modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.7);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      font-family: 'Arial', sans-serif;
    }
    
    .consultation-content {
      background: white;
      padding: 30px;
      border-radius: 8px;
      max-width: 500px;
      width: 90%;
      position: relative;
      animation: fadeIn 0.3s ease-out;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    /* Шапка формы */
    .consultation-header {
      text-align: center;
      margin-bottom: 20px;
    }
    
    .consultation-title {
      color: #3fc1c9;
      font-size: 24px;
      margin-bottom: 5px;
    }
    
    .consultation-subtitle {
      color: #555;
      font-size: 16px;
      margin-bottom: 15px;
    }
    
    /* Текст с преимуществами */
    .consultation-text {
      background: #f8f9fa;
      padding: 15px;
      border-radius: 5px;
      margin-bottom: 20px;
      font-size: 14px;
      line-height: 1.5;
    }
    
    .consultation-benefits {
      margin: 15px 0;
      padding-left: 20px;
    }
    
    .consultation-benefits li {
      margin-bottom: 8px;
      position: relative;
    }
    
    .consultation-benefits li:before {
      content: "•";
      color: #3fc1c9;
      position: absolute;
      left: -15px;
      font-size: 20px;
    }
    
    /* Стили формы */
    .form-control {
      border-radius: 4px;
      padding: 12px 15px;
      width: 100%;
      margin-bottom: 15px;
      border: 1px solid #ddd;
      font-size: 16px;
    }
    
    .btn-primary {
      background-color: #3fc1c9;
      border: none;
      padding: 12px;
      border-radius: 4px;
      color: white;
      width: 100%;
      cursor: pointer;
      font-size: 16px;
      transition: background 0.3s;
    }
    
    .btn-primary:hover {
      background-color: #35a9b1;
    }
    
    .invalid-feedback {
      color: #dc3545;
      font-size: 14px;
      margin-top: -10px;
      margin-bottom: 15px;
      display: none;
    }
    
    .is-invalid {
      border-color: #dc3545 !important;
    }
    
    .is-invalid + .invalid-feedback {
      display: block;
    }
    
    .close-modal {
      background: none;
      border: none;
      color: #3fc1c9;
      cursor: pointer;
      width: 100%;
      text-align: center;
      margin-top: 15px;
      font-size: 14px;
      text-decoration: underline;
    }
    
    /* Уведомление об успехе */
    .success-message {
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: #28a745;
      color: white;
      padding: 15px 30px;
      border-radius: 4px;
      z-index: 10000;
      max-width: 90%;
      display: none;
      animation: fadeIn 0.3s;
    }
  `;
  document.head.appendChild(style);

  // ===== 2. СОЗДАЕМ HTML ФОРМЫ =====
  const consultationModal = document.createElement('div');
  consultationModal.className = 'consultation-modal';
  consultationModal.innerHTML = `
    <div class="consultation-content">
      <div class="consultation-header">
        <h3 class="consultation-title">Запись на консультацию</h3>
        <p class="consultation-subtitle">«Юбилейная» стоматологическая клиника</p>
      </div>
      
      <div class="consultation-text">
        <p>Мы дорожим доверием наших пациентов и делаем всё, чтобы его оправдать.</p>
      </div>
      
      <form id="consultationForm">
        <input type="text" class="form-control" placeholder="Ваше имя" required>
        <div class="invalid-feedback">Пожалуйста, введите имя (минимум 2 символа)</div>
        
        <input type="tel" class="form-control" placeholder="Ваш телефон" required>
        <div class="invalid-feedback">Введите корректный телефон (например: +7 123 456-78-90)</div>
        
        <textarea class="form-control" placeholder="Что вас беспокоит? (необязательно)" rows="3"></textarea>
        
        <button type="submit" class="btn btn-primary">Записаться на консультацию</button>
      </form>
      <button class="close-modal">Закрыть</button>
    </div>
  `;
  document.body.appendChild(consultationModal);

  // Создаем элемент для уведомлений
  const successMessage = document.createElement('div');
  successMessage.className = 'success-message';
  document.body.appendChild(successMessage);

  // ===== 3. НАСТРАИВАЕМ ОБРАБОТЧИКИ СОБЫТИЙ =====
  
  // Открытие формы при клике на кнопки
  document.querySelectorAll('.bg-light.p-2.rounded, bg-white.p-2.rounded').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector('.consultation-modal').style.display = 'flex';
    });
  });

  // Закрытие формы
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('close-modal') || 
        e.target.classList.contains('consultation-modal')) {
      document.querySelector('.consultation-modal').style.display = 'none';
    }
  });

  // Валидация формы
  document.getElementById('consultationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Сбрасываем ошибки
    const invalidFields = this.querySelectorAll('.is-invalid');
    invalidFields.forEach(field => field.classList.remove('is-invalid'));
    
    let isValid = true;

    // Валидация имени
    const nameInput = this.querySelector('input[placeholder="Ваше имя"]');
    if (nameInput.value.trim().length < 2) {
      nameInput.classList.add('is-invalid');
      isValid = false;
    }

    // Валидация телефона
    const phoneInput = this.querySelector('input[placeholder="Ваш телефон"]');
    const phoneRegex = /^[\+\d\s\-\(\)]{7,20}$/;
    if (!phoneRegex.test(phoneInput.value)) {
      phoneInput.classList.add('is-invalid');
      isValid = false;
    }

    // Если форма валидна
    if (isValid) {
      showSuccessMessage('Спасибо! Наш администратор свяжется с вами в течение 15 минут для подтверждения записи.');
      this.reset();
      document.querySelector('.consultation-modal').style.display = 'none';
    }
  });

  // Маска для телефона
  const phoneInput = document.querySelector('input[placeholder="Ваш телефон"]');
  if (phoneInput) {
    phoneInput.addEventListener('input', function() {
      this.value = this.value.replace(/[^\d\+\-\(\)\s]/g, '');
    });
  }

  // Функция показа уведомления
  function showSuccessMessage(message) {
    const alert = document.querySelector('.success-message');
    alert.textContent = message;
    alert.style.display = 'block';
    
    setTimeout(() => {
      alert.style.display = 'none';
    }, 5000);
  }
});