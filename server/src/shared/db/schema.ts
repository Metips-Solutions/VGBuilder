import { pgTable, serial, text, integer, jsonb, primaryKey, unique, index } from "drizzle-orm/pg-core";

/**
 * Esquema final — Epic 1 (Arquitectura y Gestión de Metadata).
 *
 * Esquema de BD relacional creada basada en la taxonomia
 * de personajes creada.
 *
 * Pensado para escalar a más de un juego: casi todo cuelga de `games`.
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
    .references(() => games.id),
  name: text("name").notNull(),
  element: text("element").notNull(),
  weaponType: text("weapon_type").notNull(),
  rarity: integer("rarity").notNull(),
  region: text("region").notNull(), 
  alignmentClass: text("alignment_class"), 
  imageUrl: text("image_url"),
  description: text("description"),
});

export const tags = pgTable("tags", {
  id: serial("id").primaryKey(),
  gameId: integer("game_id")
    .notNull()
    .references(() => games.id),
  category: text("category").notNull(), 
  value: text("value").notNull(), 
}, (table) => ({
  // MEJORA 1: Garantiza que no existan tags duplicados por juego
  unq: unique("game_category_value_unq").on(table.gameId, table.category, table.value)
}));

export const characterTags = pgTable("character_tags", {
  characterId: integer("character_id")
    .notNull()
    .references(() => characters.id),
  tagId: integer("tag_id")
    .notNull()
    .references(() => tags.id),
  minConstellation: integer("min_constellation"),   
  minAlignmentCount: integer("min_alignment_count") 
}, (table) => ({
  pk: primaryKey({ columns: [table.characterId, table.tagId] }),
  // MEJORA 3: Índice para que las consultas inversas del motor vuelen
  tagIdx: index("tag_id_idx").on(table.tagId)
}));

export const artifactSets = pgTable("artifact_sets", {
  id: serial("id").primaryKey(),
  gameId: integer("game_id")
    .notNull()
    .references(() => games.id),
  name: text("name").notNull(),
  // MEJORA 2: Ahora es una llave foránea real, garantizando integridad referencial
  archetypeTagId: integer("archetype_tag_id").references(() => tags.id), 
});

export const teamPresets = pgTable("team_presets", {
  id: serial("id").primaryKey(),
  gameId: integer("game_id")
    .notNull()
    .references(() => games.id),
  name: text("name").notNull(),
  composition: jsonb("composition").notNull(),
});

export const tagAffinities = pgTable("tag_affinities", {
  id: serial("id").primaryKey(),
  tagAId: integer("tag_a_id")
    .notNull()
    .references(() => tags.id),
  tagBId: integer("tag_b_id")
    .notNull()
    .references(() => tags.id),
  weight: integer("weight").notNull(), 
});