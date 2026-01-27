const canvas = document.getElementById("three-canvas");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 12;

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000000, 0); 

scene.add(new THREE.AmbientLight(0xffffff, 0.6));

const light = new THREE.PointLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light);

const isMobile = window.innerWidth < 768;

const colors = isMobile
  ? [0x0085c7, 0xf4c300, 0x009f3d]
  : [0x0085c7, 0xf4c300, 0x000000, 0x009f3d, 0xdf0024];

const rings = [];

colors.forEach((color, i) => {
  const geometry = new THREE.TorusGeometry(1.5, 0.2, 16, 100);
  const material = new THREE.MeshStandardMaterial({ color });
  const ring = new THREE.Mesh(geometry, material);
  ring.position.x = (i - (colors.length - 1) / 2) * 3;
  rings.push(ring);
  scene.add(ring);
});

function animate() {
  requestAnimationFrame(animate);
  rings.forEach(r => {
    r.rotation.x += 0.005;
    r.rotation.y += 0.01;
  });
  renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
