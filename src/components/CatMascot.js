import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const CatMascot = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.clientWidth;
    const H = mount.clientHeight;

    // ── Renderer ──────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    // ── Scene & camera ─────────────────────────────────
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, W / H, 0.01, 100);

    // ── Lighting ───────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 2.5));
    const key = new THREE.DirectionalLight(0xfff5e0, 3.0);
    key.position.set(2, 4, 5);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xd0c8ff, 1.2);
    fill.position.set(-3, 1, 3);
    scene.add(fill);

    // ── Runtime state ──────────────────────────────────
    let mixer    = null;
    let headBone = null;
    let rafId;
    const clock = new THREE.Clock();

    const mouse = { x: 0, y: 0 };
    const headOff = { x: 0, y: 0 };
    const headTgt = { x: 0, y: 0 };
    const MAX_HEAD = 0.38;

    // ── Load model ─────────────────────────────────────
    const loader = new GLTFLoader();
    loader.load(
      `${process.env.PUBLIC_URL}/models/toon_cat_free.glb`,
      (gltf) => {
        const model = gltf.scene;

        const box    = new THREE.Box3().setFromObject(model);
        const size   = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        const scale  = 2.8 / size.y;
        model.scale.setScalar(scale);
        model.position.set(-center.x * scale, -box.min.y * scale, -center.z * scale);

        scene.add(model);

        const catH   = size.y * scale;
        const focusY = catH * 0.68;
        camera.position.set(0, focusY, catH * 1.35);
        camera.lookAt(0, focusY, 0);

        model.traverse((obj) => {
          if (obj.name === 'head_018') headBone = obj;
        });

        if (gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(model);
          const action = mixer.clipAction(gltf.animations[0]);
          action.timeScale = 0.5;
          action.play();
        }
      },
      undefined,
      (err) => console.error('CatMascot GLB load error:', err)
    );

    // ── Mouse ──────────────────────────────────────────
    const onMouseMove = (e) => {
      const rect = mount.getBoundingClientRect();
      const cx = rect.left + rect.width  * 0.5;
      const cy = rect.top  + rect.height * 0.5;
      mouse.x =  (e.clientX - cx) / (window.innerWidth  * 0.5);
      mouse.y = -(e.clientY - cy) / (window.innerHeight * 0.5);
    };
    window.addEventListener('mousemove', onMouseMove);

    // ── Render loop ────────────────────────────────────
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (mixer) mixer.update(delta);

      headTgt.x = Math.max(-MAX_HEAD, Math.min(MAX_HEAD, -mouse.y * 0.45));
      headTgt.y = Math.max(-MAX_HEAD, Math.min(MAX_HEAD,  mouse.x * 0.45));
      headOff.x += (headTgt.x - headOff.x) * 0.07;
      headOff.y += (headTgt.y - headOff.y) * 0.07;
      if (headBone) {
        headBone.rotation.x += headOff.x;
        headBone.rotation.y += headOff.y;
      }

      renderer.render(scene, camera);
    };
    animate();

    // ── Cleanup ────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="cat-mascot"
    />
  );
};

export default CatMascot;
