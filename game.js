const scene = new THREE.Scene();

scene.background = new THREE.Color(0x0b1d0b);
scene.fog = new THREE.Fog(0x0b1d0b,10,120);

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);

const renderer = new THREE.WebGLRenderer({antialias:true});

renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);

camera.position.set(0,3,10);

const light = new THREE.HemisphereLight(0xffffff,0x444444,2);

scene.add(light);

const sun = new THREE.DirectionalLight(0xffffff,1);

sun.position.set(10,20,10);

scene.add(sun);

const textureLoader = new THREE.TextureLoader();

const stoneTexture = textureLoader.load("assets/stone.png");

const floor = new THREE.Mesh(

new THREE.PlaneGeometry(300,300),

new THREE.MeshStandardMaterial({
map:stoneTexture
})

);

floor.rotation.x = -Math.PI/2;

scene.add(floor);

function createTemple(){

const material = new THREE.MeshStandardMaterial({

map:stoneTexture

});

const base = new THREE.Mesh(

new THREE.BoxGeometry(15,1,15),

material

);

base.position.y = 0.5;

scene.add(base);

for(let x=-5;x<=5;x+=5){

for(let z=-5;z<=5;z+=5){

const column = new THREE.Mesh(

new THREE.CylinderGeometry(0.6,0.6,7,32),

material

);

column.position.set(x,4,z);

scene.add(column);

}

}

const roof = new THREE.Mesh(

new THREE.BoxGeometry(17,1,17),

material

);

roof.position.y = 8;

scene.add(roof);

}

createTemple();

const keys = {};

document.addEventListener("keydown",(e)=>{

keys[e.key.toLowerCase()] = true;

});

document.addEventListener("keyup",(e)=>{

keys[e.key.toLowerCase()] = false;

});

function move(){

let speed = 0.2;

if(keys["w"]) camera.position.z -= speed;
if(keys["s"]) camera.position.z += speed;

if(keys["a"]) camera.position.x -= speed;
if(keys["d"]) camera.position.x += speed;

}

function animate(){

requestAnimationFrame(animate);

move();

renderer.render(scene,camera);

}

animate();

document.getElementById("loading").style.display="none";
