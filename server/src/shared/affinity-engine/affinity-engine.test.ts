import { describe, expect, test } from "bun:test";
import {
  calcularSinergiaEquipo,
  calcularMatchPreset,
  sugerirSetPorArquetipo,
} from "./affinity-engine";

describe("calcularSinergiaEquipo", () => {
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

describe("calcularMatchPreset", () => {
  test("calcula el porcentaje correcto", () => {
    expect(calcularMatchPreset([1, 2, 3], [1, 2, 3, 4])).toBe(75);
  });

  test("regresa 0 si el preset está vacío", () => {
    expect(calcularMatchPreset([1, 2], [])).toBe(0);
  });
});

describe("sugerirSetPorArquetipo", () => {
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
