// Function to create a confetti element
function createConfetti() {
    const confetti = document.createElement("div");
    confetti.className = "confetti";

    const colors = ["#ff6363", "#ffb563", "#63ff63", "#63b6ff", "#b563ff"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    confetti.style.backgroundColor = randomColor;
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.animationDuration = Math.random() * 3 + 2 + "s";

    confetti.addEventListener("animationend", () => {
        confetti.remove();
    });

    return confetti;
}

// Add confetti elements to the container
function addConfetti() {
    const container = document.getElementById("confetti-container");
    const confettiCount = 400;

    for (let i = 0; i < confettiCount; i++) {
        container.appendChild(createConfetti());
    }
}

// Start the confetti animation
addConfetti();
