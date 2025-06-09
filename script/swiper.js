window.addEventListener('load', () => {
    const wrapper = document.querySelector('.endSwiper .swiper-wrapper');
    const slides = Array.from(wrapper.children);

    // Дублируем слайды для бесконечной ленты
    slides.forEach(slide => {
      const clone = slide.cloneNode(true);
      wrapper.appendChild(clone);
    });

    // Вычисляем полную ширину контента
    const totalWidth = Array.from(wrapper.children)
      .reduce((acc, slide) => acc + slide.offsetWidth, 0);

    // Устанавливаем ширину wrapper вручную
    wrapper.style.width = `${totalWidth}px`;

    // Добавляем CSS-анимацию через JS
    wrapper.animate(
      [
        { transform: 'translateX(0)' },
        { transform: `translateX(-${totalWidth / 2}px)` }
      ],
      {
        duration: 30000, // время полного прохода, больше = медленнее
        iterations: Infinity,
        easing: 'linear'
      }
    );
  });