"use client";

import { Component, ReactNode, Suspense, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Canvas, ThreeEvent, useLoader } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import * as THREE from "three";

const MAP_MODEL_MTL_URL = "/images/map/Bahan%20Denah%203D.mtl?v=1";
const MAP_MODEL_OBJ_URL = "/images/map/Bahan%20Denah%203D.obj?v=1";
const MAP_MODEL_POSITION: [number, number, number] = [-69.54, -10.04, 40.33];
const MAP_CONTROL_TARGET: [number, number, number] = [0, 0, 0];
const MAP_PREVIEW_CAMERA: [number, number, number] = [0, 55, 120];
const MAP_FULLSCREEN_CAMERA: [number, number, number] = [0, 70, 145];

type SelectedObjectData = {
  title: string;
  description: string;
};

type ColorDetailData = {
  name: string;
  description: string;
};

function MapLoadingFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black text-[#F5A623]">
      <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-[#F5A623]" />
    </div>
  );
}

function MapErrorFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black px-4 text-center text-sm font-bold uppercase tracking-wider text-[#F5A623]">
      Map gagal dimuat
    </div>
  );
}

class MapErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <MapErrorFallback />;
    }

    return this.props.children;
  }
}

const COLOR_DETAIL_DATA: Record<string, ColorDetailData> = {
  "#6565FF": {
    name: "Stand Sponsor",
    description:
      "Merepresentasikan nuansa teknologi, informasi, dan area sejuk.",
  },
  "#99FF32": {
    name: "Expo Asrama",
    description:
      "Menggambarkan area aktif, segar, atau jalur interaksi pengguna.",
  },
  "#FF99CC": {
    name: "Expo Ormada",
    description: "true",
  },

  "#663300": {
    name: "Stand Fundra",
    description: "Mewakili elemen tanah, kayu, atau area bernuansa natural.",
  },

  "#3A3A3A": {
    name: "Area Parkir",
    description: "Membantu membentuk bayangan, struktur, dan batas objek.",
  },

  "#808080": {
    name: "Parkir Panitia",
    description:
      "Menyeimbangkan komposisi visual antara warna hangat dan gelap.",
  },
};

function getObjectDetail(
  objectName: string,
  materialName: string,
  colorHex: string,
): SelectedObjectData {
  const normalizedColorHex = `#${colorHex.toUpperCase()}`;
  const colorDetail = COLOR_DETAIL_DATA[normalizedColorHex];

  if (colorDetail) {
    return {
      title: `${colorDetail.name}`,
      description: "",
    };
  }

  return {
    title: `${normalizedColorHex}`,
    description: "",
  };
}

function SpinningModelScene({
  isFullscreen,
  onObjectSelect,
}: {
  isFullscreen: boolean;
  onObjectSelect?: (data: SelectedObjectData) => void;
}) {
  const materials = useLoader(MTLLoader, MAP_MODEL_MTL_URL);
  const obj = useLoader(OBJLoader, MAP_MODEL_OBJ_URL, (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });
  obj.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      if (!child.material || Object.keys(child.material).length === 0) {
        child.material = new THREE.MeshStandardMaterial({
          color: "#ffffff",
          roughness: 0.6,
          metalness: 0.1,
        });
      }
    }
  });

  const handleObjectClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    if (!isFullscreen || !onObjectSelect) return;
    // Periksa semua intersections (dari depan ke belakang) dan pilih objek pertama
    // yang bukan berwarna putih (#ffffff). Jika tidak ada, abaikan klik.
    const intersections = (event as any).intersections as
      | Array<{ object: THREE.Object3D }>
      | undefined;
    let targetMesh: THREE.Mesh | null = null;
    let targetColorHex = "";
    let targetMaterialName = "";
    let targetObjectName = "";

    const tryUse = (mesh: THREE.Mesh | null) => {
      if (!mesh) return false;
      const mat = Array.isArray(mesh.material)
        ? mesh.material[0]
        : mesh.material;
      const colorHex =
        mat instanceof THREE.Material && "color" in mat
          ? (mat as THREE.MeshStandardMaterial).color.getHexString()
          : "";
      if (!colorHex || colorHex.toLowerCase() === "ffffff") return false;
      const normalizedColor = `#${colorHex.toUpperCase()}`;
      if (!(normalizedColor in COLOR_DETAIL_DATA)) return false; // Warna tidak ada di list
      targetMesh = mesh;
      targetColorHex = colorHex;
      targetMaterialName = mat?.name || "Default Material";
      targetObjectName = mesh.name || mesh.parent?.name || "Bagian Map";
      return true;
    };

    if (intersections && intersections.length > 0) {
      for (const inter of intersections) {
        const mesh = inter.object as THREE.Mesh;
        if (tryUse(mesh)) break;
      }
    }

    // Fallback: gunakan event.object jika belum menemukan target
    if (!targetMesh) {
      const clickedMesh = event.object as THREE.Mesh;
      tryUse(clickedMesh);
    }

    if (!targetMesh) return; // tidak ada objek non-putih ditemukan

    onObjectSelect(
      getObjectDetail(targetObjectName, targetMaterialName, targetColorHex),
    );
  };

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[10, 20, 10]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-10, -10, -10]} intensity={0.5} />
      <Environment preset="sunset" />

      <group>
        <primitive
          object={obj}
          scale={1}
          position={MAP_MODEL_POSITION}
          onClick={handleObjectClick}
        />
      </group>

      <OrbitControls
        target={MAP_CONTROL_TARGET}
        enablePan
        enableZoom
        enableRotate
        maxPolarAngle={Math.PI / 2 + 0.2}
        minDistance={8}
        maxDistance={260}
      />
    </>
  );
}

export default function InteractiveMapComponent() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedObject, setSelectedObject] =
    useState<SelectedObjectData | null>(null);

  useEffect(() => {
    if (!isFullscreen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isFullscreen]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFullscreen(false);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const openFullscreen = () => {
    setIsFullscreen(true);
    document.documentElement.requestFullscreen?.().catch(() => undefined);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    setSelectedObject(null);
    if (document.fullscreenElement) {
      document.exitFullscreen?.().catch(() => undefined);
    }
  };

  const fullscreenOverlay = (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2147483647,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100dvh",
        overflow: "hidden",
        background: "#000",
      }}
    >
      <button
        onClick={closeFullscreen}
        className="absolute left-4 top-4 z-50 flex h-11 items-center justify-center rounded-full border-2 border-[#f0b83d] bg-[linear-gradient(to_bottom,#7a2608,#3a0600)] px-5 text-sm font-black uppercase tracking-wider text-white shadow-lg transition-transform hover:scale-105 md:left-6 md:top-6"
        aria-label="Back from fullscreen"
      >
        Back
      </button>

      <div style={{ width: "100vw", height: "100dvh" }}>
        <MapErrorBoundary>
          <Suspense fallback={<MapLoadingFallback />}>
            <Canvas
              shadows
              dpr={[1, 1.5]}
              gl={{
                alpha: false,
                antialias: true,
                powerPreference: "high-performance",
              }}
              camera={{ position: MAP_FULLSCREEN_CAMERA, fov: 45 }}
              onCreated={({ gl }) => {
                gl.setClearColor("#000000");
              }}
            >
              <SpinningModelScene
                isFullscreen
                onObjectSelect={setSelectedObject}
              />
            </Canvas>
          </Suspense>
        </MapErrorBoundary>
      </div>

      {selectedObject && (
        <div className="absolute inset-0 z-[60] flex items-center justify-center bg-black/35 px-4">
          <div className="w-full max-w-2xl rounded-3xl border border-[#f5c67a]/35 bg-[linear-gradient(145deg,rgba(48,26,11,0.95),rgba(21,10,4,0.95))] p-6 text-white shadow-[0_24px_60px_rgba(0,0,0,0.45)] backdrop-blur-sm md:p-8">
            <div className="flex items-start justify-between gap-4 border-b border-white/15 pb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#f5c67a]">
                  Detail Tempat
                </p>
                <h3 className="mt-2 text-2xl font-bold tracking-wide">
                  Informasi Lokasi
                </h3>
              </div>
              <button
                onClick={() => setSelectedObject(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-sm text-white hover:bg-white/30"
                aria-label="Close place detail"
              >
                X
              </button>
            </div>

            <div className="mt-5">
              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                  Judul
                </p>
                <p className="mt-2 text-lg font-semibold text-[#ffe6bd]">
                  {selectedObject.title}
                </p>
              </div>

              {/* Conditionally show description: when selectedObject.description is the boolean/string "true",
                  use the description stored in COLOR_DETAIL_DATA for the current color code; otherwise show
                  the description string if it exists. */}
              {(() => {
                const descFlag = selectedObject.description;
                let descriptionContent = "";

                if (descFlag === "true") {
                  const colorKey = String(selectedObject.title)
                    .split(" ")[0]
                    .toUpperCase();
                  const detail =
                    COLOR_DETAIL_DATA[
                      colorKey as keyof typeof COLOR_DETAIL_DATA
                    ];
                  descriptionContent = detail?.description ?? "";
                } else if (
                  typeof descFlag === "string" &&
                  descFlag.trim() !== ""
                ) {
                  descriptionContent = descFlag;
                }

                return descriptionContent ? (
                  <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                      Detail
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-white/85">
                      {descriptionContent}
                    </p>
                  </div>
                ) : null;
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className="relative h-full w-full">
        <MapErrorBoundary>
          <Suspense fallback={<MapLoadingFallback />}>
            <Canvas
              shadows
              dpr={[1, 1.5]}
              gl={{
                alpha: false,
                antialias: true,
                powerPreference: "high-performance",
              }}
              camera={{ position: MAP_PREVIEW_CAMERA, fov: 45 }}
              onCreated={({ gl }) => {
                gl.setClearColor("#000000");
              }}
            >
              <SpinningModelScene isFullscreen={false} />
            </Canvas>
          </Suspense>
        </MapErrorBoundary>

        <button
          onClick={openFullscreen}
          className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F5A623] px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-[#5c0a00] shadow-[0_4px_14px_rgba(212,175,55,0.5)] transition-all hover:from-[#e1bf61] hover:to-[#fcf9c4]"
        >
          View Full
        </button>
      </div>

      {isFullscreen &&
        typeof document !== "undefined" &&
        createPortal(fullscreenOverlay, document.body)}
    </>
  );
}
