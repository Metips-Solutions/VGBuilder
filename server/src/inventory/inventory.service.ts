import { fetchEnkaProfile } from "./enka.client";

// Mapeo directo de IDs de Enka Network a la Base de Datos local
const ENKA_TO_DB_MAP: Record<string, { id: number; name: string }> = {
  "10000021": { id: 24, name: "Amber" },
  "10000014": { id: 25, name: "Barbara" },
  "10000024": { id: 26, name: "Beidou" },
  "10000032": { id: 27, name: "Bennett" },
  "10000036": { id: 28, name: "Chongyun" },
  "10000016": { id: 29, name: "Diluc" },
  "10000031": { id: 30, name: "Fischl" },
  "10000003": { id: 31, name: "Jean" },
  "10000015": { id: 32, name: "Kaeya" },
  "10000042": { id: 33, name: "Keqing" },
  "10000029": { id: 34, name: "Klee" },
  "10000006": { id: 35, name: "Lisa" },
  "10000041": { id: 36, name: "Mona" },
  "10000027": { id: 37, name: "Ningguang" },
  "10000034": { id: 38, name: "Noelle" },
  "10000035": { id: 39, name: "Qiqi" },
  "10000020": { id: 40, name: "Razor" },
  "10000043": { id: 41, name: "Sucrose" },
  "10000022": { id: 42, name: "Venti" },
  "10000023": { id: 43, name: "Xiangling" },
  "10000025": { id: 44, name: "Xingqiu" },
  "10000039": { id: 45, name: "Diona" },
  "10000033": { id: 46, name: "Tartaglia" },
  "10000044": { id: 47, name: "Xinyan" },
  "10000030": { id: 48, name: "Zhongli" },
  "10000038": { id: 49, name: "Albedo" },
  "10000037": { id: 50, name: "Ganyu" },
  "10000026": { id: 51, name: "Xiao" },
  "10000046": { id: 52, name: "Hu Tao" },
  "10000045": { id: 53, name: "Rosaria" },
  "10000048": { id: 54, name: "Yanfei" },
  "10000051": { id: 55, name: "Eula" },
  "10000047": { id: 56, name: "Kaedehara Kazuha" },
  "10000002": { id: 57, name: "Kamisato Ayaka" },
  "10000053": { id: 58, name: "Sayu" },
  "10000049": { id: 59, name: "Yoimiya" },
  "10000062": { id: 60, name: "Aloy" },
  "10000056": { id: 61, name: "Kujou Sara" },
  "10000052": { id: 62, name: "Shogun Raiden" },
  "10000054": { id: 63, name: "Sangonomiya Kokomi" },
  "10000050": { id: 64, name: "Thoma" },
  "10000055": { id: 65, name: "Gorou" },
};

export interface ProcessedCharacter {
  id: number;
  name: string;
  constellations: number;
}

/**
 * Helper para extraer username y hoyoId desde la URL del perfil de Enka.
 */
export function parseEnkaUrl(enkaUrl: string): { username: string; hoyoId: string } {
  const regex = /enka\.network\/u\/([^\/]+)\/([^\/]+)/i;
  const match = enkaUrl.match(regex);

  if (!match || !match[1] || !match[2]) {
    throw new Error("URL de Enka inválida. Estructura esperada: https://enka.network/u/USUARIO/HOYO_ID/...");
  }

  return {
    username: match[1],
    hoyoId: match[2]
  };
}

/**
 * Obtiene y normaliza los personajes guardados desde la URL de builds de Enka.
 */
export async function getInventoryFromBuildsUrl(profileUrl: string): Promise<ProcessedCharacter[]> {
  const { username, hoyoId } = parseEnkaUrl(profileUrl);
  const apiUrl = `https://enka.network/api/profile/${username}/hoyos/${hoyoId}/builds/`;

  console.log("Consultando:", apiUrl);

  const response = await fetch(apiUrl, {
    headers: { "User-Agent": "VGBuilder-App/1.0" },
    signal: AbortSignal.timeout(10_000),
  });

  console.log("Enka respondió:", response.status);

  if (!response.ok) {
    throw new Error(`Error al consultar la API de Enka: ${response.statusText}`);
  }

  const data = await response.json();

  return Object.entries(data)
    .map(([avatarId, builds]: [string, any]) => {
      const dbCharacter = ENKA_TO_DB_MAP[avatarId];
      
      // Si el personaje no está en nuestra BD local, se omite
      if (!dbCharacter) return null;

      const latestBuild = builds[0];
      const avatarData = latestBuild?.avatar_data;

      const constellations = avatarData?.talentIdList
        ? avatarData.talentIdList.length
        : 0;

      return {
        id: dbCharacter.id,
        name: dbCharacter.name,
        constellations
      };
    })
    .filter((char): char is ProcessedCharacter => char !== null);
}