window.addEventListener('load', () => {

// --- Эффект наведения для карточек услуг ---
    const serviceCards = document.querySelectorAll('.service-item');

    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
            card.style.transform = 'translateY(-5px)';
            card.style.transition = 'all 0.3s ease';
        });

        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.05)';
            card.style.transform = 'translateY(0)';
        });
    });
});