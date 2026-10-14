import { useState } from 'react';
import { motion } from 'framer-motion';

export default function LandingPage({ onStart }: { onStart: (name: string) => void }) {
  const [name, setName] = useState('');

  const handleMulai = () => {
    if (name.trim() !== '') {
      onStart(name);
    } else {
      alert('Tulis namamu dulu ya, Kapten!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-indigo-950 overflow-hidden font-sans">
      {/* Background Bintang Kelap-Kelip */}
      <div className="absolute inset-0 opacity-40">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 4 + 1 + 'px',
              height: Math.random() * 4 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
            }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ repeat: Infinity, duration: Math.random() * 2 + 1 }}
          />
        ))}
      </div>
      
      <motion.div 
        initial={{ scale: 0.5, opacity: 0, y: 50 }} 
        animate={{ scale: 1, opacity: 1, y: 0 }} 
        transition={{ type: 'spring', bounce: 0.5 }}
        className="relative z-10 bg-black/40 backdrop-blur-md border-4 border-cyan-400 p-8 md:p-12 rounded-3xl shadow-[0_0_50px_rgba(34,211,238,0.4)] text-center max-w-lg w-[90%] mx-auto"
      >
        <motion.div 
          animate={{ y: [0, -15, 0] }} 
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="text-7xl md:text-8xl mb-6 drop-shadow-2xl"
        >
          🧑‍🚀🚀
        </motion.div>
        
        <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-4 drop-shadow-lg leading-tight">
          Akademi Tata Surya
        </h1>
        
        <p className="text-cyan-100 text-lg md:text-xl mb-8 font-bold">
          Halo Calon Astronot! Siapa namamu?
        </p>

        <div className="flex flex-col gap-4 items-center">
          <input
            type="text"
            placeholder="Ketik namamu di sini..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleMulai()}
            className="w-full max-w-xs px-6 py-4 rounded-2xl bg-indigo-900/50 border-2 border-cyan-400 text-white text-xl font-bold text-center placeholder-indigo-300 focus:outline-none focus:ring-4 focus:ring-cyan-500 transition-all shadow-inner"
            autoFocus
          />
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleMulai}
            className="w-full max-w-xs bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-black text-xl py-4 rounded-2xl shadow-[0_0_20px_rgba(245,158,11,0.5)] hover:shadow-[0_0_30px_rgba(245,158,11,0.8)] transition-all uppercase tracking-widest"
          >
            Mulai Misi! 🛸
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}