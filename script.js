// Typing Effect

const words=["AI Developer","Full Stack Developer","ML Enthusiast"];
let i=0,j=0,currentWord="",isDeleting=false;

function type(){
currentWord=words[i];
if(!isDeleting){
document.getElementById("typing").textContent=currentWord.slice(0,j++);
if(j>currentWord.length+2){isDeleting=true;}
}else{
document.getElementById("typing").textContent=currentWord.slice(0,j--);
if(j==0){isDeleting=false;i=(i+1)%words.length;}
}
setTimeout(type,120);
}
type();

// Scroll Fade Animation

const faders=document.querySelectorAll(".fade");

window.addEventListener("scroll",()=>{
faders.forEach(el=>{
const top=el.getBoundingClientRect().top;
if(top<window.innerHeight-100){
el.classList.add("show");
}
});
});
