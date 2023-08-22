function getTransformValue(emoji, property) {
    const transform = emoji.style.transform || window.getComputedStyle(emoji).getPropertyValue('transform');
    const match = transform.match(new RegExp(`${property}\\((-?\\d+(\\.\\d+)?)(px)?\\)`));
    return match ? parseFloat(match[1]) : 0;
}

function animateEmojiToCoordinates(emoji, x, y) {
    const duration = 5000; // Animation duration in milliseconds
    const startTime = performance.now();
    const startX = getTransformValue(emoji, 'translateX');
    const startY = getTransformValue(emoji, 'translateY');

    // Animation function
    function step(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Calculate the new position for the emoji
        const newPositionX = startX + (x - startX) * progress;
        const newPositionY = startY + (y - startY) * progress;
        emoji.style.transform = `translateX(${newPositionX}px) translateY(${newPositionY}px)`;

        // Continue the animation until the duration is reached
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }

    // Start the animation
    requestAnimationFrame(step);
}


// Function to run your animation when the content is loaded
function runAnimation() {
    const emojis = document.querySelectorAll('.emoji');

    // Example usage: Call this function to animate each emoji to the specified x and y coordinates.
    // Replace xCoordinate and yCoordinate with the desired values for each emoji.
    animateEmojiToCoordinates(emojis[0], 500, 600);
    animateEmojiToCoordinates(emojis[1], 600, 500);
    // Add more calls for other emojis as needed
}

// Wait for the content to load before starting the animation
window.addEventListener('load', runAnimation);
