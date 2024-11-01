
// import * as THREE from './three.js/build/three.module.js';
// import { GLTFLoader } from './three.js/examples/jsm/loaders/GLTFLoader.js';
// import { OrbitControls } from './three.js/examples/jsm/controls/OrbitControls.js';

// // Create Scene and Camera
// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// const renderer = new THREE.WebGLRenderer({
//      canvas: document.getElementById('threeCanvas'), 
//      alpha: true 
//     });
// renderer.setClearColor(0x000000, 0); // Fully transparent background

// renderer.setSize(window.innerWidth, window.innerHeight);
// const ambientLight = new THREE.AmbientLight(0xffffff, 1);
// scene.add(ambientLight);

// let model , model2;
// let rotateLeft = false;
// let rotateRight = false;

// // Load 3D model
// const loader = new GLTFLoader();
// loader.load('./models/Karakter.glb', function (gltf) {
//     model = gltf.scene;
//     model.scale.set(1.5, 1.5, 1.5);
//     model.position.set(-4.5, 0, 0);

//     scene.add(model);
//     animate();
// });

// loader.load('./models/chuck_taylor_blue.glb', function (gltf) {
//     model2 = gltf.scene;
//     model2.scale.set(1.2, 1.2, 1.2);  // Set scale
//     model2.position.set(-4.5, 0, 0);  // Set position
//     scene.add(model2);
//     animate();
// });


// // Add directional light
// const light = new THREE.DirectionalLight(0xffffff, 1);
// light.position.set(5, 10, 7.5).normalize();
// scene.add(light);

// // Set camera position and target
// camera.position.set(0, 0, 5);
// camera.lookAt(0, 0, 0);

// // Handle Toggle Button Interaction
// const toggle = document.getElementById('rotateToggle');
// toggle.addEventListener('change', () => {
//     if (toggle.checked) {
//         rotateLeft = true;
//         rotateRight = false; // Disable right rotation
//     } else {
//         rotateRight = true;
//         rotateLeft = false; // Disable left rotation
//     }
// });

// // Define the animate function to continuously rotate based on toggle
// function animate() {
//     requestAnimationFrame(animate);

//     if (model) {
//         if (rotateLeft) {
//             model.rotation.y += 0.01;  // Rotate to the left
//         } else if (rotateRight) {
//             model.rotation.y -= 0.01;  // Rotate to the right
//         }
//     }

//     renderer.render(scene, camera);
// }

// // Handle Window Resize
// window.addEventListener('resize', () => {
//     const width = window.innerWidth;
//     const height = window.innerHeight;
//     renderer.setSize(width, height);
//     camera.aspect = width / height;
//     camera.updateProjectionMatrix();
// });



// // Select the header element
// const header = document.querySelector('header');

// // Check if the header is selected properly
// if (header) {
//     console.log("Header selected correctly");
// } else {
//     console.error("Header not found!");
// }

// let lastScrollTop = 0; // Variable to store the last scroll position

// // Add event listener to detect scrolling
// window.addEventListener('scroll', function() {
//     let scrollTop = window.pageYOffset || document.documentElement.scrollTop; // Get current scroll position
//     console.log("Scroll Position:", scrollTop); // Log scroll position to verify it's working

//     if (scrollTop > lastScrollTop) {
//         // Scrolling down - hide the header
//         header.style.top = "-60px"; // Adjust this value based on your header height
//         console.log("Hiding Header");
//     } else {
//         // Scrolling up - show the header
//         header.style.top = "0";
//         console.log("Showing Header");
//     }

//     lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Reset for next scroll event
// });

import * as THREE from './three.js/build/three.module.js';
import { GLTFLoader } from './three.js/examples/jsm/loaders/GLTFLoader.js';

// Fungsi untuk mengatur model yang mengikuti mouse
function setupMouseFollowModel(canvasId, modelPath) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById(canvasId), alpha: true });
    renderer.setSize(400, 400);

    const loader = new GLTFLoader();
    let model;
    loader.load(modelPath, (gltf) => {
        model = gltf.scene;
        scene.add(model);
    });

    document.getElementById(canvasId).addEventListener('mousemove', (event) => {
        if (model) {
            // Model mengikuti posisi mouse
            const x = (event.clientX / window.innerWidth) * 2 - 1;
            const y = -(event.clientY / window.innerHeight) * 2 + 1;
            model.position.set(x * 2, y * 2, 0);
        }
    });

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();
}

// Fungsi untuk mengatur model dengan kontrol toggle (rotate left/right)
function setupToggleRotateModel(canvasId, modelPath) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById(canvasId), alpha: true });
    renderer.setSize(400, 400);

    const loader = new GLTFLoader();
    let model;
    loader.load(modelPath, (gltf) => {
        model = gltf.scene;
        scene.add(model);
    });

    const toggle = document.getElementById('rotateToggle');
    let rotateLeft = false;

    toggle.addEventListener('change', () => {
        rotateLeft = toggle.checked;
    });

    function animate() {
        requestAnimationFrame(animate);
        if (model) {
            if (rotateLeft) {
                model.rotation.y += 0.01;
            } else {
                model.rotation.y -= 0.01;
            }
        }
        renderer.render(scene, camera);
    }
    animate();
}

// Inisialisasi kedua model
setupMouseFollowModel('canvas1', './models/Model3d.glb');  // Model 1 yang mengikuti mouse
setupToggleRotateModel('canvas2', './models/Model3d.glb'); // Model 2 yang dirotasi dengan toggle

// Event resize agar ukuran tetap responsif
window.addEventListener('resize', () => {
    document.querySelectorAll('canvas').forEach((canvas) => {
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
        renderer.setSize(400, 400);
    });
});
