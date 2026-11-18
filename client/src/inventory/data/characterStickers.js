/**
 * VGBuilder — Catálogo de Stickers Amigables para Personajes de Genshin Impact
 * Directorio público: /Images/stckersGI/
 *
 * Cobertura:
 * - 50 personajes con 2 variantes de stickers (selección aleatoria)
 * - Noelle con 1 variante (noelle_shy.png)
 * - Aloy sin variante en carpeta (fallback al icono oficial actual)
 */

import { CHARACTERS } from './characters';

export const CHARACTER_STICKERS = {
  Amber: ['amber_grabbed.png', 'baronbunny_mad.png'],
  Barbara: ['barbara_panic.png', 'barbara_shh.png'],
  Beidou: ['beidou_embarrassed.png', 'beidou_laugh.png'],
  Bennett: ['bennet_thumbsup.png', 'bennett_excited.png'],
  Chongyun: ['chongyun_card.png', 'chongyun_drunk.png'],
  Diluc: ['diluc_explain.png', 'diluc_refuse.png'],
  Fischl: ['fischl_beach.png', 'fischl_laugh.png'],
  Jean: ['jean_embarrassed.png', 'jean_skinthumbsup.png'],
  Kaeya: ['kaeya_laugh.png', 'kaeya_shrug.png'],
  Keqing: ['keqing_sleep.png', 'keqing_thumbsup.png'],
  Klee: ['klee_excited.png', 'klee_point.png'],
  Lisa: ['lisa_smug.png', 'lisa_wink.png'],
  Mona: ['mona_heart.png', 'mona_proud.png'],
  Ningguang: ['ningguang_rich.png', 'ningguang_toast.png'],
  Noelle: ['noelle_shy.png'],
  Qiqi: ['qiqi_down.png', 'qiqi_sideeye.png'],
  Razor: ['razor_happy.png', 'razor_moon.png'],
  Sucrose: ['sucrose_OK.png', 'sucrose_shrug.png'],
  Venti: ['venti_basket.png', 'venti_shock.png'],
  Xiangling: ['xiangling_blush.png', 'xiangling_orange.png'],
  Xingqiu: ['xingqiu_command.png', 'xingqiu_heavy.png'],
  Diona: ['diona_proud.png', 'diona_rawr.png'],
  Tartaglia: ['Tartaglia_1.png', 'tartagliaBringItOn.png'],
  Xinyan: ['xinyan_charge.png', 'xinyan_wave.png'],
  Zhongli: ['zhongli_box.png', 'zhongli_shrug.png'],
  Albedo: ['albedo_question.png', 'albedo_smirk.png'],
  Ganyu: ['ganyu_pray.png', 'ganyu_shock.png'],
  Xiao: ['xiao_hmph.png', 'xiao_upset.png'],
  'Hu Tao': ['hutao_mischievous.png', 'hutao_point.png'],
  Rosaria: ['rosaria_cat.png', 'rosaria_run.png'],
  Yanfei: ['yanfei_command.png', 'yanfei_smug.png'],
  Eula: ['eula_look.png', 'eula_thumbsup.png'],
  'Kaedehara Kazuha': ['kazuha_crystalfly.png', 'kazuha_hi.png'],
  'Kamisato Ayaka': ['ayaka_dazed.png', 'ayaka_shy.png'],
  Sayu: ['sayu_hmph.png', 'sayu_pose.png'],
  Yoimiya: ['yoimiya_daydream.png', 'yoimiya_thumbsup.png'],
  Aloy: [],
  'Kujou Sara': ['sara_archery.png', 'sara_lead.png'],
  'Shogun Raiden': ['raiden_angry.png', 'raiden_shock.png'],
  'Sangonomiya Kokomi': ['kokomi_pray.png', 'kokomi_read.png'],
  Thoma: ['thoma_happy.png', 'thoma_thumbsup.png'],
  Gorou: ['gorou_excited.png', 'gorou_question.png'],
  'Arataki Itto': ['itto_happy.png', 'itto_wave.png'],
  'Yun Jin': ['yunjin_listen.png', 'yunjin_shock.png'],
  Shenhe: ['shenhe_confused.png', 'shenhe_disappointed.png'],
  'Yae Miko': ['yaemiko_whisper.png', 'yaemiko_write.png'],
  'Kamisato Ayato': ['ayato_confused.png', 'ayato_smug.png'],
  Yelan: ['yelan_suitcase.png', 'yelan_yawn.png'],
  'Kuki Shinobu': ['kuki_shock.png', 'kuki_surprised.png'],
  'Shikanoin Heizou': ['heizou_fist.png', 'heizou_sparkle.png'],
  Tighnari: ['tighnari_saveseat.png', 'tighnari_upset.png'],
  Collei: ['collei_shock.png', 'collei_speech.png']
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

  return `/Images/Genshin Impact/Character Icons/${charName} · Icon · Genshin Impact.png`;
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
