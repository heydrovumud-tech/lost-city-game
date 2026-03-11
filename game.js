const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b1d0b);
scene.fog = new THREE.Fog(0x0b1d0b,10,80);

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.set(0,2,6);

const hemiLight = new THREE.HemisphereLight(0xffffff,0x444444,2);
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(0xffffff,1);
dirLight.position.set(10,20,10);
scene.add(dirLight);

const floorGeo = new THREE.PlaneGeometry(200,200);
const floorMat = new THREE.MeshStandardMaterial({color:0x3b3b3b});
const floor = new THREE.Mesh(floorGeo,floorMat);
floor.rotation.x = -Math.PI/2;
scene.add(floor);

const loader = new THREE.GLTFLoader();

loader.load(

"assets/temple.glb",

function(gltf){

const temple = gltf.scene;
temple.scale.set(3,3,3);
temple.position.set(0,0,0);

scene.add(temple);

document.getElementById("loading").style.display="none";

},

undefined,

function(error){

console.log("Temple load error:",error);
document.getElementById("loading").innerText="Temple model missing";

}

);

const keys={};

document.addEventListener("keydown",(e)=>{
keys[e.key.toLowerCase()] = true;
});

document.addEventListener("keyup",(e)=>{
keys[e.key.toLowerCase()] = false;
});

function move(){

let speed=0.15;

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

window.addEventListener("resize",()=>{

camera.aspect = window.innerWidth/window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize(window.innerWidth,window.innerHeight);

});
