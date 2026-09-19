import { pgTable, serial, text, integer, jsonb } from "drizzle-orm/pg-core";

/**
 * Esquema inicial — Epic 1 (Arquitectura y Gestión de Metadata).
 *
 * Punto de partida deliberadamente simple. El equipo debe extenderlo en la
 * Task 1.1.1 (diseñar esquema de BD relacional) — esto NO es el esquema
 * final, es la base mínima para empezar a trabajar.
 *
 * Pensado para escalar a más de un juego: casi todo cuelga de `games`.
 */

export const games = pgTable("games", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(), // ej. "genshin-impact"
  name: text("name").notNull(),
});

export const characters = pgTable("characters", {
  id: serial("id").primaryKey(),
  gameId: integer("game_id")
    .notNull()
    .references(() => games.id),
  name: text("name").notNull(),
  // Descripción corta generada por template a partir de los tags (Task 1.1.5)
  description: text("description"),
});

export const tags = pgTable("tags", {
  id: serial("id").primaryKey(),
  gameId: integer("game_id")
    .notNull()
    .references(() => games.id),
  category: text("category").notNull(), // "rol" | "elemento" | "mecanica" | "funcion_equipo"
  value: text("value").notNull(), // ej. "Main DPS", "Pyro", "Vaporize-enabler"
});

export const characterTags = pgTable("character_tags", {
  id: serial("id").primaryKey(),
  characterId: integer("character_id")
    .notNull()
    .references(() => characters.id),
  tagId: integer("tag_id")
    .notNull()
    .references(() => tags.id),
});

export const artifactSets = pgTable("artifact_sets", {
  id: serial("id").primaryKey(),
  gameId: integer("game_id")
    .notNull()
    .references(() => games.id),
  name: text("name").notNull(),
  archetypeTag: text("archetype_tag"), // ej. "Melt/Vaporize enabler"
});

export const teamPresets = pgTable("team_presets", {
  id: serial("id").primaryKey(),
  gameId: integer("game_id")
    .notNull()
    .references(() => games.id),
  name: text("name").notNull(),
  // Lista de character_id (o tags) que componen el preset.
  // JSONB por flexibilidad mientras se define la forma final (Task 3.2.1).
  composition: jsonb("composition").notNull(),
});

// Tabla de afinidad ponderada entre tags (Task 3.1.1)
export const tagAffinities = pgTable("tag_affinities", {
  id: serial("id").primaryKey(),
  tagAId: integer("tag_a_id")
    .notNull()
    .references(() => tags.id),
  tagBId: integer("tag_b_id")
    .notNull()
    .references(() => tags.id),
  weight: integer("weight").notNull(), // ej. -10 a 10
});
