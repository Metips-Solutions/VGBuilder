import * as catalogRepository from "./catalog.repository";

type CharacterTagRef = {
  category: string;
  value: string;
  minConstellation?: number | null;
  minAlignmentCount?: number | null;
};

type CharacterNeedRef = {
  value: string;
  priority: number;
};

type CharacterAntiTagRef = {
  value: string;
  reason?: string | null;
};

export async function getCharactersWithTags() {
  const [characters, allTags, allNeeds, allAntiTags] = await Promise.all([
    catalogRepository.findAllCharacters(),
    catalogRepository.findAllCharacterTags(),
    catalogRepository.findAllCharacterNeeds(),
    catalogRepository.findAllCharacterAntiTags(),
  ]);

  // Agrupar tags por personaje en memoria
  const tagsByCharacter = new Map<number, CharacterTagRef[]>();
  for (const { characterId, category, value, minConstellation, minAlignmentCount } of allTags) {
    const list = tagsByCharacter.get(characterId) ?? [];
    list.push({ category, value, minConstellation, minAlignmentCount });
    tagsByCharacter.set(characterId, list);
  }

  const needsByCharacter = new Map<number, CharacterNeedRef[]>();
  for (const { characterId, value, priority } of allNeeds) {
    const list = needsByCharacter.get(characterId) ?? [];
    list.push({ value, priority });
    needsByCharacter.set(characterId, list);
  }

  const antiTagsByCharacter = new Map<number, CharacterAntiTagRef[]>();
  for (const { characterId, value, reason } of allAntiTags) {
    const list = antiTagsByCharacter.get(characterId) ?? [];
    list.push({ value, reason });
    antiTagsByCharacter.set(characterId, list);
  }

  return characters.map((character) => ({
    ...character,
    id: String(character.id), // el contrato define id como string
    tags: tagsByCharacter.get(character.id) ?? [],
    needs: needsByCharacter.get(character.id) ?? [],
    antiTags: antiTagsByCharacter.get(character.id) ?? [],
  }));
}
