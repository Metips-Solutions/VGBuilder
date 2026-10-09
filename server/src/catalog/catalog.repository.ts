import { db } from "../shared/db/client";
import { characters, tags, characterTags } from "../shared/db/schema";
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
  })
  .from(characterTags)
  .innerJoin(tags, eq(characterTags.tagId, tags.id));
}

// Pcódigo muerto se puede borrar
export async function findCharacterTags(characterId: number) {
 return db
  .select({ category: tags.category, value: tags.value })
  .from(characterTags)
  .innerJoin(tags, eq(characterTags.tagId, tags.id))
  .where(eq(characterTags.characterId, characterId));
}
