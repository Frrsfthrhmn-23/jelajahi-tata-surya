import React, { useState } from 'react';
import { motion } from 'framer-motion';
import  type { PlanetType } from '../data/planet';

export default function CosmicTools({ planet }: { planet: PlanetType }) {
  const [activeTab, setActiveTab] = useState<'AGE' | 'SIMULATOR'>('AGE');
  const [earthAgeInput, setEarthAgeInput] = useState<number | ''>('');
  const [orbitSpeed, setOrbitSpeed] = useState(1);
  const [rotationSpeed, setRotationSpeed] = useState(1);

  const isSun = planet.id === 0;

  const cosmicAge = earthAgeInput && planet.orbitalPeriod 
    ? (Number(earthAgeInput) / planet.orbitalPeriod).toFixed(2) 
    : '0';

  const daysToNextBirthday = earthAgeInput && planet.orbitalPeriod && planet.daysInYear
    ? Math.round((planet.orbitalPeriod - (Number(earthAgeInput) % planet.orbitalPeriod)) * 365.25)
    : 0;

  return (
    <div className="bg-indigo-950/40 rounded-3xl p-5 border border-indigo-500/30 backdrop-blur-md shadow-inner mt-4">
      <div className="flex gap-2 mb-4 bg-black/40 p-1.5 rounded-full border border-white/5">
        <button onClick={() => setActiveTab('AGE')} className={`flex-1 py-2 text-sm font-bold rounded-full transition-all ${activeTab === 'AGE' ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md' : 'text-indigo-200 hover:bg-white/5'}`}>
          ⏰ Umur Kosmik
        </button>
        {!isSun && (
          <button onClick={() => setActiveTab('SIMULATOR')} className={`flex-1 py-2 text-sm font-bold rounded-full transition-all ${activeTab === 'SIMULATOR' ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md' : 'text-indigo-200 hover:bg-white/5'}`}>
            🛰️ Simulator Orbit & Hari
          </button>
        )}
      </div>

      {activeTab === 'AGE' && (
        <div className="space-y-4">
          <p className="text-xs text-indigo-200">Masukkan umurmu di Bumi untuk melihat seberapa tua dirimu di planet {planet.name}!</p>
          <div className="flex gap-3 items-center">
            <input type="number" placeholder="Umur di Bumi (tahun)" value={earthAgeInput} onChange={(e) => setEarthAgeInput(e.target.value !== '' ? Number(e.target.value) : '')} className="flex-1 bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-indigo-400 font-bold" />
            {earthAgeInput ? (
              <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="bg-purple-600/50 border border-purple-500/40 px-4 py-2.5 rounded-xl font-black text-yellow-300 shadow-md text-center">
                {cosmicAge} {isSun ? 'Tahun Matahari' : 'Thn Orbit'}
              </motion.div>
            ) : null}
          </div>
          {earthAgeInput && !isSun ? (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-indigo-900/60 p-3 rounded-2xl border border-indigo-400/20 text-xs md:text-sm text-yellow-200">
              🎉 Di planet {planet.name}, kamu baru berusia <span className="font-extrabold text-white text-base">{cosmicAge}</span> tahun! <br />
              🎁 Sisa hari menuju hari ulang tahun {planet.name} berikutnya adalah sekitar <span className="font-bold text-white text-base">{daysToNextBirthday}</span> hari lagi di Bumi!
            </motion.div>
          ) : null}
        </div>
      )}

      {activeTab === 'SIMULATOR' && !isSun && (
        <div className="space-y-4">
          <div className="relative h-28 bg-black/50 rounded-2xl border border-white/5 overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(67,56,202,0.15),transparent_75%)]" />
            <div className="w-6 h-6 bg-yellow-400 rounded-full shadow-[0_0_20px_6px_#fbbf24] z-10 flex items-center justify-center text-xs">☀️</div>
            <div className="absolute border border-dashed border-white/10 rounded-full w-20 h-20" />
            <motion.div className="absolute w-20 h-20" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: Math.max(1, 10 / orbitSpeed), ease: "linear" }}>
              <div className="w-3 h-3 rounded-full absolute -top-1.5 left-[34px] border border-white/20" style={{ backgroundImage: `url(${planet.imageUrl})`, backgroundSize: 'cover' }} />
            </motion.div>
            <div className="absolute right-4 bottom-4 flex flex-col items-center">
              <p className="text-[10px] text-indigo-300">Rotasi Global</p>
              <div className="relative w-8 h-8 rounded-full overflow-hidden mt-1 border border-indigo-500/30">
                <motion.div className="w-full h-full bg-[size:200%_100%] rounded-full shadow-[inset_4px_2px_4px_rgba(255,255,255,0.4)]" style={{ backgroundImage: `url(${planet.imageUrl})` }} animate={{ backgroundPosition: ["0% 0%", "200% 0%"] }} transition={{ repeat: Infinity, duration: Math.max(0.5, 4 / rotationSpeed), ease: "linear" }} />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-transparent to-black/80" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[10px] md:text-xs">
            <div className="bg-indigo-950/80 p-2 rounded-xl border border-white/5">
              <span className="text-indigo-300">Orbit Velocity:</span>
              <p className="font-extrabold text-sm text-cyan-300">{(planet.orbitVelocity * orbitSpeed).toFixed(2)} km/s</p>
            </div>
            <div className="bg-indigo-950/80 p-2 rounded-xl border border-white/5">
              <span className="text-indigo-300">Panjang Hari:</span>
              <p className="font-extrabold text-sm text-cyan-300">{(planet.rotationPeriod / rotationSpeed).toFixed(1)} Jam</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-bold text-indigo-300 mb-1">
                <span>⚡ Kecepatan Orbit (Revolusi)</span><span>{orbitSpeed.toFixed(1)}x</span>
              </div>
              <input type="range" min="0.5" max="5" step="0.5" value={orbitSpeed} onChange={(e) => setOrbitSpeed(Number(e.target.value))} className="w-full accent-cyan-400 h-1 bg-black/40 rounded-lg cursor-pointer" />
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold text-indigo-300 mb-1">
                <span>🔄 Kecepatan Rotasi Hari</span><span>{rotationSpeed.toFixed(1)}x</span>
              </div>
              <input type="range" min="0.5" max="5" step="0.5" value={rotationSpeed} onChange={(e) => setRotationSpeed(Number(e.target.value))} className="w-full accent-cyan-400 h-1 bg-black/40 rounded-lg cursor-pointer" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}