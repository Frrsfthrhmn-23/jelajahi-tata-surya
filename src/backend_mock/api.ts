import { planetsData, sunData } from '../data/planet';
import type { PlanetType } from '../data/planet';

// URL Server Node.js kita
const API_URL = 'http://localhost:5000/api';

/**
 * Fetch data planet (Mengambil dari data statis lokal)
 */
export const fetchAllPlanets = async (): Promise<{ sun: PlanetType, planets: PlanetType[] }> => {
  return {
    sun: sunData,
    planets: planetsData
  };
};

/**
 * Mengambil Leaderboard Global langsung dari Server Node.js
 */
export const getLeaderboard = async (gameId: string): Promise<Array<{playerName: string, score: number}>> => {
  try {
    const response = await fetch(`${API_URL}/leaderboard/${gameId}`);
    if (!response.ok) throw new Error('Gagal mengambil data dari server');
    
    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Terjadi kesalahan koneksi server:", error);
    return []; 
  }
};

/**
 * Menyimpan skor pemain ke Server Node.js
 */
export const savePlayerScore = async (gameId: string, playerName: string, score: number): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/score`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ gameId, playerName, score })
    });

    const result = await response.json();
    return result.success === true;
  } catch (error) {
    console.error("Gagal menyimpan skor ke server:", error);
    return false;
  }
};