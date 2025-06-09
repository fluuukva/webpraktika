$(document).ready(function() {
  // Добавляем CSS стили для модального окна
  const modalStyles = `
    <style>
      .callback-modal {
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
      }
      .callback-modal .modal-content {
        background: white;
        padding: 30px;
        border-radius: 8px;
        max-width: 500px;
        width: 90%;
      }
      .callback-modal .form-control {
        border-radius: 0;
        padding: 12px 15px;
      }
      .callback-modal .btn-primary {
        background-color: #3fc1c9;
        border: none;
        padding: 12px;
        border-radius: 0;
      }
      .invalid-feedback {
        color: #dc3545;
        font-size: 14px;
        margin-top: 5px;
        display: none;
      }
      .is-invalid + .invalid-feedback {
        display: block;
      }
      .is-invalid {
        border-color: #dc3545 !important;
      }
      .form-success-alert {
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 10000;
        max-width: 90%;
      }
    </style>
  `;
  
  // Добавляем стили в head
  $('head').append(modalStyles);

  // Создаем HTML модального окна
  const modalHtml = `
    <div class="callback-modal">
      <div class="modal-content">
        <h3 class="text-center mb-4">Заказать звонок</h3>
        
        <form id="callbackForm">
          <div class="mb-3">
            <input type="text" class="form-control" placeholder="Ваше имя" required>
            <div class="invalid-feedback">Пожалуйста, введите имя</div>
          </div>
          
          <div class="mb-3">
            <input type="tel" class="form-control" placeholder="Ваш телефон" required>
            <div class="invalid-feedback">Введите корректный телефон</div>
          </div>
          
          <div class="mb-3">
            <textarea class="form-control" placeholder="Ваш вопрос (необязательно)" rows="3"></textarea>
          </div>
          
          <button type="submit" class="btn btn-primary w-100">Отправить</button>
        </form>
        
        <button class="close-modal btn btn-link w-100 mt-3">Закрыть</button>
      </div>
    </div>
  `;

  // Добавляем модальное окно в DOM
  $('body').append(modalHtml);

  // Обработчик открытия модального окна
  $('.btn-primary').filter(':contains("Заказать звонок")').on('click', function() {
    $('.callback-modal').fadeIn(300).css('display', 'flex');
  });

  // Обработчик закрытия модального окна
  $('body').on('click', '.close-modal', function() {
    $('.callback-modal').fadeOut(300);
  });

  // Валидация формы
  $('#callbackForm').on('submit', function(e) {
    e.preventDefault();
    
    // Сбрасываем ошибки
    $(this).find('.is-invalid').removeClass('is-invalid');
    let isValid = true;

    // Проверка имени
    const $nameInput = $(this).find('input[placeholder="Ваше имя"]');
    if ($nameInput.val().trim().length < 2) {
      $nameInput.addClass('is-invalid');
      isValid = false;
    }

    // Проверка телефона
    const $phoneInput = $(this).find('input[placeholder="Ваш телефон"]');
    const phoneRegex = /^[\+\d\s\-\(\)]{7,15}$/;
    if (!phoneRegex.test($phoneInput.val())) {
      $phoneInput.addClass('is-invalid');
      isValid = false;
    }

    // Если форма валидна
    if (isValid) {
      // Здесь должна быть отправка формы (AJAX)
      showSuccessMessage('Спасибо! Мы вам перезвоним в ближайшее время.');
      $(this)[0].reset();
      $('.callback-modal').fadeOut(300);
    }
  });

  // Функция показа успешного уведомления
  function showSuccessMessage(message) {
    const successHtml = `
      <div class="alert alert-success form-success-alert">
        ${message}
      </div>
    `;
    
    $('body').append(successHtml);
    setTimeout(() => $('.alert-success').fadeOut(300, function() {
      $(this).remove();
    }), 3000);
  }

  // Маска для телефона
  $('input[placeholder="Ваш телефон"]').on('input', function() {
    this.value = this.value.replace(/[^\d\+\-\(\)\s]/g, '');
  });
});