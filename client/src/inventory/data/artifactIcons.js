/**
 * Mapeo oficial de sets de artefactos a sus iconos en WebP.
 * Ubicación: client/public/Images/Genshin Impact/Artefactos
 */

const ARTIFACT_ICON_MAP = {
  'sombra verde esmeralda': '/Images/Genshin Impact/Artefactos/SombraVerdeEsmeralda.webp',
  'ritual antiguo de la nobleza': '/Images/Genshin Impact/Artefactos/RitualAntiguodelaNobleza.webp',
  'tenacidad de la geoarmada': '/Images/Genshin Impact/Artefactos/TenacidaddelaGeoarmada.webp',
  'instructor': '/Images/Genshin Impact/Artefactos/Instructor.webp',
  'son de antaño': '/Images/Genshin Impact/Artefactos/SondeAntaño.webp',
  'petra arcaica': '/Images/Genshin Impact/Artefactos/PetraArcaica.webp',
  'pergamino del héroe': '/Images/Genshin Impact/Artefactos/PergaminodelHéroe.webp',
  'recuerdos del bosque': '/Images/Genshin Impact/Artefactos/RecuerdosdelBosque.webp',
  'corazón forjado': '/Images/Genshin Impact/Artefactos/CorazónForjado.webp',
  'alborada de la estrella': '/Images/Genshin Impact/Artefactos/AlboradadelaEstrella.webp',
  'serenata de la luna': '/Images/Genshin Impact/Artefactos/SerenatadelaLuna.webp',
};

/**
 * Normaliza y devuelve la ruta de la imagen del set de artefactos.
 * @param {string} setName
 * @returns {string|null}
 */
export function getArtifactSetIcon(setName) {
  if (!setName || typeof setName !== 'string') return null;

  const normalized = setName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Quitar tildes para búsqueda flexible
    .trim();

  // Búsqueda directa o normalizada
  for (const [key, path] of Object.entries(ARTIFACT_ICON_MAP)) {
    const keyNorm = key.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (normalized === keyNorm || normalized.includes(keyNorm) || keyNorm.includes(normalized)) {
      return path;
    }
  }

  // Si no coincide exactamente pero tiene nombre conocido sin tildes ni espacios
  const compact = normalized.replace(/\s+/g, '');
  if (compact.includes('sombraverde')) return ARTIFACT_ICON_MAP['sombra verde esmeralda'];
  if (compact.includes('nobleza')) return ARTIFACT_ICON_MAP['ritual antiguo de la nobleza'];
  if (compact.includes('geoarmada') || compact.includes('tenacidad')) return ARTIFACT_ICON_MAP['tenacidad de la geoarmada'];
  if (compact.includes('instructor')) return ARTIFACT_ICON_MAP['instructor'];
  if (compact.includes('antano')) return ARTIFACT_ICON_MAP['son de antaño'];
  if (compact.includes('petra')) return ARTIFACT_ICON_MAP['petra arcaica'];
  if (compact.includes('pergamino') || compact.includes('heroe')) return ARTIFACT_ICON_MAP['pergamino del héroe'];
  if (compact.includes('bosque') || compact.includes('recuerdos')) return ARTIFACT_ICON_MAP['recuerdos del bosque'];
  if (compact.includes('forjado') || compact.includes('corazon')) return ARTIFACT_ICON_MAP['corazón forjado'];
  if (compact.includes('alborada') || compact.includes('estrella')) return ARTIFACT_ICON_MAP['alborada de la estrella'];
  if (compact.includes('serenata') || compact.includes('luna')) return ARTIFACT_ICON_MAP['serenata de la luna'];

  return null;
}
