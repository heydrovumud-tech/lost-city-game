const scene = new THREE.Scene();
scene.background = new THREE.Color(0x101820);
scene.fog = new THREE.Fog(0x101820,10,120);

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

const hemi = new THREE.HemisphereLight(0xffffff,0x444444,2);
scene.add(hemi);

const sun = new THREE.DirectionalLight(0xffffff,1);
sun.position.set(10,20,10);
scene.add(sun);

const floor = new THREE.Mesh(
new THREE.PlaneGeometry(200,200),
new THREE.MeshStandardMaterial({color:0x555555})
);

floor.rotation.x = -Math.PI/2;
scene.add(floor);

function createTemple(){

const material = new THREE.MeshStandardMaterial({color:0x888888});

const base = new THREE.Mesh(
new THREE.BoxGeometry(20,1,20),
material
);

base.position.y = 0.5;
scene.add(base);

for(let x=-6;x<=6;x+=6){
for(let z=-6;z<=6;z+=6){

const column = new THREE.Mesh(
new THREE.CylinderGeometry(0.7,0.7,8,32),
material
);

column.position.set(x,4,z);
scene.add(column);

}
}

const roof = new THREE.Mesh(
new THREE.BoxGeometry(22,1,22),
material
);

roof.position.y = 9;
scene.add(roof);

}

createTemple();

const artifacts = [];
let collected = 0;

function spawnArtifacts(){

for(let i=0;i<5;i++){

const gem = new THREE.Mesh(
new THREE.IcosahedronGeometry(0.6),
new THREE.MeshStandardMaterial({color:0xffd700})
);

gem.position.set(
(Math.random()-0.5)*15,
1,
(Math.random()-0.5)*15
);

scene.add(gem);
artifacts.push(gem);

}

}
spawnArtifacts();

const keys = {};

document.addEventListener("keydown",e=>{
keys[e.key.toLowerCase()] = true;
});

document.addEventListener("keyup",e=>{
keys[e.key.toLowerCase()] = false;
});

function move(){

const speed = 0.15;

if(keys["w"]) camera.position.z -= speed;
if(keys["s"]) camera.position.z += speed;
if(keys["a"]) camera.position.x -= speed;
if(keys["d"]) camera.position.x += speed;

}

function checkArtifacts(){

artifacts.forEach((a,index)=>{

const dist = camera.position.distanceTo(a.position);

if(dist < 2){

scene.remove(a);
artifacts.splice(index,1);

collected++;

document.getElementById("score").innerText =
"Artifacts: "+collected+" / 5";

if(collected === 5){

alert("You discovered the Lost City treasure!");

}

}

});

}
function animate(){

requestAnimationFrame(animate);

move();
checkArtifacts();

renderer.render(scene,camera);

}

animate();
