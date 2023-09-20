// Get the canvas element and context
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Create an array to store image objects
const images = [];

// Create an array to store original image positions
const originalImagePositions = [];

// Keep track of the currently hovered image
let hoveredImage = null;

// Margins
let margin = 150;

// Function to preload an image
function preloadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = reject;
    });
}

// Function to load and draw images in rows with a fixed width, doubling the width for wider images
async function loadImagesInRows(imagePaths, imageWidth, imageGap, rowGap) {
    let currentX = margin;
    let currentY = margin;
    let currentRowHeight = 0; // Track the height of the current row

    for (const imagePath of imagePaths) {
        try {
            const img = await preloadImage(imagePath);

            // Calculate the scaled width (doubling for wider images)
            const isWider = img.width > img.height;
            const scaledWidth = isWider ? imageWidth * 2 : imageWidth;

            // Calculate the scaled height while preserving aspect ratio
            const scaleFactor = scaledWidth / img.width;
            const scaledHeight = img.height * scaleFactor;

            // Check if the image goes outside the canvas's right edge
            if (currentX + scaledWidth + margin > canvas.width) {
                currentX = margin;
                currentY += currentRowHeight + rowGap; // Move to the next row with rowGap
                currentRowHeight = 0; // Reset row height

                // Check if the new row goes outside the canvas's bottom edge
                if (currentY + scaledHeight > canvas.height) {
                    throw new Error("Canvas is too small to fit all images.");
                }
            }

            // Update the row height if the current image is taller
            if (scaledHeight > currentRowHeight) {
                currentRowHeight = scaledHeight;
            }

            // Create an object to store image information
            const imageObject = {
                img: img,
                x: currentX,
                y: currentY,
                width: scaledWidth,
                height: scaledHeight,
                isWider: isWider,
                targetScale: 1, // Initial scale
            };

            // Push the image object to the images array
            images.push(imageObject);

            // Store the original position of the image
            originalImagePositions.push({ x: currentX, y: currentY });

            currentX += scaledWidth + imageGap; // Add imageGap between images
        } catch (error) {
            console.error("Error loading image:", imagePath);
        }
    }
}

// Example: Load and display images in rows with a fixed width
const imagePaths = [
    "images/BeeHex.png",
    "images/BookMockUp.jpg",
    "images/c.png",
    "images/circumference.png",
    "images/disc.png",
    "images/Fox.jpg",
    "images/Heart.jpg",
    "images/image (1).png",
    "images/imagea.png",
    "images/PineappleHoney.png",
    "images/Poster.jpg",
    "images/Selfportait.jpg",
    "images/Shoes.jpg",
    "images/Squid.jpg",
    "images/Tree.jpg",
    "images/whatisit.png",
    "images/WhiteTailCoffee.png",
    
];

const fixedImageWidth = 250; // Set the fixed image width
const imageGap = 10; // Set the gap between images
const rowGap = 20; // Set the gap between rows
loadImagesInRows(imagePaths, fixedImageWidth, imageGap, rowGap);

// Add mousemove event listener to track mouse position
canvas.addEventListener("mousemove", function (event) {
    const mouseX = event.clientX - canvas.getBoundingClientRect().left;
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;

    // Check if the mouse is over any image
    hoveredImage = images.find((imageObject) => {
        return (
            mouseX >= imageObject.x &&
            mouseX <= imageObject.x + imageObject.width &&
            mouseY >= imageObject.y &&
            mouseY <= imageObject.y + imageObject.height
        );
    });
});

// Function to detect collisions and push images away
function handleCollisions() {
    // Create an array to store colliding images
    const collidingImages = [];

    if (!hoveredImage) {
        // No hovered image, reset image positions
        for (let i = 0; i < images.length; i++) {
            images[i].x = originalImagePositions[i].x;
            images[i].y = originalImagePositions[i].y;
        }
        return;
    }

    for (const image of images) {
        if (hoveredImage === image) {
            continue; // Skip the hovered image
        }

        const dx = hoveredImage.x - image.x;
        const dy = hoveredImage.y - image.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDistance = hoveredImage.width / 2 + image.width / 2;

        if (distance / 1.5 < minDistance) {
            // Calculate the angle between the two images
            const angle = Math.atan2(dy, dx);

            // Calculate the overlap distance
            const overlap = Math.abs(minDistance - distance) / 2;

            // Calculate the repulsion force
            const forceX = Math.cos(angle) * overlap * 0.1;
            const forceY = Math.sin(angle) * overlap * 0.1;

            // Apply the repulsion force to separate the images
            image.x -= forceX;
            image.y -= forceY;

            // Add the colliding image to the list
            collidingImages.push(image);
        }
    }

    // Log the list of colliding images (you can replace this with your preferred way of displaying the list)
    console.log("Colliding images:", collidingImages);
}

// Function to draw images with gradual scaling effect
function drawImages() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Create an array to store non-hovered images
    const nonHoveredImages = [];

    for (const imageObject of images) {
        if (hoveredImage === imageObject) {
            // Gradually increase the scale of the hovered image
            if (imageObject.targetScale < 1.5) {
                imageObject.targetScale += 0.02; // Adjust the scaling speed here
            }

            // Calculate the scaled width and height based on the target scale
            const scaledWidth = imageObject.width * imageObject.targetScale;
            const scaledHeight = imageObject.height * imageObject.targetScale;
            const x = imageObject.x - (scaledWidth - imageObject.width) / 2;
            const y = imageObject.y - (scaledHeight - imageObject.height) / 2;

            ctx.drawImage(imageObject.img, x, y, scaledWidth, scaledHeight);
        } else {
            // Gradually decrease the scale of images that are not hovered
            if (imageObject.targetScale > 1) {
                imageObject.targetScale -= 0.02; // Adjust the scaling speed here
            }

            // Calculate the scaled width and height based on the target scale
            const scaledWidth = imageObject.width * imageObject.targetScale;
            const scaledHeight = imageObject.height * imageObject.targetScale;
            const x = imageObject.x - (scaledWidth - imageObject.width) / 2;
            const y = imageObject.y - (scaledHeight - imageObject.height) / 2;

            // Store non-hovered images in the array
            nonHoveredImages.push({ img: imageObject.img, x, y, scaledWidth, scaledHeight });
        }
    }

    // Draw non-hovered images first
    for (const imageObject of nonHoveredImages) {
        ctx.drawImage(imageObject.img, imageObject.x, imageObject.y, imageObject.scaledWidth, imageObject.scaledHeight);
    }

    // Handle collisions after drawing
    handleCollisions();

    // Draw the hovered image on top
    if (hoveredImage) {
        const scaledWidth = hoveredImage.width * hoveredImage.targetScale;
        const scaledHeight = hoveredImage.height * hoveredImage.targetScale;
        const x = hoveredImage.x - (scaledWidth - hoveredImage.width) / 2;
        const y = hoveredImage.y - (scaledHeight - hoveredImage.height) / 2;

        ctx.drawImage(hoveredImage.img, x, y, scaledWidth, scaledHeight);
    }

    requestAnimationFrame(drawImages);
}

// Start drawing the images
drawImages();
