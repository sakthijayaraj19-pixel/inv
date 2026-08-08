let text =document.querySelector('.text');
let text1 =document.querySelector('.text1');
let text2 =document.querySelector('.text2');
let text3 =document.querySelector('.text3');

window.addEventListener('scroll',()=>{
    let value = window.scrollY;

    text.style.marginTop = value * 2.5 + 'px'
    text1.style.marginLeft = value * 2.5 + 'px'
    text2.style.marginBottom = value * 2.5 + 'px'
    text3.style.marginRight= value * 2.5 + 'px'
});
const canvas = document.getElementById('scratchCanvas');
const ctx = canvas.getContext("2d");
// const card = document.querySelector(".scratch-card");

function resizeCanvas(){
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height=rect.height * dpr;

    ctx.scale(dpr,dpr);

    ctx.fillStyle ="#999";
    ctx.fillRect(0,0,rect.width,rect.height);

    ctx.fillStyle ="#666";
    ctx.font = "normal 25px sekuya";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("SCRATCH HERE",rect.width / 2 , rect.height / 2);
    
}

resizeCanvas();
window.addEventListener("resize",resizeCanvas);

let scratching = false;
function getPosition(e){
    const rect = canvas.getBoundingClientRect();
    return{
     x : e.clientX - rect.left,
     y : e.clientY - rect.top

    };
}
function scratch(e) {
    if(!scratching) return;
    
    const {x , y}= getPosition(e);

    ctx.globalCompositeOperation = "destination-out";

    ctx.beginPath();
    ctx.arc(x,y,25,0,Math.PI * 2);
    ctx.fill();
}

// function checkScratchingProgress(){
//     if((ScratchedPixels /totalPixels) > 1){
//         canvas.style.display ="none";
//         triggerBlastEffect();
//     }
// }

// function triggerBlastEffect(){
//     for (let i = 0; i<10; i++){
//         const star = document.createElement("div");
//         star.classList.add("blast");
//         star.style.left = `${Math.random()*100}%`
//         star.style.top = `${Math.random()*100}%`
//         container.appendChild(star);
//         setTimeout(() => star.remove,3000);
//     }
// }


canvas.addEventListener("pointerdown",(e) => {
    scratching = true;
    scratch(e);
});

canvas.addEventListener("pointermove",scratch);
canvas.addEventListener("pointerup",() => {
    scratching = false;
});
canvas.addEventListener("pointerleave",() => {
    scratching = false;
});

















let sections = document.querySelectorAll('section');

window.onscroll =() =>{
    sections.forEach(sec =>{
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;

        if (top >= offset && top < offset + height){
            sec.classList.add('show-animate');
        }
        else{
            sec.classList.remove('show-animate');
        }
    })
}