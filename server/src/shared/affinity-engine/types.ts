/**
 * Tipos de datos para el Motor de Afinidad de Equipos (Epic 3).
 *
 * Módulo TypeScript puro: sin dependencias de Elysia, Drizzle ni DOM.
 */

export type TagCategory = "rol" | "mecanica" | "necesidad" | "elemento" | "funcion_equipo";

export type Tag = {
  category: string;
  value: string;
  minConstellation?: number | null;
  minAlignmentCount?: number | null;
};

export type CharacterNeed = {
  value: string;
  priority: number; // 1 (deseable) a 10 (indispensable)
};

export type CharacterAntiTag = {
  value: string;
  reason?: string | null;
};

export type CharacterData = {
  id: number;
  name: string;
  element: "Pyro" | "Hydro" | "Cryo" | "Electro" | "Anemo" | "Geo" | "Dendro";
  weaponType: "Sword" | "Claymore" | "Polearm" | "Bow" | "Catalyst";
  rarity: 4 | 5;
  region: string;
  alignmentClass?: "Hexerei" | "Witch" | string | null;
  damageProfile?: string | null; // e.g. "Pyro Melee", "Physical Melee", "Geo Ranged", "Geo Tank"
  roles: string[]; // ["Main DPS", "Sub-DPS", "Support", "Healer"]
  mechanics: Tag[];
  needs?: CharacterNeed[];
  antiTags?: CharacterAntiTag[];
  imageUrl?: string | null;
  description?: string | null;
};

export type SupportArtifactSet = {
  id: number;
  name: string;
  description?: string | null;
  providedTag: string; // Mecánica que inyecta al equipo cuando está equipado (4pc)
  isSupportSet: boolean;
};

export type CharacterArtifactBind = {
  characterName: string;
  artifactName: string;
  priority: number; // 1 (secundario) a 10 (óptimo / BiS de soporte)
};

export type TeamPreset = {
  id?: number;
  name: string;
  description?: string | null;
  composition: {
    targetCarryName?: string;
    carryElement?: string;
    roles?: string[];
    elements?: string[];
    requiredTags?: string[];
    preferredTags?: string[];
    archetype?: string;
  };
};

export type TagAffinity = {
  tagA: string;
  tagB: string;
  weight: number;
};

export type InventoryEntry = {
  characterId: number;
  constellation: number; // 0 a 6
};

export type MatchInput = {
  targetCharacterId: number;
  inventory: InventoryEntry[];
  blacklist?: number[];
  customNeeds?: CharacterNeed[];
};

export type ArtifactAssignment = {
  characterId: number;
  characterName: string;
  artifactSetName: string | null;
  providedTag?: string | null;
  alert?: string | null;
};

export type ScoreBreakdown = {
  scalingBuffs: number;
  amplification: number;
  blueprint: number;
  resonance: number;
  microAffinities: number;
  penalties: number;
};

export type TeamMatchResult = {
  rank: number;
  archetype: string;
  totalScore: number;
  team: Array<{
    id: number;
    name: string;
    element: string;
    role: string;
    constellation: number;
  }>;
  scoreBreakdown: ScoreBreakdown;
  artifactAssignments: ArtifactAssignment[];
  synergyTags: string[];
  explanations: string[];
};

export type CatalogData = {
  characters: CharacterData[];
  artifactSets: SupportArtifactSet[];
  artifactBinds: CharacterArtifactBind[];
  presets: TeamPreset[];
  tagAffinities: TagAffinity[];
};
