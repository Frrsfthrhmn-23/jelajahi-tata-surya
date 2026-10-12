const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Izinkan Frontend React memanggil API ini
app.use(express.json());

// Lokasi database JSON di dalam folder backend
const dbPath = path.join(__dirname, 'scores.json');

const readScores = () => {
    if (!fs.existsSync(dbPath)) return {};
    const data = fs.readFileSync(dbPath);
    return JSON.parse(data);
};

const writeScores = (data) => {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// ==========================================
// 🚀 API ENDPOINTS (Rute Server)
// ==========================================

app.get('/', (req, res) => {
    res.send('🚀 Backend Tata Surya API Berjalan Normal!');
});

// Endpoint MENGAMBIL Leaderboard
app.get('/api/leaderboard/:gameId', (req, res) => {
    const { gameId } = req.params;
    const allScores = readScores();
    const gameScores = allScores[gameId] || [];
    res.json(gameScores.slice(0, 5)); // Kirim Top 5
});

// Endpoint MENYIMPAN Skor Baru
app.post('/api/score', (req, res) => {
    const { gameId, playerName, score } = req.body;

    if (!gameId || !playerName || score === undefined) {
        return res.status(400).json({ error: "Data tidak lengkap!" });
    }

    const allScores = readScores();
    if (!allScores[gameId]) allScores[gameId] = [];

    // Tambah skor baru
    allScores[gameId].push({ playerName, score, date: new Date().toISOString() });
    // Urutkan dari tertinggi ke terendah
    allScores[gameId].sort((a, b) => b.score - a.score);

    writeScores(allScores);
    res.json({ message: "Skor berhasil disimpan!", success: true });
});

app.listen(PORT, () => {
    console.log(`✨ Server Backend berjalan di http://localhost:${PORT}`);
});