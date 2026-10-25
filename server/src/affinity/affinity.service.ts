import { db } from "../shared/db/client";
import {
  tagAffinities,
  teamPresets,
  artifactSets,
  characterArtifactSets,
} from "../shared/db/schema";
import { eq } from "drizzle-orm";

/**
 * OJO: este servicio NO calcula sinergia ni match. Esa lógica vive en
 * `shared/affinity-engine/` y se ejecuta en el cliente.
 *
 * Lo único que hace este módulo del backend es servir los datos que el
 * cliente necesita para poder calcular ahí (la tabla de afinidad, los
 * presets y la matriz de soporte de artefactos) — es una extensión de
 * solo lectura del catálogo, específica para el motor de afinidad.
 */

export async function getTagAffinityTable() {
  return db.select().from(tagAffinities);
}

export async function getTeamPresets() {
  return db.select().from(teamPresets);
}

export async function getSupportArtifacts() {
  return db.select().from(artifactSets);
}

export async function getCharacterArtifactSets() {
  return db
    .select({
      characterId: characterArtifactSets.characterId,
      artifactSetId: characterArtifactSets.artifactSetId,
      priority: characterArtifactSets.priority,
      setName: artifactSets.name,
    })
    .from(characterArtifactSets)
    .innerJoin(artifactSets, eq(characterArtifactSets.artifactSetId, artifactSets.id));
}
