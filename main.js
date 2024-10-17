
import * as THREE from './three.js/build/three.module.js';
import { GLTFLoader } from './three.js/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from './three.js/examples/jsm/controls/OrbitControls.js'

// Create Scene and Camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('threeCanvas'), alpha: true });
renderer.setClearColor(0x000000, 0); // Fully transparent background

renderer.setSize(window.innerWidth, window.innerHeight);
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);


let model;

// Load 3D model
const loader = new GLTFLoader();
loader.load('./models/me.glb', function (gltf) {
    model = gltf.scene;
    model.scale.set(1.5, 1.5, 1.5);
    model.position.set(4.5, -1.5, 0);
    scene.add(model);
    animate();
});

// Add directional light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7.5).normalize();
scene.add(light);

camera.position.z = 4;

// Handle Toggle Button Interaction
const toggle = document.getElementById('rotateToggle');
toggle.addEventListener('change', () => {
    if (toggle.checked) {
        rotateModelLeft();
    } else {
        rotateModelRight();
    }
});



function animate() {
    requestAnimationFrame(animate);
    if (model) { 
        model.rotation.y += 0.01; // Optional auto-rotation
    }
    renderer.render(scene, camera);
}

// Handle Window Resize
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});



