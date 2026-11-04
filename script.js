const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
if(toggle&&nav){
 toggle.addEventListener('click',()=>{
  const open=nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded',String(open));
  toggle.setAttribute('aria-label',open?'Close menu':'Open menu');
 });
 nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded','false');
 }));
}
const year=document.getElementById('year');
if(year) year.textContent=new Date().getFullYear();

/* Lightweight scroll progress only; leave native wheel/touch scrolling alone. */
const progressBar=document.querySelector('.progress span');
let progressQueued=false;
function updateProgress(){
 if(progressBar){
  const max=document.documentElement.scrollHeight-window.innerHeight;
  progressBar.style.transform='scaleX('+ (max>0?window.scrollY/max:0) +')';
 }
 progressQueued=false;
}
window.addEventListener('scroll',()=>{
 if(!progressQueued){
  window.requestAnimationFrame(updateProgress);
  progressQueued=true;
 }
},{passive:true});
window.addEventListener('resize',updateProgress,{passive:true});
updateProgress();
