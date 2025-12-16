import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export const use3D = () => {
  const scene = new THREE.Scene();
  const fog = new THREE.Fog(0xffffff, 1, 10);
  scene.fog = fog;
  scene.background = new THREE.Color(0xffffff);
  const canvas = document.querySelector("canvas.threejs") as HTMLCanvasElement;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.domElement = canvas;
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    300
  );
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  function animateLoop() {
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(animateLoop);
  }

  return { animateLoop };
};
