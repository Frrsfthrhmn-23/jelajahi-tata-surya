export interface PlanetType {
  id: number;
  name: string;
  imageUrl: string;
  bgColor: string;
  subtitle: string;
  gravity: number;
  faktaSeru: string[];
  orbitalPeriod: number;    // dalam Tahun Bumi (untuk Cosmic Age)
  daysInYear: number;       // dalam Hari Bumi (untuk Birthday Countdown)
  rotationPeriod: number;   // Panjang hari dalam jam (untuk Day/Night Simulator)
  orbitVelocity: number;    // Kecepatan orbit dalam km/s (untuk Simulator)
}

export const sunData: PlanetType = {
  id: 0, name: 'Matahari', 
  imageUrl: 'https://www.solarsystemscope.com/textures/download/2k_sun.jpg', 
  bgColor: 'bg-orange-950/80', subtitle: 'Pusat Tata Surya', gravity: 27.9,
  orbitalPeriod: 0, daysInYear: 0, rotationPeriod: 609, orbitVelocity: 0, // Matahari diam
  faktaSeru: ['Matahari sebenarnya adalah sebuah bintang raksasa!', 'Suhunya sangat panas, bisa melelehkan apa saja.', 'Ukurannya 1 juta kali lebih besar dari Bumi.']
};

export const planetsData: PlanetType[] = [
  { id: 1, name: 'Merkurius', imageUrl: 'https://www.solarsystemscope.com/textures/download/2k_mercury.jpg', bgColor: 'bg-gray-800/80', subtitle: 'Si Mungil Tercepat', gravity: 0.38, orbitalPeriod: 0.24, daysInYear: 88, rotationPeriod: 1407, orbitVelocity: 47.36, faktaSeru: ['Planet paling dekat dengan Matahari!', 'Di malam hari planet ini sangat dingin.', 'Ukurannya paling kecil.'] },
  { id: 2, name: 'Venus', imageUrl: 'https://www.solarsystemscope.com/textures/download/2k_venus_surface.jpg', bgColor: 'bg-orange-900/80', subtitle: 'Bintang Kejora', gravity: 0.91, orbitalPeriod: 0.62, daysInYear: 224.7, rotationPeriod: 5832, orbitVelocity: 35.02, faktaSeru: ['Planet paling panas, lebih panas dari oven!', 'Sering disebut Bintang Kejora.', 'Arah putarannya terbalik.'] },
  { id: 3, name: 'Bumi', imageUrl: 'https://www.solarsystemscope.com/textures/download/2k_earth_daymap.jpg', bgColor: 'bg-blue-900/80', subtitle: 'Tempat Tinggal Kita', gravity: 1, orbitalPeriod: 1.0, daysInYear: 365.25, rotationPeriod: 24, orbitVelocity: 29.78, faktaSeru: ['Sebagian besar tertutup air laut.', 'Satu-satunya yang memiliki kehidupan.', 'Bumi memiliki satu Bulan.'] },
  { id: 4, name: 'Mars', imageUrl: 'https://www.solarsystemscope.com/textures/download/2k_mars.jpg', bgColor: 'bg-red-950/80', subtitle: 'Si Planet Merah', gravity: 0.38, orbitalPeriod: 1.88, daysInYear: 687, rotationPeriod: 24.6, orbitVelocity: 24.08, faktaSeru: ['Tanahnya mengandung debu besi berkarat.', 'Punya gunung berapi tertinggi (Olympus Mons).', 'Sehari di Mars disebut "Sol".'] },
  { id: 5, name: 'Jupiter', imageUrl: 'https://www.solarsystemscope.com/textures/download/2k_jupiter.jpg', bgColor: 'bg-amber-900/80', subtitle: 'Raksasa Gas', gravity: 2.34, orbitalPeriod: 11.86, daysInYear: 4333, rotationPeriod: 9.9, orbitVelocity: 13.07, faktaSeru: ['Planet paling besar di Tata Surya!', 'Tidak punya permukaan padat untuk dipijak.', 'Punya badai raksasa Bintik Merah Besar.'] },
  { id: 6, name: 'Saturnus', imageUrl: 'https://www.solarsystemscope.com/textures/download/2k_saturn.jpg', bgColor: 'bg-yellow-900/80', subtitle: 'Si Cantik Bercincin', gravity: 1.06, orbitalPeriod: 29.45, daysInYear: 10759, rotationPeriod: 10.7, orbitVelocity: 9.69, faktaSeru: ['Punya cincin es dan batu!', 'Sangat ringan, bisa mengapung di air raksasa!', 'Punya sangat banyak bulan.'] },
  { id: 7, name: 'Uranus', imageUrl: 'https://www.solarsystemscope.com/textures/download/2k_uranus.jpg', bgColor: 'bg-cyan-900/80', subtitle: 'Es yang Menggelinding', gravity: 0.92, orbitalPeriod: 84.02, daysInYear: 30687, rotationPeriod: 17.2, orbitVelocity: 6.81, faktaSeru: ['Warnanya biru muda karena gas khusus.', 'Berputarnya menyamping seperti bola.', 'Dijuluki raksasa es karena sangat dingin.'] },
  { id: 8, name: 'Neptunus', imageUrl: 'https://www.solarsystemscope.com/textures/download/2k_neptune.jpg', bgColor: 'bg-blue-950/80', subtitle: 'Raksasa Biru', gravity: 1.19, orbitalPeriod: 164.8, daysInYear: 60190, rotationPeriod: 16.1, orbitVelocity: 5.43, faktaSeru: ['Planet paling jauh dari Matahari.', 'Anginnya bertiup paling kencang!', 'Butuh 165 tahun mengelilingi Matahari.'] },
  { id: 9, name: 'Pluto', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Pluto_in_True_Color_-_High-Res.jpg', bgColor: 'bg-slate-800/80', subtitle: 'Si Planet Kerdil', gravity: 0.06, orbitalPeriod: 248.0, daysInYear: 90560, rotationPeriod: 153, orbitVelocity: 4.74, faktaSeru: ['Sekarang disebut Planet Kerdil.', 'Ukurannya lebih kecil dari Bulan!', 'Sangat gelap dan dingin.'] }
];