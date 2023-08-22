function waitForSeconds(seconds) {
    return new Promise(resolve => {
      setTimeout(resolve, seconds * 1000);
    });
  }

function animationInfo(){
    let randomBorder = Math.floor(Math.random() * 4) + 1;
    let borderXY = [];

    switch (randomBorder){
        case 1:
            borderXY.push(0-400, windowY(), window.innerWidth+400, windowY());
            break;
        case 2:
            borderXY.push(windowX(), 0-400, windowX(), window.innerHeight+50);
            break;
        case 3:
            borderXY.push(window.innerWidth+50, windowY(), 0-50, windowY());
            break;
        case 4:
            borderXY.push(windowX(), window.innerHeight+50, windowX(), 0-500);
    }
    return borderXY;
}

function windowY(){
    let y = window.innerHeight - Math.floor(Math.random() *  window.innerHeight);
    return y;
}

function windowX(){
    let x = window.innerWidth - Math.floor(Math.random() *  window.innerWidth);
    return x;
}

function screenY(){
    let y = screen.height - Math.floor(Math.random() *  screen.height);
    return y;
}

function screenX(){
    let x = screen.width - Math.floor(Math.random() *  screen.width);
    return x;
}

async function animateEmoji(emoji) {
    let startInfo = animationInfo();
    let startX = startInfo[0];
    let startY = startInfo[1];
    let endX = startInfo[2];
    let endY = startInfo[3];
    
    for (i = 0; i < emoji.length; i++) {
        emoji[i].style.transform = `translateX(${startX}px) translateY(${startY}px)`;
        
    }

    for (i = 0; i < emoji.length; i++) {
        animate(startX, startY, endX, endY, 5000, emoji[i]);
        await waitForSeconds(0.4);
  }
}

  function animate(startX, startY, endX, endY, duration, emoji) {
    let startTime = performance.now();
  
    function step(currentTime) {
        let elapsed = currentTime - startTime;
        let progress = Math.min(elapsed / duration, 2);
  
        let x = startX + (endX - startX) * progress;
        let y = startY + (endY - startY) * progress;
  
        emoji.style.transform = `translateX(${x}px) translateY(${y}px)`;
  
        if (progress < 2) {
            requestAnimationFrame(step);
        }
    }

    let emojiXY = emoji.getBoundingClientRect();
    let x = emojiXY.left;
    let y = emojiXY.top;

    console.log('new');
    console.log('start x ' + x);
    console.log('start y ' + y);
    console.log('end x ' + endX);
    console.log('end y ' + endY);
    requestAnimationFrame(step);

  }

  async function runAnimation() {
    const asians = document.querySelectorAll('.asian');
    const meats = document.querySelectorAll('.meat');
    const breads = document.querySelectorAll('.bread');
    const deserts = document.querySelectorAll('.desert');
    const fruits = document.querySelectorAll('.fruits');
    const vegetables = document.querySelectorAll('.vegetables');
    
    console.log('window W ' + window.innerWidth);
    console.log('window H ' + window.innerHeight);
    console.log('screen w ' + screen.width);
    console.log('screen h ' + screen.height);

    animateEmoji(asians);
    await waitForSeconds(1);
    animateEmoji(meats);
    await waitForSeconds(1);
    animateEmoji(breads);
    await waitForSeconds(1);
    animateEmoji(fruits);
    await waitForSeconds(1);
    animateEmoji(deserts);
    await waitForSeconds(1);
    animateEmoji(vegetables);
    
}


window.addEventListener('load', runAnimation);