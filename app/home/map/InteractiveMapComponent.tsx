"use client";

import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame, ThreeEvent } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import * as THREE from "three";

type SelectedObjectData = {
  title: string;
  description: string;
};

type ColorDetailData = {
  name: string;
  description: string;
};

const COLOR_DETAIL_DATA: Record<string, ColorDetailData> = {
  // "#FFFFFF": {
  //   name: "Putih",
  //   description:
  //     "Melambangkan kebersihan, netralitas, dan area terbuka yang terang.",
  // },
  "#FFFF00": {
    name: "Kuning Terang",
    description: "Memberi aksen energik untuk titik yang ingin lebih menonjol.",
  },
  "#6565FF": {
    name: "Biru Cerah",
    description:
      "Merepresentasikan nuansa teknologi, informasi, dan area sejuk.",
  },
  "#99FF32": {
    name: "Hijau Lime",
    description:
      "Menggambarkan area aktif, segar, atau jalur interaksi pengguna.",
  },
  "#FF99CC": {
    name: "Pink Muda",
    description: "Memberi kesan ramah dan playful pada elemen dekoratif.",
  },
  "#000000": {
    name: "Hitam",
    description:
      "Digunakan untuk kontras tinggi dan memperkuat kedalaman visual.",
  },
  "#663300": {
    name: "Cokelat Tua",
    description: "Mewakili elemen tanah, kayu, atau area bernuansa natural.",
  },
  "#FF8C65": {
    name: "Oranye Salmon",
    description: "Cocok untuk area yang ingin terlihat hangat dan komunikatif.",
  },
  "#3A3A3A": {
    name: "Abu Gelap",
    description: "Membantu membentuk bayangan, struktur, dan batas objek.",
  },
  "#FFB265": {
    name: "Oranye Muda",
    description: "Menghadirkan nuansa hangat yang tetap lembut dan bersahabat.",
  },
  "#CCCCFF": {
    name: "Lavender Pale",
    description: "Memberi tone lembut untuk area pendukung yang tidak dominan.",
  },
  "#CCFFFF": {
    name: "Cyan Pale",
    description: "Memberi kesan sejuk, ringan, dan terbuka pada elemen map.",
  },
  "#4C9900": {
    name: "Hijau Daun",
    description: "Identik dengan area vegetasi, taman, atau zona eco.",
  },
  "#32FFFF": {
    name: "Cyan Terang",
    description: "Warna aksen kontras untuk objek yang perlu cepat dikenali.",
  },
  "#CC6600": {
    name: "Oranye Cokelat",
    description: "Menguatkan tema hangat pada elemen struktur dan furnitur.",
  },
  "#FF9932": {
    name: "Oranye Kunyit",
    description:
      "Menonjolkan area penting tanpa terlalu agresif terhadap mata.",
  },
  "#FF6565": {
    name: "Merah Muda",
    description: "Menandai area perhatian dengan nuansa lembut.",
  },
  "#FF00FF": {
    name: "Magenta",
    description: "Aksen kuat untuk objek yang ingin dibuat sangat menonjol.",
  },
  "#660066": {
    name: "Ungu Tua",
    description: "Memberikan kesan eksklusif dan fokus pada detail tertentu.",
  },
  "#FF6532": {
    name: "Oranye Merah",
    description:
      "Digunakan untuk penanda zona aktif atau titik prioritas tinggi.",
  },
  "#304F49": {
    name: "Hijau Kehitaman",
    description: "Warna natural gelap untuk objek karakter atau pakaian.",
  },
  "#2A4F77": {
    name: "Biru Denim",
    description: "Memberi identitas kuat pada elemen karakter dan kostum.",
  },
  "#8C8378": {
    name: "Taupe",
    description: "Netral hangat untuk detail aksesori dan elemen sekunder.",
  },
  "#617057": {
    name: "Olive Gray",
    description: "Mendukung gaya earthy dengan kesan kalem dan stabil.",
  },
  "#995172": {
    name: "Mauve",
    description: "Aksen artistik untuk elemen yang ingin tampil unik.",
  },
  "#9F732C": {
    name: "Cokelat Emas",
    description: "Warna hangat untuk detail rambut, ornamen, atau kayu.",
  },
  "#1E1E1E": {
    name: "Hitam Arang",
    description: "Mempertegas kontur objek dengan intensitas tinggi.",
  },
  "#567593": {
    name: "Steel Blue",
    description: "Mewakili elemen modern dengan nuansa dingin dan stabil.",
  },
  "#9B9477": {
    name: "Khaki",
    description: "Cocok untuk aksesori dan elemen kain bernuansa vintage.",
  },
  "#6F7E89": {
    name: "Abu Kebiruan",
    description: "Warna transisi yang menyatukan area terang dan gelap.",
  },
  "#6B4743": {
    name: "Cokelat Bata",
    description: "Memberi kesan kuat pada elemen material keras.",
  },
  "#634429": {
    name: "Cokelat Kayu",
    description: "Relevan untuk objek bernuansa kayu dan properti natural.",
  },
  "#2B2D22": {
    name: "Hijau Lumut Gelap",
    description: "Menambah kedalaman pada area shadow atau lipatan objek.",
  },
  "#E59B79": {
    name: "Peach Tan",
    description: "Warna kulit hangat yang membuat karakter terasa hidup.",
  },
  "#CCA66D": {
    name: "Gold Sand",
    description: "Warna pirang hangat untuk detail rambut dan ornamen.",
  },
  "#F7F7C5": {
    name: "Krem Pucat",
    description: "Memberi highlight lembut pada area terang.",
  },
  "#442A26": {
    name: "Cokelat Gelap",
    description: "Digunakan untuk kontras dan elemen detail berkarakter kuat.",
  },
  "#49321F": {
    name: "Cokelat Kopi",
    description: "Warna earthy untuk elemen trim dan penegas bentuk.",
  },
  "#FFFFCC": {
    name: "Kuning Krem",
    description: "Membangun suasana hangat dan terang di area penanda.",
  },
  "#FFF2CC": {
    name: "Peach Krem",
    description: "Warna lembut untuk transisi antar elemen terang.",
  },
  "#FF0000": {
    name: "Merah",
    description: "Penanda paling kuat untuk area penting atau peringatan.",
  },
  "#FFE5CC": {
    name: "Krem Jingga",
    description: "Memberi nuansa ramah pada area informatif.",
  },
  "#9932FF": {
    name: "Ungu Elektrik",
    description: "Aksen visual kuat untuk titik interaktif spesial.",
  },
  "#AAAAAA": {
    name: "Abu Netral",
    description: "Warna utilitas untuk area struktur yang netral.",
  },
  "#808080": {
    name: "Abu Medium",
    description:
      "Menyeimbangkan komposisi visual antara warna hangat dan gelap.",
  },
};

function getObjectDetail(
  objectName: string,
  materialName: string,
  colorHex: string,
): SelectedObjectData | null {
  const normalizedColorHex = `#${colorHex.toUpperCase()}`;
  const colorDetail = COLOR_DETAIL_DATA[normalizedColorHex];

  if (colorDetail) {
    return {
      title: `${objectName} (${colorDetail.name})`,
      description: `${colorDetail.description} Material: ${materialName}. Kode warna: ${normalizedColorHex}.`,
    };
  }

  return null;
}

// ==========================================
// 1. THE 3D SCENE CONFIGURATION
// ==========================================
function SpinningModelScene({
  isFullscreen,
  onObjectSelect,
}: {
  isFullscreen: boolean;
  onObjectSelect: (data: SelectedObjectData | null) => void;
}) {
  // Load material library first so OBJ can use original SketchUp colors.
  const materials = useLoader(MTLLoader, "/images/game/Test%203D%202.mtl");

  // Apply the loaded MTL materials to OBJLoader before reading the model.
  const obj = useLoader(
    OBJLoader,
    "/images/game/Test%203D%202.obj",
    (loader) => {
      materials.preload();
      loader.setMaterials(materials);
    },
  );
  const modelRef = useRef<THREE.Group>(null);

  // Spin the model automatically when NOT in fullscreen
  useFrame((state, delta) => {
    if (!isFullscreen && modelRef.current) {
      modelRef.current.rotation.y += delta * 0.3;
    }
  });

  // Apply basic material to the OBJ if missing so it looks better than stark white
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

    const clickedMesh = event.object as THREE.Mesh;
    const material = Array.isArray(clickedMesh.material)
      ? clickedMesh.material[0]
      : clickedMesh.material;

    const objectName =
      clickedMesh.name || clickedMesh.parent?.name || "Unnamed Part";
    const materialName = material?.name || "Default Material";
    const colorHex =
      material instanceof THREE.Material && "color" in material
        ? (material as THREE.MeshStandardMaterial).color.getHexString()
        : "ffffff";

    const objectDetail = getObjectDetail(objectName, materialName, colorHex);
    onObjectSelect(objectDetail);
  };

  return (
    <>
      {/* Soft lighting for the scene */}
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[10, 20, 10]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-10, -10, -10]} intensity={0.5} />

      {/* Environmental reflection (adds significant realism to standard materials) */}
      <Environment preset="sunset" />

      <group ref={modelRef}>
        <primitive
          object={obj}
          scale={1}
          position={[0, -2, 0]}
          onClick={handleObjectClick}
        />
      </group>

      {/* Control the camera only when expanded */}
      {isFullscreen && (
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={1.0}
          maxPolarAngle={Math.PI / 2 + 0.2} // Prevent looking directly from below
          minDistance={1}
          maxDistance={50}
        />
      )}
    </>
  );
}

// ==========================================
// 2. THE MAIN WRAPPER & FULLSCREEN LOGIC
// ==========================================
export default function InteractiveMapComponent() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedObject, setSelectedObject] =
    useState<SelectedObjectData | null>(null);

  return (
    <>
      {/* Preview Container Size is controlled by the parent div in page.tsx */}
      <div className="relative w-full h-full">
        {/* Loading Fallback */}
        <Suspense
          fallback={
            <div className="absolute inset-0 flex items-center justify-center text-[#F5A623]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F5A623]"></div>
            </div>
          }
        >
          <Canvas shadows camera={{ position: [0, 5, 15], fov: 45 }}>
            <SpinningModelScene
              isFullscreen={false}
              onObjectSelect={setSelectedObject}
            />
          </Canvas>
        </Suspense>

        {/* Preview Button Overlay */}
        <button
          onClick={() => setIsFullscreen(true)}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#F5A623] hover:from-[#e1bf61] hover:to-[#fcf9c4] text-[#5c0a00] text-sm font-bold rounded-full shadow-[0_4px_14px_rgba(212,175,55,0.5)] transition-all uppercase tracking-wider z-10"
        >
          View Full
        </button>
      </div>

      {/* FULLSCREEN MODAL INTERACTION */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md">
          <button
            onClick={() => {
              setIsFullscreen(false);
              setSelectedObject(null);
            }}
            className="absolute top-6 right-6 z-50 flex items-center justify-center w-12 h-12 bg-red-600 hover:bg-red-500 text-white rounded-full font-bold shadow-lg transition-transform hover:scale-105"
            aria-label="Close fullscreen"
          >
            ✕
          </button>

          <div className="w-full h-full">
            <Suspense
              fallback={
                <div className="absolute inset-0 flex items-center justify-center text-[#F5A623]">
                  <span className="animate-pulse text-xl">
                    Loading 3D Engine...
                  </span>
                </div>
              }
            >
              <Canvas shadows camera={{ position: [0, 10, 20], fov: 45 }}>
                <SpinningModelScene
                  isFullscreen={true}
                  onObjectSelect={setSelectedObject}
                />
              </Canvas>
            </Suspense>
          </div>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/50 text-sm tracking-widest animate-pulse pointer-events-none">
            DRAG TO ROTATE • SCROLL TO ZOOM
          </div>
        </div>
      )}

      {selectedObject && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/35 px-4">
          <div className="w-full max-w-2xl rounded-3xl border border-[#f5c67a]/35 bg-[linear-gradient(145deg,rgba(48,26,11,0.95),rgba(21,10,4,0.95))] p-6 text-white shadow-[0_24px_60px_rgba(0,0,0,0.45)] backdrop-blur-sm md:p-8">
            <div className="flex items-start justify-between gap-4 border-b border-white/15 pb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#f5c67a]">
                  Detail Objek
                </p>
                <h3 className="mt-2 text-2xl font-bold tracking-wide">
                  Informasi Lokasi
                </h3>
              </div>
              <button
                onClick={() => setSelectedObject(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-sm text-white hover:bg-white/30"
                aria-label="Close object detail"
              >
                ✕
              </button>
            </div>

            <div className="mt-5 space-y-4">
              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                  Judul
                </p>
                <p className="mt-2 text-lg font-semibold text-[#ffe6bd]">
                  {selectedObject.title}
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                  Penjelasan
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/85">
                  {selectedObject.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
