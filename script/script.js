function animationInfo(){
    const randomBorder = Math.floor(Math.random() * 4) + 1;
    const borderXY = [];

    switch (randomBorder){
        case 1:
            borderXY.push(0-50, windowY(), window.innerWidth+50, windowY());
            break;
        case 2:
            borderXY.push(windowX(), 0-50, windowX(), window.innerHeight+50);
            break;
        case 3:
            borderXY.push(window.innerWidth+50, windowY(), 0-50, windowY());
            break;
        case 4:
            borderXY.push(windowX(), window.innerHeight+50, windowX(), 0-50);
    }
    return borderXY;
}

function windowY(){
    const y = window.innerHeight - Math.floor(Math.random() *  window.innerHeight);
    return y;
}

function windowX(){
    const x = window.innerWidth - Math.floor(Math.random() *  window.innerWidth);
    return x;
}

function screenY(){
    const y = screen.height - Math.floor(Math.random() *  screen.height);
    return y;
}

function screenX(){
    const x = screen.width - Math.floor(Math.random() *  screen.width);
    return x;
}

function animateEmoji(emoji, duration) {
    const startInfo = animationInfo();
    const startX = startInfo[0];
    const startY = startInfo[1];
    const endX = startInfo[2];
    const endY = startInfo[3];
    
    emoji.style.transform = `translateX(${startX}px) translateY(${startY}px)`;

    const startTime = performance.now();
  
    function step(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
  
        const x = startX + (endX - startX) * progress;
        const y = startY + (endY - startY) * progress;
  
        emoji.style.transform = `translateX(${x}px) translateY(${y}px)`;
  
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }
    requestAnimationFrame(step);
  }

  function runAnimation() {
    const emojis = document.querySelectorAll('.emoji');

    animateEmoji(emojis[0], 5000);
    animateEmoji(emojis[1], 5000); 
}

window.addEventListener('load', runAnimation);