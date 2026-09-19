/**
 * Motor de Afinidad — Epic 3.
 *
 * MUY IMPORTANTE: este archivo debe quedarse como TypeScript puro, sin
 * imports de Elysia, Drizzle, ni nada que dependa del servidor o del DOM.
 * La razón es que este mismo archivo se importa desde dos lugares:
 *
 *   1. El frontend (React), donde se ejecuta de verdad contra el
 *      inventario real del usuario, en el navegador.
 *   2. Este backend, únicamente para poder correrle pruebas unitarias
 *      con `bun test` sin necesitar un navegador.
 *
 * Si algo aquí necesita la base de datos o el request HTTP, no pertenece
 * a este archivo — pertenece a `affinity.service.ts`.
 */

export type Tag = {
  category: string; // "rol" | "elemento" | "mecanica" | "funcion_equipo"
  value: string;
};

export type CharacterWithTags = {
  id: number;
  name: string;
  tags: Tag[];
};

export type TagAffinity = {
  tagA: string;
  tagB: string;
  weight: number;
};

/**
 * Task 3.1.2 — Algoritmo de scoring de sinergia de equipo.
 *
 * Suma ponderada de las afinidades entre cada par de tags presentes en el
 * equipo. Implementación placeholder: el equipo debe reemplazar esta lógica
 * al desarrollar la Task 3.1.1/3.1.2 real.
 */
export function calcularSinergiaEquipo(
  equipo: CharacterWithTags[],
  tablaAfinidad: TagAffinity[]
): number {
  // TODO(Epic 3): reemplazar con la lógica real de scoring ponderado.
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
 * Task 3.2.2 — Algoritmo de "match %" entre un preset y el inventario real.
 */
export function calcularMatchPreset(
  inventarioIds: number[],
  presetIds: number[]
): number {
  // TODO(Epic 3): reemplazar con la lógica real de match.
  if (presetIds.length === 0) return 0;

  const enInventario = presetIds.filter((id) => inventarioIds.includes(id));
  return Math.round((enInventario.length / presetIds.length) * 100);
}

/**
 * Task 3.3.2 — Sugerencia de set de artefactos según el arquetipo del equipo.
 */
export function sugerirSetPorArquetipo(
  arquetipoEquipo: string,
  setsDisponibles: { name: string; archetypeTag: string | null }[]
): string | null {
  // TODO(Epic 3): reemplazar con la lógica real de mapeo.
  const match = setsDisponibles.find(
    (set) => set.archetypeTag === arquetipoEquipo
  );
  return match?.name ?? null;
}
