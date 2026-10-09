import * as catalogRepository from "./catalog.repository";

type CharacterTagRef = { category: string; value: string };

export async function getCharactersWithTags() {
 const [characters, allTags] = await Promise.all([
  catalogRepository.findAllCharacters(),
  catalogRepository.findAllCharacterTags(),
 ]);

 // Agrupar tags por personaje en memoria
 const tagsByCharacter = new Map<number, CharacterTagRef[]>();
 for (const { characterId, category, value } of allTags) {
  const list = tagsByCharacter.get(characterId) ?? [];
  list.push({ category, value });
  tagsByCharacter.set(characterId, list);
 }

 return characters.map((character) => ({
  ...character,
  id: String(character.id), // el contrato define id como string
  tags: tagsByCharacter.get(character.id) ?? [],
 }));
}