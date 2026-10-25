/**
 * Script de Simulación Multicarry para el Motor de Matching (VGBuilder)
 *
 * Ejecutar con:
 * bun run src/shared/affinity-engine/simulate-carries.ts
 */

import { findOptimalTeams } from "./matcher";
import { DEFAULT_CHARACTERS } from "./roster-data";

const testCarries = [
  { id: 6, name: "Diluc", constellation: 0 },
  { id: 10, name: "Keqing", constellation: 0 },
  { id: 11, name: "Klee", constellation: 0 },
  { id: 14, name: "Ningguang", constellation: 2 },
  { id: 15, name: "Noelle", constellation: 6 },
  { id: 17, name: "Razor", constellation: 4 },
];

// Inventario con los 21 personajes desbloqueados a constelaciones estándar
const baseInventory = DEFAULT_CHARACTERS.map((c) => ({
  characterId: c.id,
  constellation:
    c.name === "Bennett" ? 1 :
    c.name === "Xingqiu" ? 2 :
    c.name === "Ningguang" ? 2 :
    c.name === "Noelle" ? 6 :
    c.name === "Razor" ? 4 : 0,
}));

console.log("================================================================================");
console.log("      VGBUILDER — SIMULACIÓN MULTICARRY DEL MOTOR DE AFINIDAD (EPIC 3)        ");
console.log("================================================================================\n");

for (const carry of testCarries) {
  console.log(`--------------------------------------------------------------------------------`);
  console.log(`🎯 Evaluando Carry: ${carry.name} (ID: ${carry.id}, C${carry.constellation})`);
  console.log(`--------------------------------------------------------------------------------`);

  const results = findOptimalTeams({
    targetCharacterId: carry.id,
    inventory: baseInventory,
  });

  if (results.length === 0) {
    console.log("  ⚠️ No se pudieron generar combinaciones válidas.");
    continue;
  }

  // Mostrar Top 3
  const topN = results.slice(0, 3);
  topN.forEach((res) => {
    const members = res.team.map((m) => `${m.name} (C${m.constellation})`).join(" + ");
    console.log(`  Top #${res.rank} [${res.totalScore} pts] — Arquetipo: "${res.archetype}"`);
    console.log(`    Composición: ${members}`);
    console.log(`    Artefactos asignados:`);
    res.artifactAssignments.forEach((art) => {
      const alertInfo = art.alert ? ` ⚠️ [${art.alert}]` : "";
      console.log(`      * ${art.characterName}: ${art.artifactSetName}${alertInfo}`);
    });
    console.log(`    Desglose: Buffs: +${res.scoreBreakdown.scalingBuffs} | Amp: +${res.scoreBreakdown.amplification} | Blueprint: +${res.scoreBreakdown.blueprint} | Resonancia: +${res.scoreBreakdown.resonance} | Micro: +${res.scoreBreakdown.microAffinities} | Penalizaciones: -${res.scoreBreakdown.penalties}`);
    console.log();
  });
}

console.log("================================================================================");
console.log("                      FIN DE LA SIMULACIÓN MULTICARRY                           ");
console.log("================================================================================\n");
