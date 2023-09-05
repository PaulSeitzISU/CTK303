const container = document.querySelector('.container');

container.addEventListener('mousemove', (e) => {
    const ripple = document.createElement('div');
    ripple.classList.add('ripple');
    container.appendChild(ripple);

    const rect = container.getBoundingClientRect();
    const rippleX = e.clientX - rect.left;
    const rippleY = e.clientY - rect.top;

    ripple.style.left = rippleX + 'px';
    ripple.style.top = rippleY + 'px';

    ripple.addEventListener('animationend', () => {
        ripple.remove();
    });
});