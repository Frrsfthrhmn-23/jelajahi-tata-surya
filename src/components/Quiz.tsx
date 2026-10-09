import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const quizData = [
  { question: "Planet manakah yang ukurannya paling besar?", options: ["Bumi", "Jupiter", "Merkurius"], answer: "Jupiter" },
  { question: "Planet apa yang dijuluki 'Si Planet Merah'?", options: ["Mars", "Venus", "Neptunus"], answer: "Mars" },
  { question: "Selain Bumi, planet mana yang memiliki cincin sangat indah?", options: ["Pluto", "Uranus", "Saturnus"], answer: "Saturnus" },
  { question: "Apa pusat dari Tata Surya kita?", options: ["Bumi", "Bulan", "Matahari"], answer: "Matahari" },
  { question: "Planet mana yang paling dekat dengan Matahari?", options: ["Venus", "Merkurius", "Mars"], answer: "Merkurius" },
  { question: "Planet apa yang berputar menyamping seperti bola?", options: ["Uranus", "Jupiter", "Bumi"], answer: "Uranus" },
  { question: "Planet apa yang paling panas dan disebut Bintang Kejora?", options: ["Venus", "Merkurius", "Matahari"], answer: "Venus" },
  { question: "Planet mana yang memiliki angin paling kencang?", options: ["Neptunus", "Saturnus", "Mars"], answer: "Neptunus" },
  { question: "Pluto saat ini dikelompokkan sebagai apa?", options: ["Komet", "Planet Kerdil", "Bintang"], answer: "Planet Kerdil" },
  { question: "Bumi memiliki satu satelit alami, apakah itu?", options: ["Matahari", "Bintang", "Bulan"], answer: "Bulan" }
];

export default function Quiz({ onClose }: { onClose: () => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleAnswerClick = (option: string) => {
    if (selectedAnswer) return; // Mencegah klik dua kali
    setSelectedAnswer(option);

    const isCorrect = option === quizData[currentQuestion].answer;
    if (isCorrect) setScore(score + 10);

    setTimeout(() => {
      setSelectedAnswer(null);
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < quizData.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        setShowScore(true);
      }
    }, 1200); // Jeda 1.2 detik agar anak bisa melihat warna hijau/merah
  };

  const getButtonClass = (option: string) => {
    if (!selectedAnswer) return "bg-white/10 hover:bg-indigo-500 border-white/20";
    if (option === quizData[currentQuestion].answer) return "bg-green-500 border-green-400";
    if (selectedAnswer === option) return "bg-red-500 border-red-400";
    return "bg-white/5 border-white/10 opacity-50";
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="relative z-10 bg-indigo-950/95 rounded-[2.5rem] p-8 max-w-lg w-full border-4 border-indigo-400 shadow-[0_0_50px_rgba(99,102,241,0.5)]">
        
        {showScore ? (
          <div className="text-center">
            <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="text-6xl mb-4">🏆</motion.div>
            <h3 className="text-3xl font-black text-white mb-2">Kuis Selesai!</h3>
            <p className="text-xl text-indigo-200 font-bold mb-8">Nilai Kamu: <span className="text-yellow-400 text-6xl block mt-2">{score} <span className="text-2xl text-white">/ 100</span></span></p>
            <div className="flex flex-col gap-3">
              <button onClick={() => {setCurrentQuestion(0); setScore(0); setShowScore(false);}} className="bg-yellow-400 text-indigo-950 font-bold py-3 rounded-full hover:bg-yellow-300">Main Lagi 🔄</button>
              <button onClick={onClose} className="bg-white/10 text-white font-bold py-3 rounded-full hover:bg-white/20">Tutup ❌</button>
            </div>
          </div>
        ) : (
          <div>
            {/* Progress Bar */}
            <div className="w-full bg-white/10 rounded-full h-3 mb-6">
              <motion.div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full" initial={{ width: 0 }} animate={{ width: `${((currentQuestion) / quizData.length) * 100}%` }} transition={{ duration: 0.5 }} />
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className="text-indigo-300 font-bold text-sm bg-indigo-900/50 px-4 py-1.5 rounded-full border border-indigo-500/30">Soal {currentQuestion + 1}/{quizData.length}</span>
              <span className="text-yellow-400 font-bold bg-yellow-900/30 px-4 py-1.5 rounded-full border border-yellow-500/50">Skor: {score}</span>
            </div>
            
            <h3 className="text-2xl font-black text-white mb-8 leading-relaxed min-h-[80px]">{quizData[currentQuestion].question}</h3>
            
            <div className="flex flex-col gap-4 mb-4">
              {quizData[currentQuestion].options.map((option, index) => (
                <motion.button key={index} whileHover={!selectedAnswer ? { scale: 1.02 } : {}} whileTap={!selectedAnswer ? { scale: 0.95 } : {}} animate={selectedAnswer === option && option !== quizData[currentQuestion].answer ? { x: [-5, 5, -5, 5, 0] } : {}} onClick={() => handleAnswerClick(option)} className={`${getButtonClass(option)} border text-white text-lg font-bold py-4 rounded-2xl transition-all text-left px-6 shadow-md`}>
                  {option}
                </motion.button>
              ))}
            </div>
            <button onClick={onClose} className="w-full text-indigo-400 hover:text-white font-bold py-2 mt-2">Batal ❌</button>
          </div>
        )}
      </motion.div>
    </div>
  );
}