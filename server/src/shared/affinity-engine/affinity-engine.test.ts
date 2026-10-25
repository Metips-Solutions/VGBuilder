import { describe, expect, test } from "bun:test";
import {
  calcularSinergiaEquipo,
  calcularMatchPreset,
  sugerirSetPorArquetipo,
  findOptimalTeams,
  DEFAULT_CHARACTERS,
  DEFAULT_CATALOG,
  bindSupportArtifacts,
} from "./affinity-engine";

describe("calcularSinergiaEquipo (Legacy)", () => {
  test("suma la afinidad cuando hay match entre tags", () => {
    const equipo = [
      { id: 1, name: "Hu Tao", tags: [{ category: "mecanica", value: "Pyro-applicator" }] },
      { id: 2, name: "Xingqiu", tags: [{ category: "mecanica", value: "Hydro-applicator" }] },
    ];
    const tabla = [
      { tagA: "Pyro-applicator", tagB: "Hydro-applicator", weight: 10 },
    ];

    expect(calcularSinergiaEquipo(equipo, tabla)).toBe(10);
  });

  test("regresa 0 si no hay ningún match", () => {
    const equipo = [
      { id: 1, name: "A", tags: [{ category: "elemento", value: "Anemo" }] },
      { id: 2, name: "B", tags: [{ category: "elemento", value: "Geo" }] },
    ];
    expect(calcularSinergiaEquipo(equipo, [])).toBe(0);
  });
});

describe("calcularMatchPreset (Legacy)", () => {
  test("calcula el porcentaje correcto", () => {
    expect(calcularMatchPreset([1, 2, 3], [1, 2, 3, 4])).toBe(75);
  });

  test("regresa 0 si el preset está vacío", () => {
    expect(calcularMatchPreset([1, 2], [])).toBe(0);
  });
});

describe("sugerirSetPorArquetipo (Legacy)", () => {
  test("encuentra el set correcto por tag de arquetipo", () => {
    const sets = [
      { name: "Crimson Witch", archetypeTag: "Melt/Vaporize enabler" },
      { name: "Shimenawa", archetypeTag: "Off-field burst" },
    ];
    expect(sugerirSetPorArquetipo("Melt/Vaporize enabler", sets)).toBe(
      "Crimson Witch"
    );
  });

  test("regresa null si no hay set para ese arquetipo", () => {
    expect(sugerirSetPorArquetipo("inexistente", [])).toBeNull();
  });
});

describe("Motor de Matching v2.0 (Epic 3)", () => {
  // Inventario con los 21 personajes iniciales a constelación estándar
  const fullInventory = DEFAULT_CHARACTERS.map((c) => ({
    characterId: c.id,
    constellation: c.name === "Bennett" ? 1 : c.name === "Xingqiu" ? 2 : 0,
  }));

  test("Diluc: Recomienda Vaporizados Clásico como Top 1 con Xingqiu, Bennett y Sucrose", () => {
    const dilucId = 6;
    const results = findOptimalTeams({
      targetCharacterId: dilucId,
      inventory: fullInventory,
    });

    expect(results.length).toBeGreaterThanOrEqual(1);
    const topTeam = results[0];

    // Verificar Carry
    expect(topTeam.team[0].name).toBe("Diluc");

    // Verificar presencia de los 3 acompañantes canónicos
    const memberNames = topTeam.team.map((m) => m.name);
    expect(memberNames).toContain("Xingqiu");
    expect(memberNames).toContain("Bennett");
    expect(memberNames).toContain("Sucrose");

    // Verificar arquetipo detectado
    expect(topTeam.archetype).toBe("Vaporizados Clásico");

    // Verificar asignación de sets de soporte
    const sucroseArt = topTeam.artifactAssignments.find((a) => a.characterName === "Sucrose");
    const bennettArt = topTeam.artifactAssignments.find((a) => a.characterName === "Bennett");
    const xingqiuArt = topTeam.artifactAssignments.find((a) => a.characterName === "Xingqiu");

    expect(sucroseArt?.artifactSetName).toBe("Sombra Verde Esmeralda");
    expect(bennettArt?.artifactSetName).toBe("Ritual Antiguo de la Nobleza");
    // Xingqiu no duplica Nobleza, se le asigna set personal con alerta
    expect(xingqiuArt?.artifactSetName).toContain("Set de Daño Personal");
  });

  test("Diluc: Blacklist de Sucrose reconfigura el Top 1 a variantes Derretidos / Sunfire / Mona", () => {
    const dilucId = 6;
    const sucroseId = 18;

    const results = findOptimalTeams({
      targetCharacterId: dilucId,
      inventory: fullInventory,
      blacklist: [sucroseId],
    });

    const topTeam = results[0];
    const memberNames = topTeam.team.map((m) => m.name);
    expect(memberNames).not.toContain("Sucrose");

    // Kaeya, Mona o Jean entran a suplir
    const hasAlternative =
      memberNames.includes("Kaeya") ||
      memberNames.includes("Mona") ||
      memberNames.includes("Jean");
    expect(hasAlternative).toBe(true);
  });

  test("Ningguang: Recomienda Doble Geo Doble Pyro (Noelle, Bennett, Xiangling)", () => {
    const ningguangId = 14;
    const results = findOptimalTeams({
      targetCharacterId: ningguangId,
      inventory: fullInventory,
    });

    expect(results.length).toBeGreaterThanOrEqual(1);
    const topTeam = results[0];

    const memberNames = topTeam.team.map((m) => m.name);
    expect(memberNames).toContain("Noelle"); // Partner Geo para resonancia
    expect(memberNames).toContain("Bennett"); // Buffer de ATK
    expect(topTeam.archetype).toContain("Doble Geo");
  });

  test("Razor: Anti-tags descartan estrictamente a Chongyun y Bennett C6", () => {
    const razorId = 17;
    // Inventario con Chongyun C0 y Bennett C6 (infusión Pyro destructiva)
    const razorInventory = DEFAULT_CHARACTERS.map((c) => ({
      characterId: c.id,
      constellation: c.name === "Bennett" ? 6 : 0,
    }));

    const results = findOptimalTeams({
      targetCharacterId: razorId,
      inventory: razorInventory,
    });

    // Ningún equipo en el Top 5 debe tener Chongyun ni Bennett C6
    for (const res of results) {
      const memberNames = res.team.map((m) => m.name);
      expect(memberNames).not.toContain("Chongyun");
      expect(memberNames).not.toContain("Bennett");
    }

    // El Top 1 debe incluir Superconductor (Kaeya / Qiqi)
    const topTeam = results[0];
    const memberNames = topTeam.team.map((m) => m.name);
    const hasCryo = memberNames.includes("Kaeya") || memberNames.includes("Qiqi");
    expect(hasCryo).toBe(true);
  });

  test("Support Artifact Binder: Cascada táctica cuando Bennett y Mona compiten por Nobleza", () => {
    const bennett = DEFAULT_CHARACTERS.find((c) => c.name === "Bennett")!;
    const mona = DEFAULT_CHARACTERS.find((c) => c.name === "Mona")!;
    const diluc = DEFAULT_CHARACTERS.find((c) => c.name === "Diluc")!;

    const companions = [
      { character: bennett, constellation: 1 },
      { character: mona, constellation: 0 },
    ];

    const { assignments, injectedTags } = bindSupportArtifacts(
      companions,
      diluc,
      DEFAULT_CATALOG.artifactSets,
      DEFAULT_CATALOG.artifactBinds
    );

    const bennettAssignment = assignments.find((a) => a.characterName === "Bennett");
    const monaAssignment = assignments.find((a) => a.characterName === "Mona");

    // Bennett se queda con Nobleza (prioridad 10)
    expect(bennettAssignment?.artifactSetName).toBe("Ritual Antiguo de la Nobleza");
    // Mona pasa por cascada a Instructor (prioridad 9)
    expect(monaAssignment?.artifactSetName).toBe("Instructor");

    // Ambos tags se inyectan correctamente
    expect(injectedTags).toContain("need_attack_buff");
    expect(injectedTags).toContain("buff_elemental_mastery");
  });
});
