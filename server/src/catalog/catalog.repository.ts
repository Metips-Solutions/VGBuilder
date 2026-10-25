import { db } from "../shared/db/client";
import {
  characters,
  tags,
  characterTags,
  characterNeeds,
  characterAntiTags,
  artifactSets,
  characterArtifactSets,
} from "../shared/db/schema";
import { eq } from "drizzle-orm";

export async function findAllCharacters() {
  return db
    .select({
      id: characters.id,
      name: characters.name,
      element: characters.element,
      weaponType: characters.weaponType,
      rarity: characters.rarity,
      region: characters.region,
      alignmentClass: characters.alignmentClass,
      damageProfile: characters.damageProfile,
      imageUrl: characters.imageUrl,
      description: characters.description,
    })
    .from(characters)
    .orderBy(characters.id);
}

// Una sola query para todos los tags (evita el N+1)
export async function findAllCharacterTags() {
  return db
    .select({
      characterId: characterTags.characterId,
      category: tags.category,
      value: tags.value,
      minConstellation: characterTags.minConstellation,
      minAlignmentCount: characterTags.minAlignmentCount,
    })
    .from(characterTags)
    .innerJoin(tags, eq(characterTags.tagId, tags.id));
}

// Demandas de los personajes (Needs)
export async function findAllCharacterNeeds() {
  return db
    .select({
      characterId: characterNeeds.characterId,
      category: tags.category,
      value: tags.value,
      priority: characterNeeds.priority,
    })
    .from(characterNeeds)
    .innerJoin(tags, eq(characterNeeds.tagId, tags.id));
}

// Incompatibilidades duras (Anti-Tags)
export async function findAllCharacterAntiTags() {
  return db
    .select({
      characterId: characterAntiTags.characterId,
      value: tags.value,
      reason: characterAntiTags.reason,
    })
    .from(characterAntiTags)
    .innerJoin(tags, eq(characterAntiTags.tagId, tags.id));
}

// Sets de artefactos de soporte
export async function findAllSupportArtifacts() {
  return db.select().from(artifactSets);
}

// Binds personaje-artefacto
export async function findAllCharacterArtifactSets() {
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

export async function findCharacterTags(characterId: number) {
  return db
    .select({ category: tags.category, value: tags.value })
    .from(characterTags)
    .innerJoin(tags, eq(characterTags.tagId, tags.id))
    .where(eq(characterTags.characterId, characterId));
}
