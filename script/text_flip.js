document.addEventListener('DOMContentLoaded', function() {
  const targetBlock = document.querySelector('.row.py-5.bg-light.justify-content-center.text-center');
  
  const style = document.createElement('style');
  style.textContent = `
    .flipping-container {
      perspective: 1000px;
    }
    .flipping-block {
      transition: transform 1s cubic-bezier(0.4, 0, 0.2, 1);
      transform-style: preserve-3d;
      cursor: pointer;
      position: relative;
    }
    .flipping-block > div {
      backface-visibility: hidden;
    }
  `;
  document.head.appendChild(style);
  
  // Обернем блок в контейнер для перспективы
  const container = document.createElement('div');
  container.className = 'flipping-container';
  targetBlock.parentNode.insertBefore(container, targetBlock);
  container.appendChild(targetBlock);
  
  targetBlock.classList.add('flipping-block');
  
  let isFlipped = false;
  
  targetBlock.addEventListener('click', function() {
    if (isFlipped) {
      this.style.transform = 'rotateX(0deg)';
    } else {
      this.style.transform = 'rotateX(360deg)';
    }
    isFlipped = !isFlipped;
  });
});