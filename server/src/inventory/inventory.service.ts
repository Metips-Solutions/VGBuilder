import { fetchEnkaProfile } from "./enka.client";

// Mapeo directo de IDs de Enka Network a la Base de Datos local
const ENKA_TO_DB_MAP: Record<string, { id: number; name: string }> = {
  "10000021": { id: 3, name: "Amber" },
  "10000014": { id: 4, name: "Barbara" },
  "10000024": { id: 5, name: "Beidou" },
  "10000032": { id: 6, name: "Bennett" },
  "10000036": { id: 7, name: "Chongyun" },
  "10000016": { id: 8, name: "Diluc" },
  "10000031": { id: 9, name: "Fischl" },
  "10000003": { id: 10, name: "Jean" },
  "10000015": { id: 11, name: "Kaeya" },
  "10000042": { id: 12, name: "Keqing" },
  "10000029": { id: 13, name: "Klee" },
  "10000006": { id: 14, name: "Lisa" },
  "10000041": { id: 15, name: "Mona" },
  "10000027": { id: 16, name: "Ningguang" },
  "10000034": { id: 17, name: "Noelle" },
  "10000035": { id: 18, name: "Qiqi" },
  "10000020": { id: 19, name: "Razor" },
  "10000043": { id: 20, name: "Sucrose" },
  "10000022": { id: 21, name: "Venti" },
  "10000023": { id: 22, name: "Xiangling" },
  "10000025": { id: 23, name: "Xingqiu" },
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