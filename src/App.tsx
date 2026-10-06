import React, { useState } from 'react';

export default function App() {
  // State untuk mengontrol modal planet mana yang sedang terbuka
  const [selectedPlanet, setSelectedPlanet] = useState<any>(null);

  // Data planet yang sudah dilengkapi dengan array 'faktaSeru'
  const planets = [
    { 
      id: 1, 
      name: 'Bumi', 
      emoji: '🌍', 
      bgColor: 'bg-blue-500', 
      subtitle: 'Tempat Tinggal Kita',
      faktaSeru: [
        'Sebagian besar permukaan Bumi (sekitar 70%) tertutup oleh air laut lho!', 
        'Bumi adalah satu-satunya planet yang kita tahu memiliki kehidupan.', 
        'Bumi hanya memiliki satu teman setia di angkasa, yaitu Bulan.'
      ]
    },
    { 
      id: 2, 
      name: 'Mars', 
      emoji: '🔴', 
      bgColor: 'bg-red-500', 
      subtitle: 'Si Planet Merah',
      faktaSeru: [
        'Disebut Planet Merah karena tanahnya mengandung banyak debu besi berkarat.', 
        'Punya gunung berapi tertinggi di Tata Surya bernama Olympus Mons!', 
        'Sehari di Mars disebut "Sol" dan lamanya hampir sama dengan di Bumi.'
      ]
    },
    { 
      id: 3, 
      name: 'Jupiter', 
      emoji: '🪐', 
      bgColor: 'bg-orange-400', 
      subtitle: 'Raksasa Gas Terbesar',
      faktaSeru: [
        'Jupiter adalah planet paling besar di Tata Surya kita. Sangat raksasa!', 
        'Planet ini tidak punya permukaan padat untuk dipijak karena terbuat dari gas.', 
        'Punya badai raksasa berputar yang disebut "Bintik Merah Besar".'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-indigo-900 to-purple-900 text-white font-sans pb-20 relative">
      
      {/* HEADER / NAVBAR */}
      <nav className="flex justify-between items-center p-6 mx-4 mt-4 bg-blue-800/40 backdrop-blur-md rounded-full border-2 border-white/10 shadow-lg relative z-0">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🚀</span>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide text-yellow-300">
            Jelajah Tata Surya
          </h1>
        </div>
        <button className="hidden md:block bg-white/20 hover:bg-white/30 px-6 py-2 rounded-full font-bold transition-all">
          Menu ☰
        </button>
      </nav>

      {/* HERO SECTION */}
      <header className="flex flex-col items-center text-center px-4 py-20 mt-8 relative z-0">
        <div className="animate-bounce mb-4 text-6xl">👨‍🚀</div>
        <h2 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-xl">
          Siap Menjelajah <span className="text-yellow-400">Angkasa?</span>
        </h2>
        <p className="text-xl md:text-2xl text-blue-200 mb-10 max-w-2xl font-medium">
          Hai Penjelajah Cilik! Ayo kita terbang menggunakan roket dan berkenalan dengan planet-planet keren di tata surya kita.
        </p>
        <button className="bg-yellow-400 text-blue-950 text-2xl font-black py-5 px-10 rounded-full shadow-[0_8px_0_#b45309] hover:translate-y-2 hover:shadow-[0_0px_0_#b45309] hover:bg-yellow-300 transition-all duration-200 active:scale-95">
          Mulai Petualangan! 🌟
        </button>
      </header>

      {/* PLANET GRID SECTION */}
      <section className="max-w-6xl mx-auto px-6 mt-12 relative z-0">
        <h3 className="text-3xl font-bold text-center mb-10 text-yellow-200">
          Pilih Destinasi Pertamamu!
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {planets.map((planet) => (
            <div 
              key={planet.id}
              onClick={() => setSelectedPlanet(planet)} // Membuka modal saat diklik
              className={`${planet.bgColor} p-8 rounded-[2.5rem] shadow-2xl transform hover:-translate-y-4 hover:scale-105 transition-all duration-300 cursor-pointer border-4 border-white/30 text-center group`}
            >
              <div className="text-8xl mb-6 group-hover:rotate-12 transition-transform duration-300">
                {planet.emoji}
              </div>
              <h4 className="text-4xl font-black mb-2 text-white">
                {planet.name}
              </h4>
              <p className="text-lg font-bold text-white/80 bg-black/20 py-2 px-4 rounded-full inline-block">
                {planet.subtitle}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL POP-UP (Hanya dirender jika selectedPlanet ada isinya) */}
      {selectedPlanet && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          
          {/* Latar Belakang Transparan (Backdrop) */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            onClick={() => setSelectedPlanet(null)}
          ></div>
          
          {/* Kotak Modal Utama */}
          <div className={`${selectedPlanet.bgColor} relative z-10 rounded-[2.5rem] p-8 max-w-lg w-full border-4 border-white shadow-2xl transform transition-all`}>
            
            <div className="text-center mb-6">
              <div className="text-8xl mb-4">{selectedPlanet.emoji}</div>
              <h3 className="text-5xl font-black text-white">{selectedPlanet.name}</h3>
              <p className="text-xl text-white/90 font-bold mt-2">{selectedPlanet.subtitle}</p>
            </div>
            
            {/* Area Daftar Fakta Seru */}
            <div className="bg-white/20 rounded-3xl p-6 mb-8 text-left border-2 border-white/30">
              <h4 className="text-2xl font-bold text-yellow-300 mb-4 drop-shadow-md">Tahukah Kamu? 💡</h4>
              <ul className="space-y-4">
                {selectedPlanet.faktaSeru.map((fakta: string, index: number) => (
                  <li key={index} className="flex gap-4 text-white text-lg font-medium leading-relaxed">
                    <span className="text-2xl">⭐</span> 
                    {fakta}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tombol Tutup */}
            <button 
              onClick={() => setSelectedPlanet(null)}
              className="w-full bg-white text-blue-900 text-2xl font-black py-4 rounded-full shadow-[0_6px_0_#cbd5e1] hover:translate-y-1 hover:shadow-[0_0px_0_#cbd5e1] active:scale-95 transition-all"
            >
              Tutup ❌
            </button>
            
          </div>
        </div>
      )}

    </div>
  );
}