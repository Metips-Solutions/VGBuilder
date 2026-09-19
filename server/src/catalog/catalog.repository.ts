import { db } from "../shared/db/client";
import { characters, tags, characterTags } from "../shared/db/schema";
import { eq } from "drizzle-orm";

/**
 * Único archivo del módulo `catalog` que le habla directo a la base de
 * datos. `catalog.service.ts` nunca debe importar `db` directamente.
 */

export async function findAllCharacters() {
  return db.select().from(characters);
}

export async function findCharacterTags(characterId: number) {
  return db
    .select({ category: tags.category, value: tags.value })
    .from(characterTags)
    .innerJoin(tags, eq(characterTags.tagId, tags.id))
    .where(eq(characterTags.characterId, characterId));
}
