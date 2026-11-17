import { pgTable, serial, text, integer, jsonb, primaryKey, unique, index, boolean } from "drizzle-orm/pg-core";

/**
 * Esquema de Base de Datos — Prototipo 1 (VGBuilder: Motor de Afinidad de Equipos)
 *
 * Modelo relacional desacoplado:
 * 1. Lo que los personajes ofrecen: `characters`, `tags`, `character_tags`
 * 2. Lo que el Main DPS demanda: `character_needs`
 * 3. Incompatibilidades duras / Anti-tags: `character_anti_tags`
 * 4. Sinergias de soporte universal: `artifact_sets` (pasivas 4pc sin depender de substats)
 * 5. Afinidades y Plantillas Meta: `tag_affinities`, `team_presets`
 */

export const games = pgTable("games", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(), 
  name: text("name").notNull(),
});

export const characters = pgTable("characters", {
  id: serial("id").primaryKey(),
  gameId: integer("game_id")
    .notNull()
    .references(() => games.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  element: text("element").notNull(),
  weaponType: text("weapon_type").notNull(),
  rarity: integer("rarity").notNull(),
  region: text("region").notNull(), 
  alignmentClass: text("alignment_class"), // 'Hexerei', 'Witch', o NULL
  damageProfile: text("damage_profile"),   // e.g. 'Pyro Melee', 'Physical Melee', 'Electro Fast', 'Geo Ranged', 'Geo Tank'
  imageUrl: text("image_url"),
  description: text("description"),
});

export const tags = pgTable("tags", {
  id: serial("id").primaryKey(),
  gameId: integer("game_id")
    .notNull()
    .references(() => games.id, { onDelete: "cascade" }),
  category: text("category").notNull(), // 'rol', 'mecanica', 'necesidad'
  value: text("value").notNull(), 
}, (table) => ({
  unq: unique("game_category_value_unq").on(table.gameId, table.category, table.value)
}));

export const characterTags = pgTable("character_tags", {
  characterId: integer("character_id")
    .notNull()
    .references(() => characters.id, { onDelete: "cascade" }),
  tagId: integer("tag_id")
    .notNull()
    .references(() => tags.id, { onDelete: "cascade" }),
  minConstellation: integer("min_constellation"),   
  minAlignmentCount: integer("min_alignment_count") 
}, (table) => ({
  pk: primaryKey({ columns: [table.characterId, table.tagId] }),
  tagIdx: index("tag_id_idx").on(table.tagId)
}));

/**
 * Tabla de Demandas del Carry (Offers vs Needs)
 * Permite que cada Main DPS defina qué mecánicas exige con una prioridad de 1 a 10.
 */
export const characterNeeds = pgTable("character_needs", {
  id: serial("id").primaryKey(),
  characterId: integer("character_id")
    .notNull()
    .references(() => characters.id, { onDelete: "cascade" }),
  tagId: integer("tag_id")
    .notNull()
    .references(() => tags.id, { onDelete: "cascade" }),
  priority: integer("priority").notNull().default(5), // 1 (deseable) a 10 (indispensable)
}, (table) => ({
  unq: unique("char_need_unq").on(table.characterId, table.tagId),
  charIdx: index("char_needs_char_idx").on(table.characterId)
}));

/**
 * Tabla de Incompatibilidades Duras / Anti-Tags
 * Descarta combinaciones destructivas (ej. Razor o Keqing con cryo_infusion / pyro_infusion).
 */
export const characterAntiTags = pgTable("character_anti_tags", {
  id: serial("id").primaryKey(),
  characterId: integer("character_id")
    .notNull()
    .references(() => characters.id, { onDelete: "cascade" }),
  tagId: integer("tag_id")
    .notNull()
    .references(() => tags.id, { onDelete: "cascade" }),
  reason: text("reason"), // e.g. "Sobrescribe y destruye el daño físico"
}, (table) => ({
  unq: unique("char_antitags_unq").on(table.characterId, table.tagId),
  charIdx: index("char_antitags_char_idx").on(table.characterId)
}));

/**
 * Sets de Artefactos de Soporte Clave
 * Su valor radica en la pasiva de 4 piezas sin importar los substats del jugador.
 * Inyectan mecánicas/tags de soporte universal al equipo cuando se equipan.
 */
export const artifactSets = pgTable("artifact_sets", {
  id: serial("id").primaryKey(),
  gameId: integer("game_id")
    .notNull()
    .references(() => games.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description"),
  providedTagId: integer("provided_tag_id").references(() => tags.id, { onDelete: "set null" }), 
  isSupportSet: boolean("is_support_set").default(true),
});

/**
 * Matriz de Compatibilidad y Bind de Artefactos de Soporte
 * Define qué personajes son mecánicamente capaces de activar la pasiva de 4 piezas
 * de cada set de soporte universal con una prioridad táctica (1 a 10).
 */
export const characterArtifactSets = pgTable("character_artifact_sets", {
  characterId: integer("character_id")
    .notNull()
    .references(() => characters.id, { onDelete: "cascade" }),
  artifactSetId: integer("artifact_set_id")
    .notNull()
    .references(() => artifactSets.id, { onDelete: "cascade" }),
  priority: integer("priority").notNull().default(5), // 1 (secundario) a 10 (óptimo / BiS de soporte)
}, (table) => ({
  pk: primaryKey({ columns: [table.characterId, table.artifactSetId] }),
  charIdx: index("char_art_char_idx").on(table.characterId),
  artIdx: index("char_art_art_idx").on(table.artifactSetId),
}));

export const teamPresets = pgTable("team_presets", {
  id: serial("id").primaryKey(),
  gameId: integer("game_id")
    .notNull()
    .references(() => games.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description"),
  composition: jsonb("composition").notNull(), // Blueprint funcional (reglas por tags y roles)
});

export const tagAffinities = pgTable("tag_affinities", {
  id: serial("id").primaryKey(),
  tagAId: integer("tag_a_id")
    .notNull()
    .references(() => tags.id, { onDelete: "cascade" }),
  tagBId: integer("tag_b_id")
    .notNull()
    .references(() => tags.id, { onDelete: "cascade" }),
  weight: integer("weight").notNull(), 
});
