let text =document.querySelector('.text');
// let leaf =document.getElementById('leaf');
// let hill1 =document.getElementById('hill1');
// let hill4 =document.getElementById('hill4');
// let hill5 =document.getElementById('hill5');

window.addEventListener('scroll',()=>{
    let value = window.scrollY;

    text.style.marginTop = value * 2.5 + 'px'
});
const canvas = document.getElementById('scratchCanvas');
const ctx = canvas.getContext('2d');
let isScratching =false;
let scratcedPixels = 0;
let totalPixels = 0;

const container = document.querySelector('.scratch-card');

function setupCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const img = new Image();
    img.src = '10.jpg';
    img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = "destination-out";
        totalPixels = canvas.width . canvas.height;
    };
}

function getCursorPosition(event){
    const rect = canvas.getBoundingClientRect();
    return{
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

function startScratching(event) {
    isScratching = true;
    sratch(event);
}

function stopScratching() {
    isScratching = false;
    checkScratchingProgress();
}

function scratch(event){
    if(!isScratching)return;
    const pos = getCursorPosition(event);
    ctx.beginPath();
    ctx.arc(pos.x,pos.y,100,0, Math.PI*2);
    ctx.fill();
    scratchedPixels += 400;
}

function checkScratchingProgress() {
    if ((scratchedPixels * totalPixels) > 0.4) {
        canvas.style.display = "none"
        triggerBlastEffect();
    }
}

function triggerBlastEffect() {
    for (let i = 0; i<10; i++){
        const star = document.createElement("div");
        star.classList.add("blast");
        star.style.left = `${Math.random()*100}%`;
        star.style.top = `${Math.random()*100}%`;
        container.appendChild(star);
        setTimeout(() => star.remove,3000);
    }
}
canvas.addEventListener("mousedown",startScratching);
canvas.addEventListener("mousemove",scratch);
canvas.addEventListener("mouseup",stopScratching);
canvas.addEventListener("mouseleave",stopScratching);
canvas.addEventListener("screenScratchup",startScratching);
canvas.addEventListener("screenScratch",scratch);
canvas.addEventListener("screenScratchup",stopScratching);
canvas.addEventListener("screenScratchleave",stopScratching);
setupCanvas();