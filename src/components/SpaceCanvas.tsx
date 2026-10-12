import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Definisi Tipe Item
interface CanvasItem {
  uniqueId: string;
  id: string;
  type: 'planet' | 'emoji';
  label: string;
  url?: string;
  content?: string;
  scale: number;
  rotation: number;
}

// Data stiker LENGKAP (Matahari + 8 Planet Bima Sakti)
const PLANETS = [
  { id: 's0', type: 'planet' as const, label: 'Matahari', url: 'https://www.solarsystemscope.com/textures/download/2k_sun.jpg' },
  { id: 's1', type: 'planet' as const, label: 'Merkurius', url: 'https://www.solarsystemscope.com/textures/download/2k_mercury.jpg' },
  { id: 's2', type: 'planet' as const, label: 'Venus', url: 'https://www.solarsystemscope.com/textures/download/2k_venus_surface.jpg' },
  { id: 's3', type: 'planet' as const, label: 'Bumi', url: 'https://www.solarsystemscope.com/textures/download/2k_earth_daymap.jpg' },
  { id: 's4', type: 'planet' as const, label: 'Mars', url: 'https://www.solarsystemscope.com/textures/download/2k_mars.jpg' },
  { id: 's5', type: 'planet' as const, label: 'Jupiter', url: 'https://www.solarsystemscope.com/textures/download/2k_jupiter.jpg' },
  { id: 's6', type: 'planet' as const, label: 'Saturnus', url: 'https://www.solarsystemscope.com/textures/download/2k_saturn.jpg' },
  { id: 's7', type: 'planet' as const, label: 'Uranus', url: 'https://www.solarsystemscope.com/textures/download/2k_uranus.jpg' },
  { id: 's8', type: 'planet' as const, label: 'Neptunus', url: 'https://www.solarsystemscope.com/textures/download/2k_neptune.jpg' },
];

const EMOJIS = [
  { id: 'e1', type: 'emoji' as const, label: 'Alien', content: '👽' },
  { id: 'e2', type: 'emoji' as const, label: 'UFO', content: '🛸' },
  { id: 'e3', type: 'emoji' as const, label: 'Rocket', content: '🚀' },
  { id: 'e4', type: 'emoji' as const, label: 'Astronaut', content: '🧑‍🚀' },
  { id: 'e5', type: 'emoji' as const, label: 'Satelit', content: '🛰️' },
  { id: 'e6', type: 'emoji' as const, label: 'Komet', content: '☄️' },
];

export default function SpaceCanvas({ onClose }: { onClose: () => void }) {
  const [canvasItems, setCanvasItems] = useState<CanvasItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Tambah Stiker Baru
  const addStickerToCanvas = (sticker: any) => {
    const uniqueId = Date.now().toString();
    const newItem: CanvasItem = {
      uniqueId, id: sticker.id, type: sticker.type, label: sticker.label,
      url: sticker.url, content: sticker.content, scale: 1, rotation: 0,
    };
    setCanvasItems((prev) => [...prev, newItem]);
    setSelectedItemId(uniqueId);
  };

  const updateSelectedScale = (newScale: number) => {
    if (selectedItemId) setCanvasItems((prev) => prev.map((item) => (item.uniqueId === selectedItemId ? { ...item, scale: newScale } : item)));
  };

  const updateSelectedRotation = (newRotation: number) => {
    if (selectedItemId) setCanvasItems((prev) => prev.map((item) => (item.uniqueId === selectedItemId ? { ...item, rotation: newRotation } : item)));
  };

  const removeItem = (uniqueId: string) => {
    setCanvasItems((prev) => prev.filter((item) => item.uniqueId !== uniqueId));
    if (selectedItemId === uniqueId) setSelectedItemId(null);
  };

  const selectedItem = canvasItems.find((item) => item.uniqueId === selectedItemId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0f1c]">
      <div className="bg-[#12182b] border border-indigo-400/30 rounded-3xl w-full h-full max-h-[95vh] flex flex-col overflow-hidden shadow-2xl relative font-sans">
        
        {/* HEADER BAR */}
        <div className="bg-[#1a2035] p-3 md:p-4 flex justify-between items-center border-b border-indigo-400/20 z-20">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎨</span>
            <h2 className="text-lg md:text-xl font-bold text-white tracking-wide">Space Canvas Studio</h2>
          </div>
          
          <div className="absolute left-1/2 -translate-x-1/2 text-lg md:text-xl font-bold text-white hidden md:block">
            Diorama 🎨
          </div>

          <div className="flex gap-3">
            <button 
              onClick={() => { setCanvasItems([]); setSelectedItemId(null); }} 
              className="bg-red-500/80 hover:bg-red-500 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-all border border-red-400/50"
            >
              Clear All
            </button>
            <button 
              onClick={onClose} 
              className="bg-transparent hover:bg-white/10 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-all border border-white/30"
            >
              Close
            </button>
          </div>
        </div>

        {/* WORKSPACE */}
        <div className="flex flex-1 overflow-hidden relative">
          
          {/* SIDEBAR KIRI */}
          <div className="w-28 md:w-52 bg-[#171d30] border-r border-indigo-400/20 p-4 overflow-y-auto hide-scrollbar flex flex-col gap-6 z-20">
            <div>
              <h3 className="text-[11px] md:text-sm font-semibold text-white/80 mb-3">Tata Surya</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {PLANETS.map((planet) => (
                  <button 
                    key={planet.id} onClick={() => addStickerToCanvas(planet)}
                    className="bg-[#1e253a] border border-indigo-400/20 p-2 rounded-xl flex flex-col items-center gap-1.5 hover:bg-[#252d45] transition-all group"
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full shadow-inner bg-cover relative" style={{ backgroundImage: `url(${planet.url})` }}>
                      {planet.label === 'Saturnus' && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[30%] -rotate-12 border border-orange-400/60 rounded-full" />}
                    </div>
                    <span className="text-[9px] md:text-[11px] text-white/80">{planet.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[11px] md:text-sm font-semibold text-white/80 mb-3">3D Emoji</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {EMOJIS.map((emoji) => (
                  <button 
                    key={emoji.id} onClick={() => addStickerToCanvas(emoji)}
                    className="bg-[#1e253a] border border-indigo-400/20 p-2 rounded-xl flex flex-col items-center gap-1.5 hover:bg-[#252d45] transition-all group relative"
                  >
                    <span className="text-3xl drop-shadow-lg">{emoji.content}</span>
                    <span className="text-[9px] md:text-[11px] text-white/80">{emoji.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* MAIN CANVAS AREA */}
          <div 
            ref={canvasRef} 
            className="flex-1 relative overflow-hidden bg-[#0d1222] flex items-center justify-center cursor-default"
            onClick={() => setSelectedItemId(null)}
          >
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

            {/* 8 JALUR ORBIT DINAMIS */}
            {[1, 2, 3, 4, 5, 6, 7, 8].map((orbitIndex) => (
              <div 
                key={orbitIndex}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-[1.5px] border-cyan-400 rounded-[50%] pointer-events-none z-0"
                style={{
                  width: `${20 + orbitIndex * 12}%`,
                  height: `${15 + orbitIndex * 10}%`,
                  opacity: 0.35 - (orbitIndex * 0.03), 
                  boxShadow: orbitIndex <= 3 ? '0 0 10px rgba(34,211,238,0.1)' : 'none'
                }}
              />
            ))}

            {/* Render Items / Stiker */}
            <AnimatePresence>
              {canvasItems.map((item) => {
                const isSelected = item.uniqueId === selectedItemId;
                return (
                  <motion.div
                    key={item.uniqueId}
                    drag
                    dragConstraints={canvasRef}
                    dragElastic={0}
                    dragMomentum={false}
                    onPointerDown={() => setSelectedItemId(item.uniqueId)}
                    onClick={(e) => e.stopPropagation()}
                    className={`absolute flex flex-col items-center justify-center ${isSelected ? 'z-30 cursor-grabbing' : 'z-10 cursor-grab'}`}
                    style={{ scale: item.scale, rotate: `${item.rotation}deg` }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: item.scale, opacity: 1 }}
                  >
                    {/* Bounding Box Seleksi */}
                    {isSelected && (
                      <div className="absolute inset-[-16px] md:inset-[-24px] border-[1.5px] border-slate-400/50 rounded-sm pointer-events-none">
                        <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-transparent border-2 border-slate-400/80 rounded-sm" />
                        <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-transparent border-2 border-slate-400/80 rounded-sm" />
                        <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-transparent border-2 border-slate-400/80 rounded-sm" />
                        <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-transparent border-2 border-slate-400/80 rounded-sm" />
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-xs flex flex-col items-center">
                          <div className="w-px h-4 bg-slate-400/50 mb-1" />
                          <span>↻</span>
                        </div>
                      </div>
                    )}

                    {/* Visual */}
                    {item.type === 'emoji' ? (
                      <span className="text-6xl md:text-[5rem] drop-shadow-2xl select-none leading-none block">
                        {item.content}
                      </span>
                    ) : (
                      // DI SINI LETAK KEAJAIBAN ROTASINYA!
                      <motion.div 
                        className={`w-20 h-20 md:w-32 md:h-32 rounded-full shadow-[inset_-12px_-12px_24px_rgba(0,0,0,0.8),0_10px_25px_rgba(0,0,0,0.5)] relative`}
                        style={{ backgroundImage: `url(${item.url})`, backgroundSize: '200% 100%' }}
                        animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }} 
                        transition={{ repeat: Infinity, duration: item.label === 'Matahari' ? 30 : 15, ease: "linear" }}
                      >
                        {item.label === 'Saturnus' && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220%] h-[35%] -rotate-12 border-4 border-orange-400/40 rounded-full" />}
                        {item.label === 'Matahari' && <div className="absolute inset-0 rounded-full shadow-[0_0_80px_rgba(255,200,0,0.5)] pointer-events-none" />}
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* FLOATING CONTROL PANEL */}
            <AnimatePresence>
              {selectedItemId && selectedItem && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-10 right-10 md:bottom-20 md:right-20 w-64 bg-[#1e253a] border border-indigo-400/20 rounded-2xl shadow-2xl p-4 z-50 text-white font-sans"
                  onClick={(e) => e.stopPropagation()} 
                >
                  <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                    <h4 className="font-semibold text-sm">Scale</h4>
                    <button onClick={() => removeItem(selectedItem.uniqueId)} className="w-5 h-5 bg-red-500 rounded-full text-white flex items-center justify-center text-xs hover:bg-red-600 shadow-md">×</button>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-sm opacity-60">📏</span>
                    <input type="range" min="0.3" max="3.0" step="0.1" value={selectedItem.scale} onChange={(e) => updateSelectedScale(parseFloat(e.target.value))} className="flex-1 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-400" />
                    <span className="text-sm opacity-60">↕</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm opacity-60">↻</span>
                    <input type="range" min="0" max="360" step="5" value={selectedItem.rotation} onChange={(e) => updateSelectedRotation(parseInt(e.target.value))} className="flex-1 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-400" />
                    <span className="text-sm opacity-60">↺</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </div>
    </div>
  );
}