const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas(){
const hero = document.querySelector(".hero-banner");
canvas.width = hero.offsetWidth;
canvas.height = hero.offsetHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let particles=[];
const particleCount=18;
const maxDistance=160;

const colors=[
"255,200,80",
"120,180,255",
"255,120,160",
"120,255,200"
];

class Particle{

constructor(){

this.x=Math.random()*canvas.width;
this.y=Math.random()*canvas.height;

this.vx=(Math.random()-0.5)*1.1;
this.vy=(Math.random()-0.5)*1.1;

this.radius=5+Math.random()*5;

this.color=colors[Math.floor(Math.random()*colors.length)];
}

update(){

this.x+=this.vx;
this.y+=this.vy;

if(this.x<0||this.x>canvas.width) this.vx*=-1;
if(this.y<0||this.y>canvas.height) this.vy*=-1;

}

draw(){

const g=ctx.createRadialGradient(
this.x,this.y,0,
this.x,this.y,this.radius*4
);

g.addColorStop(0,`rgba(${this.color},0.9)`);
g.addColorStop(1,`rgba(${this.color},0)`);

ctx.fillStyle=g;

ctx.beginPath();
ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
ctx.fill();
}
}

for(let i=0;i<particleCount;i++){
particles.push(new Particle());
}

function connect(){

for(let i=0;i<particles.length;i++){

for(let j=i+1;j<particles.length;j++){

let dx=particles[i].x-particles[j].x;
let dy=particles[i].y-particles[j].y;

let dist=Math.sqrt(dx*dx+dy*dy);

if(dist<maxDistance){

let opacity=1-dist/maxDistance;

ctx.strokeStyle=`rgba(200,220,255,${opacity*0.35})`;

ctx.beginPath();
ctx.moveTo(particles[i].x,particles[i].y);
ctx.lineTo(particles[j].x,particles[j].y);
ctx.stroke();
}
}
}
}

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height);

particles.forEach(p=>{
p.update();
p.draw();
});

connect();

requestAnimationFrame(animate);
}

animate();
