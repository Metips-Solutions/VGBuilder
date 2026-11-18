/**
 * VGBuilder — Catálogo de Stickers Amigables para Personajes de Genshin Impact
 * Directorio público: /Images/stckersGI/
 *
 * Cobertura:
 * - 50 personajes con 2 variantes de stickers (selección aleatoria)
 * - Noelle con 1 variante (noelle_shy.webp)
 * - Aloy sin variante en carpeta (fallback al icono oficial actual)
 */

import { CHARACTERS } from './characters';

export const CHARACTER_STICKERS = {
  Amber: ['amber_grabbed.webp', 'baronbunny_mad.webp'],
  Barbara: ['barbara_panic.webp', 'barbara_shh.webp'],
  Beidou: ['beidou_embarrassed.webp', 'beidou_laugh.webp'],
  Bennett: ['bennet_thumbsup.webp', 'bennett_excited.webp'],
  Chongyun: ['chongyun_card.webp', 'chongyun_drunk.webp'],
  Diluc: ['diluc_explain.webp', 'diluc_refuse.webp'],
  Fischl: ['fischl_beach.webp', 'fischl_laugh.webp'],
  Jean: ['jean_embarrassed.webp', 'jean_skinthumbsup.webp'],
  Kaeya: ['kaeya_laugh.webp', 'kaeya_shrug.webp'],
  Keqing: ['keqing_sleep.webp', 'keqing_thumbsup.webp'],
  Klee: ['klee_excited.webp', 'klee_point.webp'],
  Lisa: ['lisa_smug.webp', 'lisa_wink.webp'],
  Mona: ['mona_heart.webp', 'mona_proud.webp'],
  Ningguang: ['ningguang_rich.webp', 'ningguang_toast.webp'],
  Noelle: ['noelle_shy.webp'],
  Qiqi: ['qiqi_down.webp', 'qiqi_sideeye.webp'],
  Razor: ['razor_happy.webp', 'razor_moon.webp'],
  Sucrose: ['sucrose_OK.webp', 'sucrose_shrug.webp'],
  Venti: ['venti_basket.webp', 'venti_shock.webp'],
  Xiangling: ['xiangling_blush.webp', 'xiangling_orange.webp'],
  Xingqiu: ['xingqiu_command.webp', 'xingqiu_heavy.webp'],
  Diona: ['diona_proud.webp', 'diona_rawr.webp'],
  Tartaglia: ['Tartaglia_1.webp', 'tartagliaBringItOn.webp'],
  Xinyan: ['xinyan_charge.webp', 'xinyan_wave.webp'],
  Zhongli: ['zhongli_box.webp', 'zhongli_shrug.webp'],
  Albedo: ['albedo_question.webp', 'albedo_smirk.webp'],
  Ganyu: ['ganyu_pray.webp', 'ganyu_shock.webp'],
  Xiao: ['xiao_hmph.webp', 'xiao_upset.webp'],
  'Hu Tao': ['hutao_mischievous.webp', 'hutao_point.webp'],
  Rosaria: ['rosaria_cat.webp', 'rosaria_run.webp'],
  Yanfei: ['yanfei_command.webp', 'yanfei_smug.webp'],
  Eula: ['eula_look.webp', 'eula_thumbsup.webp'],
  'Kaedehara Kazuha': ['kazuha_crystalfly.webp', 'kazuha_hi.webp'],
  'Kamisato Ayaka': ['ayaka_dazed.webp', 'ayaka_shy.webp'],
  Sayu: ['sayu_hmph.webp', 'sayu_pose.webp'],
  Yoimiya: ['yoimiya_daydream.webp', 'yoimiya_thumbsup.webp'],
  Aloy: [],
  'Kujou Sara': ['sara_archery.webp', 'sara_lead.webp'],
  'Shogun Raiden': ['raiden_angry.webp', 'raiden_shock.webp'],
  'Sangonomiya Kokomi': ['kokomi_pray.webp', 'kokomi_read.webp'],
  Thoma: ['thoma_happy.webp', 'thoma_thumbsup.webp'],
  Gorou: ['gorou_excited.webp', 'gorou_question.webp'],
  'Arataki Itto': ['itto_happy.webp', 'itto_wave.webp'],
  'Yun Jin': ['yunjin_listen.webp', 'yunjin_shock.webp'],
  Shenhe: ['shenhe_confused.webp', 'shenhe_disappointed.webp'],
  'Yae Miko': ['yaemiko_whisper.webp', 'yaemiko_write.webp'],
  'Kamisato Ayato': ['ayato_confused.webp', 'ayato_smug.webp'],
  Yelan: ['yelan_suitcase.webp', 'yelan_yawn.webp'],
  'Kuki Shinobu': ['kuki_shock.webp', 'kuki_surprised.webp'],
  'Shikanoin Heizou': ['heizou_fist.webp', 'heizou_sparkle.webp'],
  Tighnari: ['tighnari_saveseat.webp', 'tighnari_upset.webp'],
  Collei: ['collei_shock.webp', 'collei_speech.webp']
};

/**
 * Normaliza nombres para comparación flexible (ej. "hutao" -> "Hu Tao", "Kazuha" -> "Kaedehara Kazuha")
 */
function normalizeName(str) {
  if (!str) return '';
  return String(str)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');
}

/**
 * Obtiene la lista de stickers disponibles para un personaje
 */
export function getCharacterStickers(charName) {
  if (!charName) return [];
  const target = normalizeName(charName);

  for (const [name, files] of Object.entries(CHARACTER_STICKERS)) {
    const key = normalizeName(name);
    if (key === target) return files;
  }

  // Búsqueda por subcadena
  for (const [name, files] of Object.entries(CHARACTER_STICKERS)) {
    const key = normalizeName(name);
    if (key.includes(target) || target.includes(key)) {
      return files;
    }
  }

  return [];
}

/**
 * Retorna un sticker aleatorio de la lista de stickers del personaje, o null si no posee.
 * Si tiene 2 imágenes, escoge aleatoriamente entre una u otra (50% / 50%).
 */
export function getRandomCharacterSticker(charName) {
  const stickers = getCharacterStickers(charName);
  if (!stickers || stickers.length === 0) {
    return null;
  }
  if (stickers.length === 1) {
    return `/Images/stckersGI/${stickers[0]}`;
  }
  const randomIndex = Math.random() < 0.5 ? 0 : 1;
  return `/Images/stckersGI/${stickers[randomIndex]}`;
}

/**
 * Obtiene el icono oficial por defecto del personaje en el proyecto (usado como fallback)
 */
export function getDefaultCharacterIcon(charName) {
  if (!charName) return null;
  const target = normalizeName(charName);

  const found = CHARACTERS.find((c) => {
    const n = normalizeName(c.name);
    const id = normalizeName(c.id);
    return n === target || id === target || n.includes(target) || target.includes(n);
  });

  if (found && (found.icon || found.image)) {
    return found.icon || found.image;
  }

  return `/Images/Genshin Impact/Character Icons/${charName} · Icon · Genshin Impact.webp`;
}

/**
 * Retorna la imagen adecuada para los paneles de equipo:
 * 1. Sticker amigable (aleatorio si tiene 2)
 * 2. Si no tiene sticker (Aloy), retorna el icono oficial actual
 */
export function getTeamMemberAvatar(charName) {
  const sticker = getRandomCharacterSticker(charName);
  if (sticker) {
    return sticker;
  }
  return getDefaultCharacterIcon(charName);
}

/**
 * Retorna el nombre corto y amigable del personaje para etiquetas y casillas de equipo.
 * Ejemplos:
 * - "Kaedehara Kazuha" -> "Kazuha"
 * - "Kamisato Ayaka" -> "Ayaka"
 * - "Kamisato Ayato" -> "Ayato"
 * - "Shogun Raiden" -> "Raiden"
 * - "Sangonomiya Kokomi" -> "Kokomi"
 * - "Arataki Itto" -> "Itto"
 * - "Kujou Sara" -> "Sara"
 * - "Shikanoin Heizou" -> "Heizou"
 * - "Kuki Shinobu" -> "Kuki"
 * - "Yae Miko" -> "Yae"
 */
export function getShortCharacterName(fullName) {
  if (!fullName) return '';
  const trimmed = String(fullName).trim();

  const KNOWN_SHORT_NAMES = {
    'Kaedehara Kazuha': 'Kazuha',
    'Kamisato Ayaka': 'Ayaka',
    'Kamisato Ayato': 'Ayato',
    'Shogun Raiden': 'Raiden',
    'Sangonomiya Kokomi': 'Kokomi',
    'Arataki Itto': 'Itto',
    'Kujou Sara': 'Sara',
    'Shikanoin Heizou': 'Heizou',
    'Kuki Shinobu': 'Kuki',
    'Yae Miko': 'Yae'
  };

  if (KNOWN_SHORT_NAMES[trimmed]) {
    return KNOWN_SHORT_NAMES[trimmed];
  }

  const lower = trimmed.toLowerCase();
  for (const [key, short] of Object.entries(KNOWN_SHORT_NAMES)) {
    if (key.toLowerCase() === lower) {
      return short;
    }
  }

  return trimmed;
}
