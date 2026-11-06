import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Software WebGL detection guard from threejs skill
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const scene = new THREE.Scene();

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    container.appendChild(renderer.domElement);

    // Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x6366F1, 2.2);
    keyLight.position.set(5, 6, 4);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x14B8A6, 1.8);
    fillLight.position.set(-5, -3, 3);
    scene.add(fillLight);

    // Composite 3D Architectural Subject Group (Modular acoustic structure & orbital sensors)
    const subjectGroup = new THREE.Group();

    // 1. Central Core Acoustic Pod Frame
    const coreGeo = new THREE.BoxGeometry(2.4, 3.2, 2.0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x1E293B,
      roughness: 0.35,
      metalness: 0.4,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    subjectGroup.add(coreMesh);

    // 2. Translucent Glass Façade
    const glassGeo = new THREE.BoxGeometry(2.44, 3.24, 0.05);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x6366F1,
      roughness: 0.1,
      metalness: 0.1,
      transparent: true,
      opacity: 0.45,
    });
    const glassFront = new THREE.Mesh(glassGeo, glassMat);
    glassFront.position.z = 1.02;
    subjectGroup.add(glassFront);

    // 3. Floating Acoustic Baffles / Ribbons
    const baffleGroup = new THREE.Group();
    const baffleMat = new THREE.MeshStandardMaterial({
      color: 0x14B8A6,
      roughness: 0.6,
      metalness: 0.15,
    });

    for (let i = -3; i <= 3; i++) {
      const baffleGeo = new THREE.BoxGeometry(3.6, 0.08, 0.6);
      const baffleMesh = new THREE.Mesh(baffleGeo, baffleMat);
      baffleMesh.position.set(0, i * 0.48, 0);
      baffleMesh.rotation.y = i * 0.08;
      baffleGroup.add(baffleMesh);
    }
    subjectGroup.add(baffleGroup);

    // 4. Orbital Environmental Sensor Rings
    const ringGeo = new THREE.TorusGeometry(3.2, 0.03, 16, 64);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x6366F1,
      emissive: 0x4F46E5,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.8,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    subjectGroup.add(ringMesh);

    // 5. Ambient Floating Sensor Nodes
    const nodesGroup = new THREE.Group();
    const nodeGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0x06B6D4 });

    for (let i = 0; i < 18; i++) {
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      const angle = (i / 18) * Math.PI * 2;
      const radius = 2.6 + (i % 3) * 0.6;
      node.position.set(
        Math.cos(angle) * radius,
        (Math.sin(i * 1.5) * 1.8),
        Math.sin(angle) * radius
      );
      nodesGroup.add(node);
    }
    subjectGroup.add(nodesGroup);

    scene.add(subjectGroup);

    // Animation Loop
    let animId = 0;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      subjectGroup.rotation.y = elapsed * 0.25;
      subjectGroup.rotation.x = Math.sin(elapsed * 0.3) * 0.12;
      ringMesh.rotation.z = elapsed * 0.4;
      baffleGroup.position.y = Math.sin(elapsed * 0.8) * 0.08;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      glassGeo.dispose();
      glassMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="hero-canvas-wrapper"
      aria-label="Interactive 3D Architectural Hologram"
    />
  );
}
