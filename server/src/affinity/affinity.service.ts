import { db } from "../shared/db/client";
import {
  tagAffinities,
  teamPresets,
  artifactSets,
  characterArtifactSets,
} from "../shared/db/schema";
import { eq } from "drizzle-orm";
import { findOptimalTeams, MatchInput, TeamMatchResult } from "../shared/affinity-engine";

/**
 * Servicio del Módulo de Afinidad — Epic 3.
 *
 * Expone:
 * 1. Endpoints de lectura de metadata (tags, presets, artefactos).
 * 2. Endpoint de cálculo directo del motor en backend para pruebas de API (POST /affinity/match).
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

export async function calculateMatch(input: MatchInput): Promise<TeamMatchResult[]> {
  return findOptimalTeams(input);
}
