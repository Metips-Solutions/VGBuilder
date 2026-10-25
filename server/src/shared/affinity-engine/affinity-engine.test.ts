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

  test("Xiangling C0 vs Amber C0: Sin Bennett, Xiangling es priorizada por Guoba ATK buff y daño off-field", () => {
    const dilucId = 6;
    const inv = [
      { characterId: 6, constellation: 0 },  // Diluc
      { characterId: 21, constellation: 0 }, // Xingqiu
      { characterId: 18, constellation: 0 }, // Sucrose (batería Anemo)
      { characterId: 20, constellation: 0 }, // Xiangling C0
      { characterId: 1, constellation: 0 },  // Amber C0
    ];

    const results = findOptimalTeams({
      targetCharacterId: dilucId,
      inventory: inv,
    });

    expect(results.length).toBeGreaterThanOrEqual(1);
    const topTeam = results[0];
    const memberNames = topTeam.team.map((m) => m.name);

    // Xiangling debe ganar el puesto sobre Amber C0
    expect(memberNames).toContain("Xiangling");
    expect(memberNames).not.toContain("Amber");
  });

  test("Klee: Excluida como soporte a C0; habilitada a C2+ con debuff de defensa", () => {
    const dilucId = 6;

    // A C0: Klee no debe aparecer en los equipos de Diluc
    const invC0 = [
      { characterId: 6, constellation: 0 },
      { characterId: 21, constellation: 0 },
      { characterId: 18, constellation: 0 },
      { characterId: 11, constellation: 0 }, // Klee C0
      { characterId: 4, constellation: 0 },  // Bennett
    ];
    const resultsC0 = findOptimalTeams({ targetCharacterId: dilucId, inventory: invC0 });
    const hasKleeInC0 = resultsC0.some((r) => r.team.some((m) => m.name === "Klee"));
    expect(hasKleeInC0).toBe(false);

    // A C2: Klee se habilita como soporte con -23% DEF debuff
    const invC2 = [
      { characterId: 6, constellation: 0 },
      { characterId: 21, constellation: 0 },
      { characterId: 18, constellation: 0 },
      { characterId: 11, constellation: 2 }, // Klee C2
      { characterId: 4, constellation: 0 },  // Bennett
    ];
    const resultsC2 = findOptimalTeams({ targetCharacterId: dilucId, inventory: invC2 });
    const hasKleeInC2 = resultsC2.some((r) => r.team.some((m) => m.name === "Klee"));
    expect(hasKleeInC2).toBe(true);
  });

  test("Razor: Excluido como soporte a C0-C3; a C4+ se habilita como soporte con debuff de defensa y artefactos", () => {
    const keqingId = 10;

    // A C0: Razor no debe aparecer como soporte
    const invC0 = [
      { characterId: 10, constellation: 0 }, // Keqing
      { characterId: 7, constellation: 0 },  // Fischl
      { characterId: 16, constellation: 0 }, // Qiqi
      { characterId: 17, constellation: 0 }, // Razor C0
    ];
    const resultsC0 = findOptimalTeams({ targetCharacterId: keqingId, inventory: invC0 });
    const hasRazorInC0 = resultsC0.some((r) => r.team.some((m) => m.name === "Razor"));
    expect(hasRazorInC0).toBe(false);

    // A C4: Razor se habilita como soporte con -15% DEF debuff
    const invC4 = [
      { characterId: 10, constellation: 0 },
      { characterId: 7, constellation: 0 },
      { characterId: 16, constellation: 0 },
      { characterId: 17, constellation: 4 }, // Razor C4
    ];
    const resultsC4 = findOptimalTeams({ targetCharacterId: keqingId, inventory: invC4 });
    const razorTeam = resultsC4.find((r) => r.team.some((m) => m.name === "Razor"));
    expect(razorTeam).toBeDefined();

    // Razor debe tener rol Support en el equipo y poder equipar set universal
    const razorMember = razorTeam!.team.find((m) => m.name === "Razor");
    expect(razorMember?.role).toBe("Support");

    const razorArt = razorTeam!.artifactAssignments.find((a) => a.characterName === "Razor");
    expect(razorArt).toBeDefined();
    expect(razorArt?.artifactSetName).toBe("Ritual Antiguo de la Nobleza");
  });

  test("Artifact Binder: Descalifica Instructor en Mono Pyro y asigna Pergamino del Héroe", () => {
    const dilucId = 6;
    const invMonoPyro = [
      { characterId: 6, constellation: 0 },  // Diluc
      { characterId: 4, constellation: 1 },  // Bennett
      { characterId: 20, constellation: 4 }, // Xiangling
      { characterId: 8, constellation: 0 },  // Jean
    ];

    const results = findOptimalTeams({
      targetCharacterId: dilucId,
      inventory: invMonoPyro,
    });

    expect(results.length).toBeGreaterThanOrEqual(1);
    const topTeam = results[0];

    // Ningún acompañante en Mono Pyro debe portar Instructor
    const instructorAssignment = topTeam.artifactAssignments.find(
      (a) => a.artifactSetName === "Instructor"
    );
    expect(instructorAssignment).toBeUndefined();

    // Xiangling debe portar Pergamino del Héroe (+12%/+24% Pyro DMG)
    const xianglingArt = topTeam.artifactAssignments.find(
      (a) => a.characterName === "Xiangling"
    );
    expect(xianglingArt?.artifactSetName).toBe("Pergamino del Héroe");
    expect(xianglingArt?.providedTag).toBe("buff_all_dmg");
  });

  test("Artifact Binder: Descalifica Instructor para Carries Geo y asigna Pergamino del Héroe", () => {
    const ningguangId = 14;
    const invGeo = [
      { characterId: 14, constellation: 2 }, // Ningguang
      { characterId: 15, constellation: 6 }, // Noelle
      { characterId: 4, constellation: 1 },  // Bennett
      { characterId: 20, constellation: 0 }, // Xiangling
    ];

    const results = findOptimalTeams({
      targetCharacterId: ningguangId,
      inventory: invGeo,
    });

    expect(results.length).toBeGreaterThanOrEqual(1);
    const topTeam = results[0];

    // No debe haber Instructor
    const instructorAssignment = topTeam.artifactAssignments.find(
      (a) => a.artifactSetName === "Instructor"
    );
    expect(instructorAssignment).toBeUndefined();

    // Xiangling debe equipar Pergamino del Héroe
    const xianglingArt = topTeam.artifactAssignments.find(
      (a) => a.characterName === "Xiangling"
    );
    expect(xianglingArt?.artifactSetName).toBe("Pergamino del Héroe");
  });

  test("Razor: Con Bennett no-C6 (C1), prioriza sinergias ofensivas de Bennett y Superconductor sobre Doble Geo", () => {
    const razorId = 17;
    const inv = DEFAULT_CHARACTERS.map((c) => ({
      characterId: c.id,
      constellation:
        c.name === "Bennett"
          ? 1
          : c.name === "Ningguang"
          ? 2
          : c.name === "Noelle"
          ? 6
          : c.name === "Razor"
          ? 4
          : 0,
    }));

    const results = findOptimalTeams({
      targetCharacterId: razorId,
      inventory: inv,
    });

    expect(results.length).toBeGreaterThanOrEqual(1);
    const topTeam = results[0];
    const topMembers = topTeam.team.map((m) => m.name);

    // Top 1 debe incluir a Bennett (no C6) y Superconductor
    expect(topMembers).toContain("Bennett");
    const hasCryo = topMembers.includes("Qiqi") || topMembers.includes("Kaeya");
    expect(hasCryo).toBe(true);

    // Doble Geo (Ningguang + Noelle) no debe superar a los equipos óptimos con Bennett
    const hasDobleGeo = topMembers.includes("Ningguang") && topMembers.includes("Noelle");
    expect(hasDobleGeo).toBe(false);

    // El puntaje del Top 1 debe ser claramente superior a la variante Doble Geo (~7600 pts)
    expect(topTeam.totalScore).toBeGreaterThan(8300);
  });

  test("Klee: Prioriza a Xingqiu sobre Barbara en Vaporizados gracias a ataques coordinados", () => {
    const kleeId = 11;
    const inv = [
      { characterId: 11, constellation: 0 }, // Klee
      { characterId: 4, constellation: 1 },  // Bennett
      { characterId: 13, constellation: 0 }, // Mona
      { characterId: 21, constellation: 2 }, // Xingqiu
      { characterId: 2, constellation: 0 },  // Barbara
    ];

    const results = findOptimalTeams({
      targetCharacterId: kleeId,
      inventory: inv,
    });

    expect(results.length).toBeGreaterThanOrEqual(2);
    const topTeam = results[0];
    const topMembers = topTeam.team.map((m) => m.name);

    // El Top 1 debe tener a Xingqiu (ataques coordinados ofensivos)
    expect(topMembers).toContain("Xingqiu");
    expect(topMembers).not.toContain("Barbara");

    // Verificar que el equipo con Xingqiu supera al equipo con Barbara
    const barbaraTeam = results.find((r) => r.team.some((m) => m.name === "Barbara"));
    expect(barbaraTeam).toBeDefined();
    expect(topTeam.totalScore).toBeGreaterThan(barbaraTeam!.totalScore);
  });
});
