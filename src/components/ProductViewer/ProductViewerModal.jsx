import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { X, RotateCw, ZoomIn, ZoomOut, RefreshCw, MessageCircle, ChevronDown, ChevronUp, Layers, Box } from 'lucide-react';
import { useIndustry } from '../../hooks/useIndustry.jsx';
import { openWhatsAppChat } from '../../services/whatsappService.js';
import '../../styles/viewer3d.css';

const FINISHES = [
  { id: 'obsidian', name: 'Matte Obsidian', hex: '#1E293B', color: 0x1e293b, metalness: 0.8, roughness: 0.2 },
  { id: 'titanium', name: 'Brushed Titanium', hex: '#94A3B8', color: 0x94a3b8, metalness: 0.95, roughness: 0.15 },
  { id: 'oak', name: 'Nordic Oak', hex: '#D97706', color: 0xc2782b, metalness: 0.05, roughness: 0.75 },
  { id: 'white', name: 'Arctic White', hex: '#F8FAFC', color: 0xf8fafc, metalness: 0.2, roughness: 0.25 },
];

export default function ProductViewerModal({ product, onClose }) {
  const { currentIndustry } = useIndustry();
  const canvasMountRef = useRef(null);

  const [activeFinish, setActiveFinish] = useState(FINISHES[0]);
  const [autoRotate, setAutoRotate] = useState(true);
  const [explodedVal, setExplodedVal] = useState(0);
  const [wireframe, setWireframe] = useState(false);
  const [dockCollapsed, setDockCollapsed] = useState(false);

  // References for live updates inside Three.js
  const sceneStateRef = useRef({
    finish: FINISHES[0],
    autoRotate: true,
    exploded: 0,
    wireframe: false,
  });

  useEffect(() => {
    sceneStateRef.current.finish = activeFinish;
    sceneStateRef.current.autoRotate = autoRotate;
    sceneStateRef.current.exploded = explodedVal;
    sceneStateRef.current.wireframe = wireframe;
  }, [activeFinish, autoRotate, explodedVal, wireframe]);

  const cameraResetRef = useRef(null);
  const zoomInRef = useRef(null);
  const zoomOutRef = useRef(null);

  useEffect(() => {
    const container = canvasMountRef.current;
    if (!container) return;

    // 1. Detect software WebGL
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
    scene.background = new THREE.Color(0x0b0f17);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(4, 3, 5.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 + 0.05; // Prevent flipping under ground
    controls.minDistance = 2.5;
    controls.maxDistance = 14;

    cameraResetRef.current = () => {
      camera.position.set(4, 3, 5.5);
      controls.target.set(0, 0.8, 0);
      controls.update();
    };

    zoomInRef.current = () => {
      camera.position.multiplyScalar(0.85);
      controls.update();
    };

    zoomOutRef.current = () => {
      camera.position.multiplyScalar(1.15);
      controls.update();
    };

    // Studio Lighting Rig
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x1e293b, 1.2);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(6, 8, 5);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x6366f1, 1.6);
    rimLight.position.set(-6, 4, -5);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(0x14b8a6, 1.2, 10);
    fillLight.position.set(0, -1, 3);
    scene.add(fillLight);

    // Ground Contact Shadow Plinth
    const groundGeo = new THREE.PlaneGeometry(16, 16);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x070a10,
      roughness: 0.8,
      metalness: 0.2,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.01;
    ground.receiveShadow = !isSoftwareGl;
    scene.add(ground);

    // Circular Grid Markings
    const gridHelper = new THREE.GridHelper(10, 20, 0x6366f1, 0x1e293b);
    gridHelper.position.y = 0.001;
    scene.add(gridHelper);

    // Build Procedural 3D Composite Product Model (3 to 12 parts)
    const productRoot = new THREE.Group();
    productRoot.position.set(0, 0, 0);

    // Sub-assemblies for exploded view movement
    const baseAssembly = new THREE.Group();
    const frameAssembly = new THREE.Group();
    const roofAssembly = new THREE.Group();
    const glassAssembly = new THREE.Group();
    const interiorAssembly = new THREE.Group();

    // 1. Base Foundation Plinth
    const baseGeo = new THREE.BoxGeometry(2.6, 0.2, 2.0);
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.6, metalness: 0.5 });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = 0.1;
    baseMesh.castShadow = !isSoftwareGl;
    baseMesh.receiveShadow = !isSoftwareGl;
    baseAssembly.add(baseMesh);

    // 2. Main Acoustic Slat Frame (Responds to Finish customizer)
    const exteriorMat = new THREE.MeshStandardMaterial({
      color: activeFinish.color,
      roughness: activeFinish.roughness,
      metalness: activeFinish.metalness,
    });

    const rearWallGeo = new THREE.BoxGeometry(2.6, 2.4, 0.15);
    const rearWall = new THREE.Mesh(rearWallGeo, exteriorMat);
    rearWall.position.set(0, 1.35, -0.92);
    rearWall.castShadow = !isSoftwareGl;
    frameAssembly.add(rearWall);

    const leftWallGeo = new THREE.BoxGeometry(0.15, 2.4, 1.8);
    const leftWall = new THREE.Mesh(leftWallGeo, exteriorMat);
    leftWall.position.set(-1.22, 1.35, 0);
    leftWall.castShadow = !isSoftwareGl;
    frameAssembly.add(leftWall);

    const rightWallGeo = new THREE.BoxGeometry(0.15, 2.4, 1.8);
    const rightWall = new THREE.Mesh(rightWallGeo, exteriorMat);
    rightWall.position.set(1.22, 1.35, 0);
    rightWall.castShadow = !isSoftwareGl;
    frameAssembly.add(rightWall);

    // 3. Acoustic Slat Ribbons Detail
    const slatMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.4 });
    for (let i = 0; i < 7; i++) {
      const slatGeo = new THREE.BoxGeometry(0.04, 2.3, 0.08);
      const slatMesh = new THREE.Mesh(slatGeo, slatMat);
      slatMesh.position.set(-1.18, 1.35, -0.7 + i * 0.24);
      frameAssembly.add(slatMesh);
    }

    // 4. Roof Ceiling Module with Circadian LED Diffuser
    const roofGeo = new THREE.BoxGeometry(2.6, 0.25, 2.0);
    const roofMesh = new THREE.Mesh(roofGeo, exteriorMat);
    roofMesh.position.y = 2.65;
    roofAssembly.add(roofMesh);

    const lightPanelGeo = new THREE.BoxGeometry(2.1, 0.02, 1.5);
    const lightPanelMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x6366f1,
      emissiveIntensity: 0.7,
      roughness: 0.2,
    });
    const lightPanel = new THREE.Mesh(lightPanelGeo, lightPanelMat);
    lightPanel.position.set(0, 2.5, 0);
    roofAssembly.add(lightPanel);

    // 5. Front Acoustic Double Glazed Glass Door
    const glassDoorGeo = new THREE.BoxGeometry(2.4, 2.35, 0.04);
    const glassDoorMat = new THREE.MeshPhysicalMaterial({
      color: 0x818cf8,
      transparent: true,
      opacity: 0.42,
      roughness: 0.08,
      metalness: 0.1,
    });
    const glassDoor = new THREE.Mesh(glassDoorGeo, glassDoorMat);
    glassDoor.position.set(0, 1.35, 0.95);
    glassAssembly.add(glassDoor);

    const doorHandleGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.8, 16);
    const doorHandleMat = new THREE.MeshStandardMaterial({ color: 0x14b8a6, metalness: 0.9, roughness: 0.1 });
    const doorHandle = new THREE.Mesh(doorHandleGeo, doorHandleMat);
    doorHandle.position.set(0.85, 1.35, 1.02);
    glassAssembly.add(doorHandle);

    // 6. Interior Autonomous Console & Executive Seating
    const deskGeo = new THREE.BoxGeometry(1.6, 0.08, 0.7);
    const deskMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.3, metalness: 0.6 });
    const desk = new THREE.Mesh(deskGeo, deskMat);
    desk.position.set(0, 0.9, 0);
    interiorAssembly.add(desk);

    const chairGeo = new THREE.BoxGeometry(0.6, 0.6, 0.5);
    const chairMat = new THREE.MeshStandardMaterial({ color: 0x14b8a6, roughness: 0.5 });
    const chair = new THREE.Mesh(chairGeo, chairMat);
    chair.position.set(0, 0.55, -0.45);
    interiorAssembly.add(chair);

    productRoot.add(baseAssembly);
    productRoot.add(frameAssembly);
    productRoot.add(roofAssembly);
    productRoot.add(glassAssembly);
    productRoot.add(interiorAssembly);

    scene.add(productRoot);

    controls.target.set(0, 1.2, 0);
    controls.update();

    // Render loop
    let animId = 0;
    const animate = () => {
      const state = sceneStateRef.current;

      // Update materials dynamically
      exteriorMat.color.setHex(state.finish.color);
      exteriorMat.roughness = state.finish.roughness;
      exteriorMat.metalness = state.finish.metalness;
      exteriorMat.wireframe = state.wireframe;
      baseMat.wireframe = state.wireframe;

      // Handle exploded parts separation
      const exp = state.exploded;
      roofAssembly.position.y = exp * 1.2;
      glassAssembly.position.z = exp * 0.9;
      leftWall.position.x = -1.22 - exp * 0.7;
      rightWall.position.x = 1.22 + exp * 0.7;
      rearWall.position.z = -0.92 - exp * 0.8;

      if (state.autoRotate) {
        productRoot.rotation.y += 0.005;
      }

      controls.update();
      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

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
      controls.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      baseGeo.dispose();
      baseMat.dispose();
      rearWallGeo.dispose();
      leftWallGeo.dispose();
      rightWallGeo.dispose();
      exteriorMat.dispose();
      roofGeo.dispose();
      lightPanelGeo.dispose();
      lightPanelMat.dispose();
      glassDoorGeo.dispose();
      glassDoorMat.dispose();
      deskGeo.dispose();
      deskMat.dispose();
      chairGeo.dispose();
      chairMat.dispose();
    };
  }, []);

  const handleWhatsAppQuote = () => {
    const msg = currentIndustry.whatsappTemplates.product(product.name, product.category);
    openWhatsAppChat(currentIndustry.contactInfo.rawPhone, msg);
  };

  return (
    <div className="viewer-modal-backdrop" role="dialog" aria-modal="true">
      {/* Top Header Bar */}
      <div className="viewer-header">
        <div className="viewer-header-info">
          <div>
            <h2 className="viewer-product-title">{product.name}</h2>
            <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
              <span className="viewer-category-badge">{product.category}</span>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>360° Real-time Procedural Digital Twin</span>
            </div>
          </div>
        </div>

        <div className="viewer-header-controls">
          <button
            type="button"
            onClick={handleWhatsAppQuote}
            className="btn btn-whatsapp btn-sm"
          >
            <MessageCircle size={16} />
            <span>Request Quote on WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="btn btn-secondary btn-sm"
            aria-label="Close 3D Viewer"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Central 3D Canvas */}
      <div
        ref={canvasMountRef}
        className="viewer-canvas-container"
        aria-label="Interactive 3D Product Canvas. Click and drag to rotate, scroll to zoom."
      />

      {/* Unified Bottom Control Dock */}
      <div className={`viewer-dock-container ${dockCollapsed ? 'collapsed' : ''}`}>
        <button
          type="button"
          onClick={() => setDockCollapsed(!dockCollapsed)}
          className="viewer-dock-toggle-btn"
          aria-expanded={!dockCollapsed}
        >
          {dockCollapsed ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          <span>{dockCollapsed ? 'Show Controls' : 'Hide Controls'}</span>
        </button>

        <div className="viewer-dock-panel">
          {/* Finish / Material Customizer */}
          <div className="dock-group">
            <span className="dock-label">Finish:</span>
            <div className="dock-swatches" role="radiogroup" aria-label="Product Finishes">
              {FINISHES.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setActiveFinish(f)}
                  className={`dock-swatch-btn ${activeFinish.id === f.id ? 'active' : ''}`}
                  style={{ backgroundColor: f.hex }}
                  title={f.name}
                  aria-label={f.name}
                />
              ))}
            </div>
          </div>

          {/* Exploded View Slider */}
          <div className="dock-group">
            <span className="dock-label">Exploded View:</span>
            <div className="dock-slider-wrap">
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={explodedVal}
                onChange={(e) => setExplodedVal(parseFloat(e.target.value))}
                className="dock-range-slider"
                aria-label="Exploded parts separation distance"
              />
              <span style={{ fontSize: '0.75rem', color: '#94a3b8', width: '32px' }}>
                {Math.round(explodedVal * 100)}%
              </span>
            </div>
          </div>

          {/* Camera & Rotation Controls */}
          <div className="dock-group">
            <button
              type="button"
              onClick={() => setAutoRotate(!autoRotate)}
              className={`dock-btn ${autoRotate ? 'active' : ''}`}
              title="Toggle automatic rotation"
            >
              <RotateCw size={14} />
              <span>{autoRotate ? 'Rotating' : 'Paused'}</span>
            </button>

            <button
              type="button"
              onClick={() => zoomInRef.current && zoomInRef.current()}
              className="dock-btn"
              title="Zoom In"
            >
              <ZoomIn size={14} />
            </button>

            <button
              type="button"
              onClick={() => zoomOutRef.current && zoomOutRef.current()}
              className="dock-btn"
              title="Zoom Out"
            >
              <ZoomOut size={14} />
            </button>

            <button
              type="button"
              onClick={() => cameraResetRef.current && cameraResetRef.current()}
              className="dock-btn"
              title="Reset View Angle"
            >
              <RefreshCw size={14} />
              <span>Reset</span>
            </button>

            <button
              type="button"
              onClick={() => setWireframe(!wireframe)}
              className={`dock-btn ${wireframe ? 'active' : ''}`}
              title="Toggle Wireframe Architecture"
            >
              <Box size={14} />
              <span>{wireframe ? 'Solid' : 'Wireframe'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
