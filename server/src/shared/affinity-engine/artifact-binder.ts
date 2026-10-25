import {
  CharacterData,
  SupportArtifactSet,
  CharacterArtifactBind,
  ArtifactAssignment,
} from "./types";

export type CompanionEntry = {
  character: CharacterData;
  constellation: number;
};

/**
 * Task 3.3.2 / Fase 3: Support Artifact Binder.
 *
 * Asigna de forma no duplicada los 11 sets de soporte universal a los
 * 3 acompañantes del equipo según su compatibilidad KQM y prioridad táctica.
 *
 * Aplica cascada si dos personajes compiten por el mismo set (ej. Bennett y Mona
 * por Nobleza) y emite alertas descriptivas si se requiere intervención del usuario.
 */
export function bindSupportArtifacts(
  companions: CompanionEntry[],
  targetCarry: CharacterData,
  artifactSets: SupportArtifactSet[],
  artifactBinds: CharacterArtifactBind[]
): {
  assignments: ArtifactAssignment[];
  injectedTags: string[];
} {
  const setByName = new Map<string, SupportArtifactSet>();
  for (const s of artifactSets) {
    setByName.set(s.name, s);
  }

  // Identificar candidatos de sets por cada acompañante
  type Candidate = {
    companion: CompanionEntry;
    setName: string;
    priority: number;
    setObj: SupportArtifactSet;
  };

  const allCandidates: Candidate[] = [];

  for (const comp of companions) {
    const binds = artifactBinds.filter(
      (b) => b.characterName.toLowerCase() === comp.character.name.toLowerCase()
    );

    for (const b of binds) {
      const setObj = setByName.get(b.artifactName);
      if (setObj) {
        allCandidates.push({
          companion: comp,
          setName: b.artifactName,
          priority: b.priority,
          setObj,
        });
      }
    }
  }

  // Ordenar candidatos por prioridad descendente (10 -> 1)
  allCandidates.sort((a, b) => b.priority - a.priority);

  const usedSets = new Set<string>();
  const companionAssignment = new Map<
    number,
    { setName: string; setObj: SupportArtifactSet }
  >();

  // Asignación voraz por mayor prioridad de impacto
  for (const cand of allCandidates) {
    const charId = cand.companion.character.id;
    if (companionAssignment.has(charId)) continue; // Ya tiene set asignado
    if (usedSets.has(cand.setName)) continue; // Set ya asignado a otro aliado

    companionAssignment.set(charId, {
      setName: cand.setName,
      setObj: cand.setObj,
    });
    usedSets.add(cand.setName);
  }

  const assignments: ArtifactAssignment[] = [];
  const injectedTags: string[] = [];

  for (const comp of companions) {
    const charId = comp.character.id;
    const assigned = companionAssignment.get(charId);

    if (assigned) {
      assignments.push({
        characterId: charId,
        characterName: comp.character.name,
        artifactSetName: assigned.setName,
        providedTag: assigned.setObj.providedTag,
      });
      if (assigned.setObj.providedTag) {
        injectedTags.push(assigned.setObj.providedTag);
      }
    } else {
      // Conflicto de set: el personaje no pudo obtener un set único
      const compBinds = artifactBinds.filter(
        (b) => b.characterName.toLowerCase() === comp.character.name.toLowerCase()
      );
      const topSet = compBinds.length > 0 ? compBinds[0].artifactName : "Set de Soporte";

      assignments.push({
        characterId: charId,
        characterName: comp.character.name,
        artifactSetName: "Set de Daño Personal (ej. Emblema)",
        providedTag: null,
        alert: `Conflicto de set: ${comp.character.name} compite por ${topSet}, pero ya está asignado. Equípale con artefactos de daño personal/substats ofensivos.`,
      });
    }
  }

  return { assignments, injectedTags };
}
