const pacman = document.getElementById('pacman');
const pacmanSize = 50; // Diameter of the Pac-Man circle
const pacmanSpeed = 5; // Speed of Pac-Man's movement

let pacmanX = 0;
let pacmanY = 0;

let dx = 0; // Horizontal velocity
let dy = 0; // Vertical velocity

// Function to update Pac-Man's position
function updatePacmanPosition() {
    // Handle keyboard input to change velocity
    document.addEventListener('keydown', (event) => {
        const key = event.key.toLowerCase();
        switch (key) {
            case 'w':
                dy = -pacmanSpeed;
                break;
            case 's':
                dy = pacmanSpeed;
                break;
            case 'a':
                dx = -pacmanSpeed;
                break;
            case 'd':
                dx = pacmanSpeed;
                break;
        }
    });

    // Handle keyboard input to stop Pac-Man when keys are released
    document.addEventListener('keyup', (event) => {
        const key = event.key.toLowerCase();
        switch (key) {
            case 'w':
            case 's':
                dy = 0;
                break;
            case 'a':
            case 'd':
                dx = 0;
                break;
        }
    });

    // Call the game loop to update Pac-Man's position
    gameLoop();
}

// Function to create a game loop
function gameLoop() {
    // Update Pac-Man's position
    pacmanX += dx;
    pacmanY += dy;

    // Update Pac-Man's position on the screen
    pacman.style.left = pacmanX + 'px';
    pacman.style.top = pacmanY + 'px';

    // Request the next frame
    requestAnimationFrame(gameLoop);
}

// Call the update function to start listening for key presses and releases
updatePacmanPosition();
