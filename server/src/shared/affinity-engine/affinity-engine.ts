/**
 * Motor de Afinidad de Equipos — Epic 3 (VGBuilder).
 *
 * Módulo TypeScript puro: sin dependencias de Elysia, Drizzle ni del DOM.
 * Este módulo se ejecuta:
 * 1. En el cliente (React + IndexedDB) para calcular equipos óptimos en el navegador.
 * 2. En el backend para pruebas unitarias con `bun test`.
 */

export * from "./types";
export * from "./roster-data";
export * from "./artifact-binder";
export * from "./scoring";
export * from "./matcher";

import { Tag, TagAffinity } from "./types";

export type CharacterWithTags = {
  id: number;
  name: string;
  tags: Tag[];
};

/**
 * Task 3.1.2 (Compatibilidad Legacy):
 * Suma ponderada de las afinidades entre cada par de tags presentes en el equipo.
 */
export function calcularSinergiaEquipo(
  equipo: CharacterWithTags[],
  tablaAfinidad: TagAffinity[]
): number {
  let score = 0;

  for (let i = 0; i < equipo.length; i++) {
    for (let j = i + 1; j < equipo.length; j++) {
      const tagsA = equipo[i].tags.map((t) => t.value);
      const tagsB = equipo[j].tags.map((t) => t.value);

      for (const afinidad of tablaAfinidad) {
        const match =
          (tagsA.includes(afinidad.tagA) && tagsB.includes(afinidad.tagB)) ||
          (tagsA.includes(afinidad.tagB) && tagsB.includes(afinidad.tagA));

        if (match) score += afinidad.weight;
      }
    }
  }

  return score;
}

/**
 * Task 3.2.2: Algoritmo de "match %" entre un preset y el inventario real.
 */
export function calcularMatchPreset(
  inventarioIds: number[],
  presetIds: number[]
): number {
  if (presetIds.length === 0) return 0;

  const enInventario = presetIds.filter((id) => inventarioIds.includes(id));
  return Math.round((enInventario.length / presetIds.length) * 100);
}

/**
 * Task 3.3.2: Sugerencia de set de artefactos según el arquetipo del equipo.
 */
export function sugerirSetPorArquetipo(
  arquetipoEquipo: string,
  setsDisponibles: { name: string; archetypeTag: string | null }[]
): string | null {
  const match = setsDisponibles.find(
    (set) => set.archetypeTag === arquetipoEquipo
  );
  return match?.name ?? null;
}
