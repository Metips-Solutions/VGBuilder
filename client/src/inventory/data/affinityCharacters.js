// Catálogo de personajes para el Motor de Afinidad (IDs 1-52, Rondas 1 a 4)
// Sin presets de equipo, conforme a los requerimientos de VGBuilder.

export const AFFINITY_CHARACTERS = [
  { id: 1, name: "Amber", element: "Pyro", roles: ["Sub-DPS"] },
  { id: 2, name: "Barbara", element: "Hydro", roles: ["Healer", "Support"] },
  { id: 3, name: "Beidou", element: "Electro", roles: ["Sub-DPS"] },
  { id: 4, name: "Bennett", element: "Pyro", roles: ["Support", "Healer"] },
  { id: 5, name: "Chongyun", element: "Cryo", roles: ["Sub-DPS", "Support"] },
  { id: 6, name: "Diluc", element: "Pyro", roles: ["Main DPS"] },
  { id: 7, name: "Fischl", element: "Electro", roles: ["Sub-DPS"] },
  { id: 8, name: "Jean", element: "Anemo", roles: ["Support", "Healer"] },
  { id: 9, name: "Kaeya", element: "Cryo", roles: ["Sub-DPS", "Support"] },
  { id: 10, name: "Keqing", element: "Electro", roles: ["Main DPS"] },
  { id: 11, name: "Klee", element: "Pyro", roles: ["Main DPS"] },
  { id: 12, name: "Lisa", element: "Electro", roles: ["Sub-DPS", "Support"] },
  { id: 13, name: "Mona", element: "Hydro", roles: ["Support", "Sub-DPS"] },
  { id: 14, name: "Ningguang", element: "Geo", roles: ["Main DPS", "Sub-DPS"] },
  { id: 15, name: "Noelle", element: "Geo", roles: ["Main DPS", "Support", "Healer"] },
  { id: 16, name: "Qiqi", element: "Cryo", roles: ["Healer", "Support"] },
  { id: 17, name: "Razor", element: "Electro", roles: ["Main DPS"] },
  { id: 18, name: "Sucrose", element: "Anemo", roles: ["Support"] },
  { id: 19, name: "Venti", element: "Anemo", roles: ["Support"] },
  { id: 20, name: "Xiangling", element: "Pyro", roles: ["Sub-DPS"] },
  { id: 21, name: "Xingqiu", element: "Hydro", roles: ["Sub-DPS", "Support"] },
  { id: 22, name: "Diona", element: "Cryo", roles: ["Support", "Healer"] },
  { id: 23, name: "Tartaglia", element: "Hydro", roles: ["Main DPS"] },
  { id: 24, name: "Xinyan", element: "Pyro", roles: ["Support", "Sub-DPS", "Main DPS"] },
  { id: 25, name: "Zhongli", element: "Geo", roles: ["Support"] },
  { id: 26, name: "Albedo", element: "Geo", roles: ["Sub-DPS", "Support"] },
  { id: 27, name: "Ganyu", element: "Cryo", roles: ["Main DPS", "Sub-DPS", "Support"] },
  { id: 28, name: "Xiao", element: "Anemo", roles: ["Main DPS"] },
  { id: 29, name: "Hu Tao", element: "Pyro", roles: ["Main DPS"] },
  { id: 30, name: "Rosaria", element: "Cryo", roles: ["Sub-DPS", "Support"] },
  { id: 31, name: "Yanfei", element: "Pyro", roles: ["Main DPS", "Support"] },
  { id: 32, name: "Eula", element: "Cryo", roles: ["Main DPS", "Support"] },
  { id: 33, name: "Kaedehara Kazuha", element: "Anemo", roles: ["Support", "Sub-DPS"] },
  { id: 34, name: "Kamisato Ayaka", element: "Cryo", roles: ["Main DPS"] },
  { id: 35, name: "Sayu", element: "Anemo", roles: ["Support", "Healer"] },
  { id: 36, name: "Yoimiya", element: "Pyro", roles: ["Main DPS"] },
  { id: 37, name: "Aloy", element: "Cryo", roles: ["Sub-DPS", "Support"] },
  { id: 38, name: "Kujou Sara", element: "Electro", roles: ["Support", "Sub-DPS"] },
  { id: 39, name: "Shogun Raiden", element: "Electro", roles: ["Main DPS", "Sub-DPS", "Support"] },
  { id: 40, name: "Sangonomiya Kokomi", element: "Hydro", roles: ["Support", "Healer", "Main DPS"] },
  { id: 41, name: "Thoma", element: "Pyro", roles: ["Support", "Sub-DPS"] },
  { id: 42, name: "Gorou", element: "Geo", roles: ["Support"] },
  { id: 43, name: "Arataki Itto", element: "Geo", roles: ["Main DPS"] },
  { id: 44, name: "Yun Jin", element: "Geo", roles: ["Support"] },
  { id: 45, name: "Shenhe", element: "Cryo", roles: ["Support", "Sub-DPS"] },
  { id: 46, name: "Yae Miko", element: "Electro", roles: ["Sub-DPS", "Main DPS"] },
  { id: 47, name: "Kamisato Ayato", element: "Hydro", roles: ["Main DPS", "Sub-DPS", "Driver"] },
  { id: 48, name: "Yelan", element: "Hydro", roles: ["Sub-DPS", "Support"] },
  { id: 49, name: "Kuki Shinobu", element: "Electro", roles: ["Support", "Healer"] },
  { id: 50, name: "Shikanoin Heizou", element: "Anemo", roles: ["Main DPS", "Driver", "Sub-DPS"] },
  { id: 51, name: "Tighnari", element: "Dendro", roles: ["Main DPS"] },
  { id: 52, name: "Collei", element: "Dendro", roles: ["Sub-DPS", "Support"] }
];

// Mapa de alias comunes para normalizar nombres
const NAME_ALIASES = {
  sacarosa: "Sucrose",
  sucrose: "Sucrose",
  childe: "Tartaglia",
  tartaglia: "Tartaglia",
  kazuha: "Kaedehara Kazuha",
  "kaedehara kazuha": "Kaedehara Kazuha",
  ayaka: "Kamisato Ayaka",
  "kamisato ayaka": "Kamisato Ayaka",
  ayato: "Kamisato Ayato",
  "kamisato ayato": "Kamisato Ayato",
  raiden: "Shogun Raiden",
  "raiden shogun": "Shogun Raiden",
  "shogun raiden": "Shogun Raiden",
  kokomi: "Sangonomiya Kokomi",
  "sangonomiya kokomi": "Sangonomiya Kokomi",
  sara: "Kujou Sara",
  "kujou sara": "Kujou Sara",
  itto: "Arataki Itto",
  "arataki itto": "Arataki Itto",
  shinobu: "Kuki Shinobu",
  "kuki shinobu": "Kuki Shinobu",
  heizou: "Shikanoin Heizou",
  "shikanoin heizou": "Shikanoin Heizou",
  hutao: "Hu Tao",
  "hu tao": "Hu Tao",
  yunjin: "Yun Jin",
  "yun jin": "Yun Jin",
  yaemiko: "Yae Miko",
  "yae miko": "Yae Miko"
};

/**
 * Normaliza un nombre o id de personaje para buscarlo en el catálogo de afinidad.
 */
export function findAffinityCharacter(character) {
  if (!character) return null;

  // Si ya tiene un id numérico del 1 al 52
  if (typeof character.id === "number" && character.id >= 1 && character.id <= 52) {
    const direct = AFFINITY_CHARACTERS.find((c) => c.id === character.id);
    if (direct) return direct;
  }

  const rawName = (character.name || character.id || "").toString().toLowerCase().trim();
  
  // Buscar por alias
  if (NAME_ALIASES[rawName]) {
    const aliasedName = NAME_ALIASES[rawName];
    const match = AFFINITY_CHARACTERS.find((c) => c.name.toLowerCase() === aliasedName.toLowerCase());
    if (match) return match;
  }

  // Buscar coincidencia exacta por nombre
  const exactMatch = AFFINITY_CHARACTERS.find(
    (c) => c.name.toLowerCase() === rawName
  );
  if (exactMatch) return exactMatch;

  // Buscar coincidencia parcial (ej. "Ayaka" en "Kamisato Ayaka")
  const partialMatch = AFFINITY_CHARACTERS.find(
    (c) => c.name.toLowerCase().includes(rawName) || rawName.includes(c.name.toLowerCase())
  );
  return partialMatch || null;
}

/**
 * Determina si un personaje puede actuar como Main DPS
 */
export function isMainDps(char) {
  if (!char) return false;
  const roles = char.roles || [];
  return roles.some((r) => r.toLowerCase().replace(/[\s-_]+/g, "") === "maindps");
}
