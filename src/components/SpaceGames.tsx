import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { savePlayerScore, getLeaderboard } from '../backend_mock/api';
import { planetsData } from '../data/planet'; // Import data planet asli

export default function SpaceGames({ onClose }: { onClose: () => void }) {
  const [activeGame, setActiveGame] = useState<'MENU' | 'ASTEROID' | 'MEMORY' | 'ROCKET' | 'SHADOW'>('MENU');
  
  // State untuk Leaderboard & Submit Skor
  const [playerName, setPlayerName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const handleSaveScore = async (gameId: string, finalScore: number) => {
    if (!playerName.trim()) return alert('Masukkan namamu dulu ya!');
    setIsSubmitting(true);
    await savePlayerScore(gameId, playerName, finalScore);
    const data = await getLeaderboard(gameId);
    setLeaderboardData(data);
    setIsSubmitting(false);
    setShowLeaderboard(true);
  };

  const resetGameView = () => {
    setShowLeaderboard(false);
    setPlayerName('');
    setActiveGame('MENU');
  };

  // ================= FUNGSI HELPER: BOLA PLANET 3D =================
  // Mem-build ulang efek planet 3D berputar untuk digunakan di dalam game
  const Render3DPlanet = ({ planet, sizeClass, isShadow = false }: { planet: any, sizeClass: string, isShadow?: boolean }) => {
    return (
      <motion.div 
        className={`${sizeClass} rounded-full relative ${isShadow ? 'brightness-[0.15] contrast-[150%] grayscale-[30%]' : 'shadow-[inset_-12px_-12px_24px_rgba(0,0,0,0.8),inset_2px_2px_8px_rgba(255,255,255,0.4)]'}`} 
        style={{ backgroundImage: `url(${planet.imageUrl})`, backgroundSize: '200% 100%' }} 
        animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }} 
        transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
      >
        {planet.name === 'Saturnus' && (
          <>
            <svg viewBox="0 0 200 40" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220%] h-[40%] -rotate-12 -z-10 pointer-events-none">
              <ellipse cx="100" cy="20" rx="95" ry="18" fill="none" stroke="rgba(180, 83, 9, 0.4)" strokeWidth="4" />
              <motion.ellipse cx="100" cy="20" rx="85" ry="14" fill="none" stroke="rgba(217, 119, 6, 0.5)" strokeWidth="3" strokeDasharray="6 6" animate={{ strokeDashoffset: [0, -120] }} transition={{ repeat: Infinity, duration: 8, ease: "linear" }} />
              <ellipse cx="100" cy="20" rx="75" ry="10" fill="none" stroke="rgba(180, 83, 9, 0.3)" strokeWidth="2" />
            </svg>
            <svg viewBox="0 0 200 40" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220%] h-[40%] -rotate-12 z-20 pointer-events-none" style={{ clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)' }}>
              <ellipse cx="100" cy="20" rx="95" ry="18" fill="none" stroke="rgba(245, 158, 11, 0.8)" strokeWidth="4" />
              <motion.ellipse cx="100" cy="20" rx="85" ry="14" fill="none" stroke="rgba(251, 191, 36, 0.9)" strokeWidth="3" strokeDasharray="6 6" animate={{ strokeDashoffset: [0, -120] }} transition={{ repeat: Infinity, duration: 8, ease: "linear" }} />
              <ellipse cx="100" cy="20" rx="75" ry="10" fill="none" stroke="rgba(245, 158, 11, 0.7)" strokeWidth="2" />
            </svg>
          </>
        )}
      </motion.div>
    );
  };

  // ================= GAME 1: ASTEROID SMASHER =================
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [asteroidPos, setAsteroidPos] = useState({ top: '20%', left: '50%' });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (activeGame === 'ASTEROID' && timeLeft > 0 && !showLeaderboard) {
      timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [activeGame, timeLeft, showLeaderboard]);

  const smashAsteroid = () => {
    if (timeLeft === 0) return;
    setScore(s => s + 10);
    setAsteroidPos({ top: `${Math.random() * 60 + 10}%`, left: `${Math.random() * 80 + 10}%` });
  };

  // ================= GAME 2: MEMORY MATCH (KARTU TERACAK + SKOR) =================
  const [cards, setCards] = useState<any[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [memoryScore, setMemoryScore] = useState(0);
  const [memoryTime, setMemoryTime] = useState(60);

  const startMemoryGame = () => {
    // Ambil 6 planet agar menjadi 12 kartu
    const gamePlanets = [planetsData[0], planetsData[1], planetsData[2], planetsData[3], planetsData[4], planetsData[5]];
    
    // Duplikasi, acak, dan tambahkan sudut rotasi berantakan secara asimetris
    const shuffledCards = [...gamePlanets, ...gamePlanets]
      .sort(() => Math.random() - 0.5)
      .map((card, idx) => ({
        ...card,
        uniqueId: `${card.id}-${idx}-${Date.now()}`,
        randomRotate: Math.random() * 14 - 7 // Berantakan acak dari -7 sampai 7 derajat
      }));

    setCards(shuffledCards);
    setFlipped([]);
    setMatched([]);
    setMemoryScore(0);
    setMemoryTime(60);
    setActiveGame('MEMORY');
    setShowLeaderboard(false);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (activeGame === 'MEMORY' && memoryTime > 0 && matched.length < cards.length && !showLeaderboard) {
      timer = setInterval(() => setMemoryTime(t => t - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [activeGame, memoryTime, matched.length, cards.length, showLeaderboard]);

  const handleCardClick = (index: number) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      if (cards[newFlipped[0]].id === cards[newFlipped[1]].id) {
        setMatched([...matched, ...newFlipped]);
        setMemoryScore(s => s + 20); // Benar +20
      } else {
        setMemoryScore(s => Math.max(0, s - 5)); // Salah -5 (poin terkecil 0)
      }
      setTimeout(() => setFlipped([]), 1000);
    }
  };

  // ================= GAME 3: ROKET NGEBUT (VISUAL ROKET & ANIMASI TERBANG) =================
  const [fuel, setFuel] = useState(0);
  const [rocketTime, setRocketTime] = useState(10);
  const [rocketStarted, setRocketStarted] = useState(false);
  const [isFlying, setIsFlying] = useState(false);
  const [rocketFinished, setRocketFinished] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (rocketStarted && rocketTime > 0 && fuel < 100 && !isFlying && !showLeaderboard) {
      timer = setInterval(() => setRocketTime(t => t - 1), 1000);
    } else if (rocketTime === 0 && !isFlying) {
      setRocketFinished(true); // Waktu habis tanpa terbang penuh
    }
    return () => clearInterval(timer);
  }, [rocketStarted, rocketTime, fuel, isFlying, showLeaderboard]);

  const tapRocket = () => {
    if (!rocketStarted) setRocketStarted(true);
    if (rocketTime > 0 && fuel < 100 && !isFlying) {
      const newFuel = Math.min(fuel + 5, 100);
      setFuel(newFuel);
      
      // TERBANG SEKARANG JIKA FUEL FULL!
      if (newFuel === 100) {
        setIsFlying(true);
        setTimeout(() => {
          setRocketFinished(true);
        }, 1500); // Tunggu animasi melesat ke atas (1.5 Detik)
      }
    }
  };

  const startRocketGame = () => {
    setActiveGame('ROCKET');
    setFuel(0);
    setRocketTime(10);
    setRocketStarted(false);
    setIsFlying(false);
    setRocketFinished(false);
    setShowLeaderboard(false);
  };

  // ================= GAME 4: TEBAK BAYANGAN =================
  const shadowQuestions = [
    { planet: planetsData[6], options: ['Bumi', 'Saturnus', 'Mars'] }, // Saturnus
    { planet: planetsData[3], options: ['Venus', 'Bumi', 'Uranus'] },  // Bumi
    { planet: planetsData[5], options: ['Jupiter', 'Neptunus', 'Merkurius'] } // Jupiter
  ];
  const [qIndex, setQIndex] = useState(0);
  const [shadowScore, setShadowScore] = useState(0);
  const [shadowDone, setShadowDone] = useState(false);

  const answerShadow = (ans: string) => {
    if (ans === shadowQuestions[qIndex].planet.name) setShadowScore(s => s + 50);
    if (qIndex + 1 < shadowQuestions.length) setQIndex(qIndex + 1);
    else setShadowDone(true);
  };

  // ================= KOMPONEN TAMPILAN =================
  const LeaderboardView = ({ gameName, finalScore }: { gameName: string, finalScore: number }) => (
    <div className="text-center w-full max-w-md mx-auto mt-4">
      <h3 className="text-3xl font-black text-yellow-400 mb-2">Papan Peringkat: {gameName}</h3>
      <div className="bg-indigo-950/80 p-4 rounded-2xl border border-cyan-400/50 mb-6 text-left">
        {leaderboardData.length === 0 ? (
          <p className="text-center text-indigo-300">Belum ada skor. Jadilah yang pertama!</p>
        ) : (
          leaderboardData.map((data, idx) => (
            <div key={idx} className="flex justify-between items-center py-2 border-b border-indigo-500/30 last:border-0">
              <span className="font-bold text-white"><span className="text-yellow-400 mr-2">#{idx + 1}</span> {data.playerName}</span>
              <span className="text-cyan-300 font-black">{data.score} Pts</span>
            </div>
          ))
        )}
      </div>
      <button onClick={resetGameView} className="bg-white text-black font-bold py-3 px-8 rounded-full shadow-lg hover:scale-105 transition-transform">Main Game Lain</button>
    </div>
  );

  const SubmitScoreView = ({ gameId, finalScore }: { gameId: string, finalScore: number }) => (
    <div className="text-center mt-8">
      <h3 className="text-4xl font-black text-white mb-2">Permainan Selesai!</h3>
      <p className="text-2xl text-yellow-400 font-bold mb-6">Skormu: {finalScore}</p>
      <div className="flex gap-2 max-w-sm mx-auto">
        <input type="text" placeholder="Namamu..." value={playerName} onChange={(e) => setPlayerName(e.target.value)} className="flex-1 bg-black/50 border border-cyan-400/50 rounded-xl px-4 py-2 text-white outline-none" />
        <button onClick={() => handleSaveScore(gameId, finalScore)} disabled={isSubmitting} className="bg-cyan-500 hover:bg-cyan-400 text-black font-black px-6 py-2 rounded-xl transition-colors disabled:opacity-50">
          {isSubmitting ? '...' : 'Kirim'}
        </button>
      </div>
    </div>
  );

  // ================= MAIN RENDER =================
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative bg-indigo-950 border-4 border-cyan-400 rounded-3xl w-full max-w-3xl h-[85vh] overflow-hidden flex flex-col shadow-[0_0_50px_rgba(34,211,238,0.3)]">
        
        {/* HEADER BAR */}
        <div className="bg-cyan-900/50 p-4 flex justify-between items-center border-b border-cyan-500/50">
          <h2 className="text-xl md:text-2xl font-black text-cyan-300">🕹️ ARCADE TATA SURYA</h2>
          <button onClick={onClose} className="text-white hover:text-red-400 font-bold bg-white/10 px-4 py-1 rounded-full">TUTUP</button>
        </div>

        {/* CONTENT AREA */}
        <div className="flex-1 p-4 md:p-6 relative overflow-y-auto flex flex-col items-center">
          
          {/* MENU UTAMA */}
          {activeGame === 'MENU' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <button onClick={() => { setActiveGame('ASTEROID'); setScore(0); setTimeLeft(15); setShowLeaderboard(false); }} className="bg-gradient-to-br from-red-600 to-orange-600 p-6 rounded-2xl border border-white/20 hover:scale-105 transition-transform text-left">
                <div className="text-4xl mb-2">☄️</div><h3 className="text-xl font-black text-white">Hancurkan Asteroid</h3>
              </button>
              <button onClick={startMemoryGame} className="bg-gradient-to-br from-blue-600 to-indigo-600 p-6 rounded-2xl border border-white/20 hover:scale-105 transition-transform text-left relative overflow-hidden">
                <div className="text-4xl mb-2 relative z-10">🌍</div><h3 className="text-xl font-black text-white relative z-10">Kartu Memori Planet</h3>
              </button>
              <button onClick={startRocketGame} className="bg-gradient-to-br from-purple-600 to-pink-600 p-6 rounded-2xl border border-white/20 hover:scale-105 transition-transform text-left">
                <div className="text-4xl mb-2">🚀</div><h3 className="text-xl font-black text-white">Roket Ngebut</h3>
              </button>
              <button onClick={() => { setActiveGame('SHADOW'); setQIndex(0); setShadowScore(0); setShadowDone(false); setShowLeaderboard(false); }} className="bg-gradient-to-br from-teal-600 to-emerald-600 p-6 rounded-2xl border border-white/20 hover:scale-105 transition-transform text-left">
                <div className="text-4xl mb-2">🌑</div><h3 className="text-xl font-black text-white">Planet Misteri</h3>
              </button>
            </div>
          )}

          {/* GAME 1: ASTEROID */}
          {activeGame === 'ASTEROID' && (
            <div className="h-full w-full relative">
              {!showLeaderboard ? (
                timeLeft > 0 ? (
                  <>
                    <div className="flex justify-between font-black text-xl mb-4"><span className="text-red-400">Waktu: {timeLeft}s</span><span className="text-yellow-400">Skor: {score}</span></div>
                    <div className="absolute inset-0 top-12 bg-black/40 rounded-xl overflow-hidden cursor-crosshair border border-red-500/30">
                      <motion.button animate={asteroidPos} onClick={smashAsteroid} className="absolute text-5xl active:scale-75 transition-transform" style={{ position: 'absolute' }}>☄️</motion.button>
                    </div>
                  </>
                ) : <SubmitScoreView gameId="asteroid" finalScore={score} />
              ) : <LeaderboardView gameName="Hancurkan Asteroid" finalScore={score} />}
            </div>
          )}

          {/* GAME 2: MEMORY DENGAN PLANET 3D (KARTU TERACAK + SKOR) */}
          {activeGame === 'MEMORY' && (
            <div className="w-full flex flex-col items-center">
              {!showLeaderboard ? (
                (memoryTime === 0 || matched.length === cards.length) ? (
                  <SubmitScoreView gameId="memory" finalScore={memoryScore} />
                ) : (
                  <>
                    <div className="flex justify-between w-full max-w-lg mb-4 font-black text-lg">
                      <span className="text-red-400">⏱️ Sisa Waktu: {memoryTime}s</span>
                      <span className="text-yellow-400">⭐ Skor Anda: {memoryScore}</span>
                    </div>
                    
                    <h3 className="text-sm font-black text-cyan-300 mb-6 uppercase tracking-wider">Cocokkan Planet 3D! (+20 Benar, -5 Salah)</h3>
                    
                    {/* Mengurangi ukuran dan jarak agar muat 12 kartu */}
                    <div className="grid grid-cols-4 gap-2 md:gap-3 w-full max-w-lg p-2 bg-black/20 rounded-2xl border border-white/5">
                      {cards.map((card, i) => {
                        const isFlipped = flipped.includes(i) || matched.includes(i);
                        return (
                          <motion.div 
                            key={card.uniqueId} 
                            onClick={() => handleCardClick(i)} 
                            whileHover={{ scale: 1.05 }} 
                            whileTap={{ scale: 0.95 }} 
                            className={`aspect-square flex items-center justify-center rounded-xl cursor-pointer border-2 transition-all duration-500 ${isFlipped ? 'bg-indigo-950 border-indigo-400' : 'bg-slate-800 border-slate-600'}`}
                            style={{ 
                              perspective: 1000,
                              rotate: isFlipped ? 0 : card.randomRotate // Efek acak berserakan saat tertutup
                            }}
                          >
                            <motion.div
                              className="w-full h-full relative"
                              animate={{ rotateY: isFlipped ? 180 : 0 }}
                              transition={{ duration: 0.6, type: "spring" }}
                              style={{ transformStyle: "preserve-3d" }}
                            >
                              {/* Bagian Belakang Kartu (Tanda Tanya) */}
                              <div className="absolute inset-0 flex items-center justify-center text-2xl md:text-4xl" style={{ backfaceVisibility: "hidden", transform: "rotateY(0deg)" }}>
                                ❓
                              </div>
                              {/* Bagian Depan Kartu (Bola Planet 3D) */}
                              <div className="absolute inset-0 flex items-center justify-center" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                                <Render3DPlanet planet={card} sizeClass="w-10 h-10 md:w-16 md:h-16" />
                              </div>
                            </motion.div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </>
                )
              ) : <LeaderboardView gameName="Kartu Memori Planet" finalScore={memoryScore} />}
            </div>
          )}

          {/* GAME 3: ROKET (DENGAN VISUAL 3D DAN ANIMASI TERBANG) */}
          {activeGame === 'ROCKET' && (
            <div className="w-full flex flex-col items-center justify-center h-full text-center relative overflow-hidden min-h-[50vh]">
              {!showLeaderboard ? (
                !rocketFinished ? (
                  <>
                    <div className="flex justify-between w-full max-w-sm mb-4 font-black text-lg">
                      <span className="text-red-400">⏱️ Waktu: {rocketTime}s</span>
                      <span className="text-yellow-400">⭐ Skor: {fuel * 10}</span>
                    </div>
                    
                    <h3 className="text-xl font-black text-purple-300 mb-2">Isi Bensin Roket Secepatnya!</h3>
                    <p className="text-sm text-purple-200 mb-4">Makin cepat tap, skor makin melimpah!</p>
                    
                    {/* AREA ROKET TERBANG */}
                    <div className="relative w-full h-48 flex items-center justify-center mb-4">
                      <motion.div 
                        className="text-7xl md:text-8xl relative z-10"
                        animate={isFlying ? {
                          y: [-2000],
                          scale: [1, 1.3, 0.4],
                          rotate: [0, 5, -5, 0]
                        } : {
                          y: [0, -6, 0],
                        }}
                        transition={isFlying ? {
                          duration: 1.5,
                          ease: "easeIn"
                        } : {
                          repeat: Infinity,
                          duration: 2,
                          ease: "easeInOut"
                        }}
                      >
                        🚀
                        {/* Efek Api Booster saat terbang */}
                        {(isFlying || fuel > 30) && (
                          <motion.div 
                            className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-3xl"
                            animate={{ scale: [1, 1.5, 1], opacity: [0.8, 1, 0.8] }}
                            transition={{ repeat: Infinity, duration: 0.15 }}
                          >
                            🔥
                          </motion.div>
                        )}
                      </motion.div>
                      
                      {/* Animasi Asap/Bintang di belakang */}
                      {isFlying && (
                        <div className="absolute bottom-4 flex gap-4 text-xl animate-bounce">
                          💨 💨 💨
                        </div>
                      )}
                    </div>

                    <div className="w-full max-w-sm h-12 bg-black/50 rounded-full border-4 border-white/20 mb-8 overflow-hidden relative">
                      <motion.div className="h-full bg-gradient-to-r from-orange-500 to-yellow-400" style={{ width: `${fuel}%` }} transition={{ type: 'tween' }} />
                      <div className="absolute inset-0 flex items-center justify-center font-black text-sm text-white drop-shadow">
                        GAS BOOSTER: {fuel}%
                      </div>
                    </div>
                    
                    <motion.button 
                      whileTap={{ scale: 0.85 }} 
                      onClick={tapRocket} 
                      disabled={isFlying}
                      className="w-28 h-28 bg-purple-600 rounded-full border-8 border-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.6)] text-4xl flex items-center justify-center active:bg-purple-700 disabled:opacity-50"
                    >
                      👆
                    </motion.button>
                  </>
                ) : <SubmitScoreView gameId="rocket" finalScore={fuel * 10} />
              ) : <LeaderboardView gameName="Roket Ngebut" finalScore={fuel * 10} />}
            </div>
          )}

          {/* GAME 4: SHADOW (PLANET MISTERI 3D) */}
          {activeGame === 'SHADOW' && (
            <div className="w-full flex flex-col items-center justify-center h-full">
              {!showLeaderboard ? (
                !shadowDone ? (
                  <>
                    <h3 className="text-xl md:text-2xl font-black text-teal-300 mb-6 text-center">Planet apakah yang ada di dalam bayangan gelap ini?</h3>
                    
                    {/* Render Planet Bayangan Hitam Putar */}
                    <div className="mb-10 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                       <Render3DPlanet planet={shadowQuestions[qIndex].planet} sizeClass="w-40 h-40 md:w-56 md:h-56" isShadow={true} />
                    </div>

                    <div className="flex gap-4 flex-wrap justify-center">
                      {shadowQuestions[qIndex].options.map((opt, i) => (
                        <button key={i} onClick={() => answerShadow(opt)} className="bg-slate-800 border-2 border-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-xl transition-colors">
                          {opt}
                        </button>
                      ))}
                    </div>
                  </>
                ) : <SubmitScoreView gameId="shadow" finalScore={shadowScore} />
              ) : <LeaderboardView gameName="Planet Misteri" finalScore={shadowScore} />}
            </div>
          )}

        </div>
      </motion.div>
    </div>
  );
}