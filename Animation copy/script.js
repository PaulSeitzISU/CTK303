function createFish() {
    const fish = document.createElement('div');
    fish.classList.add('fish');
    document.querySelector('.ocean').appendChild(fish);

    const fishSize = 50; // Adjust the fish size as needed
    const startPosX = -fishSize;
    const startPosY = Math.random() * (window.innerHeight - fishSize);
    
    fish.style.left = startPosX + 'px';
    fish.style.top = startPosY + 'px';

    fish.addEventListener('animationiteration', () => {
        // Reset fish position when the animation reaches the end
        fish.style.left = startPosX + 'px';
        fish.style.top = startPosY + 'px';
    });
}

// Create fish periodically
setInterval(createFish, 6000); // Adjust the interval for slower fish creation
