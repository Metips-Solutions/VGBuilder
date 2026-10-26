import { describe, expect, test } from "bun:test";
import {
  calcularSinergiaEquipo,
  calcularMatchPreset,
  sugerirSetPorArquetipo,
  findOptimalTeams,
  DEFAULT_CHARACTERS,
  DEFAULT_CATALOG,
  bindSupportArtifacts,
  isSupportSetViableForTeam,
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
  const fullInventory = DEFAULT_CHARACTERS.slice(0, 21).map((c) => ({
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

    // El Top 1 debe incluir Superconductor (habilitador Cryo: Diona / Eula / Rosaria / Kaeya / Qiqi)
    const topTeam = results[0];
    const hasCryo = topTeam.team.some((m) => m.element === "Cryo");
    expect(hasCryo).toBe(true);
    expect(topTeam.archetype).toContain("Superconductor");
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
    const hasCryo = topTeam.team.some((m) => m.element === "Cryo");
    expect(hasCryo).toBe(true);
    expect(topTeam.archetype).toContain("Superconductor");

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


describe("Ronda 2 — Expansión de Roster (11 nuevos personajes)", () => {
  const fullInventory32 = DEFAULT_CHARACTERS.filter((c) => c.id <= 32).map((c) => ({
    characterId: c.id,
    constellation: c.name === "Bennett" ? 1 : c.name === "Xingqiu" ? 2 : 0,
  }));

  test("Ningguang: Con Zhongli disponible en Ronda 2, lo prioriza como socio Geo #1 sobre Noelle", () => {
    const ningguangId = 14;
    const results = findOptimalTeams({
      targetCharacterId: ningguangId,
      inventory: fullInventory32,
    });

    expect(results.length).toBeGreaterThanOrEqual(1);
    const topTeam = results[0];
    const memberNames = topTeam.team.map((m) => m.name);
    expect(memberNames).toContain("Zhongli");
    expect(memberNames).toContain("Bennett");
    expect(topTeam.archetype).toContain("Doble Geo");
  });

  test("Hu Tao: Recomienda Doble Geo con Xingqiu, Zhongli y Albedo como Top 1 absoluto y valida sets KQM", () => {
    const huTaoId = 29;
    const results = findOptimalTeams({
      targetCharacterId: huTaoId,
      inventory: fullInventory32,
    });

    expect(results.length).toBeGreaterThanOrEqual(1);
    const topTeam = results[0];

    expect(topTeam.team[0].name).toBe("Hu Tao");
    const memberNames = topTeam.team.map((m) => m.name);
    expect(memberNames).toContain("Xingqiu");
    expect(memberNames).toContain("Zhongli");
    expect(memberNames).toContain("Albedo");
    expect(topTeam.archetype).toBe("Hu Tao Doble Geo");

    // Verificar asignación de sets: Zhongli Petra (10), Albedo Tenacidad (9), Xingqiu Nobleza (8)
    const zhongliArt = topTeam.artifactAssignments.find((a) => a.characterName === "Zhongli");
    const albedoArt = topTeam.artifactAssignments.find((a) => a.characterName === "Albedo");
    expect(zhongliArt?.artifactSetName).toBe("Petra Arcaica");
    expect(albedoArt?.artifactSetName).toBe("Tenacidad de la Geoarmada");
  });

  test("Hu Tao: Aplica soft penalty (-250 pts) a curadores continuos masivos sin romper viabilidad", () => {
    const huTaoId = 29;
    const resultsWithBarbara = findOptimalTeams({
      targetCharacterId: huTaoId,
      inventory: [
        { characterId: 29, constellation: 0 }, // Hu Tao
        { characterId: 21, constellation: 2 }, // Xingqiu
        { characterId: 25, constellation: 0 }, // Zhongli
        { characterId: 2, constellation: 0 },  // Barbara
      ],
    });

    expect(resultsWithBarbara.length).toBeGreaterThanOrEqual(1);
    const team = resultsWithBarbara[0];
    const hasPenalty = team.explanations.some((e) =>
      e.includes("Penalización leve: Curador continuo")
    );
    expect(hasPenalty).toBe(true);
  });

  test("Tartaglia: Recomienda Internacional con Xiangling, Bennett y Sucrose", () => {
    const tartagliaId = 23;
    const invWithoutZhongli = fullInventory32.filter((c) => c.characterId !== 25);
    const results = findOptimalTeams({
      targetCharacterId: tartagliaId,
      inventory: invWithoutZhongli,
    });

    expect(results.length).toBeGreaterThanOrEqual(1);
    const topTeam = results[0];
    const memberNames = topTeam.team.map((m) => m.name);
    expect(memberNames).toContain("Xiangling");
    expect(memberNames).toContain("Bennett");
    expect(memberNames).toContain("Sucrose");
    expect(topTeam.archetype).toBe("Tartaglia Internacional");
  });

  test("Xiao: Recomienda Xiao Hypercarry con batería Anemo (Jean/Sucrose), Zhongli y Bennett", () => {
    const xiaoId = 28;
    const results = findOptimalTeams({
      targetCharacterId: xiaoId,
      inventory: fullInventory32,
    });

    expect(results.length).toBeGreaterThanOrEqual(1);
    const topTeam = results[0];
    expect(topTeam.team[0].name).toBe("Xiao");
    const memberNames = topTeam.team.map((m) => m.name);
    const hasAnemoBattery = memberNames.includes("Jean") || memberNames.includes("Sucrose");
    expect(hasAnemoBattery).toBe(true);
    expect(memberNames).toContain("Zhongli");
    expect(memberNames).toContain("Bennett");
    expect(topTeam.archetype).toBe("Xiao Hypercarry");
  });

  test("Eula: Recomienda Superconductor y descarta estrictamente a Chongyun y Bennett C6", () => {
    const eulaId = 32;
    const eulaInvWithC6Bennett = fullInventory32.map((c) => ({
      ...c,
      constellation: c.characterId === 4 ? 6 : c.constellation,
    }));
    const results = findOptimalTeams({
      targetCharacterId: eulaId,
      inventory: eulaInvWithC6Bennett,
    });

    expect(results.length).toBeGreaterThanOrEqual(1);
    for (const r of results) {
      const names = r.team.map((m) => m.name);
      expect(names).not.toContain("Chongyun");
      expect(names).not.toContain("Bennett");
    }
    const topTeam = results[0];
    expect(topTeam.archetype).toBe("Eula Superconductor");
  });

  test("Eula: Desplegada como Soporte para Razor aportando debuff de RES Física y Superconductor", () => {
    const razorId = 17;
    const invRazorEula = [
      { characterId: 17, constellation: 4 }, // Razor
      { characterId: 4, constellation: 1 },  // Bennett
      { characterId: 20, constellation: 4 }, // Xiangling
      { characterId: 32, constellation: 0 }, // Eula C0 Soporte
    ];
    const results = findOptimalTeams({
      targetCharacterId: razorId,
      inventory: invRazorEula,
    });

    expect(results.length).toBeGreaterThanOrEqual(1);
    const topTeam = results[0];
    const memberNames = topTeam.team.map((m) => m.name);
    expect(memberNames).toContain("Eula");

    const eulaMember = topTeam.team.find((m) => m.name === "Eula");
    expect(eulaMember?.role).toBe("Support");
  });

  test("Ganyu: Recomienda Melt Ganyu con Bennett, Xiangling y Zhongli", () => {
    const ganyuId = 27;
    const results = findOptimalTeams({
      targetCharacterId: ganyuId,
      inventory: fullInventory32,
    });

    expect(results.length).toBeGreaterThanOrEqual(1);
    const topTeam = results[0];
    const memberNames = topTeam.team.map((m) => m.name);
    expect(memberNames).toContain("Bennett");
    expect(memberNames).toContain("Xiangling");
    expect(memberNames).toContain("Zhongli");
    expect(topTeam.archetype).toBe("Melt Ganyu");
  });

  test("Xinyan: Recomienda Superconductor Físico como Top 1 y descarta arquetipos de reacción elemental (Vaporizados/Derretidos)", () => {
    const xinyanId = 24;
    const results = findOptimalTeams({
      targetCharacterId: xinyanId,
      inventory: fullInventory32,
    });

    expect(results.length).toBeGreaterThanOrEqual(1);
    const topTeam = results[0];

    // Xinyan debe ser reconocida como Carry Físico con Superconductor
    expect(topTeam.archetype).toContain("Superconductor Físico");

    // Debe contener habilitador Cryo y Electro
    const hasCryo = topTeam.team.some((m) => m.element === "Cryo");
    const hasElectro = topTeam.team.some((m) => m.element === "Electro");
    expect(hasCryo).toBe(true);
    expect(hasElectro).toBe(true);

    // Ningún equipo del Top 5 debe ser Vaporizados o Derretidos
    for (const res of results) {
      expect(res.archetype).not.toBe("Vaporizados");
      expect(res.archetype).not.toBe("Vaporizados Clásico");
      expect(res.archetype).not.toBe("Derretidos");
    }
  });
});

describe("Ronda 3 — Expansión de Roster (10 personajes de Inazuma & Colaboración)", () => {
  const fullInventory42 = DEFAULT_CHARACTERS.filter((c) => c.id <= 42).map((c) => ({
    characterId: c.id,
    constellation: c.name === "Bennett" ? 1 : c.name === "Xingqiu" ? 2 : 0,
  }));

  test("Shogun Raiden: Recomienda Raiden National con Bennett, Xiangling y Xingqiu como Top 1 absoluto", () => {
    const raidenId = 39;
    const results = findOptimalTeams({
      targetCharacterId: raidenId,
      inventory: fullInventory42,
    });

    expect(results.length).toBeGreaterThanOrEqual(1);
    const topTeam = results[0];
    expect(topTeam.team[0].name).toBe("Shogun Raiden");

    const memberNames = topTeam.team.map((m) => m.name);
    expect(memberNames).toContain("Bennett");
    expect(memberNames).toContain("Xiangling");
    expect(memberNames).toContain("Xingqiu");
    expect(topTeam.archetype).toBe("Raiden National");

    // Verificar asignación táctica de sets de soporte
    const bennettArt = topTeam.artifactAssignments.find((a) => a.characterName === "Bennett");
    expect(bennettArt?.artifactSetName).toBe("Ritual Antiguo de la Nobleza");
  });

  test("Kamisato Ayaka: Recomienda Ayaka Permafrost y descarta estrictamente a Electro por romper congelación", () => {
    const ayakaId = 34;
    const results = findOptimalTeams({
      targetCharacterId: ayakaId,
      inventory: fullInventory42,
    });

    expect(results.length).toBeGreaterThanOrEqual(1);
    const topTeam = results[0];
    expect(topTeam.team[0].name).toBe("Kamisato Ayaka");
    expect(topTeam.archetype).toContain("Ayaka Permafrost");

    // Ningún equipo óptimo del Top 3 debe contener Electro (destruiría la congelación)
    for (const res of results.slice(0, 3)) {
      const hasElectro = res.team.some((m) => m.element === "Electro");
      expect(hasElectro).toBe(false);
      const hasHydro = res.team.some((m) => m.element === "Hydro");
      expect(hasHydro).toBe(true);
    }
  });

  test("Yoimiya: Recomienda Vaporizado con Xingqiu y Zhongli como núcleo protector", () => {
    const yoimiyaId = 36;
    const results = findOptimalTeams({
      targetCharacterId: yoimiyaId,
      inventory: fullInventory42,
    });

    expect(results.length).toBeGreaterThanOrEqual(1);
    const topTeam = results[0];
    expect(topTeam.team[0].name).toBe("Yoimiya");

    const memberNames = topTeam.team.map((m) => m.name);
    expect(memberNames).toContain("Xingqiu");
    expect(memberNames).toContain("Zhongli");
    expect(topTeam.archetype).toContain("Vaporizado");

    // Verificar que un equipo de Yoimiya sin escudo sufra penalización de interrupción
    const resultsNoShield = findOptimalTeams({
      targetCharacterId: yoimiyaId,
      inventory: [
        { characterId: 36, constellation: 0 }, // Yoimiya
        { characterId: 21, constellation: 2 }, // Xingqiu
        { characterId: 4, constellation: 1 },  // Bennett
        { characterId: 2, constellation: 0 },  // Barbara
      ],
    });
    const hasPenalty = resultsNoShield[0].explanations.some((e) =>
      e.includes("Yoimiya sin escudo sufre interrupciones")
    );
    expect(hasPenalty).toBe(true);
  });

  test("Sangonomiya Kokomi: Recomienda Kokomi Taser y su Anti-tag descarta estrictamente a buffers de Prob. Crítico", () => {
    const kokomiId = 40;
    const results = findOptimalTeams({
      targetCharacterId: kokomiId,
      inventory: fullInventory42,
    });

    expect(results.length).toBeGreaterThanOrEqual(1);
    const topTeam = results[0];
    expect(topTeam.team[0].name).toBe("Sangonomiya Kokomi");
    expect(topTeam.archetype).toBe("Kokomi Taser");

    // Hard Constraint: Rosaria (buff_crit_rate) debe ser descartada de todos los equipos generados
    for (const res of results) {
      const memberNames = res.team.map((m) => m.name);
      expect(memberNames).not.toContain("Rosaria");
    }
  });

  test("Shogun Raiden: Con Kujou Sara C6 en inventario, activa bono crítico Electro e impulsa Raiden Hypercarry", () => {
    const raidenId = 39;
    const invWithSaraC6 = DEFAULT_CHARACTERS.map((c) => ({
      characterId: c.id,
      constellation: c.name === "Kujou Sara" ? 6 : c.name === "Bennett" ? 1 : 0,
    }));

    // Blacklist de Xingqiu y Xiangling para forzar la rama de Hypercarry
    const xingqiuId = 21;
    const xianglingId = 20;
    const results = findOptimalTeams({
      targetCharacterId: raidenId,
      inventory: invWithSaraC6,
      blacklist: [xingqiuId, xianglingId],
    });

    expect(results.length).toBeGreaterThanOrEqual(1);
    const topTeam = results[0];
    const memberNames = topTeam.team.map((m) => m.name);
    expect(memberNames).toContain("Kujou Sara");
    expect(memberNames).toContain("Bennett");
    expect(topTeam.archetype).toBe("Raiden Hypercarry");

    const hasSaraCritBonus = topTeam.explanations.some((e) =>
      e.includes("Danza Tengu C6 otorga +60% Daño Crítico Electro")
    );
    expect(hasSaraCritBonus).toBe(true);
  });

  test("Noelle C6 con Gorou C6: Recomienda Triple Geo Hiperdefensa con asignación de Nobleza a Gorou (descalificando Petra Arcaica)", () => {
    const noelleId = 15;
    const invWithGorou = DEFAULT_CHARACTERS.map((c) => ({
      characterId: c.id,
      constellation: c.name === "Noelle" ? 6 : c.name === "Gorou" ? 6 : 0,
    }));

    const results = findOptimalTeams({
      targetCharacterId: noelleId,
      inventory: invWithGorou,
    });

    expect(results.length).toBeGreaterThanOrEqual(1);
    const topTeam = results[0];
    const memberNames = topTeam.team.map((m) => m.name);
    expect(memberNames).toContain("Gorou");
    expect(memberNames).toContain("Albedo");
    expect(topTeam.archetype).toBe("Triple Geo");

    // Validar asignación de Ritual Antiguo de la Nobleza a Gorou (Petra Arcaica descalificada en carry Geo)
    const gorouArt = topTeam.artifactAssignments.find((a) => a.characterName === "Gorou");
    expect(gorouArt?.artifactSetName).toBe("Ritual Antiguo de la Nobleza");
  });

  test("Kaedehara Kazuha: Asigna Sombra Verde Esmeralda con prioridad máxima y bufa daño elemental", () => {
    const kazuhaId = 33;
    const kazuhaData = DEFAULT_CHARACTERS.find((c) => c.id === kazuhaId);
    expect(kazuhaData).toBeDefined();
    expect(kazuhaData?.mechanics.some((m) => m.value === "buff_elemental_dmg")).toBe(true);

    // Verificar que Kazuha esté en primer lugar de prioridad (10) para VV
    const topVV = DEFAULT_CATALOG.artifactBinds.find(
      (b) => b.artifactName === "Sombra Verde Esmeralda" && b.characterName === "Kaedehara Kazuha"
    );
    expect(topVV?.priority).toBe(10);
  });
});

describe("Ronda 4 — Expansión de Roster (10 personajes de Inazuma & Sumeru)", () => {
  const fullInventory52 = DEFAULT_CHARACTERS.map((c) => ({
    characterId: c.id,
    constellation:
      c.name === "Bennett" ? 1 :
      c.name === "Xingqiu" ? 2 :
      c.name === "Xiangling" ? 4 :
      c.name === "Gorou" ? 6 :
      c.name === "Fischl" ? 6 :
      c.name === "Kujou Sara" ? 6 :
      c.name === "Noelle" ? 6 : 0,
  }));

  test("Arataki Itto: Recomienda Mono Geo Hiperdefensa con Gorou C6, Albedo y Zhongli como Top 1 absoluto", () => {
    const ittoId = 43;
    const results = findOptimalTeams({
      targetCharacterId: ittoId,
      inventory: fullInventory52,
    });

    expect(results.length).toBeGreaterThanOrEqual(1);
    const topTeam = results[0];
    expect(topTeam.team[0].name).toBe("Arataki Itto");

    const memberNames = topTeam.team.map((m) => m.name);
    expect(memberNames).toContain("Gorou");
    expect(memberNames).toContain("Albedo");
    expect(memberNames).toContain("Zhongli");
    expect(topTeam.archetype).toBe("Mono Geo Hiperdefensa");
  });

  test("Tighnari: Recomienda Tighnari Spread con acompañante Electro y Collei Recuerdos del Bosque", () => {
    const tighnariId = 51;
    const results = findOptimalTeams({
      targetCharacterId: tighnariId,
      inventory: fullInventory52,
    });

    expect(results.length).toBeGreaterThanOrEqual(1);
    const topTeam = results[0];
    expect(topTeam.team[0].name).toBe("Tighnari");

    const memberNames = topTeam.team.map((m) => m.name);
    // Debe tener a Collei con Recuerdos del Bosque
    expect(memberNames).toContain("Collei");
    // Debe tener acompañante Electro para activar Aceleración/Propagación
    const hasElectroPartner = memberNames.some((n) => n === "Fischl" || n === "Yae Miko" || n === "Kuki Shinobu");
    expect(hasElectroPartner).toBe(true);

    expect(topTeam.archetype).toBe("Tighnari Spread");

    const hasSpreadBonus = topTeam.explanations.some((e) =>
      e.includes("Aceleración / Propagación (Spread)")
    );
    expect(hasSpreadBonus).toBe(true);
  });

  test("Tighnari: Aplica penalización táctica si se fuerza Hydro/Bloom sin suficiente presencia Electro", () => {
    const tighnariId = 51;
    const invHydroTighnari = [
      { characterId: 51, constellation: 0 }, // Tighnari
      { characterId: 2, constellation: 0 },  // Barbara
      { characterId: 13, constellation: 0 }, // Mona
      { characterId: 25, constellation: 0 }, // Zhongli
    ];

    const results = findOptimalTeams({
      targetCharacterId: tighnariId,
      inventory: invHydroTighnari,
    });

    expect(results.length).toBeGreaterThanOrEqual(1);
    const team = results[0];
    const hasBloomPenalty = team.explanations.some((e) =>
      e.includes("Hidro genera Florecimiento descontrolado")
    );
    expect(hasBloomPenalty).toBe(true);
  });

  test("Hu Tao: Con Yelan en inventario, recomienda Hu Tao Doble Hydro (Xingqiu, Yelan, Zhongli) como Top 1 absoluto", () => {
    const huTaoId = 29;
    const results = findOptimalTeams({
      targetCharacterId: huTaoId,
      inventory: fullInventory52,
    });

    expect(results.length).toBeGreaterThanOrEqual(1);
    const topTeam = results[0];
    expect(topTeam.team[0].name).toBe("Hu Tao");

    const memberNames = topTeam.team.map((m) => m.name);
    expect(memberNames).toContain("Xingqiu");
    expect(memberNames).toContain("Yelan");
    expect(memberNames).toContain("Zhongli");
    expect(topTeam.archetype).toBe("Hu Tao Doble Hydro");
  });

  test("Kamisato Ayaka: Con Shenhe en inventario, incorpora sus Plumas Glaciares y supera variantes previas", () => {
    const ayakaId = 34;
    const results = findOptimalTeams({
      targetCharacterId: ayakaId,
      inventory: fullInventory52,
    });

    expect(results.length).toBeGreaterThanOrEqual(1);
    const topTeam = results[0];
    expect(topTeam.team[0].name).toBe("Kamisato Ayaka");

    const memberNames = topTeam.team.map((m) => m.name);
    expect(memberNames).toContain("Shenhe");
    expect(memberNames).toContain("Sangonomiya Kokomi");
    expect(memberNames).toContain("Kaedehara Kazuha");
    expect(topTeam.archetype).toBe("Ayaka Freeze Shenhe");

    const hasIcyQuills = topTeam.explanations.some((e) =>
      e.includes("Plumas Glaciares de Shenhe (Icy Quills)")
    );
    expect(hasIcyQuills).toBe(true);
  });

  test("Kamisato Ayato: Recomienda Ayato Vaporizado con Xiangling, Bennett y acompañante Hydro/Anemo", () => {
    const ayatoId = 47;
    const results = findOptimalTeams({
      targetCharacterId: ayatoId,
      inventory: fullInventory52,
    });

    expect(results.length).toBeGreaterThanOrEqual(1);
    const topTeam = results[0];
    expect(topTeam.team[0].name).toBe("Kamisato Ayato");

    const memberNames = topTeam.team.map((m) => m.name);
    expect(memberNames).toContain("Xiangling");
    expect(memberNames).toContain("Bennett");
    expect(topTeam.archetype).toBe("Ayato Vaporizado");
  });

  test("Xiao: need_anemo_shred es satisfecho por Zhongli y Jean C4 pero NO por Sacarosa/Kazuha con VV", () => {
    const xiaoId = 28;

    // Equipo A: Xiao + Zhongli + Bennett + Jean C4 (Trituración real de Anemo)
    const invA = [
      { characterId: 28, constellation: 0 }, // Xiao
      { characterId: 25, constellation: 0 }, // Zhongli (debuff_all_res)
      { characterId: 4, constellation: 1 },  // Bennett
      { characterId: 8, constellation: 4 },  // Jean C4 (debuff_anemo_res -40%)
    ];
    const resultsA = findOptimalTeams({
      targetCharacterId: xiaoId,
      inventory: invA,
    });
    expect(resultsA.length).toBeGreaterThanOrEqual(1);
    const teamA = resultsA[0];
    const hasAnemoShred = teamA.explanations.some((e) =>
      e.includes("need_anemo_shred")
    );
    expect(hasAnemoShred).toBe(true);
    const hasAnemoMicro = teamA.explanations.some((e) =>
      e.includes("Trituración de Resistencia Anemo genuina activa")
    );
    expect(hasAnemoMicro).toBe(true);

    // Equipo B: Xiao + Sucrose C0 (VV) + Bennett + Diona (Sin Zhongli ni Jean C4)
    const invB = [
      { characterId: 28, constellation: 0 }, // Xiao
      { characterId: 18, constellation: 0 }, // Sucrose
      { characterId: 4, constellation: 1 },  // Bennett
      { characterId: 22, constellation: 0 }, // Diona
    ];
    const resultsB = findOptimalTeams({
      targetCharacterId: xiaoId,
      inventory: invB,
    });
    expect(resultsB.length).toBeGreaterThanOrEqual(1);
    const teamB = resultsB[0];
    const hasFalseAnemoShred = teamB.explanations.some((e) =>
      e.includes("need_anemo_shred")
    );
    // VV NO debe satisfacer need_anemo_shred
    expect(hasFalseAnemoShred).toBe(false);
  });

  test("Artifact Binder: Descalifica Sombra Verde Esmeralda en Xiao Hypercarry puro sin Sub-DPS PHEC", () => {
    const xiaoId = 28;
    const invXiaoPureHyper = [
      { characterId: 28, constellation: 0 }, // Xiao (Anemo Carry)
      { characterId: 8, constellation: 0 },  // Jean C0 (Anemo Healer/Battery)
      { characterId: 25, constellation: 0 }, // Zhongli (Geo Support)
      { characterId: 4, constellation: 1 },  // Bennett (Pyro Support/Buffer, no Sub-DPS)
    ];

    const results = findOptimalTeams({
      targetCharacterId: xiaoId,
      inventory: invXiaoPureHyper,
    });

    expect(results.length).toBeGreaterThanOrEqual(1);
    const topTeam = results[0];
    // Ningún acompañante debe tener asignado Sombra Verde Esmeralda porque no hay daño PHEC que swirlear
    const assignedSets = topTeam.artifactAssignments.map((a) => a.artifactSetName);
    expect(assignedSets).not.toContain("Sombra Verde Esmeralda");
  });

  test("Gorou: Penalizado y excluido del Top 5 de Carries no-Geo / no-DEF (Hu Tao y Kokomi)", () => {
    // 1. Hu Tao: Gorou no debe aparecer en su Top 5 frente a Albedo / Yelan
    const huTaoResults = findOptimalTeams({
      targetCharacterId: 29,
      inventory: fullInventory52,
    });
    const huTaoTop5 = huTaoResults.slice(0, 5);
    for (const r of huTaoTop5) {
      const names = r.team.map((m) => m.name);
      expect(names).not.toContain("Gorou");
    }

    // 2. Kokomi: Gorou no debe aparecer en su Top 5
    const kokomiResults = findOptimalTeams({
      targetCharacterId: 40,
      inventory: fullInventory52,
    });
    const kokomiTop5 = kokomiResults.slice(0, 5);
    for (const r of kokomiTop5) {
      const names = r.team.map((m) => m.name);
      expect(names).not.toContain("Gorou");
    }
  });

  test("Heizou: Recomienda Heizou Nacional como Top 1 absoluto con Xiangling, Bennett y Xingqiu/Yelan", () => {
    const heizouId = 50;
    const results = findOptimalTeams({
      targetCharacterId: heizouId,
      inventory: fullInventory52,
    });

    expect(results.length).toBeGreaterThanOrEqual(1);
    const topTeam = results[0];
    expect(topTeam.team[0].name).toBe("Shikanoin Heizou");

    const memberNames = topTeam.team.map((m) => m.name);
    expect(memberNames).toContain("Xiangling");
    expect(memberNames).toContain("Bennett");
    const hasHydroEnabler = memberNames.includes("Xingqiu") || memberNames.includes("Yelan");
    expect(hasHydroEnabler).toBe(true);
    expect(topTeam.archetype).toBe("Heizou Nacional");
  });

  test("Heizou: Recomienda Heizou Taser en inventario Electro/Hydro con Xingqiu, Fischl y Beidou/Kuki", () => {
    const heizouId = 50;
    const invTaser = [
      { characterId: 50, constellation: 0 }, // Heizou
      { characterId: 21, constellation: 2 }, // Xingqiu
      { characterId: 7, constellation: 6 },  // Fischl
      { characterId: 3, constellation: 2 },  // Beidou
      { characterId: 49, constellation: 0 }, // Kuki
      { characterId: 25, constellation: 0 }, // Zhongli
    ];

    const results = findOptimalTeams({
      targetCharacterId: heizouId,
      inventory: invTaser,
    });

    expect(results.length).toBeGreaterThanOrEqual(1);
    const topTeam = results[0];
    expect(topTeam.team[0].name).toBe("Shikanoin Heizou");

    const memberNames = topTeam.team.map((m) => m.name);
    expect(memberNames).toContain("Xingqiu");
    expect(topTeam.archetype).toBe("Heizou Taser");
  });

  test("Artifact Binder: Descalifica Petra Arcaica para Carries Dendro (Tighnari), Anemo (Xiao) y Geo (Itto, Noelle)", () => {
    const tighnari = DEFAULT_CHARACTERS.find((c) => c.name === "Tighnari")!;
    const xiao = DEFAULT_CHARACTERS.find((c) => c.name === "Xiao")!;
    const itto = DEFAULT_CHARACTERS.find((c) => c.name === "Arataki Itto")!;
    const huTao = DEFAULT_CHARACTERS.find((c) => c.name === "Hu Tao")!;
    const zhongli = DEFAULT_CHARACTERS.find((c) => c.name === "Zhongli")!;
    const yelan = DEFAULT_CHARACTERS.find((c) => c.name === "Yelan")!;
    const yae = DEFAULT_CHARACTERS.find((c) => c.name === "Yae Miko")!;

    // Carry Dendro con soporte Geo: Inviable
    const tighnariCompanions = [
      { character: zhongli, constellation: 0 },
      { character: yae, constellation: 0 },
    ];
    expect(isSupportSetViableForTeam("Petra Arcaica", tighnari, tighnariCompanions)).toBe(false);

    // Carry Anemo con soporte Geo: Inviable
    const xiaoCompanions = [
      { character: zhongli, constellation: 0 },
      { character: yelan, constellation: 0 },
    ];
    expect(isSupportSetViableForTeam("Petra Arcaica", xiao, xiaoCompanions)).toBe(false);

    // Carry Geo en Mono Geo (sin elementos PHEC): Inviable
    const ittoCompanions = [
      { character: zhongli, constellation: 0 },
    ];
    expect(isSupportSetViableForTeam("Petra Arcaica", itto, ittoCompanions)).toBe(false);

    // Carry Pyro (PHEC) con soporte Geo cristalizando: Viable
    const huTaoCompanions = [
      { character: zhongli, constellation: 0 },
      { character: yelan, constellation: 0 },
    ];
    expect(isSupportSetViableForTeam("Petra Arcaica", huTao, huTaoCompanions)).toBe(true);
  });

  test("Tighnari: Zhongli equipa Tenacidad de la Geoarmada en lugar de Petra Arcaica y no recibe bono de daño elemental indebido", () => {
    const tighnariId = 51;
    const invTighnari = [
      { characterId: 51, constellation: 0 }, // Tighnari
      { characterId: 25, constellation: 0 }, // Zhongli
      { characterId: 46, constellation: 0 }, // Yae Miko
      { characterId: 52, constellation: 0 }, // Collei
    ];

    const results = findOptimalTeams({
      targetCharacterId: tighnariId,
      inventory: invTighnari,
    });

    expect(results.length).toBeGreaterThanOrEqual(1);
    const topTeam = results[0];
    expect(topTeam.archetype).toBe("Tighnari Spread");

    // Zhongli no debe llevar Petra Arcaica
    const zhongliArt = topTeam.artifactAssignments.find((a) => a.characterName === "Zhongli");
    expect(zhongliArt?.artifactSetName).not.toBe("Petra Arcaica");
    expect(zhongliArt?.artifactSetName).toBe("Tenacidad de la Geoarmada");

    // No debe recibir bono de daño elemental indebido de buff_elemental_dmg
    const hasInvalidElementalBuff = topTeam.explanations.some((e) =>
      e.includes("Multiplicador de Daño: Bono de Daño Elemental / Universal al equipo")
    );
    expect(hasInvalidElementalBuff).toBe(false);
  });
});
