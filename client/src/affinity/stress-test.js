import {
  findOptimalTeams,
  DEFAULT_CHARACTERS,
  DEFAULT_CATALOG,
} from "./affinity-engine.js";

const toMB = (bytes) => (bytes == null ? null : +(bytes / 1048576).toFixed(2));

/** Lee el heap JS actual: `performance.memory` en navegador o `process.memoryUsage` en Node/Bun. */
function readMemoryBytes() {
  if (typeof performance !== "undefined" && performance.memory) {
    return {
      source: "browser:performance.memory",
      usedBytes: performance.memory.usedJSHeapSize,
      totalBytes: performance.memory.totalJSHeapSize,
      limitBytes: performance.memory.jsHeapSizeLimit,
    };
  }
  if (typeof process !== "undefined" && typeof process.memoryUsage === "function") {
    const m = process.memoryUsage();
    return {
      source: "runtime:process.memoryUsage",
      usedBytes: m.heapUsed,
      totalBytes: m.heapTotal,
      rssBytes: m.rss,
    };
  }
  return { source: "unavailable", usedBytes: null, totalBytes: null };
}

/**
 * Ejecuta una prueba de estrés masiva sobre `findOptimalTeams` con el inventario completo.
 * Funciona tanto en navegador (DevTools / módulo ES) como en Bun/Node.
 */
export async function runAffinityStressTest({
  iterations = 500,
  warmup = 3,
  yieldEvery = 0, // >0 cede al event loop cada N iteraciones en navegador para evitar freeze total
} = {}) {
  const fullInventory = DEFAULT_CHARACTERS.map((c) => ({
    characterId: c.id,
    constellation: 0,
  }));
  const carries = DEFAULT_CHARACTERS.filter((c) => c.roles.includes("Main DPS"));
  if (carries.length === 0) {
    throw new Error("No se encontraron personajes Main DPS en DEFAULT_CHARACTERS.");
  }

  for (let w = 0; w < warmup; w++) {
    findOptimalTeams(
      { targetCharacterId: carries[w % carries.length].id, inventory: fullInventory },
      DEFAULT_CATALOG
    );
  }

  const memStart = readMemoryBytes();
  let peakHeapBytes = memStart.usedBytes ?? 0;

  const timings = new Float64Array(iterations);
  let maxMs = 0;
  let maxCarry = "";
  let minMs = Infinity;
  let totalMs = 0;

  for (let i = 0; i < iterations; i++) {
    const carry = carries[i % carries.length];
    const t0 = performance.now();
    const res = findOptimalTeams(
      { targetCharacterId: carry.id, inventory: fullInventory },
      DEFAULT_CATALOG
    );
    const dt = performance.now() - t0;

    if (!Array.isArray(res) || res.length === 0) {
      throw new Error(`Iteración ${i} sin resultados para ${carry.name}`);
    }

    timings[i] = dt;
    totalMs += dt;
    if (dt > maxMs) {
      maxMs = dt;
      maxCarry = carry.name;
    }
    if (dt < minMs) minMs = dt;

    // Muestrear heap periódicamente para capturar picos sin distorsionar tiempos
    if ((i & 15) === 15 || i === iterations - 1) {
      const snap = readMemoryBytes();
      if (snap.usedBytes != null && snap.usedBytes > peakHeapBytes) {
        peakHeapBytes = snap.usedBytes;
      }
    }

    if (yieldEvery > 0 && (i + 1) % yieldEvery === 0) {
      await new Promise((r) => setTimeout(r, 0));
    }
  }

  const memEnd = readMemoryBytes();
  let browserSpecificMemoryMB = null;
  if (
    typeof performance !== "undefined" &&
    typeof performance.measureUserAgentSpecificMemory === "function" &&
    globalThis.crossOriginIsolated
  ) {
    const uam = await performance.measureUserAgentSpecificMemory();
    browserSpecificMemoryMB = toMB(uam.bytes);
  }

  const sorted = Float64Array.from(timings).sort();
  const p95Ms = sorted[Math.min(iterations - 1, Math.floor(iterations * 0.95))];

  const report = {
    iterations,
    inventorySize: fullInventory.length,
    carriesRotated: carries.length,
    totalMs: +totalMs.toFixed(2),
    avgMs: +(totalMs / iterations).toFixed(2),
    minMs: +minMs.toFixed(2),
    p95Ms: +p95Ms.toFixed(2),
    maxMs: +maxMs.toFixed(2),
    slowestCarry: maxCarry,
    memorySource: memEnd.source,
    ramStartMB: toMB(memStart.usedBytes),
    ramEndMB: toMB(memEnd.usedBytes),
    ramPeakMB: peakHeapBytes ? toMB(peakHeapBytes) : null,
    ramDeltaMB:
      memStart.usedBytes != null && memEnd.usedBytes != null
        ? toMB(memEnd.usedBytes - memStart.usedBytes)
        : null,
    rssEndMB: toMB(memEnd.rssBytes),
    browserSpecificMemoryMB,
  };

  console.table([report]);
  return report;
}

if (typeof window === "undefined" && import.meta?.main) {
  const iterations = Number(process.env.STRESS_ITERATIONS ?? 500);
  const yieldEvery = Number(process.env.YIELD_EVERY ?? 0);
  await runAffinityStressTest({ iterations, yieldEvery });
}
