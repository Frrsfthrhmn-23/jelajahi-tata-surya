import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { planetsData, sunData } from './data/planet';
import Quiz from './components/Quiz';
import CosmicTools from './components/CosmicTools';

export default function App() {
  const [selectedPlanet, setSelectedPlanet] = useState<any>(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [earthWeight, setEarthWeight] = useState<number | ''>(''); 
  
  const [scrollX, setScrollX] = useState(0);
  const [stars, setStars] = useState<any[]>([]);
  const [constellations, setConstellations] = useState<any[]>([]);

  useEffect(() => {
    const generatedStars = Array.from({ length: 400 }).map((_, i) => {
      const isBand = Math.random() > 0.4; 
      const yPos = isBand ? 25 + Math.random() * 50 : Math.random() * 100;
      
      return {
        id: i,
        x: Math.random() * 400, 
        y: yPos,
        size: Math.random() * 1.5 + 0.3, 
        opacity: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 5 + 2,
        color: Math.random() > 0.7 ? 'bg-orange-100' : (Math.random() > 0.8 ? 'bg-cyan-100' : 'bg-white')
      };
    });
    setStars(generatedStars);

    const generatedConstellations = [
      { points: [{ x: 20, y: 30 }, { x: 35, y: 20 }, { x: 45, y: 25 }, { x: 30, y: 45 }, { x: 20, y: 30 }] },
      { points: [{ x: 80, y: 55 }, { x: 95, y: 40 }, { x: 110, y: 45 }, { x: 120, y: 65 }, { x: 95, y: 70 }, { x: 80, y: 55 }] },
      { points: [{ x: 140, y: 25 }, { x: 155, y: 15 }, { x: 170, y: 30 }, { x: 150, y: 45 }, { x: 140, y: 25 }] },
      { points: [{ x: 210, y: 65 }, { x: 220, y: 45 }, { x: 235, y: 35 }, { x: 250, y: 50 }, { x: 240, y: 75 }, { x: 210, y: 65 }] },
      { points: [{ x: 280, y: 20 }, { x: 295, y: 15 }, { x: 305, y: 30 }, { x: 310, y: 45 }] },
      { points: [{ x: 340, y: 50 }, { x: 350, y: 35 }, { x: 365, y: 30 }, { x: 380, y: 45 }, { x: 370, y: 65 }, { x: 345, y: 60 }] }
    ];
    setConstellations(generatedConstellations);
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollX(e.currentTarget.scrollLeft);
  };

  const getGlobeShadow = () => "shadow-[inset_-16px_-16px_32px_rgba(0,0,0,0.8),inset_4px_4px_10px_rgba(255,255,255,0.4),0_10px_20px_rgba(0,0,0,0.5)]";

  const getPlanetSize = (name: string) => {
    switch(name) {
      case 'Merkurius': return 'w-16 h-16 md:w-20 md:h-20';
      case 'Venus': return 'w-24 h-24 md:w-32 md:h-32';
      case 'Bumi': return 'w-28 h-28 md:w-36 md:h-36';
      case 'Mars': return 'w-20 h-20 md:w-28 md:h-28';
      case 'Jupiter': return 'w-48 h-48 md:w-64 md:h-64';
      case 'Saturnus': return 'w-40 h-40 md:w-56 md:h-56';
      case 'Uranus': return 'w-32 h-32 md:w-40 md:h-40';
      case 'Neptunus': return 'w-32 h-32 md:w-40 md:h-40';
      case 'Pluto': return 'w-12 h-12 md:w-16 md:h-16';
      default: return 'w-32 h-32';
    }
  };

  return (
    <div className="min-h-screen bg-[#05050c] text-white font-sans relative overflow-hidden flex flex-col">
      <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; } .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>

      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0 pointer-events-none z-0 transition-transform duration-100 ease-out" style={{ transform: `translateX(-${scrollX * 0.05}px)` }}>
        <div className="absolute inset-0 w-[400vw] h-[100vh] overflow-hidden opacity-90 mix-blend-screen">
           <div className="absolute top-[-20%] left-[-10%] w-[120%] h-[140%] opacity-70" style={{ background: 'radial-gradient(ellipse 65% 45% at 50% 50%, rgba(139, 69, 19, 0.25) 0%, rgba(160, 82, 45, 0.1) 50%, transparent 100%)', transform: 'rotate(-12deg)', filter: 'blur(55px)' }}></div>
           <div className="absolute top-[5%] left-[5%] w-[140%] h-[110%] opacity-60" style={{ background: 'radial-gradient(ellipse 70% 30% at 50% 50%, rgba(48, 10, 36, 0.25) 0%, rgba(75, 0, 130, 0.1) 60%, transparent 100%)', transform: 'rotate(-20deg)', filter: 'blur(75px)' }}></div>
           <div className="absolute top-[25%] left-[10%] w-[80%] h-[45%] opacity-50" style={{ background: 'radial-gradient(ellipse 40% 50% at 50% 50%, rgba(255, 222, 173, 0.2) 0%, transparent 100%)', transform: 'rotate(-10deg)', filter: 'blur(45px)' }}></div>
        </div>
        <svg className="absolute inset-0 w-[400vw] h-full opacity-20">
          {constellations.map((constellation, cIndex) => (
            <polyline key={cIndex} points={constellation.points.map((p: any) => `${p.x}vw,${p.y}vh`).join(' ')} fill="none" stroke="rgba(255, 235, 205, 0.45)" strokeWidth="0.75" strokeDasharray="2 3" />
          ))}
        </svg>
        {constellations.map((constellation, cIndex) =>
          constellation.points.map((point: any, pIndex: number) => (
            <motion.div key={`${cIndex}-${pIndex}`} className="absolute w-2.5 h-2.5 bg-yellow-100 rounded-full shadow-[0_0_12px_rgba(255,235,205,0.9)]" style={{ left: `${point.x}vw`, top: `${point.y}vh` }} animate={{ scale: [0.9, 1.3, 0.9], opacity: [0.6, 1, 0.6] }} transition={{ repeat: Infinity, duration: 3 + pIndex, ease: "easeInOut" }} />
          ))
        )}
        {stars.map((star) => (
          <motion.div key={star.id} className={`absolute rounded-full ${star.color}`} style={{ left: `${star.x}vw`, top: `${star.y}vh`, width: star.size, height: star.size, boxShadow: star.size > 1.2 ? `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.8)` : 'none' }} animate={{ opacity: [star.opacity * 0.2, star.opacity, star.opacity * 0.2] }} transition={{ repeat: Infinity, duration: star.twinkleSpeed, ease: "easeInOut" }} />
        ))}
      </div>

      {/* EASTER EGG: UFO */}
      <motion.div className="absolute z-40 cursor-pointer flex flex-col items-center animate-pulse-slow" initial={{ x: '-15vw', y: '20vh' }} animate={{ x: ['-15vw', '110vw'], y: ['20vh', '12vh', '25vh', '15vh'], rotate: [0, 5, -5, 0] }} transition={{ x: { repeat: Infinity, duration: 18, ease: "linear", delay: 2 }, y: { repeat: Infinity, duration: 5, ease: "easeInOut" }, rotate: { repeat: Infinity, duration: 7, ease: "easeInOut" } }} whileHover={{ scale: 1.1 }} onClick={() => alert("Halo warga Bumi! 👽👾 Alien imut sedang patroli!")}>
        <div className="relative flex flex-col items-center drop-shadow-[0_10px_10px_rgba(0,0,0,0.85)]">
          <div className="relative w-18 h-10 bg-gradient-to-br from-cyan-100/60 via-cyan-300/20 to-cyan-500/10 rounded-t-full border-t-2 border-white/50 backdrop-blur-sm flex justify-center items-end pb-1.5 z-20 overflow-hidden shadow-[inset_0_4px_8px_rgba(255,255,255,0.6)]">
            <div className="absolute top-0.5 left-1 w-6 h-3 bg-white/50 rounded-full blur-[1px] -rotate-12" />
            <div className="flex gap-1.5 text-[18px] drop-shadow-xl z-10 relative mb-0.5 select-none font-sans">
              <motion.span animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 1.2 }}>👽</motion.span>
              <motion.span animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}>👾</motion.span>
            </div>
          </div>
          <div className="relative w-32 h-8.5 bg-gradient-to-b from-slate-200 via-slate-500 to-slate-900 [border-radius:50%] -mt-3.5 z-30 shadow-[0_8px_16px_rgba(0,0,0,0.9),inset_0_2.5px_6px_rgba(255,255,255,0.7),inset_0_-2.5px_6px_rgba(0,0,0,0.8)] border border-slate-400 overflow-hidden flex items-center justify-center">
            <motion.div className="absolute flex w-[200%]" animate={{ x: [0, '-50%'] }} transition={{ repeat: Infinity, duration: 3, ease: "linear" }}>
              <div className="flex w-1/2 justify-around">
                 <div className="w-2 h-2 bg-red-500 rounded-full shadow-[0_0_8px_#ef4444]" />
                 <div className="w-2 h-2 bg-yellow-400 rounded-full shadow-[0_0_8px_#facc15]" />
                 <div className="w-2 h-2 bg-green-400 rounded-full shadow-[0_0_8px_#4ade80]" />
                 <div className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]" />
              </div>
              <div className="flex w-1/2 justify-around">
                 <div className="w-2 h-2 bg-red-500 rounded-full shadow-[0_0_8px_#ef4444]" />
                 <div className="w-2 h-2 bg-yellow-400 rounded-full shadow-[0_0_8px_#facc15]" />
                 <div className="w-2 h-2 bg-green-400 rounded-full shadow-[0_0_8px_#4ade80]" />
                 <div className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]" />
              </div>
            </motion.div>
            <div className="absolute w-26 h-5 border-b border-slate-700/50 [border-radius:50%] top-1" />
          </div>
          <div className="w-12 h-6 bg-gradient-to-b from-cyan-300 to-cyan-600 [border-radius:50%] -mt-4.5 z-20 shadow-[0_6px_12px_#06b6d4,inset_0_-2px_4px_#ffffff]" />
          <div className="w-20 h-20 bg-gradient-to-b from-cyan-400/40 via-cyan-300/10 to-transparent opacity-60 blur-[2px] -mt-4.5 z-10" style={{ clipPath: 'polygon(35% 0, 65% 0, 100% 100%, 0 100%)' }} />
        </div>
      </motion.div>

      {/* METEOR */}
      {[
        { id: 1, delay: 0, top: '-10vh', duration: 1.5, scale: 0.8, repeatDelay: 4 },
        { id: 2, delay: 3, top: '25vh', duration: 1.2, scale: 0.5, repeatDelay: 5 },
        { id: 3, delay: 6, top: '50vh', duration: 1.8, scale: 0.7, repeatDelay: 3 },
        { id: 4, delay: 10, top: '5vh', duration: 1.4, scale: 0.6, repeatDelay: 6 },
      ].map((comet) => (
        <motion.div key={comet.id} className="absolute z-10 flex items-center pointer-events-none opacity-80" style={{ top: comet.top, transform: `scale(${comet.scale})` }} initial={{ x: '120vw', rotate: -35 }} animate={{ x: '-40vw', y: '100vh' }} transition={{ repeat: Infinity, duration: comet.duration, ease: "linear", delay: comet.delay, repeatDelay: comet.repeatDelay }}>
          <div className="relative w-8 h-8 bg-gradient-to-br from-yellow-200 via-orange-500 to-red-800 rounded-full shadow-[0_0_20px_8px_rgba(239,68,68,0.8)] z-10 overflow-hidden">
             <div className="absolute top-1 left-1.5 w-2 h-2 bg-red-950/50 rounded-full shadow-inner blur-[1px]"></div>
             <div className="absolute bottom-1 right-2 w-3 h-2 bg-red-950/60 rounded-full shadow-inner blur-[1px]"></div>
          </div>
          <div className="flex items-center -ml-5">
            <div className="w-[150px] md:w-[300px] h-[15px] bg-gradient-to-r from-orange-500 via-red-600 to-transparent rounded-full blur-[6px]" />
            <div className="absolute w-[100px] md:w-[200px] h-[6px] bg-gradient-to-r from-yellow-200 via-yellow-400 to-transparent rounded-full blur-[2px]" />
          </div>
        </motion.div>
      ))}

      {/* NAVBAR */}
      <nav className="flex justify-between items-center p-6 mx-4 mt-4 bg-white/5 backdrop-blur-lg rounded-full border border-white/10 shadow-2xl relative z-30">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🚀</span>
          <h1 className="text-xl md:text-3xl font-extrabold tracking-wide text-yellow-300 drop-shadow-md">SOLAR SYSTEM</h1>
        </div>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setIsQuizOpen(true)} className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-2 md:py-3 rounded-full font-black text-white shadow-[0_4px_15px_rgba(99,102,241,0.6)] border border-indigo-300/50 flex items-center gap-2">
          Mulai Kuis 🎮
        </motion.button>
      </nav>

      {/* TATA SURYA */}
      <div className="flex-1 w-full overflow-x-auto hide-scrollbar cursor-grab active:cursor-grabbing relative z-10 flex items-center" onScroll={handleScroll}>
        <div className="flex items-center gap-16 md:gap-32 px-10 md:px-32 min-w-max h-full py-20 relative">
          <div className="relative flex flex-col items-center z-10 mr-10 group cursor-pointer" onClick={() => {setSelectedPlanet(sunData); setEarthWeight('');}}>
            <div className="absolute -top-12 -right-4 text-4xl animate-bounce drop-shadow-lg z-20 opacity-0 group-hover:opacity-100 transition-opacity">🔭</div>
            <motion.div className="w-72 h-72 md:w-[400px] md:h-[400px] rounded-full shadow-[0_0_100px_rgba(245,158,11,0.6),inset_0_0_60px_rgba(255,255,255,0.4)] group-hover:scale-105 transition-transform duration-300" style={{ backgroundImage: `url('${sunData.imageUrl}')`, backgroundSize: '200% 100%' }} animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }} transition={{ repeat: Infinity, duration: 40, ease: "linear" }} />
            <h4 className="text-3xl md:text-5xl font-black mt-6 text-white drop-shadow-lg">Sun</h4>
          </div>
          {planetsData.map((planet, index) => {
            const verticalOffset = index % 2 === 0 ? 'translate-y-[-40px]' : 'translate-y-[40px]';
            return (
              <div key={planet.id} className={`relative flex flex-col items-center z-10 ${verticalOffset}`}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 w-[200vw] h-[200vw] pointer-events-none -z-10 opacity-40" />
                <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.15 }} className="relative group cursor-pointer" onClick={() => {setSelectedPlanet(planet); setEarthWeight('');}}>
                  <div className="absolute -top-12 -right-12 text-3xl md:text-5xl animate-bounce drop-shadow-lg z-30 transition-transform group-hover:scale-125">🔭</div>
                  <motion.div className={`${getPlanetSize(planet.name)} rounded-full ${getGlobeShadow()} border border-white/10 relative transition-transform duration-300 group-hover:scale-110`} style={{ backgroundImage: `url(${planet.imageUrl})`, backgroundSize: '200% 100%' }} animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }} transition={{ repeat: Infinity, duration: 15 + index * 2, ease: "linear" }}>
                    {planet.name === 'Saturnus' && (
                      <>
                        <svg viewBox="0 0 200 40" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220%] h-[40%] -rotate-12 -z-10 pointer-events-none drop-shadow-md"><ellipse cx="100" cy="20" rx="95" ry="18" fill="none" stroke="rgba(180, 83, 9, 0.4)" strokeWidth="4" /><motion.ellipse cx="100" cy="20" rx="85" ry="14" fill="none" stroke="rgba(217, 119, 6, 0.5)" strokeWidth="3" strokeDasharray="6 6" animate={{ strokeDashoffset: [0, -120] }} transition={{ repeat: Infinity, duration: 8, ease: "linear" }} /><ellipse cx="100" cy="20" rx="75" ry="10" fill="none" stroke="rgba(180, 83, 9, 0.3)" strokeWidth="2" /></svg>
                        <svg viewBox="0 0 200 40" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220%] h-[40%] -rotate-12 z-20 pointer-events-none drop-shadow-2xl" style={{ clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)' }}><ellipse cx="100" cy="20" rx="95" ry="18" fill="none" stroke="rgba(245, 158, 11, 0.8)" strokeWidth="4" /><motion.ellipse cx="100" cy="20" rx="85" ry="14" fill="none" stroke="rgba(251, 191, 36, 0.9)" strokeWidth="3" strokeDasharray="6 6" animate={{ strokeDashoffset: [0, -120] }} transition={{ repeat: Infinity, duration: 8, ease: "linear" }} /><ellipse cx="100" cy="20" rx="75" ry="10" fill="none" stroke="rgba(245, 158, 11, 0.7)" strokeWidth="2" /></svg>
                      </>
                    )}
                  </motion.div>
                </motion.div>
                <h4 className="text-2xl md:text-4xl font-black mt-8 text-white drop-shadow-md">{planet.name === 'Bumi' ? 'Earth' : (planet.name === 'Matahari' ? 'Sun' : planet.name)}</h4>
              </div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>{isQuizOpen && <Quiz onClose={() => setIsQuizOpen(false)} />}</AnimatePresence>

      <AnimatePresence>
        {selectedPlanet && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer" onClick={() => setSelectedPlanet(null)} />
            <motion.div initial={{ scale: 0.5, opacity: 0, y: 100 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.8, opacity: 0, y: 50 }} transition={{ type: "spring", bounce: 0.4 }} className={`${selectedPlanet.bgColor} relative z-10 rounded-[2.5rem] p-6 md:p-8 max-w-lg w-full border-2 border-white/30 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto hide-scrollbar`}>
              <div className="text-center mb-4 flex flex-col items-center">
                <motion.div className={`w-32 h-32 md:w-40 md:h-40 mb-4 rounded-full ${getGlobeShadow()} border border-white/30 relative`} style={{ backgroundImage: `url(${selectedPlanet.imageUrl})`, backgroundSize: '200% 100%' }} animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }} transition={{ repeat: Infinity, duration: 15, ease: "linear" }} />
                <h3 className="text-4xl md:text-5xl font-black text-white">{selectedPlanet.name}</h3>
              </div>
              <div className="bg-white/10 rounded-2xl p-4 mb-4 text-left border border-white/20 backdrop-blur-lg">
                <h4 className="text-xl font-bold text-yellow-300 mb-3 drop-shadow-md">Tahukah Kamu? 💡</h4>
                <ul className="space-y-2">
                  {selectedPlanet.faktaSeru.map((fakta: string, index: number) => (
                    <motion.li key={index} className="flex gap-3 text-white/90 text-sm md:text-base font-medium"><span>⭐</span> {fakta}</motion.li>
                  ))}
                </ul>
              </div>
              <div className="bg-indigo-950/40 rounded-2xl p-4 mb-4 border border-indigo-400/30">
                <h4 className="text-sm font-bold text-cyan-300 mb-2">⚖️ Kalkulator Berat Badan di {selectedPlanet.name}</h4>
                <div className="flex items-center gap-3">
                  <input type="number" placeholder="Beratmu di Bumi (kg)" value={earthWeight} onChange={(e) => setEarthWeight(Number(e.target.value))} className="flex-1 bg-black/40 border border-white/20 rounded-lg px-4 py-2 text-white placeholder:text-white/50 focus:outline-none focus:border-cyan-400" />
                  {earthWeight ? (
                    <div className="bg-cyan-600 px-4 py-2 rounded-lg font-bold">{(Number(earthWeight) * selectedPlanet.gravity).toFixed(1)} kg</div>
                  ) : null}
                </div>
              </div>

              {/* FITUR BARU 2 & 3: COSMIC TOOLS */}
              <CosmicTools planet={selectedPlanet} />

              <button onClick={() => setSelectedPlanet(null)} className="w-full bg-white text-slate-900 text-xl font-black py-3 rounded-full shadow-[0_6px_0_#94a3b8] active:translate-y-1 transition-all mt-4">Tutup ❌</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}