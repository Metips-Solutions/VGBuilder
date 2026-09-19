import * as catalogRepository from "./catalog.repository";

/**
 * Task 1.1.4 — Endpoints de solo lectura para el catálogo.
 *
 * Este servicio compone y formatea los datos que vienen del repositorio.
 * No sabe nada de HTTP (eso vive en catalog.routes.ts) ni de SQL (eso vive
 * en catalog.repository.ts).
 */

export async function getCharactersWithTags() {
  const characters = await catalogRepository.findAllCharacters();

  return Promise.all(
    characters.map(async (character) => ({
      ...character,
      tags: await catalogRepository.findCharacterTags(character.id),
    }))
  );
}
