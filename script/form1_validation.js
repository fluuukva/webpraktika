$(document).ready(function() {
  // Валидация формы записи
  $('.appointment-section form').on('submit', function(e) {
    e.preventDefault();
    
    // Сбрасываем предыдущие ошибки
    $('.is-invalid').removeClass('is-invalid');
    $('.invalid-feedback').remove();
    
    let isValid = true;
    const $form = $(this);
    
    // Валидация имени
    const $nameInput = $form.find('input[placeholder="Имя"]');
    if ($nameInput.val().trim().length < 2) {
      showError($nameInput, 'Введите корректное имя');
      isValid = false;
    }
    
    // Валидация телефона
    const $phoneInput = $form.find('input[placeholder="Телефон"]');
    const phoneRegex = /^[\+\d\s\-\(\)]{7,15}$/;
    if (!phoneRegex.test($phoneInput.val())) {
      showError($phoneInput, 'Введите корректный телефон');
      isValid = false;
    }
    
    // Валидация вопроса
    const $questionInput = $form.find('input[placeholder="Ваш вопрос"]');
    if ($questionInput.val().trim().length < 5) {
      showError($questionInput, 'Слишком короткий вопрос');
      isValid = false;
    }
    
    // Если форма валидна - отправляем и показываем уведомление
    if (isValid) {
      // Здесь должна быть реальная отправка формы (AJAX)
      // Для примера просто показываем уведомление
      showSuccessMessage();
      
      // Очищаем форму
      $form[0].reset();
    }
  });
  
  // Функция показа ошибки
  function showError($input, message) {
    $input.addClass('is-invalid');
    $input.after(`<div class="invalid-feedback text-white">${message}</div>`);
  }
  
  // Функция показа успешного уведомления
  function showSuccessMessage() {
    // Создаем модальное окно
    const modalHtml = `
      <div class="modal-overlay" style="
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
      ">
        <div class="modal-content" style="
          background: #3fc1c9;
          padding: 30px;
          border-radius: 8px;
          max-width: 500px;
          width: 90%;
          text-align: center;
          color: white;
        ">
          <h3>Спасибо за заявку!</h3>
          <p>Мы свяжемся с вами в ближайшее время</p>
          <button class="close-modal btn btn-light mt-3" style="
            background: white;
            color: #3fc1c9;
            border: none;
            padding: 8px 20px;
            border-radius: 4px;
            cursor: pointer;
          ">
            Закрыть
          </button>
        </div>
      </div>
    `;
    
    // Добавляем в DOM
    $('body').append(modalHtml);
    
    // Обработчик закрытия
    $('.close-modal').on('click', function() {
      $('.modal-overlay').fadeOut(300, function() {
        $(this).remove();
      });
    });
  }
  
  // Дополнительно: маска для телефона
  $('input[placeholder="Телефон"]').on('input', function() {
    this.value = this.value.replace(/[^\d\+\-\(\)\s]/g, '');
  });
});