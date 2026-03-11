const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a0a0a);

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth / window.innerHeight,
0.1,
1000
);

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 5;

const light = new THREE.PointLight(0xffffff,2,100);
light.position.set(10,10,10);
scene.add(light);

const ambient = new THREE.AmbientLight(0xffffff,0.5);
scene.add(ambient);

const geometry = new THREE.BoxGeometry(2,2,2);
const material = new THREE.MeshStandardMaterial({
color:0x777777
});

const temple = new THREE.Mesh(geometry,material);
scene.add(temple);

const floorGeo = new THREE.PlaneGeometry(100,100);
const floorMat = new THREE.MeshStandardMaterial({
color:0x333333
});

const floor = new THREE.Mesh(floorGeo,floorMat);
floor.rotation.x = -Math.PI/2;
floor.position.y = -1;
scene.add(floor);

const keys = {};

document.addEventListener("keydown",(e)=>{
keys[e.key] = true;
});

document.addEventListener("keyup",(e)=>{
keys[e.key] = false;
});

function move(){

const speed = 0.1;

if(keys["w"]) camera.position.z -= speed;
if(keys["s"]) camera.position.z += speed;
if(keys["a"]) camera.position.x -= speed;
if(keys["d"]) camera.position.x += speed;

}

function animate(){

requestAnimationFrame(animate);

move();

temple.rotation.y += 0.003;

renderer.render(scene,camera);

}

animate();

document.getElementById("loading").style.display = "none";
